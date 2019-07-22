import produce from 'immer';
import { AuthAction } from '../actions/authActions';

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
            case 'LOGIN_ERROR':
            case 'SIGNUP_ERROR':
            case 'LOGOUT_ERROR':
                draft.authError = action.payload.err.message;
                break;
            case 'LOGIN_SUCCESS':
            case 'SIGNUP_SUCCESS':
            case 'LOGOUT_SUCCESS':
                draft.authError = null;
                break;
            default:
                break;
        }
    });
}
