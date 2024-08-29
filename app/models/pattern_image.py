from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy import JSON

class PatternImage(db.Model):
    __tablename__='pattern_images'

    if environment == "production":
        __table_args__={"schema": SCHEMA}

    id=db.Column(db.Integer, primary_key=True)
    pattern_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('patterns.id'), ondelete='CASCADE'), nullable=False)
    urls=db.Column(db.JSON, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    pattern= db.relationship('Pattern', back_populates='pattern_images')

    def __repr__(self):
        return f'PatternImage {self.title}'

    def to_dict(self):
        return {
            'id': self.id,
            'pattern_id': self.pattern_id,
            'urls': self.urls,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
