"""empty message

Revision ID: c06c07c22afa
Revises: 68aba03d6e6c
Create Date: 2024-03-24 21:56:39.632464

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c06c07c22afa'
down_revision = '68aba03d6e6c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('planning')
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('participations')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('participations', sa.VARCHAR(length=255), nullable=True))

    op.create_table('planning',
    sa.Column('id', sa.VARCHAR(length=32), nullable=False),
    sa.Column('user_id', sa.VARCHAR(length=32), nullable=False),
    sa.Column('title', sa.VARCHAR(length=32), nullable=True),
    sa.Column('end', sa.VARCHAR(length=32), nullable=True),
    sa.Column('start', sa.VARCHAR(length=32), nullable=True),
    sa.Column('film_id', sa.VARCHAR(length=32), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    # ### end Alembic commands ###
