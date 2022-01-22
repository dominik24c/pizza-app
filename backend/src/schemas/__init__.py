from marshmallow import fields, validate
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, SQLAlchemySchema

from ..models import Sauce, Ingredient, Pizza, Order


class SauceSchema(SQLAlchemyAutoSchema):
    class Meta(SQLAlchemyAutoSchema.Meta):
        model = Sauce


class IngredientSchema(SQLAlchemyAutoSchema):
    class Meta(SQLAlchemyAutoSchema.Meta):
        model = Ingredient


class PizzaSchema(SQLAlchemyAutoSchema):
    ingredients = fields.List(fields.String)

    class Meta(SQLAlchemyAutoSchema.Meta):
        model = Pizza


class PartialPizzaSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = Pizza

    id = fields.String(required=True)
    ingredients = fields.List(fields.String)


class PartialSauceSchema(SQLAlchemySchema):
    class Meta(SQLAlchemySchema.Meta):
        model = Sauce

    id = fields.String(required=True)
    count = fields.Integer(required=True)


class OrderSchema(SQLAlchemyAutoSchema):
    class Meta(SQLAlchemyAutoSchema.Meta):
        model = Order

    pizza = fields.List(fields.Nested(PartialPizzaSchema), required=True, validate=validate.Length(min=1))
    sauce = fields.List(fields.Nested(PartialSauceSchema))
