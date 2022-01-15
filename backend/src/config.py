import os

from .settings import BASE_DIR


class Config(object):
    """Base config, uses staging database server."""
    TESTING = False
    DB_SERVER = 'localhost'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @property
    def SQLALCHEMY_DATABASE_URI(self):
        return f'sqlite:///{os.path.join(BASE_DIR, "../db.sqlite")}'


class ProductionConfig(Config):
    """Uses production database server."""
    DB_SERVER = '0.0.0.0'


class DevelopmentConfig(Config):
    DB_SERVER = 'localhost'


class TestingConfig(Config):
    TESTING = True
    DB_SERVER = 'localhost'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'


config = {
    'dev': DevelopmentConfig,
    'prod': ProductionConfig,
    'test': TestingConfig,
}
