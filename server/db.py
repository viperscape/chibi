from sqlalchemy import create_engine, exc
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import bcrypt

engine = create_engine('sqlite:///blog.db')
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()


def init_db():
    from models import Post, User  # import models for sql to create
    Base.metadata.create_all(bind=engine)

    create_admin()


def create_admin():
    from models import User
    username = "admin"
    password = "pass"
    email = "admin@example.com"
    print("Login:", email, password)
    user = User.query.filter_by(username=username).first()
    if not user:
        create_user(username, password, email)


def create_user(username, password, email):
    from models import User
    # NOTE password max len is 72 char
    hash_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt(14))
    user = User(username=username, password=hash_password, email=email)

    try:
        db_session.add(user)
        db_session.commit()
    except exc.DatabaseError as error:
        print("Create User Error:", error.orig)

def validate_user(email, password):
    from models import User
    user = User.query.filter_by(email=email).first()
    return (user != None) and bcrypt.checkpw(password.encode("utf-8"), user.password)