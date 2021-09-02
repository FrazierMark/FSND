# Grainy Days Camera Store App
## Full Stack Web Application w/ CRUD capablilites
## Grainy Days Specifications
The Grainy Days Camera Store models a photography e-commerce site that sells cameras, lenses, and film. Through the management page ('/CreateProduct') you can create, update, and delete products that are then listed on their respective pages.

## Motivation for this project
This is the capstone project for Udacity's fullstack nanodegree program. I wanted to create a website from scratch that had full backend and frontend capabilities. Also, I wanted to challenge myself by implementing a frontend user expereince that utilized 3D assests. The library I used to achieve this was, @react-three-fiber (an abstraction from Three.js).

## Grainy Days App Hosted on Heroku
### https://grainydayz.herokuapp.com/
(Loading is a bit slow, so please be patient.)


## Authentication
### Auth0 Roles and Permissions
Authentication is implemented using Auth0, it uses RBAC to assign permissions using roles.

Currently there are 2 set roles within this Project.
- Administrator
- Manager

The Administrator role has the following 3 permissions:
- post:product
- delete:product
- patch:product

The Manager role has 1 permission:
- post:product

### To signin as a Manager, click "Log In" and use the following credential information:
- email address:     manager@123.com
- password:          Password!123

### To signin as an Administrator with full access, click "Log In" and use the following credential information:
- email address:    admin@123.com
- password:         Password!123



## Getting Started

# Key Dependencies

-[three.js](https://threejs.org/) is a cross-browser JavaScript library and API used to create and display animated 3D computer graphics in a web browser using WebGL.

- [Flask](http://flask.pocoo.org/) is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM we'll use handle the lightweight sqlite database. You'll primarily work in app.py and can reference models.py.

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross origin requests from our frontend server.

- [jose](https://python-jose.readthedocs.io/en/latest/) JavaScript Object Signing and Encryption for JWTs. Useful for encoding, decoding, and verifying JWTS.

Python 3.7
Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

- [Pycodestyle](https://pypi.org/project/pycodestyle/) - pycodestyle is a tool to check your Python code against some of the style conventions in PEP 8.


### Installing Dependencies - Backend/Server
Navigate to /backend/src
```
pip install -r requirements.txt
```

To run the server locally...

```
export FLASK_APP=app
```

```
flask run --reload
```

### Install Dependencies - Frontend/Client
Navigate to /frontend

```
npm install
```

```
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

## Testing
Replace the jwt tokens in test_app.py with the ones generated on the website.

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




## Tests
To run the tests, run python3 tests.py.

## Authors
Mark Frazier
