from flask import Flask, request, make_response
from flask import redirect, url_for
import json

app = Flask(__name__)

# ignoreme: static files for debugging
# app = Flask(__name__, static_folder='static', static_url_path='')
# @app.route('/<path:path>')
#def static_file(path):
#    return app.send_static_file(path)

@app.route('/blog/')
def index():
    req = request.get_json()
    blog = {"posts":[{"title":"post1", "body": "sometext"}, {"title":"post2", "body": "alsosometext"}]}
    data = json.dumps(blog)
    resp = make_response(data)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp