
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import authReducer, { AuthState } from './authReducer';
import cardsGameDataReducer, { CardsGameDataState } from './cardsGameDataReducer';
import cardsReducer, { CardsState } from './cardsReducer';
import cardsSettingsStateReducer, { CardsSettingsState } from './cardsSettingsStateReducer';
import deckEditorReducer, { DeckEditorState } from './deckEditorReducer';
import gameReducer, { GameState } from './gameReducer';
import loadingReducer, { LoadingState } from './loadingReducer';
import playersReducer, { PlayersState } from './playersReducer';
import selectReducer, { SelectState } from './selectReducer';
import zonesReducer, { ZonesState } from './zonesReducer';

export interface AppState {
    cards: CardsState;
    cardsGameData: CardsGameDataState;
    game: GameState;
    isLoading: LoadingState;
    players: PlayersState;
    zones: ZonesState;
    select: SelectState;
    cardsSettingsState: CardsSettingsState;
    firestore: any;
    firebase: any;
    auth: AuthState;
    deckEditor: DeckEditorState;
}

export default combineReducers<AppState>({
    cards: cardsReducer,
    cardsGameData: cardsGameDataReducer,
    game: gameReducer,
    isLoading: loadingReducer,
    players: playersReducer,
    zones: zonesReducer,
    select: selectReducer,
    cardsSettingsState: cardsSettingsStateReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    auth: authReducer,
    deckEditor: deckEditorReducer
});
