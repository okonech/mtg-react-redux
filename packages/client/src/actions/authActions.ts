export type AuthAction = AuthSuccessAction | AuthErrorAction | AuthEpicAction;

type AuthEpicAction = LoginAction | LogoutAction | SignupAction;

export interface LoginAction {
    type: 'LOG_IN';
    payload: LoginData;
}

export interface LogoutAction {
    type: 'LOG_OUT';
    payload: {};
}

export interface SignupAction {
    type: 'SIGN_UP';
    payload: SignUpData;
}

export interface AuthSuccessAction {
    type: 'LOGIN_SUCCESS' | 'SIGNUP_SUCCESS' | 'LOGOUT_SUCCESS';
    payload: {};
}

export interface AuthErrorAction {
    type: 'LOGIN_ERROR' | 'SIGNUP_ERROR' | 'LOGOUT_ERROR';
    payload: {
        err: Error
    };
}

interface LoginData {
    email: string;
    password: string;
}

interface SignUpData {
    username: string;
    email: string;
    password: string;
}

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
        payload: {}
    };
}

export function signupSuccess(): AuthAction {
    return {
        type: 'SIGNUP_SUCCESS',
        payload: {}
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
        payload: {}
    };
}

export function login(form: LoginData): AuthAction {
    const { email, password } = form;
    return {
        type: 'LOG_IN',
        payload: {
            email,
            password
        }
    };
}

export function logout(): AuthAction {
    return {
        type: 'LOG_OUT',
        payload: {}
    };
}

export function signup(form: SignUpData): AuthAction {
    const { username, email, password } = form;
    return {
        type: 'SIGN_UP',
        payload: {
            username,
            email,
            password
        }
    };
}
