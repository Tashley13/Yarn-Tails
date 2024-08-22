"""create pattern table

Revision ID: 3ec3a663da96
Revises: 
Create Date: 2024-08-22 18:49:26.565313

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3ec3a663da96'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('patterns',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('difficulty', sa.String(), nullable=False),
    sa.Column('time', sa.String(), nullable=False),
    sa.Column('time_limit', sa.String(), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('materials_instrument', sa.String(), nullable=False),
    sa.Column('materials_instrument_size', sa.String(), nullable=True),
    sa.Column('materials_yarn_weight', sa.String(), nullable=False),
    sa.Column('materials_yardage', sa.Integer(), nullable=False),
    sa.Column('pattern', sa.Text(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('patterns')
    op.drop_table('users')
    # ### end Alembic commands ###
