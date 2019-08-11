import { CardModel } from '@mtg-react-redux/models';
import { Epic } from 'redux-observable';
import { ActionsObservable, combineEpics, StateObservable } from 'redux-observable';
import { forkJoin, from, of } from 'rxjs';
import { catchError, concatMap, switchMap } from 'rxjs/operators';
import { cardsErr } from '../actions/cardsActions';
import { CardsUpdateAction, getCards } from '../actions/cardsActions';
import {
    addCards, DeckEditorAddCardByNameAction,
    DeckEditorGetDeckAction, DeckEditorSetCardsByNameAction, DeckEditorUpdateDeckAction, deckErr, deckSuccess, setCards, setDeckData
} from '../actions/deckEditorActions';
import { AppState } from '../reducers';
import { cardsByNameSelector } from '../reducers/cardsReducer';
import { DeckEditorRow, DeckEditorState } from '../reducers/deckEditorReducer';
import { arrayToObject } from '../util/array';
import { getCards as getCardsEpic } from './cardEpics';
import { FBConfig } from './index';

const forkEpic = (epicFactory: Epic, $state: StateObservable<AppState>, dependencies: any, action) => {
    const action$ = ActionsObservable.of(action);
    return epicFactory(action$, $state, dependencies);
};

function assembleDeckRows(cards: DeckEditorSetCardsByNameAction['payload']['cards'],
    state: AppState, epicResponse: CardsUpdateAction): DeckEditorRow[] {
    // error
    if (epicResponse.payload.hasOwnProperty('err')) {
        return [];
    }

    const cardsMap = arrayToObject(cards.map((card) => ({ ...card, name: card.name.toLowerCase() })), 'name');

    // retrieve items from action that hasn't yet made it to store
    const uniqueCards = new Set(
        [...cardsByNameSelector(state.cards, cards.map((c) => c.name)), ...epicResponse.payload.items]);

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
        .ofType('DECK_EDITOR_ADD_CARD_BY_NAME')
        .pipe(
            switchMap((action: DeckEditorAddCardByNameAction) =>
                forkEpic(
                    getCardsEpic, $state, config, getCards([action.payload.name], 'name')
                ).pipe(
                    switchMap((epicResponse) => forkJoin(
                        of(assembleDeckRows([action.payload], $state.value, epicResponse)),
                        of(epicResponse)

                    )),
                    concatMap(([rows, epicResponse]) => [
                        epicResponse,
                        addCards(rows)
                    ]),
                    catchError((error) => of(
                        cardsErr(error)
                    ))
                )
            )
        );

const setCardsByName: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
    action$
        .ofType('DECK_EDITOR_SET_CARDS_BY_NAME')
        .pipe(
            // create disposable stream to catch errors but keep observable
            switchMap((action: DeckEditorSetCardsByNameAction) =>
                forkEpic(
                    getCardsEpic, $state, config, getCards(action.payload.cards.map((c) => c.name), 'name')
                )
                    .pipe(
                        switchMap((epicResponse) => forkJoin(
                            of(assembleDeckRows(action.payload.cards, $state.value, epicResponse)),
                            of(epicResponse)

                        )),
                        concatMap(([rows, epicResponse]) => [
                            epicResponse,
                            setCards(rows)
                        ]),
                        catchError((error) => of(
                            cardsErr(error)
                        ))
                    )
            )
        );

const getDeck: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
    action$
        .ofType('DECK_EDITOR_GET_DECK')
        .pipe(
            // create disposable stream to catch errors but keep observable
            switchMap((action: DeckEditorGetDeckAction) =>
                from(config.getFirestore().collection('decks').doc(action.payload.id).get())
                    .pipe(
                        switchMap((deck) => forkJoin(
                            forkEpic(
                                getCardsEpic, $state, config, getCards(Object.keys(deck.data().cards), 'id')
                            ),
                            of(deck)

                        )),
                        concatMap(([epicResponse, deck]) => [
                            epicResponse,
                            setDeckData(deck.data() as DeckEditorState)
                        ]),
                        catchError((error) => of(
                            deckErr(error)
                        ))
                    )
            )
        );

const updateDeck: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
    action$
        .ofType('DECK_EDITOR_UPDATE_DECK')
        .pipe(
            // create disposable stream to catch errors but keep observable
            switchMap((action: DeckEditorUpdateDeckAction) =>
                from(config.getFirestore().collection('decks').doc(action.payload.deck.id).set(action.payload.deck))
                    .pipe(
                        switchMap(() => of(
                            deckSuccess()
                        )),
                        catchError((error) => of(
                            deckErr(error)
                        ))
                    )
            )
        );

const cardEpics = combineEpics(
    addCardByName,
    setCardsByName,
    getDeck,
    updateDeck
);

export default cardEpics;
