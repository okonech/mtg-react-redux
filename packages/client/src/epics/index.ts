
import { combineEpics } from 'redux-observable';
import authEpics from './authEpics';
import cardEpics from './cardEpics';
import deckEditorEpics from './deckEditorEpics';
import firebase from 'firebase';
import gameCardEpics from './gameCardEpics';
import gameInitEpics from './gameInitEpics';

export interface FBConfig {
    getFirestore: () => firebase.firestore.Firestore;
    getFirebase: () => typeof firebase;
}

const epics = combineEpics(
    authEpics,
    cardEpics,
    gameCardEpics,
    deckEditorEpics,
    gameInitEpics
);

export default epics;
