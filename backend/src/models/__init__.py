from src.db import db

pizza_ingredients = db.Table('pizza_ingredient',
                             db.Column('pizza_id', db.String, db.ForeignKey('pizzas.id'), primary_key=True),
                             db.Column('ingredient_id', db.String, db.ForeignKey('ingredients.id'), primary_key=True)
                             )

order_pizza = db.Table('order_pizza',
                       db.Column('order_id', db.Integer, db.ForeignKey('orders.id'), primary_key=True),
                       db.Column('pizza_id', db.String, db.ForeignKey('pizzas.id'), primary_key=True)
                       )

order_sauce = db.Table('order_sauce',
                       db.Column('order_id', db.Integer, db.ForeignKey('orders.id'), primary_key=True),
                       db.Column('sauce_id', db.String, db.ForeignKey('sauces.id'), primary_key=True)
                       )

order_ingredients = db.Table('order_ingredients',
                             db.Column('order_id', db.Integer, db.ForeignKey('order_pizzas.id'), primary_key=True),
                             db.Column('ingredient_id', db.String, db.ForeignKey('ingredients.id'), primary_key=True)
                             )


class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.String(255), primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    price = db.Column(db.Numeric(precision=2), nullable=False)

    @classmethod
    def all(cls):
        return cls.query.all()


class Sauce(BaseModel):
    __tablename__ = 'sauces'


class Ingredient(BaseModel):
    __tablename__ = 'ingredients'

    def __str__(self):
        return f'{self.id}'


class Pizza(BaseModel):
    __tablename__ = 'pizzas'

    ingredients = db.relationship('Ingredient', secondary=pizza_ingredients, lazy='subquery')


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer(), primary_key=True)
    pizzas = db.relationship('Pizza', secondary=order_pizza, lazy='subquery')
    sauces = db.relationship('Sauce', secondary=order_sauce, lazy='subquery')
    total = db.Column(db.Numeric(precision=2), nullable=False)


class OrderPizza(db.Model):
    __tablename__ = 'order_pizzas'

    id = db.Column(db.Integer(), primary_key=True)
    pizza = db.Column(db.String, db.ForeignKey('pizzas.id'), nullable=False)
    order = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    ingredients = db.relationship('Ingredient', secondary=order_ingredients, lazy='subquery')
