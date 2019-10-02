import { addCards, CardsGameDataAction, deleteCards } from '../actions/cardsGameDataActions';
import { getType } from 'typesafe-actions';
import produce from 'immer';

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

export default function cardsGameDataReducer(state: CardsGameDataState = {}, action: CardsGameDataAction): CardsGameDataState {
    return produce(state, (draft) => {
        switch (action.type) {
            case getType(addCards):
                action.payload.forEach((card) => draft[card.id] = card);
                break;
            case getType(deleteCards):
                action.payload.forEach((id) => delete draft[id]);
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
