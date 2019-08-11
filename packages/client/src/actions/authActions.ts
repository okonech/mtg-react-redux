import { ActionType, createAsyncAction } from 'typesafe-actions';

interface LoginData {
    email: string;
    password: string;
}

interface SignUpData {
    username: string;
    email: string;
    password: string;
}

export const loginAsync = createAsyncAction(
    'auth/LOGIN',
    'auth/LOGIN_SUCCESS',
    'auth/LOGIN_FAILURE',
    'auth/LOGIN_CANCEL'
)<LoginData, null, Error, string>();

export const signupAsync = createAsyncAction(
    'auth/SIGNUP',
    'auth/SIGNUP_SUCCESS',
    'auth/SIGNUP_FAILURE',
    'auth/SIGNUP_CANCEL'
)<SignUpData, null, Error, string>();

export const logoutAsync = createAsyncAction(
    'auth/LOGOUT',
    'auth/LOGOUT_SUCCESS',
    'auth/LOGOUT_FAILURE',
    'auth/LOGOUT_CANCEL'
)<null, null, Error, string>();

export type AuthAction = ActionType<typeof loginAsync> | ActionType<typeof signupAsync> | ActionType<typeof logoutAsync>;
