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
            <div>
                <span className="Blog-header"><h2>Blog Roll</h2></span>
                <button onClick={() => this.newPost()}>Add Post</button>

                <div>{this.state.status && <span>Loading...</span>}</div>
                <div>{this.state.error && <span>{this.state.error}</span>}</div>

                <div className="Blog-posts">
                    { this.state.blog.map((post, key) => 
                        <div key={key} className="Blog-post">
                            {this.props.auth &&
                                <div className="Blog-post-edit-btn">
                                    <button onClick={() => this.editPost(post)}>Edit</button>
                                </div>
                            }
                            {this.props.auth &&
                                <div className="Blog-post-delete-btn">
                                    <button onClick={() => this.deletePost(post.id)}>Delete</button>
                                </div>
                            }
                            <div className="Blog-post-title">{post.title}</div>
                            
                            <div className="Blog-post-body">{post.body}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default BlogRoll;
