import React, { Component } from 'react';
import Chart from 'react-apexcharts';

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
                    categories: ['1', '2', '3', '4', '5', '6', '7'],
                }
            },
            series: [{
                name: 'Score',
                data: [40, 30, 65, 65, 90, 80, 30]
            }]
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