import React, { Component } from 'react';
import "./skeleton/normalize.css";
import './skeleton/skeleton.css';
import "./App.css";

import BlogRoll from "./blogroll";
import Login from "./login";
import Edit from "./edit";

const EventEmitter = require('events');
const bus = new EventEmitter();

class App extends Component {
    constructor(props) {
        super(props);
        // NOTE we store the authorized state in sessionStorage so it matches up
        // with the server's session, this is really out of convenience
        // and only so that the react components reflect that on page refreshes
        this.state = {
            authorized: sessionStorage.getItem("authorized") === "true" ? true:false, 
            edit: null,
            new: false
        };

        // handle up-states
        bus.on("authorized", function (x) {
            this.setState({authorized: x});
            sessionStorage.setItem("authorized", x);
        }.bind(this) );
        bus.on("edit", function (x) { this.setState({edit: x}) }.bind(this) );
        bus.on("new", function (x) { this.setState({new: x}) }.bind(this) );
    }

    render() {
        return (
            <div className="container">
                <div className="section login">
                    <Login bus={bus} auth={this.state.authorized}/>
                </div>
                {(!this.state.edit && !this.state.new) && 
                <div className="section blogroll">
                    <BlogRoll bus={bus} auth={this.state.authorized}/>
                </div>
                }
                {(this.state.edit || this.state.new) &&
                <div className="section edit">
                    <Edit bus={bus} post={this.state.edit}/>
                </div>
                }
            </div>
        );
    }
}

export default App;
