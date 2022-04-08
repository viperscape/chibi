import React, { Component } from 'react';
const config = require("./config.json")

class BlogRoll extends Component {
    constructor(props)
    {
        super(props);
        this.state = {blog:[], loading: true, error: null};
    }

    async getBlog()
    {
        try
        {
            let resp = await fetch(config.backend.server + "/blog/");
            resp = await resp.json();
            this.setState({
                blog: resp.posts,
                loading: false
            });
        }
        catch(err)
        {
            console.error(err)
            this.setState({
                error: "Server communication error",
                loading: false
            });
        }
    }

    editPost(post)
    {
        this.props.bus.emit("edit", post);
    }

    newPost()
    {
        this.props.bus.emit("new", true);
    }

    componentDidMount()
    {
        this.getBlog();
    }

    async deletePost(id)
    {
        try
        {
            let resp = await fetch(config.backend.server + "/blog/", {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: id})
            });

            resp = await resp.json();
            console.log(resp)
            this.props.bus.emit("edit", null);
            this.props.bus.emit("new", false);
            this.getBlog();
        }
        catch (err)
        {
            console.error(err)
            this.setState({
                error: "Server communication error",
                loading: false
            });
        }
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
                            <div className="panel u-full-width">
                                {post.title}
                                <div className="u-pull-right">
                                {this.props.auth &&
                                    <button className="button-primary" onClick={() => this.editPost(post)}>Edit</button>
                                }
                                {this.props.auth &&
                                    <button onClick={() => this.deletePost(post.id)}>Delete</button>
                                }
                                </div>
                                <p>{post.body}</p>
                                
                                <div className="u-pull-left">
                                    <p>by <i>{post.author}</i><br></br>
                                    <i>on {post.time}</i></p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default BlogRoll;
