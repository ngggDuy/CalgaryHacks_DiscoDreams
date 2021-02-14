import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import 'firebase/firestore';
import {User} from "../moodAppClasses"
import firebase from "firebase";



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



class FriendsBar extends Component {

    constructor(props) {
        super(props);
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
                    categories: this.categories(),
                    max: 100
                }
            },
            series: [{
                name: 'Score',
                data: this.scoreOfFriends()
            }]
        }
    }
// new
    categories() {
        let array = [];
        for(let i = 0, len = this.props.user.friendsList.length; i < len; i++) {
            array.push(this.props.user.friendsList[i]);
        }
        return array;
    }

    addFriend(email) {

        let path = "users" + email;
        let docRef = firestore.doc(path);

        const doc = docRef.get().then(() => {
            if (doc && doc.exists) {
                const user = this.props.user;
                let userPath = "users/" + user.getEmail();
                let docRef = firestore.doc(userPath);
                let currentFriendsList = this.props.user.getFriendsList();

                if(!currentFriendsList.includes(email)) {
                    docRef.set({
                        friendsList: currentFriendsList.push(email),
                    }).then(function () {
                        console.log("success, glorious!");
                    }).catch(function (error) {
                        console.log("error");
                    });
                }
            } else {
                console.log("No person with this email on our platform")
            }
        });

    }

    scoreOfFriends() {
        let array = [];
        for(let i = 0, len = this.props.user.friendsList.length; i < len; i++) {
            let path = "users/" + this.props.user.friendsList[i];
            let docRef = this.props.fs.doc(path);
            console.log("It gets here");
            docRef.get().then(function (doc) {
                const userData = doc.data();
                console.log("It also gets here");
                let recentScore = userData.scores[userData.scores.length - 1];
                console.log(userData.scores[userData.scores.length - 1]);
 //               let recentScore = 50;
                array.push(recentScore);
                console.log(recentScore);
            }).catch( function(error) {
                console.log("error");
            });
        }
        return array;
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
/*
function test() {
    let myUser = new User("aaa", "asdf", ["r"],[55],["z"]);
    const friendsBar = new FriendsBar(myUser);
    return friendsBar.addFriend("longnguyen2001@gmail.com").then( function() {
        console.log("done");
    });
}
test();
 */