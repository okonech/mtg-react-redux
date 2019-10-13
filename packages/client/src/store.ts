import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import epics from './epics';
import firebaseConfig from './firebaseConfig';
import logger from 'redux-logger';
import rootReducer, { AppState } from './reducers';

// pass dependencies to each epic
const epicMiddleware = createEpicMiddleware<any, null, AppState>({
    dependencies: { getFirebase, getFirestore }
});

const middlewares = [
    reactReduxFirebase(firebaseConfig, { userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true }),
    reduxFirestore(firebaseConfig)
];

const middleware = process.env.NODE_ENV === 'production' ?
    compose(applyMiddleware(epicMiddleware), ...middlewares) :
    composeWithDevTools(applyMiddleware(logger, epicMiddleware), ...middlewares);

export default createStore(rootReducer, middleware);

epicMiddleware.run(epics);
