import pytest

from src.main import create_app
from src.utils import read_and_save_data_to_db


@pytest.fixture
def client():
    app = create_app('test')

    with app.test_client() as client:
        with app.app_context():
            read_and_save_data_to_db()
        yield client
