import React, { Component } from 'react';
import './App.css';

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
            authorized: sessionStorage.getItem("authorized"), 
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
            <div className="App">
                <Login bus={bus} auth={this.state.authorized}/>
                <header className="App-main">
                    {(!this.state.edit && !this.state.new) && 
                        <BlogRoll bus={bus} auth={this.state.authorized}/>
                    }
                    {(this.state.edit || this.state.new) &&
                        <Edit bus={bus} post={this.state.edit}/>
                    }
                </header>
            </div>
        );
    }
}

export default App;
