import loadingReducer, { loadingSelector, LoadingState } from '../../reducers/loadingReducer';
import { loading, loaded } from '../../actions/loadingActions';
import deepFreeze from 'deep-freeze';


it('initial state', () => {
    expect(loadingReducer(undefined, {} as any)).toEqual(false);
});

it('loading', () => {

    const oldState: LoadingState = false;
    const action = loading();
    deepFreeze(oldState);
    expect(loadingReducer(oldState, action)).toEqual(true);
});

it('loaded', () => {
    const oldState: LoadingState = true;
    const action = loaded();
    deepFreeze(oldState);
    expect(loadingReducer(oldState, action)).toEqual(false);
});

it('select loading status', () => {
    const oldState: LoadingState = true;
    deepFreeze(oldState);
    expect(loadingSelector(oldState)).toEqual(true)
});