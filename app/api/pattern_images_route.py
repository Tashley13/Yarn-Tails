from flask import Blueprint, request
from app.models import db, PatternImage
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, get_unique_filename
)
from app.forms import PatternImageForm;

pattern_image_routes = Blueprint('pattern_images', __name__);


@pattern_image_routes.route("", methods=["POST"])
# @login_required
def upload_pattern_image():
    form = PatternImageForm()

    if request.method == "POST" or form.validate_on_submit():
        image = form.data["image"]
        pattern_id=form.data["pattern_id"]
        user_id=form.data["user_id"]
        print("IMAGE CHECK: ", image)
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
    else:
        return jsonify({
            "errors" : form.errors
        }), 400
        # print(upload)

    if "image" not in upload:
        return jsonify({"message" : upload }), 400

    image_url=upload["image"] # match with column name 'image'
    new_image= PatternImage(
        image=image_url,
        pattern_id=pattern_id,
        user_id=user_id
    )
    db.session.add(new_image)
    db.session.commit()

    return jsonify(
        new_image.to_dict()
    )

    return jsonify({"message" : "Invalid request"}), 400
