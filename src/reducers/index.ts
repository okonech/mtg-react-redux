
import { combineReducers } from 'redux';
import cardsReducer, { CardsState } from './cardsReducer';
import cardsSettingsStateReducer, { CardsSettingsState } from './cardsSettingsStateReducer';
import gameReducer, { GameState } from './gameReducer';
import loadingReducer, { LoadingState } from './loadingReducer';
import playersReducer, { PlayersState } from './playersReducer';
import selectReducer, { SelectState } from './selectReducer';
import zonesReducer, { ZonesState } from './zonesReducer';

export interface AppState {
    cards: CardsState;
    game: GameState;
    isLoading: LoadingState;
    players: PlayersState;
    zones: ZonesState;
    select: SelectState;
    cardsSettingsState: CardsSettingsState;
}

export default combineReducers<AppState>({
    cards: cardsReducer,
    game: gameReducer,
    isLoading: loadingReducer,
    players: playersReducer,
    zones: zonesReducer,
    select: selectReducer,
    cardsSettingsState: cardsSettingsStateReducer
});
