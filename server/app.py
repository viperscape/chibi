from flask import Flask
from routes import routes
from db import Database

class App:
    def __init__(self):
        self.app = Flask(__name__)
        self.db = Database(self.app, "blog.db", "schema.sql")
        self.app.register_blueprint(routes)