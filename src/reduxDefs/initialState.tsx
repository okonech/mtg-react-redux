import * as stateInterface from './stateInterface';

export const initialState: stateInterface.State = {
    players: [],
    game: {
        turn: 0,
        currentPlayer: undefined
    }
};

