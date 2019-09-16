import admin from 'firebase-admin';
import path from 'path';
import { chunk } from './util/array';
import { subset } from './util/card';

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(path.resolve('serviceAccount.json')),
    databaseURL: 'https://mtg-react-redux.firebaseio.com'
});

const firestore = admin.firestore();

const args = process.argv.slice(2);
const jsonData = args[0];
if (jsonData) {
    const json = require(path.resolve(jsonData));
    performBatchWrite(json);
}

async function performBatchWrite(cards) {
    const chunks = chunk(cards, 500);
    for (const cardBatch of chunks) {
        const batch = firestore.batch();
        cardBatch.forEach((card) => {
            const cardSubset = subset(card);
            batch.set(firestore.collection('uniqueCards').doc(cardSubset.id), cardSubset);
        });
        await batch.commit();
        console.log(`Committed ${cardBatch.length}`);
    }
}
