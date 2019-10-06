import { ActionsObservable, Epic, StateObservable } from 'redux-observable';
import { AppState } from '../reducers';

export function forkEpic(epicFactory: Epic, $state: StateObservable<AppState>, dependencies: any, action) {
    const action$ = ActionsObservable.of(action);
    return epicFactory(action$, $state, dependencies);
}
