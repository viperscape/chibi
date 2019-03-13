import React, { Component } from 'react';
const config = require("./config.json")

class BlogRoll extends Component {
    constructor(props)
    {
        super(props);
        this.state = {blog:[], loading: true, error: null};
    }

    getBlog()
    {
        return fetch(config.backend.server + "/blog/")
        .then(function(res) {
            return res.json();
        })
        .catch(function(err)
        {
            console.error(err)
            this.setState({
                error: "Server communication error",
                loading: false
            });
        }.bind(this));
    }

    editPost(post)
    {
        this.props.bus.emit("edit", post);
    }

    newPost()
    {
        this.props.bus.emit("new", true);
    }

    getPosts()
    {
        this.getBlog().then(function(res) {
            this.setState({
                blog: res.posts,
                loading: false
            });
        }.bind(this));
    }

    componentDidMount()
    {
        this.getPosts();
    }

    deletePost(id)
    {
        fetch(config.backend.server + "/blog/", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id})
        })
        .then(function(res) {
            return res.json();
        })
        .then(function (res){
            console.log(res)
            this.props.bus.emit("edit", null);
            this.props.bus.emit("new", false);
            this.getPosts();
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

    render() 
    {
        return (
            <div className="container u-full-width">
                <h2>Blog Roll</h2>
                {this.props.auth &&
                    <button className="button-primary" onClick={() => this.newPost()}>Add Post</button>
                }

                <div>{this.state.status && <span>Loading...</span>}</div>
                <div>{this.state.error && <span>{this.state.error}</span>}</div>

                <div className="container u-full-width">
                    { this.state.blog.map((post, key) => 
                        <div key={key}>
                            <div className="panel">
                                <p>
                                    {post.title}
                                    <div className="u-pull-right">
                                    {this.props.auth &&
                                        <button className="button-primary" onClick={() => this.editPost(post)}>Edit</button>
                                    }
                                    {this.props.auth &&
                                        <button onClick={() => this.deletePost(post.id)}>Delete</button>
                                    }
                                    </div>
                                </p>
                                <p>{post.body}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default BlogRoll;
