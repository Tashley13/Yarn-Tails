from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FileField, MultipleFileField, IntegerField, RadioField, SelectField, TextAreaField
from wtforms.validators import InputRequired, ValidationError, Length, NumberRange
#UUID when using AWS
from app.models import Pattern

#create a function that verifies the user is logged in to pass in?
# Or handle in frontend through if conditionals?
class CreatePatternForm(FlaskForm):
    title=StringField('title', validators=[InputRequired(), Length(100)])
    # tile_image=StringField('tile_image', validators=[InputRequired()])
    difficulty=RadioField('difficulty', choices=['beginner', 'easy', 'intermediate', 'experienced'],validators=[InputRequired()])
    time=StringField('time', validators=[InputRequired(), Length(40)])
    time_limit=SelectField('time_limit', choices=[
        'one day (24 hours)',
        'two days (48 hours)',
        'three days (72 hours)',
        'four days (96 hours)',
        'five days (120 hours)',
        'six days (144 hours)',
        'one week (7 days)',
        'two weeks (14 days)',
        'three weeks (21 days)',
        'four weeks (28 days)',
        'five weeks (35 days)',
        'six weeks (42 days)',
        'one month (30 days)',
        'two months (60 days)',
        'three months (90 days)'
        ],validators=[InputRequired()])
    description=StringField('description', validators=[InputRequired()])
    materials_instrument=SelectField('materials_instrument', choices=[
        'knitting needles',
        'straight needles',
        'circular needles',
        'double pointed needles',
        'crochet hook',
        'inline crochet hook',
        'tapered crochet hook',
        'tunisian crochet hook',
        'knook crochet hook',
        'hands'
        ], validators=[InputRequired()])
    materials_instrument_size=SelectField('materials_instrument_size', choices=[
        '1.5mm', '1.75mm', '2.0mm', '2.25mm', '2.75mm', '3.0mm', '3.25mm',
        '3.5mm', '3.75mm', '4mm', '4.25mm', '4.5mm', '5.0mm', '5.25mm', '5.5mm',
        '6.0mm', '6.5mm', '7.0mm', '7.5mm', '8.0mm', '9.0mm', '10.0mm'
    ], validators=[InputRequired()])
    materials_yarn_weight=SelectField('materials_yarn_weight', choices=[
        '0', '1', '2', '3', '4', '5', '6', '7'
    ], validators=[InputRequired()])
    materials_yardage=IntegerField('materials_yardage', validators=[InputRequired()])
    pattern=TextAreaField('pattern', validators=[InputRequired(), Length(10000)])
