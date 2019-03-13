import React, { Component } from 'react';
const config = require("./config.json")

const lorem_body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida ullamcorper quam, a tincidunt odio suscipit in. Pellentesque tempus volutpat nulla, eget hendrerit neque. Pellentesque sit amet convallis orci. Cras tempus dui enim, at pretium nibh dignissim eget. Morbi nec risus enim. Sed in orci sit amet enim posuere varius a nec lectus. Ut imperdiet rutrum quam, ac faucibus velit viverra a. Nullam sodales dolor quis sem condimentum mattis. Phasellus quis odio tempor, egestas nulla lacinia, ultrices mi. "
+ "\n\nMaecenas ut erat velit. Phasellus eleifend, dui ut vehicula euismod, leo eros tristique ipsum, eu rutrum nisl risus non eros. Sed vestibulum risus ut sapien bibendum mattis. Pellentesque in libero felis. Sed tincidunt quam sit amet est rhoncus, eget luctus libero bibendum. Etiam elementum eu leo sodales pretium. Maecenas eu nunc lacinia, dignissim mauris sit amet, mattis odio. Nulla et nisl et felis sodales placerat. Etiam hendrerit tortor quam, vitae blandit velit rhoncus vel."

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
                title: "Lorem Ipsum",
                body: lorem_body,
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