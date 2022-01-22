import click
from flask.cli import with_appcontext

from ..utils import read_and_save_data_to_db


@click.command('create-db')
@with_appcontext
def create_db() -> None:
    read_and_save_data_to_db()
