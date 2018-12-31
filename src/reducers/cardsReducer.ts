import produce from 'immer';
import { CardsAction } from '../actions/cardsActions';

// Normalized cards store as object of {unique card id: Card}
// No ids array since full list of cards is never enumerated, only known list of card ids are passed

export interface CardsState {
  [id: string]: Card;
}

export interface Card {
  id: string;
  name: string;
}

export default function cardsReducer(state: CardsState = {}, action: CardsAction): CardsState {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'ADD_CARDS':
      case 'UPDATE_CARDS':
        action.payload.items.forEach((card) => draft[card.id] = card);
        break;
      case 'DELETE_CARDS':
        action.payload.ids.forEach((id) => delete draft[id]);
        break;
    }
  });
}

export function singleCardSelector(state: CardsState, id: string): Card {
  return state[id];
}

export function cardsSelector(state: CardsState, ids: string[]): Card[] {
  return ids.map((id) => singleCardSelector(state, id));
}
