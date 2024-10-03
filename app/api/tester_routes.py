from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Tester, db, User, Pattern
from datetime import datetime, timezone
from sqlalchemy.orm import selectinload

tester_routes = Blueprint('testers', __name__, url_prefix="/testers")

#get all tests
@tester_routes.route('')
# @login_required
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
            # 'image': tester.image,
            'review': tester.review,
            'test_due' : tester.test_due,
            'test_progress' : tester.test_progress,
            'user': {
                'id': tester.user.id,
                'username': tester.user.username
            } if tester.user else None #only return user if exists
        }
        for tester in testers
    ]}

#get tests by userid
@tester_routes.route('/current/<int:id>')
@login_required
def user_testers(id):
    user_tests = Tester.query.filter_by(user_id=id).options(selectinload(Tester.pattern)).all()
    if not user_tests:
        return {"message" : "You have no patterns to test!"}
    return {'testers': [
            {
            'id': tester.id,
            'user_id': tester.user_id,
            'pattern_id': tester.pattern_id,
            'pattern_title' : tester.pattern.title,
            'time_limit' : tester.pattern.time_limit,
            'rating': tester.rating,
            'test_due' : tester.test_due,
            'test_progress' : tester.test_progress,
            # 'image': tester.image,
            'review': tester.review,
            'created_at' : tester.created_at
        }
        for tester in user_tests
    ]}


#get single test by testId
@tester_routes.route('/<int:testerId>')
@login_required
def single_test_by_id(testerId):
    test = Tester.query.get(testerId)
    if not test:
        return {"message" : "No Test to view here!"}
    return jsonify(test.to_dict())

#update a test
@tester_routes.route('/<int:testerId>', methods=["PUT"])
@login_required
def updated_tester(testerId):
    tester_edit = Tester.query.get(testerId)
    tester_data=request.get_json()
    if not tester_edit or tester_edit.user_id != current_user.id:
        return jsonify({"message" : "No pattern test to edit!"})
    tester_edit.rating=tester_data.get('rating')
    # tester_edit.image=tester_data.get('image')
    tester_edit.review=tester_data.get('review')

    db.session.commit()
    return jsonify(tester_edit.to_dict())


#delete a test
@tester_routes.route('/<int:testerId>', methods=["DELETE"])
@login_required
def delete_tester(testerId):
    delete_tester=Tester.query.get(testerId)
    if not delete_tester or delete_tester.user_id != current_user.id:
        return jsonify({"message" : "No test to delete"})
    db.session.delete(delete_tester)
    db.session.commit()
    return jsonify({"message" : "Tester successfully deleted"})
