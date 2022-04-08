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
        this.state = {status: this.props.auth? StatusAuthorized : StatusNone}; // on page refresh, keep auth status
        this.email = React.createRef();
        this.password = React.createRef();

        this.showLogin = this.showLogin.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async login(event)
    {
        event.preventDefault() // NOTE prevents a refresh of the page during a POST in a fetch

        if (!this.email.current.value || !this.password.current.value)
            return;

        this.setState({
            status: StatusAuthorizing
        });
        try
        {
            let resp = await fetch(config.backend.server + "/login/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: this.email.current.value, 
                    password: this.password.current.value 
                })
            });

            resp = await resp.json();
            this.props.bus.emit("authorized", resp.authorized);
            this.setState({
                status: resp.authorized? StatusAuthorized:StatusUnauthorized
            });
        }
        catch (err)
        {
            console.error(err)
            this.setState({
                error: "Server communication error",
                status: StatusNone
            });
        }
    }

    
    logout(event)
    {
        this.props.bus.emit("authorized", false);
        fetch(config.backend.server + "/logout/", {
            method: "GET",
            credentials: "include"
        })
        .then((res) => {
            this.setState({
                status: StatusNone
            });
        })
        .catch((err) =>
        {
            console.error(err)
            this.setState({
                error: "Server communication error"
            });
        });
    }

    showLogin(event)
    {
        this.setState({status: StatusLogin})
    }

    render() {
        return (
            <div className="container">
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
                    <form>
                        <div className="row u-pull-left">
                            <div className="six columns">
                            <label>Email</label>
                            <input className="u-full-width" ref={this.email} type="email" placeholder="john.doe@website.com"/>
                            </div>

                            <div className="six columns">
                            <label>Password</label>
                            <input className="u-full-width" ref={this.password} type="password" />
                            </div>
                        </div>
                        <button className="button-primary u-pull-right" onClick={this.login}>Login</button>
                    </form>
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
