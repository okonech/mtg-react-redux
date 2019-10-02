import { loginAsync, logoutAsync, signupAsync } from '../../actions/authActions';
import authReducer, { AuthState } from '../../reducers/authReducer';
import deepFreeze from 'deep-freeze';

let state: AuthState = {
    authError: null
};

it('initial state', () => {
    expect(authReducer(undefined, {} as any)).toEqual(state);
});

it('login errors', () => {
    const err = new Error('login err');
    const action = loginAsync.failure(err);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = authReducer(oldState, action);
    expect(state).toEqual({
        authError: err.message
    });
});

it('logout errors', () => {
    const err = new Error('logout err');
    const action = logoutAsync.failure(err);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = authReducer(oldState, action);
    expect(state).toEqual({
        authError: err.message
    });
});

it('signup errors', () => {
    const err = new Error('signup err');
    const action = signupAsync.failure(err);
    const oldState = { ...state };
    deepFreeze(oldState);
    deepFreeze(action);
    state = authReducer(oldState, action);
    expect(state).toEqual({
        authError: err.message
    });
});
