import React, { Component } from 'react';
import './App.css';

import BlogRoll from "./blogroll";
import Login from "./login";

const EventEmitter = require('events');
const bus = new EventEmitter();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {authorized: false};
        bus.on("authorized", function (x) { this.setState({authorized: x}) }.bind(this) );
    }

    render() {
        return (
            <div className="App">
                <span>{this.state.authorized && <span>authorized</span>}</span>
                <Login bus={bus}/>
                <header className="App-main">
                    <BlogRoll/>
                </header>
            </div>
        );
    }
}

export default App;
