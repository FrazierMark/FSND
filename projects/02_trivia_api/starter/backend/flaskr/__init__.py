import os
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random
import sys
from models import setup_db, Question, Category

QUESTIONS_PER_PAGE = 10

def create_app(test_config=None):
  # create and configure the app
  app = Flask(__name__)
  setup_db(app)
  cors = CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

  @app.after_request
  def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,true')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
    return response


  def get_all_categories():
    #query to Category returns rows, that then are able to be accessed via methods
    categories = Category.query.all()
    categories_dict = {}
    for category in categories:
      categories_dict[category.id] = category.type
    return categories_dict
  
  @app.route('/categories')
  def get_categories():
    #query to Category returns rows, that then are able to be accessed via methods
    categories = Category.query.all()
    categories_dict = {}
    for category in categories:
      categories_dict[category.id] = category.type

    return jsonify({
      'categories': categories_dict
    })
  

  def paginate_questions(request, selection):
    "Function to paginate questions, 10 Question per page."
    page = request.args.get('page', 1, type=int)
    start =  (page - 1) * QUESTIONS_PER_PAGE
    end = start + QUESTIONS_PER_PAGE

    questions = [question.format() for question in selection]
    paginated_questions = questions[start:end]
    return paginated_questions


  @app.route('/questions')
  def retrieve_questions():
    selection = Question.query.all()
    paginated_questions = paginate_questions(request, selection)

    if len(paginated_questions) == 0:
      abort(404)

    return jsonify({
      'success': True,
      'questions': paginated_questions,
      'total_questions': len(Question.query.all()),
      'current_categories': None,
      'categories': get_all_categories(),
    })

  @app.route('/questions/<int:question_id>', methods=['DELETE'])
  def delete_question(question_id):
    question = Question.query.filter(Question.id == question_id).one_or_none()
    if question is None:
      abort(404)
    
    try:
      question.delete()

    except Exception as e:
      abort(422)

    else:
      selection = Question.query.all()
      current_questions = paginate_questions(request, selection)
      return jsonify({
        'success': True,
        'deleted': question_id,
        'questions': current_questions,
        'total_questions': len(Question.query.all())
      })

  @app.route('/questions', methods=['POST'])
  def create_new_question():
    "Add a new trivia question to Database"
    # Sumbitted info from the client via ajax
    body = request.get_json()
    print(body)

    new_question = body.get('question', None)
    new_answer = body.get('answer', None)
    new_category = body.get('category', None)
    new_difficulty = body.get('difficulty', None)
    
  
    # create a new question entry and insert to db
    question = Question(question=new_question, answer=new_answer, category=new_category, difficulty=new_difficulty)
    try:
      question.insert()
      selection = Question.query.all()
      current_questions = paginate_questions(request, selection)
      
      return jsonify({
        'success': True,
        'created': new_question,
        'questions': current_questions,
        'total_quesitons': len(Question.query.all())
        })

    except Exception as e:
      abort(422)

  @app.route('/questions/search', methods= ['POST'])
  def search_questions():
    search = request.get_json().get('searchTerm', None)
    try:
      search_query_res = Question.query.filter(Question.question.ilike('%{}%'.format(search))).all()
      formatted_questions = paginate_questions(request, search_query_res)

      return jsonify({
            'success': True,
            'questions': formatted_questions,
            'total_questions': len(formatted_questions),
            'current_category': None,
          })
    except:
      print(sys.exc_info())
      abort(422)


  @app.route('/categories/<int:category_id>/questions', methods = ['GET'])
  def search_questions_by_category(category_id):

    retrieved_questions = Question.query.filter_by(category=category_id).all()
    
    if retrieved_questions is None:
      abort(404)

    try:
      formatted_questions = paginate_questions(request, retrieved_questions)

      return jsonify({
            'success': True,
            'questions': formatted_questions,
            'total_questions': len(formatted_questions),
            'current_category': category_id,
          })

    except:
      print(sys.exc_info())
      abort(422)

  @app.route('/quizzes', methods = ['POST'])
  def play_game():
    data = request.get_json()

    previous_questions = data.get('previous_questions', [])
    quiz_category = data.get('quiz_category', None)
    not_asked = []

    if quiz_category['id'] == 0:
      category_questions = Question.query.all()
    else:
      category_questions = Question.query.filter(Question.category == quiz_category['id']).all()

    # loop through all category questions and add not_asked questions to list
    for question in category_questions:
      if question.id not in previous_questions:
        not_asked.append(question.format())


    # get random not-asked question from list
    random_category_question = random.choice(not_asked)
    print(random_category_question)
    # add this question to previous_questions list
    previous_questions.append(random_category_question)
    print(previous_questions)
    try:
      return jsonify({
        'success': True,
        'previousQuestions': previous_questions,
        'currentQuestion': random_category_question,
        })
    
    except:
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

  @app.errorhandler(400)
  def bad_request(error):
    return jsonify({
      "success": False, 
      "error": 400,
      "message": "Bad Request"
      }), 400
  
  
  return app

    