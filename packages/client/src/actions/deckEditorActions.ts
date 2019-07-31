import { DeckEditorRow } from '../reducers/deckEditorReducer';

export type DeckEditorActions = DeckEditorAddAction | DeckEditorDeleteAction | DeckEditorTitleAction | DeckEditorEditingAction
    | DeckEditorUpdateAction | DeckEditorEpicActions;

type DeckEditorEpicActions = DeckEditorAddCardByNameAction | DeckEditorSetCardsByNameAction;

export interface DeckEditorAddAction {
    type: 'DECK_EDITOR_ADD_CARDS';
    payload: {
        rows: Array<Pick<DeckEditorRow, 'name' | 'id' | 'type' | 'quantity' | 'sideboard'>>
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
        cards: Array<Pick<DeckEditorRow, 'name' | 'quantity' | 'sideboard'>>;
    };
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
