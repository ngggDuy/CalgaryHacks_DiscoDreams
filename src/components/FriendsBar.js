import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import 'firebase/firestore';

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

    categories() {
        let array = [];
        for(let i = 0, len = this.props.user.friendsList.length; i < len; i++) {
            array.push(this.props.user.friendsList[i]);
        }
        return array;
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