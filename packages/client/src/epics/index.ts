
import firebase from 'firebase';
import { combineEpics } from 'redux-observable';
import authEpics from './authEpics';
import initPlayers from './initEpics';

export interface FBConfig {
    getFirestore: () => firebase.firestore.Firestore;
    getFirebase: () => typeof firebase;
}

const epics = combineEpics(
    initPlayers,
    authEpics
);

export default epics;
