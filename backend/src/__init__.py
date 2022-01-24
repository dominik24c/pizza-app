import os

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

from .api import bp
from .commands import create_db
from .config import config
from .db import db


def create_app(config_name: str = None) -> Flask:
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV')
    app = Flask(__name__)
    app.config.from_object(config.get(config_name) or config.get('development'))

    db.init_app(app)
    Migrate(app, db)
    CORS(app)

    app.register_blueprint(bp, url_prefix='/api')

    app.cli.add_command(create_db)

    return app
