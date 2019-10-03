import { AuthAction, loginAsync, logoutAsync, signupAsync } from '../actions/authActions';
import { getType } from 'typesafe-actions';
import produce from 'immer';

// Auth actions. State only stores errors, actual auth is in firebase reducer

export interface AuthState {
    authError: string;
}

const defaultState: AuthState = {
    authError: null
};

export default function authReducer(state: AuthState = defaultState, action: AuthAction) {
    return produce(state, (draft) => {
        switch (action.type) {
            case getType(loginAsync.failure):
            case getType(signupAsync.failure):
            case getType(logoutAsync.failure):
                draft.authError = action.payload.message;
                break;
            default:
                break;
        }
    });
}
