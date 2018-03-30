import React, { Component } from 'react';
import "./App.css";

class Background extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            deptQuery: props.query
    };

}

componentDidMount() {

    fetch('http://eg.bucknell.edu:48484/q?Semester=Fall&Year=2018&Department=' + this.state.deptQuery)
    .then(results => {
        return results.json();
    }).then(data => {
        let pictures = data.results.map((pic) => {
            return (
                <div key={pic.results}>
                    <img src={pic.picture.medium} />
                </div>
            )
        })
        this.setState({pictures: pictures});
        console.log("state", this.state.pictures);
    })
}

    render() {
        return (

    <div className="container2">
        <div className="container1">
            {this.state.pictures}
        </div>
    </div>
        )
    }
