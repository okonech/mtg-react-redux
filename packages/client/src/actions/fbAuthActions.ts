export type FBAuthAction = FBLogin | FBLogout | FBSignup;

interface LoginData {
    email: string;
    password: string;
}

export interface FBLogin {
    type: 'LOG_IN';
    payload: LoginData;
}

export interface FBLogout {
    type: 'LOG_OUT';
    payload: {};
}

interface SignUpData {
    username: string;
    email: string;
    password: string;
}

export interface FBSignup {
    type: 'SIGN_UP';
    payload: SignUpData;
}

export function login(form: LoginData): FBLogin {
    const { email, password } = form;
    return {
        type: 'LOG_IN',
        payload: {
            email,
            password
        }
    };
}

export type login = (form: LoginData) => FBLogin;

export function logout(): FBLogout {
    return {
        type: 'LOG_OUT',
        payload: {}
    };
}

export type logout = () => FBLogout;

export function signup(form: SignUpData): FBSignup {
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

export type signup = (form: SignUpData) => FBSignup;
