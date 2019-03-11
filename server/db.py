from flask_sqlalchemy import SQLAlchemy

class Database:
    def __init__(self, app, dbfile, schemafile):
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'+dbfile
        self.db = SQLAlchemy(app)
        self.schemafile = schemafile

    def init_db(self):
        with open(self.schemafile, 'r', encoding='utf-8') as schema:
            self.db.executescript(schema.read().decode('utf8'))
