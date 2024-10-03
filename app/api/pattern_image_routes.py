from flask import Blueprint, request, jsonify
from app.models import db, PatternImage
from flask_login import current_user, login_required
from .aws_helpers import (
    upload_file_to_s3, get_unique_filename
)
from app.forms import PatternImageForm;

pattern_image_routes = Blueprint('pattern_images', __name__, url_prefix='/piamges')


@pattern_image_routes.route('', methods=["POST"])
# @login_required
def upload_pattern_image():
    if 'image' not in request.files:
        return {"errors": "no image found"}

    file = request.files['image']

    file.filename=get_unique_filename(file.filename)
    upload=upload_file_to_s3(file)

    image_url=upload.get('url')
    display_image = request.form.get('display_image') == 'True'
    # form = PatternImageForm()

    # if request.method == "POST" or form.validate_on_submit():
    #     image = form.data["image"]
    #     # pattern_id=form.data["pattern_id"]
    #     # user_id=form.data["user_id"]
    #     print("IMAGE CHECK: ", image)
    #     image.filename = get_unique_filename(image.filename)
    #     upload = upload_file_to_s3(image)
    #     print("UPLOAD", upload)
    # else:
    #     return jsonify({"message" : upload }), 400

    # image_url=upload[image] # match with column name 'image'
    new_image= PatternImage(
        user_id=current_user.id,
        pattern_id=request.form.get('pattern_id'),
        image=image_url,
        display_image=display_image
    )
    db.session.add(new_image)
    db.session.commit()

    return jsonify(
        new_image.to_dict()
    )

    return jsonify({"message" : "Invalid request"}), 400
