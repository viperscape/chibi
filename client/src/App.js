import React, { Component } from 'react';
import './App.css';

import BlogRoll from "./blogroll";
import Login from "./login";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Login />
                <header className="App-main">
                    <BlogRoll/>
                </header>
            </div>
        );
    }
}

export default App;
