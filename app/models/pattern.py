from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Notebook(db.Model):
    __tablename__="patterns"

    if environment == "production":
        __table_args__= {'schema' : SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    title=db.Column(db.String(100), nullable=False)
    difficulty=db.Column(db.String, nullable=False)
    time=db.Column(db.String, nullable=False)
    time_limit=db.Column(db.String, nullable=False)
    description=db.Column(db.Text, nullable=False)
    materials_instrument=db.Column(db.String, nullable=False)
    materials_instrument_size=db.Column(db.String, nullable=True)
    materials_yarn_weight=db.Column(db.String, nullable=False)
    materials_yardage=db.Column(db.Integer, nullable=False)
    pattern=db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user= db.relationship('User', back_populates='patterns')

    def _repr_(self):
        return f'Pattern {self.title}'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id
            'title': self.title,
            'difficulty': self.difficulty,
            'time': self.time,
            'time_limit': self.time_limit,
            'description': self.description,
            'pattern': self.pattern,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
