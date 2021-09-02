# Full Stack Grainy Days Camera Store Backend
## Grainy Days Specifications
The Grainy Days Camera Store models a photography e-commerce site that sells cameras, lenses, and film. Through the management page ('/CreateProduct') you can create, update, and delete products that are then listed in the navbar links.

## Motivation for this project
This is the capstone project for Udacity's fullstack nanodegree program. I wanted to create a website from scratch that had full backend and frontend capabilities. Also, I wanted to challenge myself by implementing a frontend user expereince that utilized a 3D space. 

### Getting Started

## Virtual Enviornment
To setup vurtual environment run the following command

pipenv shell

## Installing Dependencies


## Database Setup
The project uses Postgresql as its database. To update the database and seed run the following :

python manage.py db upgrade
python manage.py seed
you may need to change the database url in setup.sh after which you can run
source setup.sh
Start server by running
flask run


## Project dependencies

Installing Dependencies
Python 3.7
Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

## pipenv install -r requirements.txt
This will install all of the required packages within the requirements.txt file.


# Key Dependencies
- [Flask](http://flask.pocoo.org/) is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM we'll use handle the lightweight sqlite database. You'll primarily work in app.py and can reference models.py.

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross origin requests from our frontend server.

- [jose](https://python-jose.readthedocs.io/en/latest/) JavaScript Object Signing and Encryption for JWTs. Useful for encoding, decoding, and verifying JWTS.

- [Pycodestyle](https://pypi.org/project/pycodestyle/) - pycodestyle is a tool to check your Python code against some of the style conventions in PEP 8.



## Authentication
Authentication is implemented using Auth0, it uses RBAC to assign permissions using roles. 


# Auth0 Roles and Permissions
Currently there are 2 set roles within this Project.
- Administrator
- Manager

The Administrator role has the following 3 permissions:
- post:product
- delete:product
- patch:product

The Manager role has 1 permission:
- post:product


To signin as a Manager, click "Log In" and use the following credential information:
- email address:     manager@123.com
- password:          Password!123

To signin as an Administrator with full access, click "Log In" and use the following credential information:
- email address:    admin@123.com
- password:         Password!123


## Testing
Replace the jwt tokens in test_app.py with the ones generated on the website.

For testing locally, we need to reset database. To reset database, run

python manage.py db downgrade
python manage.py db upgrade
python manage.py seed

Error Handling
401 errors due to RBAC are returned as
{
  "code": "unauthorized",
  "description": "Permission not found."
}
Other Errors are returned in the following json format:

{
  "success": "False",
  "error": 422,
  "message": "Unprocessable entity"
}
The error codes currently returned are:

400 – bad request
401 – unauthorized
404 – resource not found
422 – unprocessable
500 – internal server error



## Running the server

From within the `./src` directory first ensure you are working using your created virtual environment.

Each time you open a new terminal session, run:

```bash
export FLASK_APP=api.py;
```

To run the server, execute:

```bash
flask run --reload
```

The `--reload` flag will detect file changes and restart the server automatically.



## Authors
Mark Frazier
