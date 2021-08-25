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
import json

from .database.models import db_drop_and_create_all, setup_db, Product
from .auth.auth import AuthError, requires_auth




app = Flask(__name__) 
setup_db(app)
cors = CORS(app)

# db_drop_and_create_all()

app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)


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




@app.route('/CreateProduct', methods=['POST'])
@requires_auth('post:product')
def create_new_product(token): #<<<<<<<<<Token in function when using @requires_auth
    """If permission granted, will add Camera will be added to DB."""
    #print(token)
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

@app.route('/CreateProduct', methods=['PATCH'])
@requires_auth('patch:product')
def edit_product(token):
    "API endpoint to edit product in database if permission granted."
    body = request.get_json()
    if body is None:
        abort(404)

    print(body)

    sku = body.get('sku', None)
    print(sku)
    
    try:
        product_needs_edit = Product.query.filter_by(sku = sku).one_or_none()
        if product_needs_edit is None:
            print('Nothing here....')
            abort(404)
         # check if title has been updated from frontend, then update variable
        if body.get('name'):
            name = body['name']
            product_needs_edit.name = name  
        # check if description has been updated from frontend, then update variable
        if body.get('description'):
            description = body['description']
            product_needs_edit.description = description
        if body.get('category'):
            category = body['category']
            product_needs_edit.category = category
        if body.get('price'):
            price = body['price']
            product_needs_edit.price = price

        # update db
        product_needs_edit.update()
        # retrieve edited object and return to frontend
        updated_product = Product.query.filter_by(sku = sku)
        print(updated_product)
        formatted_product = [product.format() for product in updated_product]

        return jsonify({
            "success": True,
            "product": formatted_product
        })
    except AuthError:
        print(sys.exc_info)
        abort(422)


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

@app.route('/CreateProduct', methods=['DELETE'])
@requires_auth('delete:product')
def delete_product(token):
    "API endpoint to delete drink in database if permission granted."
    body = request.get_json()
    if body is None:
        abort(404)

    sku = body["deletedProduct"]
    sku = int(sku["sku"])


    try:
        product_to_delete = Product.query.filter_by(sku = sku).one_or_none()
        # print(product_to_delete)
        if product_to_delete is None:
            abort(404)

        product_to_delete.delete()

        return jsonify({
            "success": True,
            "delete": sku
        })

    except AuthError:
        print(sys.exc_info)
        abort(422)



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

