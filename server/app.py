from flask import Flask
from db import init_db
from flask_cors import CORS

app = Flask(__name__)
db = init_db(app, "blog.db")
CORS(app, supports_credentials=True)

if __name__ == "__main__":
    try: # setup initial db post
        from routes import routes
        from post import Post
        db.create_all()
        
    except Exception as Error:
        print("init post error", Error)

    app.register_blueprint(routes)

    import os
    app.secret_key = os.urandom(24)
    app.run()