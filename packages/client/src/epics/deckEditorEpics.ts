import { ActionsObservable, combineEpics, StateObservable } from 'redux-observable';
import { Epic } from 'redux-observable';
import { forkJoin, of } from 'rxjs';
import { catchError, concatMap, switchMap, take } from 'rxjs/operators';
import { CardsUpdateAction, getCards } from '../actions/cardsActions';
import { cardsErr } from '../actions/cardsActions';
import {
    addCards, DeckEditorAddCardByNameAction,
    DeckEditorSetCardsByNameAction, setCards
} from '../actions/deckEditorActions';
import { AppState } from '../reducers';
import { cardsByNameSelector } from '../reducers/cardsReducer';
import { DeckEditorRow } from '../reducers/deckEditorReducer';
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
        const { id, name, type_line } = card;
        const lowerName = name.toLowerCase();
        return {
            id,
            name,
            type: type_line,
            quantity: cardsMap[lowerName].quantity,
            sideboard: cardsMap[lowerName].sideboard,
            owned: 1
        };
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
                of(action)
                    .pipe(
                        take(1),
                        switchMap((act: DeckEditorSetCardsByNameAction) =>
                            forkEpic(
                                getCardsEpic, $state, config, getCards(act.payload.cards.map((c) => c.name), 'name')
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
                    )
            )
        );

const cardEpics = combineEpics(
    addCardByName,
    setCardsByName
);

export default cardEpics;
