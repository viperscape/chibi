from flask import Flask, request, make_response
from flask import Blueprint
from flask import redirect, url_for
import json

routes = Blueprint('routes', __name__)

@routes.route('/blog/')
def blog():
    #req = request.get_json()
    blog = {"posts":[]}
    data = json.dumps(blog)
    resp = make_response(data)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

