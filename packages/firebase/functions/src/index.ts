import * as functions from 'firebase-functions';

import * as express from 'express';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    console.log('hello');
    response.send('Hello from Firebase!');
});
