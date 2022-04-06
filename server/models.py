from sqlalchemy import Column, Integer, String
from db import Base

class Post(Base):
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True)
    title = Column(String(80), unique=True, nullable=False)
    body = Column(String(2048))

    def __repr__(self):
        return "<Title: {}>".format(self.title)


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    password = Column(String(60), nullable=False)
    email = Column(String(80), unique=False, nullable=False)

    def __repr__(self):
        return "<Username: {}>".format(self.username)