from app import db as base

class Post(base.Model):
    id = base.Column(base.Integer, primary_key=True)
    title = base.Column(base.String(80), unique=True, nullable=False)
    body = base.Column(base.String(2048))

    def __repr__(self):
        return "<Title: {}>".format(self.title)