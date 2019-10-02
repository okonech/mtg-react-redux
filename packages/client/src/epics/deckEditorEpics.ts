import {
    addCardByNameAsync, CardByName, getDeckAsync, getDeckLoadCardsAsync,
    putDeckAsync, setCardsByNameAsync
} from '../actions/deckEditorActions';
import { AppState } from '../reducers';
import { arrayToObject } from '../util/conversion';
import { cardModelsMap } from '@mtg-react-redux/models';
import { cardsAsync } from '../actions/cardsActions';
import { cardsByNameSelector } from '../reducers/cardsReducer';
import { catchError, concatMap, filter, map, startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { combineEpics } from 'redux-observable';
import { DeckEditorRow, DeckEditorState } from '../reducers/deckEditorReducer';
import { Epic } from 'redux-observable';
import { FBConfig } from './index';
import { from, merge, of, pipe } from 'rxjs';
import { isActionOf } from 'typesafe-actions';
import { loaded, loading } from '../actions/loadingActions';

function assembleDeckRows(cardsByName: CardByName[], state: AppState): DeckEditorRow[] {

    const cardsMap = arrayToObject(cardsByName.map((card) => ({ ...card, name: card.name.toLowerCase() })), 'name');

    // load only stored cards
    const cards = cardsByNameSelector(state.cards, cardsByName.map((c) => c.name)).filter(a => a);

    // TODO: add way to fail on loading cards whose names don't match format in store
    // example is "1 Wear / Tear" which is loaded but doesn't match "1 Wear // Tear"
    console.log(cardsByName, cards);

    return cards.map((card) => {

        const cardModel = cardModelsMap.getModel(card);
        // primitive name and search contains both card faces, model has only first face
        const lowerName = card.name.toLowerCase();

        return {
            id: cardModel.id,
            quantity: cardsMap[lowerName].quantity,
            sideboard: cardsMap[lowerName].sideboard,
            owned: 1
        };
    });
}

// config has getFirebase and getFirestore functions
const addCardByName: Epic<any, any, AppState> = (action$, $state) =>
    action$
        .pipe(
            filter(isActionOf(addCardByNameAsync.request)),
            switchMap((action) =>
                action$.pipe(
                    filter(isActionOf(cardsAsync.success)),
                    take(1),
                    map(() => addCardByNameAsync.success(assembleDeckRows([action.payload], $state.value)[0])),
                    startWith(cardsAsync.request({ ids: [action.payload.name], type: 'name' })),
                    catchError(pipe(addCardByNameAsync.failure, of))
                )
            )
        );

const setCardsByName: Epic<any, any, AppState> = (action$, $state) =>
    action$
        .pipe(
            filter(isActionOf(setCardsByNameAsync.request)),
            // create disposable stream to catch errors but keep observable
            switchMap((action) =>
                action$.pipe(
                    filter(isActionOf(cardsAsync.success)),
                    take(1),
                    map(() => setCardsByNameAsync.success(assembleDeckRows(action.payload, $state.value))),
                    startWith(cardsAsync.request({ ids: action.payload.map((c) => c.name), type: 'name' })),
                    catchError(pipe(setCardsByNameAsync.failure, of))
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
                        map((deck) => getDeckAsync.success(deck.data() as DeckEditorState)),
                        catchError(pipe(getDeckAsync.failure, of)),
                        takeUntil(action$.pipe(filter(isActionOf(getDeckAsync.cancel))))
                    )
            )
        );

const getDeckLoadCards: Epic<any, any, AppState> = (action$) =>
    action$
        .pipe(
            filter(isActionOf(getDeckLoadCardsAsync.request)),
            // create disposable stream to catch errors but keep observable
            switchMap((action) =>
                merge(
                    of(loading()),
                    action$.pipe(
                        filter(isActionOf(getDeckAsync.success)),
                        take(1),
                        switchMap((deck) =>
                            action$.pipe(
                                filter(isActionOf(cardsAsync.success)),
                                take(1),
                                concatMap(() => [
                                    getDeckLoadCardsAsync.success(),
                                    loaded()
                                ]),
                                startWith(cardsAsync.request({ ids: Object.keys(deck.payload.cards), type: 'id' })),
                                catchError(pipe(setCardsByNameAsync.failure, of))
                            )
                        ),
                        startWith(getDeckAsync.request(action.payload)),
                        catchError(pipe(getDeckLoadCardsAsync.failure, of))
                    )
                )
            )
        );

const putDeckData: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
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
    getDeckLoadCards,
    putDeckData
);

export default cardEpics;
