import produce from 'immer';
import { CardsGameDataAction } from '../actions/cardsGameDataActions';

// Normalized cards store as object of {unique card id: Card}
// No ids array since full list of cards is never enumerated, only known list of card ids are passed

export interface CardsGameDataState {
    [id: string]: Card;
}

export type Card = CardView & CardLogic;

export interface CardView {
    id: string;
    tapped: boolean;
}

export interface CardLogic {
    colorIdentity: string[];
    owner: string;
    controller: string;
}

export default function cardsGameDataReducer(
    state: CardsGameDataState = {},
    action: CardsGameDataAction): CardsGameDataState {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'ADD_CARDS':
            case 'UPDATE_CARDS':
                action.payload.items.forEach((card) => draft[card.id] = card);
                break;
            case 'DELETE_CARDS':
                action.payload.ids.forEach((id) => delete draft[id]);
                break;
            default:
                break;
        }
    });
}

export function singleCardGameDataSelector(state: CardsGameDataState, id: string): Card {
    return state[id];
}

export function cardsGameDataSelector(state: CardsGameDataState, ids: string[]): Card[] {
    return ids.map((id) => singleCardGameDataSelector(state, id));
}
