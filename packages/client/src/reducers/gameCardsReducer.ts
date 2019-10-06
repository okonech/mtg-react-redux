import { addCards, deleteCards, GameCardsAction, moveCards, setCardsFlipped, setCardsTapped, updateCards } from '../actions/gameCardsActions';
import { GameCardPrimitive } from '@mtg-react-redux/models';
import { getType } from 'typesafe-actions';
import produce from 'immer';

// Normalized cards store as object of 
// cards: {unique card id: Card}
// No ids array since full list of cards is never enumerated, only known list of card ids are passed

export interface GameCardsState {
    [id: string]: GameCardPrimitive;
}

const def = {};

export default function gameCardsReducer(state: GameCardsState = def, action: GameCardsAction): GameCardsState {
    return produce(state, (draft) => {
        switch (action.type) {
            case getType(addCards):
            case getType(updateCards):
                action.payload.forEach((card) => draft[card.id] = card);
                break;
            case getType(deleteCards):
                action.payload.forEach((id) => delete draft[id]);
                break;
            case getType(moveCards):
                const { ids, xCoord, yCoord } = action.payload;
                ids.reverse().forEach((cardId, idx) => {
                    draft[cardId].x = xCoord + idx * 10;
                    draft[cardId].y = yCoord + idx * 10;
                    // reset tapped and flipped if switching zones
                    if (action.payload.fromZone !== action.payload.toZone) {
                        draft[cardId].tapped = false;
                        draft[cardId].flipped = false;
                    }
                });
                break;
            case getType(setCardsTapped):
                action.payload.cards.forEach((id) => draft[id].tapped = action.payload.tapped);
                break;
            case getType(setCardsFlipped):
                action.payload.cards.forEach((id) => draft[id].flipped = action.payload.flipped);
                break;
            default:
                break;
        }
    });
}

export function singleGameCardSelector(state: GameCardsState, id: string): GameCardPrimitive {
    return state[id];
}

export function gameCardsSelector(state: GameCardsState, ids: string[]): GameCardPrimitive[] {
    return ids.map((id) => singleGameCardSelector(state, id));
}
