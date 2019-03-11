from flask_sqlalchemy import SQLAlchemy


def init_db(app, dbfile):
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///{}".format(dbfile)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db = SQLAlchemy(app)
    return db