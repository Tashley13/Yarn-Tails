from app.models import db, Pattern, PatternImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_pattern_images():
    demos_images = PatternImage(
        user_id = 1,
        pattern_id=1,
        image = 'https://yarn-tails-image-bucket.s3.amazonaws.com/Axolotl.jpg',
        display_image = True
    )

#     marnies_images = PatternImage(
#         pattern_id=2,
#         urls='''
#         http://www.image.com/4, http://www.image.com/5, http://www.image.com/6
#         '''
#     )

#     bobbies_images = PatternImage(
#         pattern_id=3,
#         urls='''
#         http://www.image.com/7, http://www.image.com/8, http://www.image.com/9
#         '''
#     )

    db.session.add(demos_images)
#     db.session.add(marnies_images)
#     db.session.add(bobbies_images)
#     db.session.commit()

def undo_pattern_images():
    if environment== "production":
        db.session.execute(f"TRUNCATE table{SCHEMA}.pattern_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pattern_images"))

    db.session.commit()
