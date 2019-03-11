import React, { Component } from 'react';
const config = require("./config.json")

class BlogRoll extends Component {
    constructor(props)
    {
        super(props);
        this.state = {blog:[]};
    }

    getBlog()
    {
        return fetch(config.backend.server + "/blog/")
        .then(function(res) {
            return res.json();
        })
        .catch(function(err)
        {
            console.log(err)
        });
    }

    componentDidMount()
    {
        this.getBlog().then(function(res) {
            this.setState({
                blog: res.posts
            });
        }.bind(this));
    }

    render() 
    {
        return (
            <div>
                <span className="Blog-header"><h2>Blog Roll</h2></span>
                <br></br>
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
