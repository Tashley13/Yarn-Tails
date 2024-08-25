from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Pattern, db
from app.forms import CreatePatternForm

pattern_routes = Blueprint('patterns', __name__)

#get all patterns (limit 25?)
@pattern_routes.route('/')
def all_patterns():
    patterns=Pattern.query.limit(25).all()
    if not patterns:
        return {"message" : "no patterns to test!"}
    return {'patterns' : [
        {
            'id': pattern.id,
            'user_id' : pattern.user_id,
            'title' : pattern.title,
            'tile_image' : pattern.tile_image,
            'difficulty' : pattern.difficulty,
            'time' : pattern.time,
            'time_limit' : pattern.time_limit
        }
        for pattern in patterns
    ]

    }

#get all patterns of current user
@pattern_routes.route('/<int:id>')
# @login_required
def user_patterns(id):
    user_patterns=Pattern.query.filter_by(user_id=id).all()
    if not user_patterns:
        return {"message" : "There is no pattern here"}, 404
    return {'patterns' : [
        {
            'id': pattern.id,
            'user_id' : pattern.user_id,
            'title' : pattern.title,
            'tile_image' : pattern.tile_image,
            #eventually pull all the reviews of the pattern to display
            'difficulty' : pattern.difficulty,
            'time' : pattern.time,
            'time_limit' : pattern.time_limit,
            'description' : pattern.description,
            'materials_instrument' : pattern.materials_instrument,
            'materials_instrument_size' : pattern.materials_instrument_size,
            'materials_yarn_weight' : pattern.materials_yarn_weight,
            'materials_yardage' : pattern.materials_yardage
        }
        for pattern in user_patterns
    ]

    }

#view pattern through pattern_id
@pattern_routes.route('/<int:id>/view_pattern')
# @login_required
def read_user_pattern(id):
    view_pattern = Pattern.query.get(id)
    #look into grabbing the username through User
    #grab the testers as well through Tester
    if not view_pattern:
        return {"message" : "No pattern to view here"}, 404
    return jsonify(view_pattern.to_dict())


#create a pattern
@pattern_routes.route('', methods=["POST"])
# @login_required
def create_pattern():
    pattern=CreatePatternForm()
    if pattern.validate_on_submit:
        new_pattern= Pattern(
            userId=current_user.id,
            title=pattern.data['title'],
            tile_image=pattern.data['tile_image'],
            difficulty=pattern.data['difficulty'],
            time=pattern.time['time'],
            time_limit=pattern.data['time_limit'],
            description=pattern.data['description'],
            materials_instrument=pattern.data['materials_instrument'],
            materials_instrument_size=pattern.data['instrument_size'],
            materials_yardage=pattern.data['materials_yardage'],
            pattern=pattern.data['pattern']
        )
    db.session.add(new_pattern)
    db.session.commit()
    return  jsonify(new_pattern.to_dict)
