from flask import Flask, request, make_response, session
from flask import Blueprint
from flask import redirect, url_for
import json
from post import Post

routes = Blueprint('routes', __name__)

def allow_cors(data):
    resp = make_response(data)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@routes.route('/blog/', methods=["GET"])
def blogroll():
    #req = request.get_json()
    q = Post.query.limit(5)
    posts = [{"id":post.id, "title": post.title, "body": post.body} for post in q]
    blog = {"posts":posts}
    return allow_cors(json.dumps(blog))

@routes.route('/blog/', methods=["POST"])
def blogedit():
    return allow_cors("1")

@routes.route('/login/', methods=["POST"])
def login():
    print(request)
    status = {"authorized": session.get("authorized")}
    return allow_cors(json.dumps(status))