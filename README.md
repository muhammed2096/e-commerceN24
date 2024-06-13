
E-commerce App Backend
This is the backend of an E-commerce application built using Node.js, Express.js, and MongoDB. The backend provides APIs for managing products, users, orders, categories, subcategories, and other functionalities required for an e-commerce platform.

Table of Contents
Features
Technologies Used
Installation
Configuration
Running the Application
API Endpoints
Folder Structure
Contributing
License
Features
User authentication and authorization
Product management (CRUD operations)
Order management (CRUD operations)
Category management (CRUD operations)
Subcategory management (CRUD operations)
Cart management
Wishlist management
Secure password handling with bcrypt
JSON Web Tokens (JWT) for secure user sessions
RESTful API design
Technologies Used
Node.js
Express.js
MongoDB
Mongoose (for MongoDB object modeling)
bcrypt (for password hashing)
JSON Web Tokens (JWT) (for authentication)
dotenv (for environment variables)
Installation
Clone the repository

git clone https://github.com/yourusername/ecommerce-app-backend.git
cd ecommerce-app-backend
Install dependencies

npm install
Set up environment variables
Create a .env file in the root directory and add the following environment variables:

PORT=3000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
Configuration
Make sure to configure the .env file with your MongoDB URI and JWT secret key.

Running the Application
To start the application, run:

npm start
The server will start on the port specified in the .env file (default is 3000).

API Endpoints
Authentication
Register

POST /api/auth/register
Body: {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
Login

POST /api/auth/login
Body: {
    "email": "john@example.com",
    "password": "password123"
}
Products
Get all products

GET /api/products
Get a product by ID

GET /api/products/:id
Create a new product

POST /api/products
Body: {
    "name": "Product Name",
    "description": "Product Description",
    "price": 100,
    "category": "Category ID",
    "subcategory": "Subcategory ID",
    "image": "image_url"
}
Update a product

PUT /api/products/:id
Body: {
    "name": "Updated Product Name",
    "description": "Updated Product Description",
    "price": 150
}
Delete a product

DELETE /api/products/:id
Orders
Get all orders

GET /api/orders
Get an order by ID

bash
Copy code
GET /api/orders/:id
Create a new order

POST /api/orders
Body: {
    "user": "userId",
    "products": [
        {
            "product": "productId",
            "quantity": 2
        }
    ],
    "totalPrice": 200
}
Update an order

PUT /api/orders/:id
Body: {
    "status": "shipped"
}
Delete an order

DELETE /api/orders/:id
Categories
Get all categories

GET /api/categories
Get a category by ID

GET /api/categories/:id
Create a new category

POST /api/categories
Body: {
    "name": "Category Name"
}
Update a category

PUT /api/categories/:id
Body: {
    "name": "Updated Category Name"
}
Delete a category

DELETE /api/categories/:id
Subcategories
Get all subcategories

GET /api/subcategories
Get a subcategory by ID

GET /api/subcategories/:id
Create a new subcategory

POST /api/subcategories
Body: {
    "name": "Subcategory Name",
    "category": "Category ID"
}
Update a subcategory

PUT /api/subcategories/:id
Body: {
    "name": "Updated Subcategory Name"
}
Delete a subcategory

DELETE /api/subcategories/:id
Folder Structure

ecommerce-app-backend/
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   ├── categoryController.js
│   ├── subcategoryController.js
│   └── ...
├── models/
│   ├── userModel.js
│   ├── productModel.js
│   ├── orderModel.js
│   ├── categoryModel.js
│   ├── subcategoryModel.js
│   └── ...
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   ├── categoryRoutes.js
│   ├── subcategoryRoutes.js
│   └── ...
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── ...
├── .env
├── server.js
├── package.json
└── README.md
Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any changes you'd like to make.

License
This project is licensed under the MIT License. See the LICENSE file for details.
