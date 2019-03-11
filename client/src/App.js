import React, { Component } from 'react';
import './App.css';

import BlogRoll from "./blogroll";
import Login from "./login";

const EventEmitter = require('events');
const bus = new EventEmitter();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {authorized: true};
        bus.on("authorized", function (x) { this.setState({authorized: x}) }.bind(this) );
    }

    render() {
        return (
            <div className="App">
                <Login bus={bus} auth={this.state.authorized}/>
                <header className="App-main">
                    <BlogRoll auth={this.state.authorized}/>
                </header>
            </div>
        );
    }
}

export default App;
