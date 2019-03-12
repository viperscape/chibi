from flask import Flask, request, make_response, session
from flask import Blueprint
from flask import redirect, url_for
import json
from post import Post
from app import db

routes = Blueprint('routes', __name__)

@routes.route('/blog/', methods=["GET"])
def blogroll():
    q = Post.query.limit(5)
    posts = [{"id":post.id, "title": post.title, "body": post.body} for post in q]
    blog = {"posts":posts}
    return json.dumps(blog)

@routes.route('/blog/', methods=["POST"])
def blogedit():
    if "authorized" in session:
        data = request.get_json()
        p = Post.query.filter_by(id=data["id"]).first()
        p.body = data["body"]
        p.title = data["title"]
        db.session.commit()
        return json.dumps({"ok": "post updated"})
    else:
        return json.dumps({"error": "not authorized"}), 403

@routes.route('/login/', methods=["POST"])
def login():
    req = request.get_json(silent=True)
    if req == None: return json.dumps({"error": "invalid request"}), 400

    if req["username"] == "admin" and req["password"] == "pass":
        session["authorized"] = True
    else:
        session["authorized"] = False

    status = {"authorized": session["authorized"]}
    return json.dumps(status)

@routes.route('/logout/')
def logout():
    if "authorized" in session:
        session.pop("authorized", None)

    return ""