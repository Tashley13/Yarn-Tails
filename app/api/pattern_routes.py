from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Pattern, db

pattern_routes = Blueprint('patterns', __name__)

#get all patterns (limit 25?)
@pattern_routes.route('/')
def all_patterns():
    print('Hello World Check')
    patterns=Pattern.query.all()
    return {'patterns' : [pattern.to_dict() for pattern in patterns]}
