import {getSubsetExclude} from '../util/getSubset';

// Normalized cards store as object of {unique card id: Card}
// No allIds since full list of cards is never enumerated, only known list of card ids are passed

export interface CardsState {
  id?: Card;
}

export interface Card {
    id: string;
    key: string;
    name: string;
}

interface CardsAction {
  type: string;
  item?: Card[];
  ids?: string[];
}

export default function cardsReducer (state: CardsState = {}, action: CardsAction) {
  switch (action.type) {
    case 'ADD_CARDS':
    case 'UPDATE_CARDS':
      const newCards = action.item.map(card => ({[card.id]: card}));
      return {
        ...state,
        newCards
      };
    case 'DELETE_CARDS':
        return getSubsetExclude(action.ids, state);
    default:
      return state;
  }
}

export function singleCardSelector (state: CardsState, id: string): Card {
  return {...state.id};
}

export function cardsSelector (state: CardsState, ids: string[]): Card[] {
  return ids.map(id => singleCardSelector(state, id));
}