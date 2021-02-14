// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exports.saveUserData = functions.https.onRequest
export function saveUserData(user) {
    let path = "users/" + user.getId();
    let docRef = firestore.doc(path);
    docRef.set({
        id: user.getId(),
        friendsList: user.getFriendsList(),
        responses: user.getResponses(),
        scores: user.getMetrics(),
    }).then( function() {
        console.log("success, glorious!");
    }).catch( function(error) {
        console.log("error");
    });
}

export function makeUser(user, token) {
    let path = "users/" + user.uid;
    let docRef = firestore.doc(path);
    let name, id, friendsList, metrics, responses;

    name = user.displayName;
    id = user.uid;
    docRef.get().then(function (doc) {
        if (doc && doc.exists) {
            const userData = doc.data();
            friendsList = userData.friendsList;
            metrics = userData.scores;
            responses = userData.responses;
        } else {
            friendsList = [];
            metrics = [];
            responses = [];
        }
    })
    let newUser = new User(name, id, friendsList, metrics, responses);
    return newUser;
}

class User {

    name;
    id; // this should be the auth's uid
    friendsList;
    metrics;
    responses;

    constructor(name, id, friendsList, metrics, responses) {
        this.name = name;
        this.id = id;
        this.friendsList = friendsList;
        this.metrics = metrics;
        this.responses = responses;
    }

    getName() {
        return this.name;
    }

    getId()  {
        return this.id;
    }

    getFriendsList() {
        return this.friendsList;
    }

    getMetrics() {
        return this.metrics;
    }

    getResponses() {
        return this.responses;
    }

    setId(newId) {
        this.id = newId;
    }

    setFriendsList(newFriendsList) {
        this.friendsList = newFriendsList;
    }

    setMetrics(newMetrics) {
        this.metrics = newMetrics;
    }

    setResponses(newResponses) {
        this.responses = newResponses;
    }
}

class meterBar {

    point;
    CHANGE_AMOUNT = 5;

    constructor() {
        this.point = 50;
    }

    incVal() {
        this.point += 5;
    }

    decVal() {
        this.point -= 5;
    }

    getCurrentVal()  {
        return this.point;
    }

    // return "RED" or "YELLOW" or "GREEN"
    getColor() {
        if (this.point < 30) {
            return "RED";
        } else if (this.point < 60) {
            return "YELLOW";
        } else {
            return "GREEN";
        }
    }
}


class Survey {

    greenQns = ["How is your day going?", "Any issues you want to talk about?", "If you could live anywhere, where would it be?", "What weird food combinations do you really enjoy?"];
    yellowQns = ["How are you feeling today?", "Anything you want to talk about?", "Any issues you want to talk about?"];
    redQns = ["Are you alive?"];

    responses; // recorded responses here, pass this to machine learning algorithm in the future
    currentMeterBar;

    constructor(bar, moreGreenQns, moreYellowQns, moreRedQns) {
        this.currentMeterBar = bar;
        this.greenQns = this.greenQns.concat(moreGreenQns);
        this.yellowQns = this.greenQns.concat(moreYellowQns);
        this.redQns = this.greenQns.concat(moreRedQns);
    }

    getSurveyQuestions() {
        let color = this.currentMeterBar.getColor();

        if (color === "GREEN") {
            return this.greenQns;
        } else if (color === "YELLOW") {
            return this.yellowQns;
        } else {
            return this.redQns;
        }
    }

    recordResponses(responses) {
        this.responses = responses;
    }

}

const idSave = "randomJSDudeOnFirebase";
const friendsSave = ["", "please", "help", ":("];
const metricsSave = [1,2,3,4,5,6,7,8,9,0];
const responsesSave = ["please help"];

let user = new User(idSave, friendsSave, metricsSave, responsesSave);
saveUserData(user);
