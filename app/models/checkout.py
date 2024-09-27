from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Checkout(db.Model):
    __tablename__ = "checkouts"

    if environment == "production":
        __table_args__ = {'schema' : SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    pattern_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('patterns.id'), ondelete='CASCADE'), nullable=False)
    test_due= db.Column(db.Date, nullable=False)
    test_posted = db.Column(db.String, nullable=False)
    created_at=db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='checkouts')
    patterns = db.relationship('Pattern', secondary='checkout_pattern', back_populates='checkouts')

    def __repr__(self):
        return f'Checkout {self.id}'

    def to_dict(self):
        return {
            'id' : self.id,
            'user_id' : self.user_id,
            'pattern_id' : self.pattern_id,
            'test_due' : self.test_due,
            'created_at' : self.created_at
            # 'patterns' : [pattern.to_dict() for pattern in self.patterns]
        }
