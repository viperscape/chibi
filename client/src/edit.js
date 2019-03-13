import React, { Component } from 'react';
const config = require("./config.json")

class Edit extends Component 
{
    constructor(props) 
    {
        super(props);
        this.submitPost = this.submitPost.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateBody = this.updateBody.bind(this);

        if (this.props.post) {
            this.state = {
                title: this.props.post.title,
                body: this.props.post.body,
                id: this.props.post.id
            };
        }
        else {
            this.state = {
                title: "title here",
                body: "some stuff here",
                id: -1
            };
        }

        this.reset = function() {
            this.props.bus.emit("edit", null);
            this.props.bus.emit("new", false);
        }.bind(this);
    }

    submitPost()
    {
        fetch(config.backend.server + "/blog/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(function(res) {
            return res.json();
        })
        .then(function (res){
            if (res.error) this.props.bus.emit("authorized", false);
            this.reset();
        }.bind(this))
        .catch(function(err)
        {
            console.error(err)
            this.setState({
                error: "Server communication error",
                loading: false
            });
        }.bind(this));
    }

    updateTitle(event)
    {
        this.setState({title: event.target.value})
    }

    updateBody(event)
    {
        this.setState({body: event.target.value})
    }

    render()
    {
        return (
            <div className="container u-full-width">
                <div>
                    {this.props.post &&
                    <span>Editing: <strong>{this.props.post.title}</strong></span>
                    }
                    {!this.props.post &&
                    <span>Creating New Post</span>
                    }
                </div>
                <div>
                    <textarea className="five columns" value={this.state.title} onChange={this.updateTitle}/>
                </div>
                <div>
                    <textarea className="Post-body" value={this.state.body} onChange={this.updateBody}/>
                </div>
                <div>
                    <button className="button-primary" onClick={this.submitPost}>Submit</button>
                    <button onClick={this.reset}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default Edit;