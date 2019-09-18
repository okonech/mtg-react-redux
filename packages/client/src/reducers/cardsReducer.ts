import { CardPrimitive } from '@mtg-react-redux/models';
import { CardsAction, cardsAsync } from '../actions/cardsActions';
import { getType } from 'typesafe-actions';
import produce from 'immer';

// Normalized cards store as object of 
// cards: {unique card id: Card}
// cardsByName: {card name: card Id}
// No ids array since full list of cards is never enumerated, only known list of card ids are passed

export type Card = CardPrimitive;
export interface CardsState {
  cards: { [id: string]: Card };
  cardsbyName: { [name: string]: string };
}

const def = {
  cards: {},
  cardsbyName: {}
};

export default function cardsReducer(state: CardsState = def, action: CardsAction): CardsState {
  return produce(state, (draft) => {
    switch (action.type) {
      case getType(cardsAsync.success):
        action.payload.forEach((card) => {
          if (card.name && card.id) {
            draft.cards[card.id] = card;
            draft.cardsbyName[card.name] = card.id;
          }
        });
        break;
      default:
        break;
    }
  });
}

export function singleCardSelector(state: CardsState, id: string): Card {
  return state.cards[id];
}

export function cardsSelector(state: CardsState, ids: string[]): Card[] {
  return ids.map((id) => singleCardSelector(state, id));
}

export function singleCardByNameSelector(state: CardsState, name: string): Card {
  return singleCardSelector(state, state.cardsbyName[name]);
}

export function cardsByNameSelector(state: CardsState, names: string[]): Card[] {
  return names.map((name) => singleCardByNameSelector(state, name));
}
