import { loaded, loading } from '../../actions/loadingActions';
import deepFreeze from 'deep-freeze';
import loadingReducer, { loadingSelector, LoadingState } from '../../reducers/loadingReducer';

it('initial state', () => {
    expect(loadingReducer(undefined, {} as any)).toEqual(true);
});

it('sets loading', () => {

    const oldState: LoadingState = false;
    const action = loading();
    deepFreeze(oldState);
    expect(loadingReducer(oldState, action)).toEqual(true);
});

it('sets loaded', () => {
    const oldState: LoadingState = true;
    const action = loaded();
    deepFreeze(oldState);
    expect(loadingReducer(oldState, action)).toEqual(false);
});

it('selects loading status', () => {
    const oldState: LoadingState = true;
    deepFreeze(oldState);
    expect(loadingSelector(oldState)).toEqual(true);
});
