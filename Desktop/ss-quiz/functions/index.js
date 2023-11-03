/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.updateResponse = functions.https.onRequest(async (req, res) => {
    const { questionIndex, choice } = req.body;
    const db = admin.firestore();

    const questionRef = db.collection('chosen').doc(`question${questionIndex}`);

    // Use FieldValue.increment() to atomically update counts
    if (choice === 'Keep the evidence') {
        await questionRef.update({ keep: admin.firestore.FieldValue.increment(1) });
    } else {
        await questionRef.update({ discard: admin.firestore.FieldValue.increment(1) });
    }

    res.json({ status: 'success' });
});

exports.getStatistics = functions.https.onRequest(async (req, res) => {
    const questionIndex = req.query.questionIndex;
    const db = admin.firestore();

    const questionRef = db.collection('quizResponses').doc(`question${questionIndex}`);
    const snapshot = await questionRef.get();
    const data = snapshot.data();

    res.json(data);
});

