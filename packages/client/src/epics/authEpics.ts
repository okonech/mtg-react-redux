import { combineEpics } from 'redux-observable';
import { Epic } from 'redux-observable';
import { forkJoin, from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { loginError, loginSuccess, signoutSuccess, signupError, signupSuccess } from '../actions/authActions';
import { FBLogin, FBLogout, FBSignup } from '../actions/fbAuthActions';
import { AppState } from '../reducers';
import { FBConfig } from './index';

// config has getFirebase and getFirestore functions
const signup: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
    action$
        .ofType('SIGN_UP')
        .pipe(
            // create disposable stream to catch errors but keep observable
            switchMap((act: FBSignup) =>
                of(act)
                    .pipe(
                        switchMap((action: FBSignup) =>
                            forkJoin(
                                from(config.getFirebase().auth().createUserWithEmailAndPassword(
                                    action.payload.email,
                                    action.payload.password
                                )),
                                of(action)
                            )
                        ),
                        switchMap(([response, action]) =>
                            config.getFirestore().collection('users').doc((response).user.uid).set({
                                username: action.payload.username
                            })
                        ),
                        switchMap(() => of(
                            signupSuccess()
                        )),
                        catchError((error) => of(
                            signupError(error)
                        ))
                    )
            )
        );

const login: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
    action$
        .ofType('LOG_IN')
        .pipe(
            // create disposable stream to catch errors but keep observable
            switchMap((act: FBLogin) =>
                of(act)
                    .pipe(
                        switchMap((action: FBLogin) =>
                            from(config.getFirebase().auth().signInWithEmailAndPassword(
                                action.payload.email,
                                action.payload.password
                            ))
                        ),
                        switchMap(() => of(
                            loginSuccess()
                        )),
                        catchError((error) => of(
                            loginError(error)
                        ))
                    )
            )
        );

const logout: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
    action$
        .ofType('LOG_OUT')
        .pipe(
            // create disposable stream to catch errors but keep observable
            switchMap((act: FBLogout) =>
                of(act)
                    .pipe(
                        switchMap((action: FBLogout) =>
                            config.getFirebase().auth().signOut()
                        ),
                        switchMap(() => of(
                            signoutSuccess()
                        )),
                        catchError((error) => of(
                            loginError(error)
                        ))
                    )
            )
        );

const authEpics = combineEpics(
    signup,
    login,
    logout
);

export default authEpics;
