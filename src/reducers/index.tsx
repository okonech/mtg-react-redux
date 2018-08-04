import {combineReducers } from 'redux';
import gameReducer from './gameReducer';
import playersReducer from './playersReducer';

export default combineReducers({
    players: playersReducer,
    game: gameReducer
});