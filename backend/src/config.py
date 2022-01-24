import os


class Config:
    """Base config, uses staging database server."""
    TESTING = False
    DB_SERVER = 'localhost'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLALCHEMY_DATABASE_URI = f'sqlite:///{os.path.join(BASE_DIR, "..", "db.sqlite")}'
    SQLALCHEMY_DATABASE_URI = f'postgresql://{os.environ.get("DB_USERNAME")}:{os.environ.get("DB_PASSWORD")}@' \
                              f'{os.environ.get("DB_HOST")}:{os.environ.get("DB_PORT")}/{os.environ.get("DB_NAME")}'


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
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
}
