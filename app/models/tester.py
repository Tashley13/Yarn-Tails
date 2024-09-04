from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Tester(db.Model):
    __tablename__ = "testers"

    if environment == "production":
        __table_args__= {'schema' : SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    pattern_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('patterns.id'), ondelete='CASCADE'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    image=db.Column(db.String, nullable=False)
    review=db.Column(db.Text, nullable=False)
    # limit = db.Column(db.String, db.ForeignKey(add_prefix_for_prod('patterns.time_limit')), nullable=False)
    # due_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='testers')
    pattern = db.relationship('Pattern', back_populates='testers')


    def __repr__(self):
        return f'Tester {self.id}'

    def to_dict(self):
        return {
            'id' : self.id,
            'user_id' : self.user_id,
            'pattern_id' : self.pattern_id,
            'rating' : self.rating,
            'image' : self.image,
            'review' : self.review,
            'created_at' : self.created_at,
            # 'limit' : self.limit
        }
