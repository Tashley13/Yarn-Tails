from app.models import db, Pattern, Checkout, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date, timedelta

def seed_checkouts():
    demos_checkout = Checkout(
        user_id=1,
        pattern_id=3,
        test_due=date.today() + timedelta(days=3)
    )
    marnies_checkout = Checkout(
        user_id=2,
        pattern_id=1,
        test_due=date.today() + timedelta(days=5)
    )

    bobbies_checkout = Checkout(
        user_id=3,
        pattern_id=4,
        test_due=date.today()+timedelta(days=1)
    )

    db.session.add(demos_checkout)
    db.session.add(marnies_checkout)
    db.session.add(bobbies_checkout)
    db.session.commit()

def undo_checkouts():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.checkout RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM checkout"))

    db.session.commit()
