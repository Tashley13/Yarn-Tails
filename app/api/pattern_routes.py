from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Pattern, db, User, Tester, PatternImage
# from app.forms import CreatePatternForm
from datetime import datetime, timezone
from sqlalchemy.orm import selectinload

pattern_routes = Blueprint('patterns', __name__,url_prefix="/patterns")

#get all patterns (limit 25?)
@pattern_routes.route('')
def all_patterns():
    patterns=Pattern.query.options(selectinload(Pattern.user)).limit(25).all()
    print("PATTERNS: ", patterns)
    if not patterns:
        return {"message" : "no patterns to test!"}
    return {'patterns' : [
        {
            'id': pattern.id,
            'user_id' : pattern.user_id,
            'username' : pattern.user.username,
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
@pattern_routes.route('/current/<int:id>')
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
            #eventually pull all the reviews and images of the pattern to display
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
@pattern_routes.route('/new', methods=["POST"])
# @login_required
def create_pattern():
    user_id=current_user.id
    data=request.get_json()
    # pattern=CreatePatternForm(request.form)
    # if pattern.validate_on_submit():
    #     new_pattern= Pattern(
    #         user_id=current_user.id,
    #         title=form.title.data,
    #         tile_image=form.data.tile_image,
    #         difficulty=form.data.difficulty,
    #         time=form.data.time,
    #         time_limit=form.data.time_limit,
    #         description=form.data.description,
    #         materials_instrument=form.data.materials_instrument,
    #         materials_instrument_size=form.data.materials_instrument_size,
    #         materials_yarn_weight=form.data.materials_yarn_weight,
    #         materials_yardage=form.data.materials_yardage,
    #         pattern=form.data.pattern
    #     )
    new_pattern= Pattern(
        user_id=user_id,
        title=data.get('title'),
        tile_image=data.get('tile_image'),
        difficulty=data.get('difficulty'),
        time=data.get('time'),
        time_limit=data.get('time_limit'),
        description=data.get('description'),
        materials_instrument=data.get('materials_instrument'),
        materials_instrument_size=data.get('materials_instrument_size'),
        materials_yarn_weight=data.get('materials_yarn_weight'),
        materials_yardage=data.get('materials_yardage'),
        pattern=data.get('pattern')

    )
    # print("PATTERN: ", new_pattern)
    db.session.add(new_pattern)
    db.session.commit()
    return  jsonify(new_pattern.to_dict())
    # else:
    #     return jsonify({"message" : "Bad Request"}), 400


#update a pattern
@pattern_routes.route('/<int:id>/edit', methods=["PUT"])
# @login_required
def update_pattern(id):
    pattern_to_edit=Pattern.query.get(id)
    pattern_data=request.get_json()
    if not pattern_to_edit or pattern_to_edit.user_id != current_user.id:
        return jsonify({"message" : "No pattern to edit"})
    pattern_to_edit.title=pattern_data.get('title')
    pattern_to_edit.tile_image=pattern_data.get('tile_image')
    pattern_to_edit.difficulty=pattern_data.get('difficulty')
    pattern_to_edit.time=pattern_data.get('time')
    pattern_to_edit.description=pattern_data.get('description')
    pattern_to_edit.materials_instrument=pattern_data.get('materials_instrument')
    pattern_to_edit.materials_instrument_size=pattern_data.get('materials_instrument_size')
    pattern_to_edit.materials_yarn_weight=pattern_data.get('materials_yarn_weight')
    pattern_to_edit.materials_yardage=pattern_data.get('materials_yardage')
    pattern_to_edit.pattern=pattern_data.get('pattern')
    pattern_to_edit.updated_at= datetime.utcnow()

    db.session.commit()
    return jsonify(pattern_to_edit.to_dict())

#delete a pattern
@pattern_routes.route('/<int:id>/delete', methods=["DELETE"])
# @login_required
def delete_pattern(id):
    pattern_to_delete=Pattern.query.get(id)
    if not pattern_to_delete or pattern_to_delete.user_id != current_user.id:
        return jsonify({"message": "No pattern to delete"})
    db.session.delete(pattern_to_delete)
    db.session.commit()
    return jsonify({"message": "Pattern successfully deleted"})



#grab all testers by patternId
@pattern_routes.route('<int:patternId>/testers')
def testersByPatternId(patternId):
    # print(f"patternId: ", patternId)
    pattern=Pattern.query.get(patternId)

    if not pattern:
        return jsonify({"message": "This pattern does not exist"})
    tester_by_pattern_id = Tester.query.filter(Tester.pattern_id==patternId).all()
    # print(f"TESTER: ", tester_by_pattern_id)
    if not tester_by_pattern_id:
        return {"message": "no tests for this pattern yet!"}
    return {'testers' : [
        {
            'id' : tester.id,
            'user_id' : tester.user_id,
            'pattern_id' : tester.pattern_id,
            'rating' : tester.rating,
            'image' : tester.image,
            'review' : tester.review
        }
        for tester in tester_by_pattern_id
    ]}


#create a test based on patternId
@pattern_routes.route('<int:patternId>/testers', methods=["POST"])
def create_tester(patternId):
    user_id=current_user.id
    # print(f"USER_ID: ", user_id)
    pattern = Pattern.query.get(patternId)
    if not pattern:
        return jsonify({"message" : "no pattern to test!"})
    data=request.get_json()

    new_tester = Tester(
        user_id=user_id,
        pattern_id=patternId,
        rating=data.get('rating'),
        image=data.get('image'),
        review=data.get('review')
    )

    db.session.add(new_tester)
    db.session.commit()
    return jsonify(new_tester.to_dict())


#get all images by pattern_id
@pattern_routes.route('<int:patternId>/images')
def get_pattern_images(patternId):
    pattern_images = PatternImage.query.filter_by(pattern_id=patternId).order_by(PatternImage.id.desc()).all()

    if not pattern_images:
        return jsonify({"message": "No images for this pattern!"})

    return jsonify({
        'pattern_images': [image.to_dict() for image in pattern_images]
    })
