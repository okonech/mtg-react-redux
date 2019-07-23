import produce from 'immer';

export interface GameState {
    id: string;
    turn: number;
    currentPlayer: string;
}

const initialState: GameState = {
    id: 'testGame',
    turn: 0,
    currentPlayer: null
};

interface GameAction {
    type: string;
}

export default function gameReducer(state: GameState = initialState, action: GameAction): GameState {

    return produce(state, (draft) => {
        switch (action.type) {
            case 'NEXT_TURN':
                draft.turn++;
                break;
            default:
                break;
        }
    });
}
