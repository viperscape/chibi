from flask import Flask
from db import init_db, db_session
from flask_cors import CORS
from routes import routes

app = Flask(__name__)
init_db()
CORS(app, supports_credentials=True)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == "__main__":
    app.register_blueprint(routes)

    import os
    app.secret_key = os.urandom(24)
    app.run()