import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Replace this with your own config details
const firebaseConfig = {
    apiKey: 'AIzaSyDt32fw6fJ-1TqnCa_x2rGTF1e__NysrcU',
    authDomain: 'mtg-react-redux.firebaseapp.com',
    databaseURL: 'https://mtg-react-redux.firebaseio.com',
    projectId: 'mtg-react-redux',
    storageBucket: 'mtg-react-redux.appspot.com',
    messagingSenderId: '86366032851',
    appId: '1:86366032851:web:f0afb122530fa557'
};
firebase.initializeApp(firebaseConfig);

export default firebase;
