from flask import Flask

from .api import bp
from .commands import create_db
from .config import config
from .db import db


def create_app(config_name: str = 'dev') -> Flask:
    app = Flask(__name__)
    app.config.from_object(config.get(config_name) or 'dev')

    db.init_app(app)
    app.register_blueprint(bp, url_prefix='/api')

    app.cli.add_command(create_db)

    return app