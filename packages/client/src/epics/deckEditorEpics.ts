import { CardModel } from '@mtg-react-redux/models';
import { ActionsObservable, combineEpics, StateObservable } from 'redux-observable';
import { Epic } from 'redux-observable';
import { forkJoin, from, of, pipe } from 'rxjs';
import { catchError, concatMap, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { cardsAsync } from '../actions/cardsActions';
import { addCardByNameAsync, CardByName, getDeckAsync, putDeckAsync, setCardsByNameAsync } from '../actions/deckEditorActions';
import { AppState } from '../reducers';
import { Card, cardsByNameSelector } from '../reducers/cardsReducer';
import { DeckEditorRow, DeckEditorState } from '../reducers/deckEditorReducer';
import { arrayToObject } from '../util/array';
import { getCards as getCardsEpic } from './cardEpics';
import { FBConfig } from './index';

const forkEpic = (epicFactory: Epic, $state: StateObservable<AppState>, dependencies: any, action) => {
    const action$ = ActionsObservable.of(action);
    return epicFactory(action$, $state, dependencies);
};

function assembleDeckRows(cards: CardByName[], state: AppState, epicResponse: Card[]): DeckEditorRow[] {
    // error
    if (epicResponse.hasOwnProperty('err')) {
        return [];
    }

    const cardsMap = arrayToObject(cards.map((card) => ({ ...card, name: card.name.toLowerCase() })), 'name');

    // retrieve items from action that hasn't yet made it to store
    const uniqueCards = new Set([...cardsByNameSelector(state.cards, cards.map((c) => c.name)), ...epicResponse]);

    return Array.from(uniqueCards).filter((card) => !!card && card.id && card.name && !!cardsMap[card.name.toLowerCase()]).map((card) => {
        const cardModel = new CardModel(card);
        // primitive name and search contains both card faces, model has only first face
        const lowerName = card.name.toLowerCase();
        const row: DeckEditorRow = {
            id: cardModel.id,
            quantity: cardsMap[lowerName].quantity,
            sideboard: cardsMap[lowerName].sideboard,
            owned: 1
        };
        return row;
    });
}

// config has getFirebase and getFirestore functions
const addCardByName: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
    action$
        .pipe(
            filter(isActionOf(addCardByNameAsync.request)),
            switchMap((action) =>
                forkEpic(
                    getCardsEpic, $state, config, cardsAsync.request({ ids: [action.payload.name], type: 'name' })
                ).pipe(
                    switchMap((epicResponse) => forkJoin(
                        of(assembleDeckRows([action.payload], $state.value, epicResponse)),
                        of(epicResponse)

                    )),
                    concatMap(([rows, epicResponse]) => [
                        epicResponse,
                        addCardByNameAsync.success(rows[0])
                    ]),
                    catchError(pipe(cardsAsync.failure, of))
                )
            )
        );

const setCardsByName: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
    action$
        .pipe(
            filter(isActionOf(setCardsByNameAsync.request)),
            // create disposable stream to catch errors but keep observable
            switchMap((action) =>
                forkEpic(
                    getCardsEpic, $state, config, cardsAsync.request({ ids: action.payload.map((c) => c.name), type: 'name' })
                )
                    .pipe(
                        switchMap((epicResponse) => forkJoin(
                            of(assembleDeckRows(action.payload, $state.value, epicResponse)),
                            of(epicResponse)

                        )),
                        concatMap(([rows, epicResponse]) => [
                            epicResponse,
                            setCardsByNameAsync.success(rows)
                        ]),
                        catchError(pipe(cardsAsync.failure, of))
                    )
            )
        );

const getDeck: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
    action$
        .pipe(
            filter(isActionOf(getDeckAsync.request)),
            // create disposable stream to catch errors but keep observable
            switchMap((action) =>
                from(config.getFirestore().collection('decks').doc(action.payload).get())
                    .pipe(
                        switchMap((deck) => forkJoin(
                            forkEpic(
                                getCardsEpic, $state, config, cardsAsync.request({ ids: Object.keys(deck.data().cards), type: 'id' })
                            ),
                            of(deck)

                        )),
                        concatMap(([epicResponse, deck]) => [
                            epicResponse,
                            getDeckAsync.success(deck.data() as DeckEditorState)
                        ]),
                        catchError(pipe(getDeckAsync.failure, of)),
                        takeUntil(action$.pipe(filter(isActionOf(getDeckAsync.cancel))))
                    )
            )
        );

const putDeck: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
    action$
        .pipe(
            filter(isActionOf(putDeckAsync.request)),
            // create disposable stream to catch errors but keep observable
            switchMap((action) =>
                from(config.getFirestore().collection('decks').doc(action.payload.id).set(action.payload))
                    .pipe(
                        map(putDeckAsync.success),
                        catchError(pipe(putDeckAsync.failure, of))
                    )
            )
        );

const cardEpics = combineEpics(
    addCardByName,
    setCardsByName,
    getDeck,
    putDeck
);

export default cardEpics;
