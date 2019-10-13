import { nextTurn, setCurrentPlayer, setId } from '../../actions/gameActions';
import deepFreeze from 'deep-freeze';
import gameReducer, { GameState } from '../../reducers/gameReducer';

const state: GameState = {
    id: null,
    turn: 0,
    currentPlayer: null
};

it('initial state', () => {
    expect(gameReducer(undefined, {} as any)).toEqual(state);
});

it('sets id', () => {
    const oldState = { ...state };
    const action = setId('111');
    deepFreeze(oldState);
    expect(gameReducer(oldState, action)).toEqual({
        ...oldState,
        id: '111'
    });
});

it('sets next turn', () => {
    const oldState = { ...state };
    const action = nextTurn();
    deepFreeze(oldState);
    expect(gameReducer(oldState, action)).toEqual({
        ...oldState,
        turn: 1
    });
});

it('sets current player', () => {
    const oldState = { ...state };
    const action = setCurrentPlayer('aaa');
    deepFreeze(oldState);
    expect(gameReducer(oldState, action)).toEqual({
        ...oldState,
        currentPlayer: 'aaa'
    });
});
