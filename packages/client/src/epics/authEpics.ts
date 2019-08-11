import { combineEpics } from 'redux-observable';
import { Epic } from 'redux-observable';
import { forkJoin, from, of, pipe } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { loginAsync, logoutAsync, signupAsync } from '../actions/authActions';
import { AppState } from '../reducers';
import { FBConfig } from './index';

// config has getFirebase and getFirestore functions
const signup: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
    action$
        .pipe(
            filter(isActionOf(signupAsync.request)),
            // create disposable stream to catch errors but keep observable
            switchMap((action) =>
                forkJoin(
                    from(config.getFirebase().auth().createUserWithEmailAndPassword(
                        action.payload.email,
                        action.payload.password
                    )),
                    of(action)
                )
                    .pipe(
                        switchMap(([response, act]) =>
                            config.getFirestore().collection('users').doc(response.user.uid).set({
                                username: act.payload.username
                            })
                        ),
                        map(signupAsync.success),
                        catchError(pipe(signupAsync.failure, of)),
                        takeUntil(action$.pipe(filter(isActionOf(signupAsync.cancel))))
                    )
            )
        );

const login: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
    action$
        .pipe(
            filter(isActionOf(loginAsync.request)),
            // create disposable stream to catch errors but keep observable
            switchMap((act) =>
                of(act)
                    .pipe(
                        switchMap((action) =>
                            from(config.getFirebase().auth().signInWithEmailAndPassword(
                                action.payload.email,
                                action.payload.password
                            ))
                        ),
                        map(loginAsync.success),
                        catchError(pipe(loginAsync.failure, of)),
                        takeUntil(action$.pipe(filter(isActionOf(loginAsync.cancel))))
                    )
            )
        );

const logout: Epic<any, any, AppState> = (action$, $state, config: FBConfig) =>
    action$
        .pipe(
            filter(isActionOf(logoutAsync.request)),
            // create disposable stream to catch errors but keep observable
            switchMap((action) =>
                of(action)
                    .pipe(
                        switchMap(() =>
                            config.getFirebase().auth().signOut()
                        ),
                        map(logoutAsync.success),
                        catchError(pipe(logoutAsync.failure, of)),
                        takeUntil(action$.pipe(filter(isActionOf(logoutAsync.cancel))))
                    )
            )
        );

const authEpics = combineEpics(
    signup,
    login,
    logout
);

export default authEpics;
