
import { combineReducers } from 'redux';
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

export default combineReducers<AppState>({
    cards: cardsReducer,
    game: gameReducer,
    isLoading: loadingReducer,
    players: playersReducer,
    zones: zonesReducer
});
