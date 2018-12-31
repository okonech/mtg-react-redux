import produce from 'immer';

export interface GameState {
    turn: number;
    currentPlayer: string | undefined;
}

const initialState: GameState = {
    turn: 0,
    currentPlayer: undefined
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
        }
    });
}
