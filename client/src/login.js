import React, { Component } from 'react';
const config = require("./config.json")

const StatusNone = 0,
    StatusLogin = 1,
    StatusAuthorizing = 2,
    StatusAuthorized = 3,
    StatusUnauthorized = 4;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {status: this.props.auth? StatusAuthorized : StatusNone};
        this.user = React.createRef();
        this.password = React.createRef();

        this.showLogin = this.showLogin.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(event)
    {
        fetch(config.backend.server + "/login/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"username": this.user.current.value, "password": this.password.current.value })
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(res) {
            this.props.bus.emit("authorized", res.authorized);
            this.setState({
                status: res.authorized? StatusAuthorized:StatusUnauthorized
            });
        }.bind(this))
        .catch(function(err)
        {
            console.error(err)
            this.setState({
                error: "Server communication error",
                status: StatusUnauthorized
            });
        }.bind(this));
    }

    
    logout(event)
    {
        fetch(config.backend.server + "/logout/", {
            method: "GET",
            credentials: "include"
        })
        .then(function(res) {
            this.props.bus.emit("authorized", false);
            this.setState({
                status: StatusNone
            });
        }.bind(this))
        .catch(function(err)
        {
            console.error(err)
            this.setState({
                error: "Server communication error"
            });
        }.bind(this));
    }

    showLogin(event)
    {
        this.setState({status: StatusLogin})
    }

    render() {
        return (
            <div className="Login">
                {this.state.status === StatusUnauthorized &&
                    <div>
                        <span>Failed to authorize, try again</span>
                        <br></br>
                    </div>
                }
                {(!this.state.status || this.state.status === StatusUnauthorized) && 
                    <button onClick={this.showLogin}>Login Now</button>
                }
                {this.state.status === StatusLogin && 
                    <div>
                        <label>
                            Username:
                            <input ref={this.user}/>
                        </label>
                        <br></br>
                        <label>
                            Password:
                            <input ref={this.password}/>
                        </label>
                        <br></br>
                        <button onClick={this.login}>Login</button>
                    </div>
                }
                {this.state.status === StatusAuthorizing &&
                    <span>Authorizing...</span>
                }
                {this.state.status === StatusAuthorized &&
                    <button onClick={this.logout}>Logout</button>
                }
            </div>
        );
    }
}

export default Login;
