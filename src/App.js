import React, { Component } from 'react';
import './App.css';

import {User} from "./moodAppClasses"
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import IsolationBar from "./components/IsolationBar";
import FriendsBar from "./components/FriendsBar";

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyBR7BEXnWTScVSoJ5jzoFPfZuqb0tiZkx8",
        authDomain: "friendshipmeter.firebaseapp.com",
        projectId: "friendshipmeter",
        storageBucket: "friendshipmeter.appspot.com",
        messagingSenderId: "719040243429",
        appId: "1:719040243429:web:4b5b111f1f7a07afca960c",
        measurementId: "G-XVTEWPHJYL"
    });
}else {
    firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();
let myUser = new User("temp", "temp@hotmail.com", ["asdf"],[60, 30],[""]); // stub user

export function saveUserData(user, name = null, email = null, friendsList = null,
                             responses = null, scores = null) {
    let path = "users/" + user.getEmail();
    let docRef = firestore.doc(path);
    docRef.set({
        email: email === null? user.getEmail() : email,
        name: name === null? user.getName() : name,
        friendsList: friendsList === null? user.getFriendsList() : friendsList,
        responses: responses === null? user.getResponses() : responses,
        scores: scores === null? user.getMetrics() : scores,
    }).then( function() {
        console.log("success, glorious!");
    }).catch( function(error) {
        console.log(error);
    });
}

function makeUser(user, token) {
    console.log("starting to make user");
    let path = "users/" + user.uid;
    console.log(path);
    let docRef = firestore.doc(path);
    let name, id, friendsList, metrics, responses;

    name = user.displayName;
    id = user.uid;
    docRef.get().then(function (doc) {
        if (doc && doc.exists) {
            console.log("this is True for new users");
            const userData = doc.data();
            friendsList = userData.friendsList;
            metrics = userData.scores;
            responses = userData.responses;
        } else {
            console.log("this is False for new users");
            friendsList = [""];
            metrics = [50];
            responses = [""];
        }
    }).catch( function(error) {
        console.log(error);
    });
    let newUser = new User(name, id, friendsList, metrics, responses);
    saveUserData(newUser);
    return newUser;
}
// comment
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
            // myUser = makeUser(user,token);
            console.log(myUser.getId());
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
            <FriendsBar user = {myUser} fs = {firestore}/>
        </div>
    )
}

export default App;
