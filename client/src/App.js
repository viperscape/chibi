import React, { Component } from 'react';
import './App.css';

import BlogRoll from "./blogroll";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <BlogRoll/>
                </header>
            </div>
        );
    }
}

export default App;
