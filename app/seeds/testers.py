from app.models import db, Tester, environment, SCHEMA
from sqlalchemy.sql import text

def seed_testers():
    demos_test = Tester(
        user_id=1,
        pattern_id=4,
        rating=8,
        complete=True,
        # image='http://www.image.com',
        review='simple and easy to follow, but wish there was a little more diversity and some pictures',
        # limit='one day (24 hours)'
    )

    demos_test2 = Tester(
        user_id=1,
        pattern_id=3,
        rating='',
        complete=False,
        review=''
    )

    marnies_test= Tester(
        user_id=2,
        pattern_id=5,
        rating=7,
        complete=True,
        # image='http://www.image.com',
        review='simple and easy to follow but does not offer a knitting swatch. Even though instrument size and yarn weight is given, a swatch would be super beneficial.',
        # limit='two days (48 hours)'
    )

    marnies_test2 = Tester(
        user_id=2,
        pattern_id=1,
        rating=5,
        complete=False,
        review=''
    )

    bobbies_test = Tester(
        user_id=3,
        pattern_id=1,
        rating=3,
        complete=True,
        # image='http://www.image.com',
        review='simple and easy to follow but does not offer a knitting swatch. Even though instrument size and yarn weight is given, a swatch would be super beneficial.',
        # limit='one day (24 hours)'
    )


    bobbies_test2 = Tester(
        user_id=3,
        pattern_id=4,
        rating='',
        complete=False,
        review='The pattern is laid out in a simple manner, but I had to remind myself what sc and dc mean.'
    )

    db.session.add(demos_test)
    db.session.add(demos_test2)
    db.session.add(marnies_test)
    db.session.add(marnies_test2)
    db.session.add(bobbies_test)
    db.session.add(bobbies_test2)
    db.session.commit()

def undo_testers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.testers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM testers"))

    db.session.commit()
