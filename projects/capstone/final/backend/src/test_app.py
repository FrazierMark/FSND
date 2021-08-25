from itertools import product
import unittest
import os
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from sqlalchemy import exc
from flask_sqlalchemy import SQLAlchemy
import sys
from flask_cors import CORS
import json
import hmac
from functools import wraps
from hashlib import sha1
from .database.models import setup_db, Product, Cart
from flask.ext.principal import Principal, Permission, RoleNeed, Identity, \
    identity_changed, identity_loaded


def create_app(test_config=None):
  # create and configure the app
  app = Flask(__name__)
  setup_db(app)
  cors = CORS(app)
  app.debug = True
  app.config.update(SECRET_KEY='secret', TESTING=True)
  principal = Principal(app)identity_loaded.connect(_on_principal_init)


class ProductTestCase(unittest.TestCase):
    """This class represents the product test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "product_test"
        self.project_dir = os.path.dirname(os.path.abspath(__file__))
        self.database_path = "sqlite:///{}".format(os.path.join(self.project_dir, self.database_filename))
        setup_db(self.app, self.database_path)

        self.new_product = {
            'name': 'Kodak Portra',
            'description': '400 ISO Film',
            'sku': '123456',
            'category': 'film',
            'price': 11.99}

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()
    
    def tearDown(self):
        """Executed after reach test"""
        pass

    """
    
    Test for successful operation and for expected errors.
    """

    def test_get_cameras(self):
        res = self.client().get('/CameraPage')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['cameras'])
        self.assertTrue(len(data['cameras']))

    def test_get_all_film(self):
        res = self.client().get('/FilmPage')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['all_film'])
        self.assertTrue(len(data['all_film']))
    
    def test_get_lenses(self):
        res = self.client().get('/LensPage')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['lenses'])
        self.assertTrue(len(data['lenses']))
    

    def test_delete_product(self):
        res = self.client().delete('/CreateProduct')
        data = json.loads(res.data)

        product = Product.query.filter(Product.sku == 123456).one_or_none()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertEqual(data['deleted_product'], 123456)
        

    def test_update_product(self):
        res = self.client().patch('/CreateProduct')
        data = json.loads(res.data)

        product = Product.query.filter(Product.sku == 123456).one_or_none()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['product'])
    

    def test_422_if_product_creation_fails(self):
        res = self.client().post('/CreateProduct', json=self.new_product)
        data = json.load(res.data).decode('utf-8')
        pass

    def test_422_if_product_deletion_fails(self):
        res = self.client().delete('/CreateProduct', json=self.new_product)
        data = json.load(res.data).decode('utf-8')
        pass

    def test_422_if_product_updated_fails(self):
        res = self.client().patch('/CreateProduct', json=self.new_product)
        data = json.load(res.data).decode('utf-8')
        pass





    def roles_required(*roles):
        """Decorator which specifies that a user must have all the specified roles.
        Example::

            @app.route('/dashboard')
            @roles_required('admin', 'editor')
            def dashboard():
                return 'Dashboard'

        The current user must have both the `admin` role and `editor` role in order
        to view the page.

        :param args: The required roles.

        Source: https://github.com/mattupstate/flask-security/
        """
    
        def wrapper(fn):
            @wraps(fn)
            def decorated_view(*args, **kwargs):
                perms = [Permission(RoleNeed(role)) for role in roles]
                for perm in perms:
                    if not perm.can():
                        # return _get_unauthorized_view()
                        flask.abort(403)
                return fn(*args, **kwargs)
            return decorated_view
        return wrapper



    def roles_accepted(*roles):
        """Decorator which specifies that a user must have at least one of the
        specified roles. Example::

            @app.route('/create_post')
            @roles_accepted('editor', 'author')
            def create_post():
                return 'Create Post'

        The current user must have either the `editor` role or `author` role in
        order to view the page.

        :param args: The possible roles.
        """
        def wrapper(fn):
            @wraps(fn)
            def decorated_view(*args, **kwargs):
                perm = Permission(*[RoleNeed(role) for role in roles])
                if perm.can():
                    return fn(*args, **kwargs)
                abort(403)
            return decorated_view
        return wrapper


    def _on_principal_init(sender, identity):
        if identity.id == 'admin':
            identity.provides.add(RoleNeed('admin'))
        identity.provides.add(RoleNeed('member'))




        @app.before_request
        def determine_identity():
            # This is where you get your user authentication information. This can
            # be done many ways. For instance, you can store user information in the
            # session from previous login mechanism, or look for authentication
            # details in HTTP headers, the querystring, etc...
            identity_changed.send(app._get_current_object(), identity=Identity('admin'))

        @app.route('/')
        def index():
            return "OK"

        @app.route('/member')
        @roles_accepted('admin', 'member')
        def role_needed():
            return "OK"

        @app.route('/admin')
        @roles_required('admin')
        def connect_admin():
            return "OK"

        @app.route('/admin_b')
        @admin_permission.require()
        def connect_admin_alt():
            return "OK"

        return app


    admin_permission = Permission(RoleNeed('admin'))




# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()