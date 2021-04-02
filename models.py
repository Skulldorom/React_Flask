from flask_sqlalchemy import SQLAlchemy
from app import db
from flask_login import UserMixin
from flask_security import RoleMixin

def create_db():
    db.create_all()
    db.session.commit()

# Create our database model

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    fname = db.Column(db.String(50))
    lname = db.Column(db.String(50))
    telephone = db.Column(db.String(10), unique=True)

    def __init__(self,email,fname,lname,tel,password):
        self.email = email
        self.fname = fname
        self.lname = lname
        self.telephone = tel
        self.password = password

class Rsvp(db.Model):
    __tablename__ = "rsvps"
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), unique=True)
    email = db.Column(db.String(120), unique=True)
    additional_information = db.Column(db.String(255))
    greeting = db.Column(db.String(255))
    events = db.Column(db.String(255))
    guests = db.Column(db.Integer)

    def __init__(self,full_name, email, additional_information, greeting, events, guests):
        self.full_name = full_name
        self.email = email
        self.additional_information = additional_information
        self.greeting = greeting
        self.events = events
        self.guests = guests

    # def __repr__(self):
    #     return '<E-mail %r>' % self.email

    def to_json(self):
        return {
            'fullName': self.full_name,
            'email': self.email,
            'additional_information': self.additional_information,
            'greeting': self.greeting,
            'events':self. events,
            'guests': self.guests,
        }
