// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBR7BEXnWTScVSoJ5jzoFPfZuqb0tiZkx8",
    authDomain: "friendshipmeter.firebaseapp.com",
    projectId: "friendshipmeter",
    storageBucket: "friendshipmeter.appspot.com",
    messagingSenderId: "719040243429",
    appId: "1:719040243429:web:4b5b111f1f7a07afca960c",
    measurementId: "G-XVTEWPHJYL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

// // for testing purposes. Comment out after finishing tests.
// const idText = document.getElementById("idText");
// const friendsText = document.getElementById("friendsText");
// const metricsText = document.getElementById("metricsText");
// const responsesText = document.getElementById("responsesText");
// const saveButton = document.getElementById("saveButton");
//
// saveButton.addEventListener("click", function() {
//     const idSave = "someUserName";
//     const friendsSave = ["", "please", "help", ":("];
//     const metricsSave = [1,2,3,4,5,6,7,8,9,0];
//     const responsesSave = ["please help"];
//
//     let user: any = new User(idSave, friendsSave, metricsSave, responsesSave);
//     saveUserData(user);
// });



function saveUserData(user) {
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

function getUserData(user) {

}




// TODO: find out how we can swap this for google authentication
function authenticateUser(username, password) {
    // assume this shit works.

}

class User {

    // private name: string;
    id; // this should be the auth's uid
    friendsList;

    metrics;
    responses;

    constructor(id, friendsList, metrics, responses) {
        this.id = id;
        this.friendsList = friendsList;
        this.metrics = metrics;
        this.responses = responses;
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

// const idSave = "randomJSDude";
// const friendsSave = ["", "please", "help", ":("];
// const metricsSave = [1,2,3,4,5,6,7,8,9,0];
// const responsesSave = ["please help"];
//
// let user = new User(idSave, friendsSave, metricsSave, responsesSave);
// saveUserData(user);