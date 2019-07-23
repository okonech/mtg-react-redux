import { Card } from '../reducers/cardsGameDataReducer';

export type CardsGameDataAction = CardsGameDataUpdateAction | CardsGameDataDeleteAction;

export interface CardsGameDataUpdateAction {
    type: 'ADD_CARDS' | 'UPDATE_CARDS';
    payload: {
        items: Card[];
    };
}

export interface CardsGameDataDeleteAction {
    type: 'DELETE_CARDS';
    payload: {
        ids: string[];
    };
}

export function addCards(cards: Card[]): CardsGameDataAction {
    return {
        type: 'ADD_CARDS',
        payload: {
            items: cards
        }
    };
}

export function updateCards(cards: Card[]): CardsGameDataAction {
    return {
        type: 'UPDATE_CARDS',
        payload: {
            items: cards
        }
    };
}

export function deleteCards(ids: string[]): CardsGameDataAction {
    return {
        type: 'DELETE_CARDS',
        payload: {
            ids
        }
    };
}
