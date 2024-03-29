from flask import request, session
from flask import Blueprint
import json
from models import Post, User
from db import db_session, validate_user

routes = Blueprint('routes', __name__)

@routes.route('/blog/', methods=["GET"])
def blogroll():
    q = Post.query.order_by(Post.id.desc()).limit(5)
    posts = [{
        "id": post.id, 
        "title": post.title, 
        "body": post.body, 
        "author": post.author, 
        "time": post.time_created
        } for post in q]
    blog = {"posts":posts}
    return json.dumps(blog, default=str)

@routes.route('/blog/', methods=["POST"])
def postEdit():
    if "authorized" in session:
        data = request.get_json()
        if not isinstance(data["id"], int):
            return json.dumps({"error": "post id malformed"}), 400

        p = Post.query.filter_by(id=data["id"]).first()
        if p: # edit a previous post (this could be moved out to a separate PUT route)
            p.body = data["body"]
            p.title = data["title"]
        else: # add a new post
            user = User.query.filter_by(email=session["email"]).first()
            if user:
                p = Post(title=data["title"], body=data["body"], author=user.username)
                db_session.add(p)
            else:
                return json.dumps({"error": "not authorized"}), 403

        db_session.commit()
        return json.dumps({"ok": "post updated"})
        
            
    else:
        return json.dumps({"error": "not authorized"}), 403

@routes.route('/blog/', methods=["DELETE"])
def postDelete():
    if "authorized" in session:
        data = request.get_json()
        if not isinstance(data["id"], int):
            return json.dumps({"error": "post id malformed"}), 400

        p = Post.query.filter_by(id=data["id"]).delete()
        if not p: # no post found
            return json.dumps({"error": "post not found"}), 404

        db_session.commit()
        return json.dumps({"ok": "post updated"})
    else:
        return json.dumps({"error": "not authorized"}), 403

@routes.route('/login/', methods=["POST"])
def login():
    try:
        r = request.get_json(silent=True)
        session["authorized"] = validate_user(r["email"], r["password"])

        if session["authorized"]:
            session["email"] = r["email"]
            status = {"authorized": session["authorized"]}
            return json.dumps(status)
        else:
            return json.dumps({"error": "not authorized"}), 403
    except:
        return json.dumps({"error": "invalid request"}), 400
    

@routes.route('/logout/')
def logout():
    session.pop("authorized", None)

    return ""