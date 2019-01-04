import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import epics from './epics';
import rootReducer, { AppState } from './reducers';

const epicMiddleware = createEpicMiddleware<any, null, AppState>();

const middleware = process.env.NODE_ENV === 'production' ?
    applyMiddleware(epicMiddleware) :
    composeWithDevTools(applyMiddleware(logger, epicMiddleware));

export default createStore(rootReducer, middleware);

epicMiddleware.run(epics);
