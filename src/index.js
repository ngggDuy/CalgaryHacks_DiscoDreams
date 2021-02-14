// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();

exports.trimResults = functions.firestore
    .document("users/{email}")
    .oncreate((snapshot, context) => {
        const data = snapshot.data();
        if (data) {
            if (data.scores.length > 7) { // limit to 7 elements
                let newScores = data.scores;
                let num = data.scores.length - 7;
                while (num > 0) {
                    newScores = newScores.shift();
                    num = num - 1;
                }
                snapshot.ref.update({scores: newScores});
            }

            // if (data.scores.responses > 7) { // im not sure this is even needed. Comment out if redundant
            //     let newResponses = data.responses;
            //     let num = data.responses.length - 7;
            //     while (num > 0) {
            //         newResponses = newResponses.shift();
            //         num = num - 1;
            //     }
            //
            //     snapshot.ref.update({scores: newResponses});
            // }
        }
    }).catch(function(error) {console.log(error)});