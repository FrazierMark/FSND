import os
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# database_path = os.environ['DATABASE_URL']
database_path = 'postgresql://frazier:Frazier89@localhost:5432/grainydays'


def setup_db(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)
    app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)
    
    

def db_drop_and_create_all():
    db.drop_all()
    db.create_all()
   

# Product DB Model

class Product(db.Model):
    __tablename__ = 'products'
    # Drink, persistent drink entity, extends the base SQLAlchemy Model
    # Autoincrementing, unique primary key
    id = db.Column(db.Integer, primary_key=True)
    # String Title
    name = db.Column(db.String(80), nullable=False)
    # the ingredients blob - this stores a lazy json blob
    # the required datatype is [{'color': string, 'name':string, 'parts':number}]
    description = db.Column(db.String(180), nullable=False)
    sku = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(180), nullable=False)
    price = db.Column(db.Float(), nullable=False)
    cart = db.Column(db.Integer, db.ForeignKey('cart.cart_id'), nullable=True)
    

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
    cart_id = db.Column(db.Integer, primary_key=True)
    # String Title
    user_id = db.Column(db.String(80), nullable=False)

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
