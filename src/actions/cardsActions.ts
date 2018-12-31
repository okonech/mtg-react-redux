import { Card } from '../reducers/cardsReducer';

export interface CardsAction {
    type: 'ADD_CARDS' | 'UPDATE_CARDS' | 'DELETE_CARDS';
    payload: {
        ids?: string[];
        items?: Card[];
    }
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