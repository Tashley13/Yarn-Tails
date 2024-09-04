from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Tester, db, User, Pattern
from datetime import datetime, timezone
from sqlalchemy.orm import selectinload

tester_routes = Blueprint('testers', __name__, url_prefix="/testers")

#get all pattern tests
@tester_routes.route('')
def all_testers():
    testers=Tester.query.options(selectinload(Tester.user)).all()
    if not testers:
        return {"message" : "No testers for patterns."}
    return { 'testers' : [
        {
            'id': tester.id,
            'user_id': tester.user_id,
            'pattern_id': tester.pattern_id,
            'rating': tester.rating,
            'image': tester.image,
            'review': tester.review,
            'user': {
                'id': tester.user.id,
                'username': tester.user.username
            } if tester.user else None #only return user if exists
        }
        for tester in testers
    ]}

#get review by id
@tester_routes.route('/<int:id>')
def user_testers(id):
    user_tests = Tester.query.filter_by(user_id=id).all()
    if not user_tests:
        return {"message" : "You have no patterns to test!"}
    return {'testers': [
            {
            'id': tester.id,
            'user_id': tester.user_id,
            'pattern_id': tester.pattern_id,
            'rating': tester.rating,
            'image': tester.image,
            'review': tester.review
        }
        for tester in user_tests
    ]}


#create a review based on patternId
# @tester_routes.route('/new', methods={"POST"})

# def create_tester():
#     user_id=current_user.id
#     data=request.get_json()

#     new_tester= Tester(
#         user_id=user_id,

#     )
