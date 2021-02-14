import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import {User} from "../moodAppClasses";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import * as db from "@firebase/firestore/dist/exp";

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

function test() {
    let myUser = new User("aaa", "asdf", ["r"],[55],["z"]);
    const friendsBar = FriendsBar(myUser);
    return friendsBar.addFriend("longnguyen2001@gmail.com").then( function() {
        console.log("done");
    });
}
test();
class FriendsBar extends Component {

    constructor(props) {
        super(props);
        const currUser: User = this.props.user;
        let friendList = currUser.getFriendsList();
        this.state = {
            options: {
                title: {
                    text: 'Your Friends',
                    align: "center",
                    margin: 20,
                    style: {
                        fontSize: '25px'
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: friendList,
                }
            },
            series: [{
                name: 'Score',
                data: [40, 30, 65, 65, 90, 80, 30]
            }]
        }
    }

    async addFriend(email: string) {
        let emailArray: string[];

        let path = "users";
        let docRef = firestore.doc(path);
        let documentData = "";
        const doc = await docRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            documentData = doc.data();
            console.log('Document data:', doc.data());
        }

        const user: User = this.props.user;
        let userPath = "users/" + user.getEmail();
        for(let currEmail in emailArray){
            if (email === currEmail) {
                let docRef = firestore.doc(userPath);
                docRef.set({
                    friendsList: user.getFriendsList().push(email),
                }).then(function () {
                    console.log("success, glorious!");
                }).catch(function (error) {
                    console.log("error");
                });
            }
        }

    }



    render() {
        return (
            <React.Fragment>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"
                    height="350"
                    width="100%"
                />
            </React.Fragment>
        );
    }
}

export default FriendsBar;