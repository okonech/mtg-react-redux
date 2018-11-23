export interface GameState {
    turn: number;
    currentPlayer: string|undefined;
}

const initialState: GameState = {
    turn: 0,
    currentPlayer: undefined
};

interface GameAction {
    type: string;
}

export default function gameReducer( state: GameState = initialState, action: GameAction) {

    switch (action.type) {
        case 'NEXT_TURN':
            console.log(action);
            return {...state, turn: state.turn++};
        default:
            return state;
    }
}