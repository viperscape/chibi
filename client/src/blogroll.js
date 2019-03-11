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

    componentDidMount()
    {
        this.getBlog().then(function(res) {
            this.setState({
                blog: res.posts,
                loading: false
            });
        }.bind(this));
    }

    render() 
    {
        return (
            <div>
                <span className="Blog-header"><h2>Blog Roll</h2></span>
                <div>{this.state.status && <span>Loading...</span>}</div>
                <div>{this.state.error && <span>{this.state.error}</span>}</div>

                <div className="Blog-posts">
                    { this.state.blog.map((post, key) => 
                        <div key={key} className="Blog-post">
                            <div className="Blog-post-title">{post.title}</div>
                            <div>{post.body}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default BlogRoll;
