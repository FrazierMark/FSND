from itertools import product
import os
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from sqlalchemy import exc
from flask_sqlalchemy import SQLAlchemy
import json
import sys
from flask_cors import CORS
import time

from .database.models import db_drop_and_create_all, setup_db, Product
from .auth.auth import AuthError, requires_auth


app = Flask(__name__) 
setup_db(app)
cors = CORS(app)


db_drop_and_create_all()

@app.route('/time')
def get_current_time():
    return {'time': time.time()}



# @app.route("/CameraPage", defaults={'path':''})
# def serve(path):
#     return send_from_directory(app.static_folder,'index.html')


@app.route('/CameraPage', methods=['GET'])
def get_cameras():
    # Retrieves all cameras from the db, no permissions required
    
    try:
        all_cameras = Product.query.filter_by(category = 'camera')
        cameras = [camera.format() for camera in all_cameras]
        
        if all_cameras is None:
            abort(404)
        return jsonify({
        "success": True,
        "cameras": cameras,
    })
    except AuthError:
        abort(422)


@app.route('/LensPage', methods=['GET'])
def get_lenses():
    # Retrieves all lenses from the db, no permissions required
    
    try:
        all_lenses = Product.query.filter_by(category = 'lens')
        lenses = [lens.format() for lens in all_lenses]
        
        if all_lenses is None:
            abort(404)
        return jsonify({
        "success": True,
        "lenses": lenses,
    })
    except AuthError:
        abort(422)


@app.route('/FilmPage', methods=['GET'])
def get_all_film():
    # Retrieves all film from the db, no permissions required
    
    try:
        all_film = Product.query.filter_by(category = 'film')
        all_film = [film.format() for film in all_film]
        
        if all_film is None:
            abort(404)
        return jsonify({
        "success": True,
        "all_film": all_film,
    })
    except AuthError:
        abort(422)

# @app.route('/drinks-detail', methods=['GET'])
# @requires_auth('get:drinks-detail')
# def retrieve_long_drinks(payload):
#     # Retrieves all drinks w/ recipes from db if permission is granted
#     all_drinks = Drink.query.all()
#     drinks = [drink.long() for drink in all_drinks]
#     if (len(drinks) < 1):
#         abort(404)

#     return jsonify({
#         "success": True,
#         "drinks": drinks,
#     })







@app.route('/CreateProduct', methods=['POST'])
# @requires_auth('post:cameras')
def create_new_product(): #<<<<<<<<<Token in function when using @requires_auth
    """If permission granted, will add Camera will be added to DB."""
    body = request.get_json()
    if body is None:
        abort(404)

    print(body)

    new_name = body.get('name', None)
    new_description = body.get('description', None)
    new_sku = body.get('sku', None)
    new_category = body.get('category', None)
    new_price = body.get('price', None)
    
    # json.dumps() method that converts dictionary objects of Python into JSON string data format.
    new_product = Product(name=new_name, description=new_description, sku=new_sku, category=new_category, price=new_price)
    
    try:
        new_product.insert()
        print(new_product.id)
        new_product = Product.query.filter_by(id= int(new_product.id))
        

        added_product = [product.format() for product in new_product]

        return jsonify({
            "success": True,
            "product": added_product,
        })
    except AuthError:
        abort(422)
    

# @app.route('/CreateProduct', methods=['POST'])
# @requires_auth('post:cameras')
# def create_new_camera(token):
#     """If permission granted, will add drink to database."""
#     body = request.get_json()
#     if body is None:
#         abort(404)

#     new_brand = body.get('brand', None)
#     new_model = body.get('model', None)
#     new_model = body.get('model', None)
    
#     # json.dumps() method that converts dictionary objects of Python into JSON string data format.
#     new_drank = Drink(title=new_title, recipe=json.dumps(new_recipe))

#     try:
#         new_drank.insert()
#         new_drank = Drink.query.filter_by(id=new_drank.id)
#         formatted_drank = [drink.long() for drink in new_drank]

#         return jsonify({
#             "success": True,
#             "drinks": formatted_drank,
#         })
#     except AuthError:
#         abort(422)
    


# @app.route('/drinks/<int:drink_id>', methods=['PATCH'])
# @requires_auth('patch:drinks')
# def edit_drinks(payload, drink_id):
#     "API endpoint to edit drink in database if permission granted."
#     body = request.get_json()
#     try:
#         drink_needs_edit = Drink.query.filter_by(id = int(drink_id)).one_or_none()
#         if drink_needs_edit is None:
#             print('Nothing here....')
#             abort(404)
#          # check if title has been updated from frontend, then update variable
#         if body.get('title'):
#             title = body['title']
#             drink_needs_edit.title = title   
#         # check if recipe has been updated from frontend, then update variable
#         if body.get('recipe'):
#             getrecipe = body['recipe']
#             recipe = [getrecipe]
#             recipe = json.dumps(getrecipe)
#             drink_needs_edit.recipe = recipe
#         # update db
#         drink_needs_edit.update()
#         # retrieve edited object and return to frontend
#         edited_drink = Drink.query.filter_by(id = int(drink_id)).one_or_none()
#         return jsonify({
#             "success": True,
#             "drinks": [edited_drink.long()]
#         })
#     except AuthError:
#         print(sys.exc_info)
#         abort(422)

# @app.route('/drinks/<int:drink_id>', methods=['DELETE'])
# @requires_auth('delete:drinks')
# def delete_drink(payload, drink_id):
#     "API endpoint to delete drink in database if permission granted."
#     try:
#         drink_to_delete = Drink.query.filter_by(id = int(drink_id)).one_or_none()
#         if drink_to_delete is None:
#             abort(404)

#         drink_to_delete.delete()

#         return jsonify({
#             "success": True,
#             "delete": drink_id
#         })

#     except AuthError:
#         print(sys.exc_info)
#         abort(422)


@app.errorhandler(404)
def not_found(error):
    return jsonify({
    'success': False,
    'error': 404,
    'message': 'Resource Not Found'
    }), 404

@app.errorhandler(422)
def unprocessable(error):
    return jsonify({
    "success": False, 
    "error": 422,
    "message": "Unprocessable"
    }), 422

@app.errorhandler(403)
def bad_request(error):
    return jsonify({
    "success": False, 
    "error": 403,
    "message": "Forbidden"
    }), 403

@app.errorhandler(500)
def bad_request(error):
    return jsonify({
    "success": False, 
    "error": 500,
    "message": "Internal Server Error"
    }), 500

@app.errorhandler(400)
def bad_request(error):
    return jsonify({
    "success": False, 
    "error": 400,
    "message": "Bad Request"
    }), 400

@app.errorhandler(AuthError)
def authError(error):
    return jsonify({
        "success": False, 
        "error": error.error["code"],
        "message": error.error["description"]
    }), error.status_code

