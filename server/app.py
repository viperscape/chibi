from flask import Flask
from routes import routes
from db import init_db


app = Flask(__name__)
db = init_db(app, "blog.db")

from post import Post
db.create_all()

post = Post(title="init-post", body="This is an initial post.")
db.session.add(post)

app.register_blueprint(routes)