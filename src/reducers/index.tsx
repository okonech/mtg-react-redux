import {applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import cardsReducer, {CardsState} from './cardsReducer';
import gameReducer from './gameReducer';
import loadingReducer from './loadingReducer';
import playersReducer, {PlayersState} from './playersReducer';
import zonesReducer, {ZonesState} from './zonesReducer';

export interface AppState {
    cards: CardsState;
    players: PlayersState;
    zones: ZonesState;
    game: any;
    isLoading: boolean;
}

const reducer =  combineReducers({
    players: playersReducer,
    zones: zonesReducer,
    cards: cardsReducer,
    game: gameReducer,
    isLoading: loadingReducer
});


const middleware = applyMiddleware(promise(), thunk, logger);

export default createStore(reducer, middleware);

export const loadingSelector = (state: AppState) => state.isLoading;
