import React, { Component } from 'react';
import './App.css';
import IsolationBar from "../../CalgaryHacks_DiscoDreams/src/components/IsolationBar";
import FriendsBar from "../../CalgaryHacks_DiscoDreams/src/components/FriendsBar";
import {makeUser} from "../../CalgaryHacks_DiscoDreams/functions/index";
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
let user = null;

function App() {
    const [user] = useAuthState(auth);

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

        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
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
            <IsolationBar/>
            <FriendsBar/>
        </div>
    )
}

export default App;
