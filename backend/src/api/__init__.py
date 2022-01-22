from pprint import pprint

from flask import Blueprint, make_response, jsonify, Response, request
from marshmallow.exceptions import ValidationError

from ..db import db
from ..models import Sauce, Ingredient, Pizza, Order, SauceOrder, PizzaOrder
from ..schemas import SauceSchema, IngredientSchema, PizzaSchema, OrderSchema

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
        '''Validate order data'''
        data = request.get_json()
        order_schema = OrderSchema()
        order_data = order_schema.load(data)
        pprint(order_data)
        pizza_data = order_data.pop('pizza', None)
        sauce_data = order_data.pop('sauce', None)



        '''Create order and save to db'''
        order = Order(total=order_data['total'])
        if sauce_data is not None:
            for data in sauce_data:
                sauce_order = SauceOrder(sauce_id=data['id'], amount=data['count'])
                order.sauce_orders.append(sauce_order)
        for data in pizza_data:
            pizza_order = PizzaOrder(pizza_id=data['id'])
            ingredients_data = data.pop('ingredients', None)
            if ingredients_data is not None:
                for ingredient_id in ingredients_data:
                    pizza_order.ingredients.append(Ingredient.query.get(ingredient_id))
            order.pizza_orders.append(pizza_order)

        db.session.add(order)
        db.session.commit()

    except ValidationError as e:
        print(e)
        return e.messages, 422
    except Exception as e:
        print(e)
        return {"error": "Server Error!"}, 500
    else:
        return {'message': 'Order accepted!'}, 201
