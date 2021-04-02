"""empty message

Revision ID: 755798a5c575
Revises: f370fb1684f7
Create Date: 2021-04-02 15:00:34.423005

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '755798a5c575'
down_revision = 'f370fb1684f7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Show',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('artist_id', sa.String(), nullable=True),
    sa.Column('venue_id', sa.String(), nullable=True),
    sa.Column('start_time', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['artist_id'], ['Artist.id'], ),
    sa.ForeignKeyConstraint(['venue_id'], ['Venue.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Show')
    # ### end Alembic commands ###
