from sqlalchemy import Column, Integer, String
from db import Base

class Post(Base):
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True)
    title = Column(String(80), unique=True, nullable=False)
    body = Column(String(2048))

    def __repr__(self):
        return "<Title: {}>".format(self.title)