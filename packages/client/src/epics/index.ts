
import { combineEpics } from 'redux-observable';
import authEpics from './authEpics';
import cardEpics from './cardEpics';
import deckEditorEpics from './deckEditorEpics';
import firebase from 'firebase';
import gameInitEpics from './gameInitEpics';

export interface FBConfig {
    getFirestore: () => firebase.firestore.Firestore;
    getFirebase: () => typeof firebase;
}

const epics = combineEpics(
    authEpics,
    cardEpics,
    deckEditorEpics,
    gameInitEpics
);

export default epics;
