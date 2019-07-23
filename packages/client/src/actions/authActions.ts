
export interface AuthAction {
    type: 'LOGIN_ERROR' | 'SIGNUP_ERROR' | 'LOGIN_SUCCESS' | 'SIGNUP_SUCCESS' | 'LOGOUT_ERROR' | 'LOGOUT_SUCCESS';
    payload: {
        err?: Error
    };
}

export type AuthActionType = (err?: Error) => AuthAction;

export function loginError(err: Error): AuthAction {
    return {
        type: 'LOGIN_ERROR',
        payload: {
            err
        }
    };
}

export function signupError(err: Error): AuthAction {
    return {
        type: 'SIGNUP_ERROR',
        payload: {
            err
        }
    };
}

export function loginSuccess(): AuthAction {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
        }
    };
}

export function signupSuccess(): AuthAction {
    return {
        type: 'SIGNUP_SUCCESS',
        payload: {
        }
    };
}

export function signoutError(err: Error): AuthAction {
    return {
        type: 'LOGOUT_ERROR',
        payload: {
            err
        }
    };
}

export function signoutSuccess(): AuthAction {
    return {
        type: 'LOGOUT_SUCCESS',
        payload: {
        }
    };
}
