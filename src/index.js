
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();/*
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
        /*
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
            */
 /*
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

 */