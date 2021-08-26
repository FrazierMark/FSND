
from os import name
from flask_script import Manager
from flask_migrate import MigrateCommand, Migrate

from app import app
from models import db, Product, Cart

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)


# seed command
@manager.command
def seed():
    Product(name='Canon 5D Mark IV', description='Full Frame Camera', sku='123456', category='camera', price= 999.99 ).insert()
    Product(name='Nikon D2600', description='Full Frame Camera', sku='123457', category='camera', price= 999.99 ).insert()
    Product(name='Leica M10', description='Full Frame Camera', sku='123458', category='camera', price= 9999.99 ).insert()

    Product(name='Kodak', description='Portra 400', sku='123459', category='film', price= 9.99 ).insert()
    Product(name='HP5', description='400 ISO', sku='22348', category='film', price= 19.99 ).insert()
    Product(name='CineStill', description='800 ISO', sku='1458', category='film', price= 2.99 ).insert()

    Product(name='Canon', description='24-70mm Zoom', sku='32145', category='lens', price= 569.99).insert()
    Product(name='Leica', description='28mm Summilux Prime', sku='98745', category='lesn', price= 9911.99).insert()
    Product(name='Nikon', description='28mm Prime', sku='456987', category='lens', price= 929.99).insert()

if __name__ == '__main__':
    manager.run()