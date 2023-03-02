"""empty message

Revision ID: 317a3b618554
Revises: 40de602ddcfe
Create Date: 2023-03-01 17:46:57.278955

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '317a3b618554'
down_revision = '40de602ddcfe'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Resource', schema=None) as batch_op:
        batch_op.alter_column('address',
               existing_type=sa.VARCHAR(length=256),
               nullable=True)
        batch_op.alter_column('category',
               existing_type=sa.VARCHAR(length=256),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Resource', schema=None) as batch_op:
        batch_op.alter_column('category',
               existing_type=sa.VARCHAR(length=256),
               nullable=False)
        batch_op.alter_column('address',
               existing_type=sa.VARCHAR(length=256),
               nullable=False)

    # ### end Alembic commands ###