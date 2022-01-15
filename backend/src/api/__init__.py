from pprint import pprint

from flask import Blueprint, make_response, jsonify, Response, request, abort
from marshmallow.exceptions import ValidationError

from src.models import Sauce, Ingredient, Pizza
from src.schemas import SauceSchema, IngredientSchema, PizzaSchema, OrderSchema

bp = Blueprint("pizza", __name__)


def get_list_of_objects(cls_model, cls_schema, code: int = 200) -> Response:
    items = cls_model.all()
    schema = cls_schema(many=True)
    result = schema.dump(items)
    return make_response(jsonify(result), code)


@bp.route('/sauce', methods=['GET'])
def get_sauces() -> Response:
    return get_list_of_objects(Sauce, SauceSchema)


@bp.route('/pizza', methods=['GET'])
def get_pizzas() -> Response:
    return get_list_of_objects(Pizza, PizzaSchema)


@bp.route('/ingredient', methods=['GET'])
def get_ingredients() -> Response:
    return get_list_of_objects(Ingredient, IngredientSchema)


@bp.route('/order', methods=['POST'])
def create_order() -> tuple[dict, int]:
    try:
        data = request.get_json()
        order_schema = OrderSchema()
        res = order_schema.load(data)

        pprint(res)
    except ValidationError as e:
        print(e)
        abort(make_response(jsonify(e.messages), 422))
    except Exception as e:
        print(e)
        abort(make_response(jsonify({"error": "Server Error!"}), 500))
    else:
        return {'message': 'Order accepted!'}, 201
