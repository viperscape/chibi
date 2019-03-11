from flask import Flask, request, make_response
from flask import Blueprint
from flask import redirect, url_for
import json
from post import Post

routes = Blueprint('routes', __name__)

@routes.route('/blog/')
def blog():
    #req = request.get_json()
    q = Post.query.limit(5)
    posts = [{"id":post.id, "title": post.title, "body": post.body} for post in q]
    blog = {"posts":posts}
    data = json.dumps(blog)
    resp = make_response(data)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

