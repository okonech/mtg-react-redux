import { ActionType, createAsyncAction } from 'typesafe-actions';
import { Card } from '../reducers/cardsReducer';

interface GetCards {
    ids: string[];
    type: 'id' | 'name';
}

export const cardsAsync = createAsyncAction(
    'cards/GET_CARDS',
    'cards/STORE_CARDS',
    'cards/CARDS_ERR',
    'cards/CARDS_CANCEL'
)<GetCards, Card[], Error, string>();

export type CardsAction = ActionType<typeof cardsAsync>;
