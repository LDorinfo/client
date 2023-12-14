"""empty message

Revision ID: ded5d2efe386
Revises: 
Create Date: 2023-12-14 20:46:49.861925

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ded5d2efe386'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'comments', ['id'])
    op.drop_column('comments', 'likes')
    op.alter_column('evenement', 'title',
               existing_type=sa.VARCHAR(length=32),
               nullable=True)
    op.alter_column('evenement', 'description',
               existing_type=sa.VARCHAR(length=100),
               type_=sa.String(length=64),
               nullable=True)
    op.drop_column('users', 'isconnected')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('isconnected', sa.BOOLEAN(), nullable=True))
    op.alter_column('evenement', 'description',
               existing_type=sa.String(length=64),
               type_=sa.VARCHAR(length=100),
               nullable=False)
    op.alter_column('evenement', 'title',
               existing_type=sa.VARCHAR(length=32),
               nullable=False)
    op.add_column('comments', sa.Column('likes', sa.INTEGER(), nullable=True))
    op.drop_constraint(None, 'comments', type_='unique')
    # ### end Alembic commands ###
