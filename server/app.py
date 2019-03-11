from flask import Flask
from db import init_db
from flask_cors import CORS

app = Flask(__name__)
db = init_db(app, "blog.db")
CORS(app)

if __name__ == "__main__":
    try: # setup initial db post
        from routes import routes
        from post import Post
        db.create_all()
        p = Post(title="init-post", body="This is an initial post.")
        db.session.add(p)
        db.session.commit()
    except Exception as Error:
        print("init post error", Error)

    app.register_blueprint(routes)

    import os
    app.secret_key = os.urandom(12)
    app.run()