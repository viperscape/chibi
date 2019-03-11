import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {authorized: null};
    }

    login(event)
    {
        
    }

    render() {
        return (
            <div className="Login">
                {!this.state.authorized && 
                    <button onClick={this.login}>Login</button>
                }
            </div>
        );
    }
}

export default Login;
