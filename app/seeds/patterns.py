from app.models import db, Pattern, environment, SCHEMA
from sqlalchemy.sql import text

def seed_patterns():
    demos_pattern = Pattern(
        user_id=1,
        title='Crochet Snake',
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

    demos_pattern2 = Pattern(
        user_id=1,
        title='Blob',
        difficulty='easy',
        time='1 hour',
        time_limit='one day (24 hours)',
        description='A blob is a perfect introduction to the world of amigurumi. Customize with whatever color, size, and eye types.',
        materials_instrument='crochet hook',
        materials_instrument_size='4.5mm',
        materials_yarn_weight='5',
        materials_yardage='2',
        pattern='''
1) Create a magic circle (or chain 3 and join into a circle)
2) 6sc in mc  (6)
3) [2sc] x6 (12)
4) [1sc, 2sc] x6 (18)
5) [1sc, 1sc, 2sc] x6 (24)
6) [1 sc, 1sc, 1sc, 2sc] x6 (30)
7) sc around x3
8) [1sc, 1sc,  1sc, dec] x6 (24)
9) [1sc, 1sc, dec] x6 (18)
10) If using safety eyes, insert between the rows of sc, about 5-7 stitches apart depending on derp preference
11) [1sc, 1sc, dec] x6 (12), begin stuffing
12) [1sc, dec] x6 (6), continue stuffing
13) [dec] x3, finish stuffing if needed
14) Using your hook a tapestry needle close up the top by continuing to decrease with the hook or synch close with the needle.
15) Sew on eyes and/or mouth with choice of thread or fabric. Shape your blob to desired shape.

        '''
    )

    marnies_pattern = Pattern(
        user_id=2,
        title='Crochet Square',
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

    marnies_pattern2 = Pattern(
        user_id=2,
        title='Granny Square Blanket',
        difficulty='easy',
        time='20 hours',
        time_limit='three weeks (21 days)',
        description='A simple and timeless blanket that is easily customizable to fit any theme, your granny would love this as a gift.',
        materials_instrument='crochet hook',
        materials_instrument_size='5.0mm',
        materials_yarn_weight='4',
        materials_yardage='100',
        pattern='''
1) Create a magic circle (or chain 3 and join into a circle)
2) Ch 2, 2dc / ch1 / 3dc / ch1 / 3dc / ch1 / 3dc / ch1, slip stitch or sc into second loop in beginning chain 2
3) Slip stitch into next 2 stitches, slip stitch into ch1 opening
4) Ch2, 2dc in ch1 opening, ch 1, 3dc in same ch1 opening
5) Ch 1, 3dc / ch1 / 3dc into next space x3, slip stitch into second stitch of beginning chain
6) Repeat step 3
7) or the remainder of the pattern is repeating these steps depending on if you are in a corner or not.
8) Non-corners: 3dc in each space (ch2, 2dc for starting rows)
9) Corners: 3dc / ch1 / 3dc in each ch 1 corner space
10) Remember to repeat step 3 for starting each new row.

        '''
    )

    bobbies_pattern = Pattern(
        user_id=3,
        title='Scarf',
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

    bobbies_pattern2 = Pattern(
        user_id=3,
        title='Circle',
        difficulty='beginner',
        time='15 minutes',
        time_limit='two days (48 hours)',
        description='A quick tutorial on how to create a amigurumi circle.',
        materials_instrument='crochet hook ',
        materials_instrument_size='5.0mm',
        materials_yarn_weight='4',
        materials_yardage='1',
        pattern='''
        1) Create a magic circle (or chain 3 and join into a circle)
        2) Single crochet into loop 8 times (8)
        3) Increase in each loop (16)
        4) (inc, sc) x8 (24)
        5) sl st into next stitch
        6) Cut and weave in ends
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
