import os
from sqlalchemy import Column, String, Integer
from flask_sqlalchemy import SQLAlchemy, model
import json

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

class Camera(db.Model):
    # Drink, persistent drink entity, extends the base SQLAlchemy Model
    # Autoincrementing, unique primary key
    id = Column(Integer().with_variant(Integer, "sqlite"), primary_key=True)
    # String Title
    brand = Column(String(80), nullable=False)
    # the ingredients blob - this stores a lazy json blob
    # the required datatype is [{'color': string, 'name':string, 'parts':number}]
    model = Column(String(180), nullable=False)
    sensor = Column(String(180), nullable=False)
    mount = Column(String(180), nullable=False)

    def format(self):
        return{
            'id': self.id,
            'brand': self.brand,
            'model': self.model,
            'sensor': self.sensor,
            'mount': self.mount
        }

    def __init__(self, brand, model, sensor, mount):
        self.brand = brand
        self.model = model
        self.sensor = sensor
        self.mount = mount
    
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
        'mount': self.mount
        }