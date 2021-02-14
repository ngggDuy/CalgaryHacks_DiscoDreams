import React, { useState } from 'react';
import './App.css';
import IsolationBar from "../../CalgaryHacks_DiscoDreams/src/components/IsolationBar";
import FriendsBar from "../../CalgaryHacks_DiscoDreams/src/components/FriendsBar";
import {User} from "./moodAppClasses"
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

const auth = firebase.auth();
const firestore = firebase.firestore();
let myUser = new User("temp", "temp@hotmail.com", [""],[0],[""]); // stub user

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

// https://stackoverflow.com/questions/46240647/react-how-to-force-a-function-component-to-render
// function to force the react function component to rerender
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}



function makeUser(user, token) {
    console.log("starting to make user");
    let path = "users/" + user.uid;
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
            metrics = [33];
            responses = [""];
        }

        console.log("finished parsing Fields");
        myUser = new User(name, id, friendsList, metrics, responses);
        console.log("finished making User");
        console.log(myUser.getId());

    }).catch( function(error) {
        console.log(error);
    });
}

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
            // makeUser(user,token);

        }).then(() => {
            saveUserData(myUser);
        }).then(() => {
            // useForceUpdate();
            console.log("forcing update");
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

export default App;
