from app.models import db, Tester, environment, SCHEMA
from sqlalchemy.sql import text

def seed_testers():
    demos_test = Tester(
        user_id=1,
        pattern_id=2,
        rating=8,
        image='http://www.image.com',
        review='simple and easy to follow, but wish there was a little more diversity and some pictures',
        # limit='one day (24 hours)'
    )

    marnies_test= Tester(
        user_id=2,
        pattern_id=3,
        rating=7,
        image='http://www.image.com',
        review='simple and easy to follow but does not offer a knitting swatch. Even though instrument size and yarn weight is given, a swatch would be super beneficial.',
        # limit='two days (48 hours)'
    )

    bobbies_test = Tester(
        user_id=3,
        pattern_id=1,
        rating=3,
        image='http://www.image.com',
        review='simple and easy to follow but does not offer a knitting swatch. Even though instrument size and yarn weight is given, a swatch would be super beneficial.',
        # limit='one day (24 hours)'
    )

    db.session.add(demos_test)
    db.session.add(marnies_test)
    db.session.add(bobbies_test)
    db.session.commit()

def undo_testers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.testers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM testers"))

    db.session.commit()
