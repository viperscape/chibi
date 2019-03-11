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
                <span>Blog Roll</span><br></br>
                <br></br>
                <div>
                    { this.state.blog.map((post, key) => 
                        <div key={key}>
                            <div>{post.title}</div>
                            <div>{post.body}</div><br></br>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default BlogRoll;
