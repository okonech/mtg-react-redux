
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer, { AuthState } from './authReducer';
import cardsReducer, { CardsState } from './cardsReducer';
import clickReducer, { ClickState } from './clickReducer';
import deckEditorReducer, { DeckEditorState } from './deckEditorReducer';
import gameCardsReducer, { GameCardsState } from './gameCardsReducer';
import gameReducer, { GameState } from './gameReducer';
import loadingReducer, { LoadingState } from './loadingReducer';
import playersReducer, { PlayersState } from './playersReducer';
import selectReducer, { SelectState } from './selectReducer';
import zonesReducer, { ZonesState } from './zonesReducer';

export interface AppState {
    cards: CardsState;
    game: GameState;
    gameCards: GameCardsState;
    isLoading: LoadingState;
    players: PlayersState;
    zones: ZonesState;
    select: SelectState;
    firestore: any;
    firebase: any;
    auth: AuthState;
    deckEditor: DeckEditorState;
    click: ClickState;
}

export default combineReducers<AppState>({
    cards: cardsReducer,
    game: gameReducer,
    gameCards: gameCardsReducer,
    isLoading: loadingReducer,
    players: playersReducer,
    zones: zonesReducer,
    select: selectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    auth: authReducer,
    deckEditor: deckEditorReducer,
    click: clickReducer
});
