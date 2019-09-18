import { GameAction } from '../actions/gameActions';
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
            case 'GAME_NEXT_TURN':
                draft.turn++;
                break;
            case 'GAME_SET_ID':
                draft.id = action.payload.id;
                break;
            case 'GAME_SET_CURRENT_PLAYER':
                draft.currentPlayer = action.payload.id;
                break;
            default:
                break;
        }
    });
}
