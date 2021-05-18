import os
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from sqlalchemy import exc
from flask_sqlalchemy import SQLAlchemy
import json
import sys
from flask_cors import CORS

from .database.models import db_drop_and_create_all, setup_db, Drink
from .auth.auth import AuthError, requires_auth


app = Flask(__name__)
setup_db(app)
cors = CORS(app)

db_drop_and_create_all()

@app.route('/drinks', methods=['GET'])
def retrieve_drinks():
    try:
        all_drinks = Drink.query.all()
        drinks = [drink.short() for drink in all_drinks]
        if all_drinks is None:
            abort(404)
        return jsonify({
        "success": True,
        "drinks": drinks,
    })
    except AuthError:
        abort(422)

@app.route('/drinks-detail', methods=['GET'])
@requires_auth('get:drinks-detail')
def retrieve_long_drinks(payload):
    all_drinks = Drink.query.all()
    drinks = [drink.long() for drink in all_drinks]
    if (len(drinks) < 1):
        abort(404)

    return jsonify({
        "success": True,
        "drinks": drinks,
    })


# @TODO implement endpoint
#     POST /drinks
#       it should require the 'post:drinks' permission
#        it should create a new row in the drinks table
#         it should contain the drink.long() data representation
#     returns status code 200 and json {"success": True, "drinks": drink} where drink an array containing only the newly created drink
#         or appropriate status code indicating reason for failure

@app.route('/drinks', methods=['POST'])
@requires_auth('post:drinks')
def create_new_drank(token):
    "If permission granted, will add drink to database."
    body = request.get_json()
    if body is None:
        abort(404)

    new_title = body.get('title', None)
    new_recipe = body.get('recipe', None)
    # json.dumps() method that converts dictionary objects of Python into JSON string data format.
    new_drank = Drink(title=new_title, recipe=json.dumps(new_recipe))

    try:
        new_drank.insert()
        new_drank = Drink.query.filter_by(id=new_drank.id)
        formatted_drank = [drink.long() for drink in new_drank]

        return jsonify({
            "success": True,
            "drinks": formatted_drank,
        })
    except AuthError:
        abort(422)
    






# @TODO implement endpoint
#     PATCH /drinks/<id>
#         where <id> is the existing model id
#         it should respond with a 404 error if <id> is not found
#         it should update the corresponding row for <id>
#         it should require the 'patch:drinks' permission
#         it should contain the drink.long() data representation
#     returns status code 200 and json {"success": True, "drinks": drink} where drink an array containing only the updated drink
#         or appropriate status code indicating reason for failure



# @TODO implement endpoint
#     DELETE /drinks/<id>
#         where <id> is the existing model id
#         it should respond with a 404 error if <id> is not found
#         it should delete the corresponding row for <id>
#         it should require the 'delete:drinks' permission
#     returns status code 200 and json {"success": True, "delete": id} where id is the id of the deleted record
#         or appropriate status code indicating reason for failure


# Error Handling
# Example error handling for unprocessable entity


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

@app.errorhandler(400)
def bad_request(error):
    return jsonify({
    "success": False, 
    "error": 400,
    "message": "Bad Request"
    }), 400

@app.errorhandler(500)
def bad_request(error):
    return jsonify({
    "success": False, 
    "error": 500,
    "message": "Internal Server Error"
    }), 500

@app.errorhandler(AuthError)
def authError(error):
    return jsonify({
        "success": False, 
        "error": error.error["code"],
        "message": error.error["description"]
    }), error.status_code

