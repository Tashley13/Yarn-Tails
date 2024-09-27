from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Checkout, Pattern, db
from datetime import datetime, timezone
from sqlalchemy.orm import selectinload

checkout_routes = Blueprint('checkouts', __name__, url_prefix="/checkout")

#get all patterns at checkout
@checkout_routes.route('/<int:user_id>')
@login_required
def user_checkout_patterns(user_id):
    checkouts=Checkout.query.filter_by(user_id=current_user.id).options(
        selectinload(Checkout.patterns)
    ).all()
    if not checkouts:
        return jsonify({'pattern_tests': []})

    patterns_data = [checkout.to_dict() for checkout in checkouts]
    return jsonify({'checkouts': patterns_data})


#remove pattern from checkout manually
@checkout_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def remove_pattern_test(id):
    delete_pattern_test=Checkout.query.get(id)
    if not delete_pattern_test or delete_pattern_test.user_id != current_user.id:
        return jsonify({'message': 'No pattern tests to remove'})
    db.session.remove(delete_pattern_test) #many to many use .remove
    db.session.commit()
    return jsonify({"message" : "You have successfully removed this pattern from testing"})
