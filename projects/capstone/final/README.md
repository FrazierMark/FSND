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

-[Three.js](https://threejs.org/) is a cross-browser JavaScript library and API used to create and display animated 3D computer graphics in a web browser using WebGL.

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

Each time you open a new terminal session, run:

```bash
export FLASK_APP=api.py;
```

To run the server, execute:

```bash
flask run --reload
```

The `--reload` flag will detect file changes and restart the server automatically.

### Install Dependencies - Frontend/Client
Navigate to /frontend

```
npm install
```

```
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.




## Endpoints
GET /CameraPage
Gets all camera products from the db.

Response:
```
{
  "cameras": [
    {
      "id": 1,
      "name": "Canon 5D Mark IV",
      "description": "Full Frame Camera",
      "sku": "6548458",
      "category": "camera",
      "price": "2000.00"
    },
    {
      "name": "Nikon 2600",
      "description": "Full Frame Camera",
      "sku": "6458458",
      "category": "camera",
      "price": "1000.00"
    }
  ],
  "success": true
}
```

GET /LensPage
Gets all lens products from the db.

Response:
```
{
  "lenses": [
    {
      "id": 3,
      "name": "Nikon 24-70mm",
      "description": "N-Mount Lens",
      "sku": "6544558",
      "category": "lens",
      "price": "2300.00"
    },
    {
      "id": 4,
      "name": "Leica",
      "description": "Summilux 35mm",
      "sku": "452458",
      "category": "lens",
      "price": "1000.00"
    }
  ],
  "success": true
}
```

GET /FilmPage
Gets all film products from the db.

```
Response:
{
  "all_film": [
    {
      "id": 5,
      "name": "Portra",
      "description": "ISO 400",
      "sku": "6544548",
      "category": "film",
      "price": "23.00"
    },
    {
      "id": 6,
      "name": "Ilford",
      "description": "B&W ISO 400",
      "sku": "4524845",
      "category": "film",
      "price": "10.00"
    }
  ],
  "success": true
}
```



POST /CreateProduct
Adds new product to the db.

```
Data:

{
  "name": "Portra",
  "description": "ISO 400",
  "sku": "6544548",
  "category": "film",
  "price": "23.00"
}
```

```
Response:

{
  'success': true,
  'product': {
                "name": "Portra",
                "description": "ISO 400",
                "sku": "6544548",
                "category": "film",
                "price": "23.00"
           }
  }
```

PATCH /CreateProducts
Edit product data in the db.

```
Data:

{
  "name": "Portra",
  "description": "ISO 400",
  "sku": "6544548",
  "category": "film",
  "price": "23.00"
}
```

```
Response:

{
  'success': true,
  'product': {
              "name": "Portra",
              "description": "ISO 400",
              "sku": "6544548",
              "category": "film",
              "price": "23.00"
            }
}
```


DELETE /CreateProduct
Delete a movie from the db.
```
Data:
{
  "sku": "6544548",
}
```
```
Response:

{
  'success': true,
  'deleted_product': 6544548
}
```


GET /CartPage
Gets all products from cart table by user.

```
Response:
{
  "cart_products": [
    {
      "id": 7,
      "user_id": "",
      "product_id": "ISO 400"
    }
  ],
  "success": true
}
```

## Tests
To run the tests, run python3 tests.py.


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


## Authors
Mark Frazier
