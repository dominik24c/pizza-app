from ..db import db

pizza_ingredients = db.Table('pizza_ingredient',
                             db.Column('pizza_id', db.String, db.ForeignKey('pizzas.id'), primary_key=True),
                             db.Column('ingredient_id', db.String, db.ForeignKey('ingredients.id'), primary_key=True))

ingredients_order = db.Table('ingredients_order',
                             db.Column('pizzaorder_id', db.Integer, db.ForeignKey('pizza_orders.id'), primary_key=True),
                             db.Column('ingredient_id', db.String, db.ForeignKey('ingredients.id'), primary_key=True))


class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.String(255), primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)

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

    ingredients = db.relationship('Ingredient', secondary=pizza_ingredients, lazy=True)


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer(), primary_key=True)
    pizza_orders = db.relationship('PizzaOrder', backref='order', lazy=True)
    sauce_orders = db.relationship('SauceOrder', backref='order', lazy=True)
    total = db.Column(db.Float(precision=2), nullable=False)


class SauceOrder(db.Model):
    __tablename__ = 'sauces_orders'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    sauce_id = db.Column(db.String, db.ForeignKey('sauces.id'))
    amount = db.Column(db.Integer, nullable=False)


class PizzaOrder(db.Model):
    __tablename__ = 'pizza_orders'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    pizza_id = db.Column(db.String, db.ForeignKey('pizzas.id'), nullable=False)
    ingredients = db.relationship('Ingredient', secondary=ingredients_order, lazy=True)
