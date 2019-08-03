import { DeckEditorRow, DeckEditorState } from '../reducers/deckEditorReducer';

export type DeckEditorActions = DeckEditorAddAction | DeckEditorDeleteAction | DeckEditorTitleAction | DeckEditorEditingAction
    | DeckEditorUpdateAction | DeckEditorSetDeckDataAction | DeckEditorEpicActions;

type DeckEditorEpicActions = DeckEditorAddCardByNameAction | DeckEditorSetCardsByNameAction | DeckEditorGetDeckAction
    | DeckEditorDeleteDeckAction | DeckEditorUpdateDeckAction | DeckEditorCreateDeckAction | DeckEditorErrAction | DeckEditorSuccessAction;

export interface DeckEditorAddAction {
    type: 'DECK_EDITOR_ADD_CARDS';
    payload: {
        rows: Array<Pick<DeckEditorRow, 'id' | 'quantity' | 'sideboard'>>
    };
}

export interface DeckEditorUpdateAction {
    type: 'DECK_EDITOR_UPDATE_CARDS' | 'DECK_EDITOR_SET_CARDS';
    payload: {
        rows: DeckEditorRow[]
    };
}

export interface DeckEditorDeleteAction {
    type: 'DECK_EDITOR_DELETE_CARDS';
    payload: {
        ids: string[]
    };
}

export interface DeckEditorTitleAction {
    type: 'DECK_EDITOR_SET_TITLE';
    payload: {
        title: string;
    };
}

export interface DeckEditorEditingAction {
    type: 'DECK_EDITOR_SET_EDITING';
    payload: {
        editing: boolean;
    };
}

export interface DeckEditorSetDeckDataAction {
    type: 'DECK_EDITOR_SET_DECK_DATA';
    payload: {
        state: DeckEditorState
    };
}

export interface DeckEditorAddCardByNameAction {
    type: 'DECK_EDITOR_ADD_CARD_BY_NAME';
    payload: {
        name: string;
        quantity: number;
        sideboard: number;
    };
}

export interface DeckEditorSetCardsByNameAction {
    type: 'DECK_EDITOR_SET_CARDS_BY_NAME';
    payload: {
        cards: Array<{
            name: string;
            quantity: number;
            sideboard: number;
        }>;
    };
}

export interface DeckEditorGetDeckAction {
    type: 'DECK_EDITOR_GET_DECK';
    payload: {
        id: string
    };
}

export interface DeckEditorDeleteDeckAction {
    type: 'DECK_EDITOR_DELETE_DECK';
    payload: {
        id: string
    };
}

export interface DeckEditorUpdateDeckAction {
    type: 'DECK_EDITOR_UPDATE_DECK';
    payload: {
        deck: Omit<DeckEditorState, 'editing'>
    };
}

export interface DeckEditorCreateDeckAction {
    type: 'DECK_EDITOR_CREATE_DECK';
    payload: {
        deck: Omit<DeckEditorState, 'editing'>
    };
}

export interface DeckEditorErrAction {
    type: 'DECK_EDITOR_ERR';
    payload: {
        err: Error
    };
}

export interface DeckEditorSuccessAction {
    type: 'DECK_EDITOR_SUCCESS';
    payload: {};
}

export function addCards(rows: DeckEditorAddAction['payload']['rows']): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_ADD_CARDS',
        payload: {
            rows
        }
    };
}

export function updateCards(rows: DeckEditorRow[]): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_UPDATE_CARDS',
        payload: {
            rows
        }
    };
}

export function deleteCards(ids: string[]): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_DELETE_CARDS',
        payload: {
            ids
        }
    };
}

export function setCards(rows: DeckEditorRow[]): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_SET_CARDS',
        payload: {
            rows
        }
    };
}

export function setTitle(title: string): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_SET_TITLE',
        payload: {
            title
        }
    };
}

export function setEditing(editing: boolean): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_SET_EDITING',
        payload: {
            editing
        }
    };
}

export function setDeckData(state: DeckEditorState): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_SET_DECK_DATA',
        payload: {
            state
        }
    };
}

export function addCardByName(name: string, quantity = 1, sideboard = 0): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_ADD_CARD_BY_NAME',
        payload: {
            name,
            quantity,
            sideboard
        }
    };
}

export function setCardsByName(cards: DeckEditorSetCardsByNameAction['payload']['cards']): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_SET_CARDS_BY_NAME',
        payload: {
            cards
        }
    };
}

export function getDeck(id: string): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_GET_DECK',
        payload: {
            id
        }
    };
}

export function deleteDeck(id: string): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_DELETE_DECK',
        payload: {
            id
        }
    };
}

export function updateDeck(deck: DeckEditorUpdateDeckAction['payload']['deck']): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_UPDATE_DECK',
        payload: {
            deck
        }
    };
}

export function createDeck(deck: DeckEditorCreateDeckAction['payload']['deck']): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_CREATE_DECK',
        payload: {
            deck
        }
    };
}

export function deckErr(err: Error): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_ERR',
        payload: {
            err
        }
    };
}
export function deckSuccess(): DeckEditorActions {
    return {
        type: 'DECK_EDITOR_SUCCESS',
        payload: {}
    };
}
