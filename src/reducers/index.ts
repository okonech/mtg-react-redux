import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import epics from '../epics';
import cardsReducer, { CardsState } from './cardsReducer';
import gameReducer, { GameState } from './gameReducer';
import loadingReducer, { LoadingState } from './loadingReducer';
import playersReducer, { PlayersState } from './playersReducer';
import zonesReducer, { ZonesState } from './zonesReducer';

export interface AppState {
    cards: CardsState;
    game: GameState;
    isLoading: LoadingState;
    players: PlayersState;
    zones: ZonesState;
}

const reducer = combineReducers({
    cards: cardsReducer,
    game: gameReducer,
    isLoading: loadingReducer,
    players: playersReducer,
    zones: zonesReducer
});

const epicMiddleware = createEpicMiddleware<any, any, AppState>();

const middleware = applyMiddleware(logger, epicMiddleware);

export default createStore(reducer, middleware);

epicMiddleware.run(epics);
