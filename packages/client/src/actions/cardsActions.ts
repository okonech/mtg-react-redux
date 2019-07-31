import { Card } from '../reducers/cardsReducer';

export type CardsAction = CardsUpdateAction | CardsDeleteAction | CardsEpicAction;

export type CardsEpicAction = CardQueryAction | CardErrorAction;

export interface CardsUpdateAction {
    type: 'ADD_CARDS' | 'UPDATE_CARDS';
    payload: {
        items: Card[];
    };
}

export interface CardsDeleteAction {
    type: 'DELETE_CARDS';
    payload: {
        ids: string[];
    };
}

export interface CardQueryAction {
    type: 'GET_CARDS';
    payload: {
        ids: string[];
        type: 'id' | 'name';
    };
}

export interface CardErrorAction {
    type: 'CARDS_ERR';
    payload: {
        err: Error
    };
}

export function addCards(cards: Card[]): CardsAction {
    return {
        type: 'ADD_CARDS',
        payload: {
            items: cards
        }
    };
}

export function updateCards(cards: Card[]): CardsAction {
    return {
        type: 'UPDATE_CARDS',
        payload: {
            items: cards
        }
    };
}

export function deleteCards(ids: string[]): CardsAction {
    return {
        type: 'DELETE_CARDS',
        payload: {
            ids
        }
    };
}

export function getCards(ids: string[], type: 'id' | 'name'): CardsAction {
    return {
        type: 'GET_CARDS',
        payload: {
            ids,
            type
        }
    };
}

// TODO: store this somewhere
export function cardsErr(err: Error): CardsAction {
    return {
        type: 'CARDS_ERR',
        payload: {
            err
        }
    };
}
