import { addCards, deleteCards, GameCardsAction, updateCards } from '../actions/gameCardsActions';
import { GameCardPrimitive } from '@mtg-react-redux/models';
import { getType } from 'typesafe-actions';
import { MoveCardsAction } from '../actions/zonesActions';
import produce from 'immer';

// Normalized cards store as object of 
// cards: {unique card id: Card}
// No ids array since full list of cards is never enumerated, only known list of card ids are passed

export interface GameCardsState {
    [id: string]: GameCardPrimitive;
}

const def = {};

export default function gameCardsReducer(state: GameCardsState = def, action: GameCardsAction | MoveCardsAction): GameCardsState {
    return produce(state, (draft) => {
        switch (action.type) {
            case getType(addCards):
            case getType(updateCards):
                action.payload.forEach((card) => draft[card.id] = card);
                break;
            case getType(deleteCards):
                action.payload.forEach((card) => delete draft[card.id]);
                break;
            case 'MOVE_CARDS':
                const { ids, xCoord, yCoord } = action.payload;
                ids.reverse().forEach((cardId, idx) => {
                    draft[cardId].x = xCoord + idx * 10;
                    draft[cardId].y = yCoord + idx * 10;
                });
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
