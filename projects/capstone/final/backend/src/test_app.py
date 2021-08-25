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
from .database.models import setup_db, Product, Cart


def create_app(test_config=None):
  # create and configure the app
  app = Flask(__name__)
  setup_db(app)
  cors = CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)


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
            'id': 'What tall is a 1ft cat?',
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

    def test_get_paginated_questions(self):
        res = self.client().get('/questions')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['total_questions'])
        self.assertTrue(len(data['questions']))
    
    def test_404_beyond_valid_page(self):
        res = self.client().get('/questions?page=1000', json={'rating': 1})
        data = json.load(res.data).decode('utf-8')

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'resource not found')

    def test_delete_question(self):
        res = self.client().delete('/questions/9')

        data = json.loads(res.data)

        question = Question.query.filter(Question.id == 9).one_or_none()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertEqual(data['deleted'], 9)
        self.assertTrue(data['total_questions'])
        self.assertTrue(len(data['questions']))
        self.assertEqual(question, None)


    def test_422_if_question_creation_fails(self):
        res = self.client().post('/questions', json=self.new_question)
        data = json.load(res.data).decode('utf-8')
        pass

    def test_get_question_search_with_results(self):
        res = self.client().post('/questions/search', json={'searchTerm': 'africa'})
        
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['total_questions'])
    
    def test_422_if_get_question_search_fails(self):
        res = self.slient().post('/questions/search', json={'seachTerm':'africa'})
        data = json.loads(res.data)
        pass

    def test_search_questions_by_category(self):
        res = self.client().get('/categoryies/2/questions')
        data = json.load(res.data).decode('utf-8')

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['total_questions'])
        self.assertTrue(data['questions'])
        self.assertTrue(data['current_category'])

    def test_422_if_search_question_by_category_fails(self):
        res = self.client().get('/questions/2/questions')
        data = json.load(res.data).decode('utf-8')
        pass

    def test_play_game(self):
        res = self.client().post('quizzes', json={
            'previous_questions': [2, 5],
            'quiz_category': {
                'type': 'History',
                'id': 4
            }
        })
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['previousQuestions'])
        self.assertTrue(data['currentQuestion'])
    
    def test_422_if_play_quizzes_fails(self):
        res = self.client().post('quizzes', json={
            'previous_questions': [2, 5],
            'quiz_category': {
                'type': 'History',
                'id': 4
            }    
        })
        data = json.loads(res.data)
        pass

        







# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()