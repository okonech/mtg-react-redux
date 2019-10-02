import { GameAction, nextTurn, setCurrentPlayer, setId } from '../actions/gameActions';
import { getType } from 'typesafe-actions';
import produce from 'immer';

export interface GameState {
    id: string;
    turn: number;
    currentPlayer: string;
}

const initialState: GameState = {
    id: null,
    turn: 0,
    currentPlayer: null
};

export default function gameReducer(state: GameState = initialState, action: GameAction): GameState {

    return produce(state, (draft) => {
        switch (action.type) {
            case getType(nextTurn):
                draft.turn++;
                break;
            case getType(setId):
                draft.id = action.payload;
                break;
            case getType(setCurrentPlayer):
                draft.currentPlayer = action.payload;
                break;
            default:
                break;
        }
    });
}
