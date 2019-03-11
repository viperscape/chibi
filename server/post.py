from app import db

class Post(db.Model):
    title = db.Column(db.String(80), unique=True, nullable=False, primary_key=True)
    body = db.Column(db.String(2048))

    def __repr__(self):
        return "<Title: {}>".format(self.title)