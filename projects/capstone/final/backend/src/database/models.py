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
   

# Product DB Model

class Product(db.Model):
    # Drink, persistent drink entity, extends the base SQLAlchemy Model
    # Autoincrementing, unique primary key
    id = Column(Integer().with_variant(Integer, "sqlite"), primary_key=True)
    # String Title
    name = Column(String(80), nullable=False)
    # the ingredients blob - this stores a lazy json blob
    # the required datatype is [{'color': string, 'name':string, 'parts':number}]
    description = Column(String(180), nullable=False)
    sku = Column(Integer, nullable=False)
    category = Column(String(180), nullable=False)
    price = Column(Float(), nullable=False)
    cart = Column(Integer, db.ForeignKey('cart.cart_id'), nullable=True)
    

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
    cart_id = Column(Integer().with_variant(Integer, "sqlite"), primary_key=True)
    # String Title
    user_id = Column(String(80), nullable=False)

    product_ids = db.relationship('Product', backref='product_num', lazy=True)

    def format(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id
            
        }

    def __init__(self, user_id, product_id):
        self.user_id = user_id,
        self.product_id: product_id
        
    
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
        'user_id': self.user_id,
        'product_id': self.product_id,
        }