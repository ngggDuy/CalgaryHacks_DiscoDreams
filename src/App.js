import React, { Component } from 'react';
import './App.css';
import IsolationBar from "../../CalgaryHacks_DiscoDreams/src/components/IsolationBar";
import FriendsBar from "../../CalgaryHacks_DiscoDreams/src/components/FriendsBar";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyBR7BEXnWTScVSoJ5jzoFPfZuqb0tiZkx8",
    authDomain: "friendshipmeter.firebaseapp.com",
    projectId: "friendshipmeter",
    storageBucket: "friendshipmeter.appspot.com",
    messagingSenderId: "719040243429",
    appId: "1:719040243429:web:4b5b111f1f7a07afca960c",
    measurementId: "G-XVTEWPHJYL"
})

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

const auth = firebase.auth();
const firestore = firebase.firestore();
let myUser = new User("aaa", "asdf", ["r"],[50],["z"]);

function App() {
    const [user] = useAuthState(auth);
    //this.user
    return (
        <div className="container">
            <header>
                <SignOut/>
            </header>

            <section>
                {user ? <Interface/> : <SignIn />}
            </section>
        </div>
    );
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            let credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            //
            this.user = makeUser(user,token);
            console.log(this.user.getId());
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
        });
    }

    return (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
}

function SignOut() {
    return auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
    )
}

function Interface() {
    return (
        <div className="container">
            <IsolationBar user = {myUser}/>
            <FriendsBar user = {myUser}/>
        </div>
    )
}

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

function makeUser(user, token) {
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
            metrics = [50];
            responses = [];
        }
    }).catch( function(error) {
        console.log("error");
    });
    let newUser = new User(name, id, friendsList, metrics, responses);
    return newUser;
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

export default App;
