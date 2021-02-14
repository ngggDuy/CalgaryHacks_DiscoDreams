import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { saveUserData } from "../App"
class IsolationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: {
                title: {
                    text: 'Your Isolation Meter',
                    align: "center",
                    margin: 20,
                    style: {
                        fontSize: '25px'
                    }
                },
                labels: [':)']
            },
            series: [props.user.metrics[props.user.metrics.length - 1]]
        }
    }

    onUpClick= () => {
        if(parseInt(this.state.series, 10) < 100) {
            this.setState({series: [parseInt(this.state.series, 10) + 5]});
            if(parseInt(this.state.series, 10) >= 45) {
                this.setState({options: {...this.state.options,
                    labels: [':)']}});
            }
        }
    }

    onDownClick= () => {
        if(parseInt(this.state.series, 10) > 0) {
            this.setState({series: [parseInt(this.state.series, 10) - 5]});
            if(parseInt(this.state.series, 10) < 55) {
                this.setState({options: {...this.state.options,
                        labels: [':(']}});
            }
        }
    }

    onSaveClick= () => {
        window.alert(this.props.user.metrics.length);
        saveUserData(this.props.user, null, null, null, null,  this.props.user.metrics.concat(parseInt(this.state.series, 10)));
        window.alert(this.props.user.metrics.length);
    }

    render() {
        return (
            <React.Fragment>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="radialBar"
                    height="550"
                    width="100%"
                />
                <button  onClick={this.onUpClick}>Up</button>
                <button  onClick={this.onDownClick}>Down</button>
                <button onClick={this.onSaveClick}>Save</button>
            </React.Fragment>
        );
    }
}

export default IsolationBar;