from app.models import db, Pattern, environment, SCHEMA
from sqlalchemy.sql import text

def seed_patterns():
    demos_pattern = Pattern(
        user_id=1,
        title='Crochet Snake',
        tile_image='https://yarn-tails-image-bucket.s3.amazonaws.com/5ff48a1b960a490a8d3686872a840794.jpg',
        difficulty='beginner',
        time='15 minutes',
        time_limit='one day (24 hours)',
        description='a fun and easy project for all of your left over scraps',
        materials_instrument='crochet hook',
        materials_instrument_size='5.0mm',
        materials_yarn_weight='4',
        materials_yardage='1',
        pattern='''
        1) Create a slipknot
        2) Chain '#' for desired snake size:
            -small snake: 15
            -medium snake: 30
            -large snake: 45
        3) Cut the yarn and pull the tail through the current loop
        4) Weave in or trim end
        '''
    )

    marnies_pattern = Pattern(
        user_id=2,
        title='Crochet Square',
        tile_image='https://yarn-tails-image-bucket.s3.amazonaws.com/5ff48a1b960a490a8d3686872a840794.jpg',
        difficulty='beginner',
        time='30 minutes',
        time_limit='one day (24 hours)',
        description='a fun and easy project to build a colorful square blanket!',
        materials_instrument='crochet hook',
        materials_instrument_size='4.5mm',
        materials_yarn_weight='4',
        materials_yardage='3',
        pattern='''
        1) Create a slipknot
        2) Chain '#' for desired square size(I'm creating a medium square):
            -small square: 15
            -medium square: 30
            -large square: 45
        3) Turn your work and single crochet (x30) across
        4) Repeat step 3 as many times as your base chain (I would crochet a total of 30 rows)
        5) Cut the string, pull through the loop and weave in the end
        '''
    )

    bobbies_pattern = Pattern(
        user_id=3,
        title='Scarf',
        tile_image='https://yarn-tails-image-bucket.s3.amazonaws.com/5ff48a1b960a490a8d3686872a840794.jpg',
        difficulty='beginner',
        time='8 hours',
        time_limit='two days (48 hours)',
        description='a fun and easy project to create for your friends during the cold months!',
        materials_instrument='knitting needles',
        materials_instrument_size='5.0mm',
        materials_yarn_weight='4',
        materials_yardage='60',
        pattern='''
        1) Leave a tail 3x the width you'd like your scarf to be
        2) Cast on as many stitches to get your desired length
            -I find 25-35 suits me (I will use 25)
        3) knit 25 stitches
        4) purl 25 stitches
        5) repeat step 3 and 4 until desired length is reached, I usually end up with about 200 rows
        6) Bind or cast off the stitches
        '''
    )

    db.session.add(demos_pattern)
    db.session.add(marnies_pattern)
    db.session.add(bobbies_pattern)
    db.session.commit()


def undo_patterns():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.patterns RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM patterns"))

    db.session.commit()
