from flask.cli import AppGroup
from .users import seed_users, undo_users
from .patterns import seed_patterns, undo_patterns
from .testers import seed_testers, undo_testers
from .pattern_images import seed_pattern_images, undo_pattern_images

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_pattern_images()
        undo_testers()
        undo_patterns()
        undo_users()

    seed_users()
    seed_patterns()
    seed_testers()
    seed_pattern_images()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_pattern_images()
    undo_testers()
    undo_patterns()
    undo_users()

    # Add other undo functions here
