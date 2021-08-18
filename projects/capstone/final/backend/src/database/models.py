import os
from sqlalchemy import Column, String, Integer
from flask_sqlalchemy import SQLAlchemy, model
import json

from sqlalchemy.sql.sqltypes import Float

database_filename = "database.db"
project_dir = os.path.dirname(os.path.abspath(__file__))
database_path = "sqlite:///{}".format(os.path.join(project_dir, database_filename))

db = SQLAlchemy()

def setup_db(app):
    # binds a flask application and a SQLAlchemy service
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)

def db_drop_and_create_all():
    db.drop_all()
    db.create_all()
   

#Camera DB Model

class Product(db.Model):
    # Drink, persistent drink entity, extends the base SQLAlchemy Model
    # Autoincrementing, unique primary key
    id = Column(Integer().with_variant(Integer, "sqlite"), primary_key=True)
    # String Title
    name = Column(String(80), nullable=False)
    # the ingredients blob - this stores a lazy json blob
    # the required datatype is [{'color': string, 'name':string, 'parts':number}]
    description = Column(String(180), nullable=False)
    sku = Column(String(180), nullable=False)
    category = Column(String(180), nullable=False)
    price = Column(Float(), nullable=False)
    carts = db.relationship('Cart', backref='product', lazy=True)

    def format(self):
        return{
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'sku': self.sku,
            'category': self.category,
            'price': self.price
        }

    def __init__(self, name, description, sku, category, price):
        self.name = name
        self.description = description
        self.sku = sku
        self.category = category
        self.price = price
    
    def insert(self):
        db.session.add(self)
        db.session.commit()


    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
        'id': self.id,
        'name': self.name,
        'description': self.description,
        'sku': self.sku,
        'category': self.category,
        'price': self.price
        }




class Cart(db.Model):
    # Drink, persistent drink entity, extends the base SQLAlchemy Model
    # Autoincrementing, unique primary key
    id = Column(Integer().with_variant(Integer, "sqlite"), primary_key=True)
    # String Title
    user_id = Column(String(80), nullable=False)

    product_id = Column(Integer(), ForeignKey('product.id'), nullable=False)

    def format(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            
        }

    def __init__(self, brand, model, sensor, mount, price):
        self.brand = brand
        self.model = model
        self.sensor = sensor
        self.mount = mount
        self.price = price
    
    def insert(self):
        db.session.add(self)
        db.session.commit()


    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def format(self):
        return {
        'id': self.id,
        'brand': self.brand,
        'model': self.model,
        'sensor': self.sensor,
        'mount': self.mount,
        'price': self.price
        }