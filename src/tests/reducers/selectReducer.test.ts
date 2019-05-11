import deepFreeze from 'deep-freeze';
import { selectCards } from '../../actions/selectActions';
import selectReducer, { selectedSelector, SelectState } from '../../reducers/selectReducer';

let state: SelectState = {
    selected: []
};

let selected: string[] = ['1', '2', '3'];

it('initial state', () => {
    expect(selectReducer(undefined, {} as any)).toEqual(state);
});

it('selects cards', () => {
    const action = selectCards(selected);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = selectReducer(oldState, action);
    expect(state).toEqual({
        selected
    });
});

it('selects more cards', () => {
    selected = ['1', '2', '3', '4', '5'];
    const action = selectCards(selected);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = selectReducer(oldState, action);
    expect(state).toEqual({
        selected
    });
});

it('uses selector', () => {
    const oldState = { ...state };
    deepFreeze(oldState);
    expect(selectedSelector(oldState)).toEqual(
        selected
    );
});

it('clears selected cards', () => {
    selected = [];
    const action = selectCards(selected);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = selectReducer(oldState, action);
    expect(state).toEqual({
        selected
    });
});
