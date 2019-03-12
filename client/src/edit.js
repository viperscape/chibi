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

        if (this.props.edit) {
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
            this.props.bus.emit("edit", null);
            this.props.bus.emit("new", false);
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
            <div className="Edit-post">
                <div>
                    <span>Editing {this.state.title}</span>
                </div>
                <div>
                    <textarea className="Edit-post-title" value={this.state.title} onChange={this.updateTitle}/>
                </div>
                <div>
                    <textarea className="Edit-post-body" value={this.state.body} onChange={this.updateBody}/>
                </div>
                <div>
                    <button onClick={this.submitPost}>Update post</button>
                </div>
            </div>
        );
    }
}

export default Edit;