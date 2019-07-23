
import firebase from 'firebase';
import { combineEpics } from 'redux-observable';
import authEpics from './authEpics';
import cardEpics from './cardEpics';
import deckEditorEpics from './deckEditorEpics';
import initPlayers from './initEpics';

export interface FBConfig {
    getFirestore: () => firebase.firestore.Firestore;
    getFirebase: () => typeof firebase;
}

const epics = combineEpics(
    initPlayers,
    authEpics,
    cardEpics,
    deckEditorEpics
);

export default epics;
