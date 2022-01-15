import json
import os
from typing import Callable

from src.db import db
from src.models import Ingredient, Pizza, Sauce
from src.settings import DATA_DIR


def insert_data(cls, filename: str, func: Callable = None, rel_cls=None, relation_name: str = '') -> None:
    with open(os.path.join(DATA_DIR, f'{filename}.json')) as f:
        data = json.load(f)
        for item in data:
            if func is not None:
                obj = func(cls, rel_cls, item, relation_name)
            else:
                obj = cls(**item)
            db.session.add(obj)
        db.session.commit()


def append_relation(cls, rel_cls, data: dict, relation_name: str) -> db.Model:
    items = data[relation_name]
    del data[relation_name]
    obj = cls(**data)
    for id_of_item in items:
        obj.ingredients.append(rel_cls.query.get(id_of_item))
    return obj


def insert_with_relation(cls: db.Model, rel_cls: db.Model, filename: str, relation_name: str) -> None:
    insert_data(cls, filename, append_relation, rel_cls, relation_name)


def read_and_save_data_to_db() -> None:
    db.create_all()

    models = [
        (Ingredient, 'ingredients'),
        (Sauce, 'sauces')
    ]
    for cls, filename in models:
        insert_data(cls, filename)

    insert_with_relation(Pizza, Ingredient, 'pizzas', relation_name='ingredients')
