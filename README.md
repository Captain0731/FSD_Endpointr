# Demo-main API

A Node.js RESTful API for managing products, orders, carts, students, and users.

## Getting Started

1. **Install dependencies:**
   ```
npm install
   ```
2. **Start the server:**
   ```
node app.js
   ```
   The server runs on `http://localhost:3000` by default.

---

## API Endpoints

### Products
- `GET /products` — Get all products
- `GET /products/:id` — Get product by ID
- `POST /products` — Create product
  - Body: `{ "name": string, "price": number, "description"?: string }`
- `PUT /products/:id` — Update product by ID
- `DELETE /products/:id` — Delete product by ID

### Orders
- `POST /orders` — Place order
  - Body: `{ "userId": string, "items": object, "totalAmount": number }`
- `GET /orders` — Get order history

### Cart
- `GET /cart` — Get cart
- `POST /cart/add` — Add to cart
  - Body: `{ "userId": string, "productId": number, "quantity": number }`
- `POST /cart/remove` — Remove from cart

### Students
- `GET /students` — Get all students
- `GET /students/:id` — Get student by ID
- `POST /students` — Create student
- `PUT /students/:id` — Update student
- `DELETE /students/:id` — Delete student

### Users
- `GET /users` — Get all users
- `GET /users/:id` — Get user by ID
- `POST /users` — Create user
  - Body: `{ "name": string, "email": string }`
- `PUT /users/:id` — Update user
- `DELETE /users/:id` — Delete user

---

## Example Request (PowerShell)

```
Invoke-RestMethod -Uri http://localhost:3000/products -Method Post -Body '{"name": "Sample Product", "price": 100}' -ContentType "application/json"
```

---

## Project Structure

- `app.js` — Main application file
- `controllers/` — Route logic
- `routes/` — API route definitions
- `middleware/` — Custom middleware (validation, error handling)



## How to Create a New API Endpoint

Follow these steps to add a new endpoint for any resource (e.g., products, orders, users, etc.):

### 1. Create or Update the Controller
Add a function in the appropriate controller file (e.g., `controllers/productcontroller.js`).

Example for creating a product:
```js
exports.createProduct = (req, res) => {
  // Your logic to create a product
};
```

### 2. Define the Route
Add a route in the corresponding route file (e.g., `routes/productroute.js`).

Example:
```js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');

router.post('/', productController.createProduct);

module.exports = router;
```

### 3. Register the Route in app.js
Import and use the route in `app.js`:
```js
const productRoutes = require('./routes/productroute');
app.use('/products', productRoutes);
```

### 4. (Optional) Add Validation Middleware
If you want to validate request data, use a middleware before your controller in the route:
```js
const validateRequest = require('../middleware/validation');
const productSchema = { name: { type: 'string', required: true }, price: { type: 'number', required: true } };
router.post('/', validateRequest(productSchema), productController.createProduct);
```

### 5. Test Your Endpoint
Use Postman, curl, or PowerShell to send requests to your new endpoint.

---

## Step-by-Step Examples for All Main Resources

### Products
- **POST /products**
  - Controller: `createProduct` in `controllers/productcontroller.js`
  - Route: `router.post('/', validateRequest(productSchema), productController.createProduct);` in `routes/productroute.js`
  - Example request body:
    ```json
    { "name": "Sample Product", "price": 100, "description": "Optional desc" }
    ```

### Orders
- **POST /orders**
  - Controller: `placeOrder` in `controllers/ordercontroller.js`
  - Route: `router.post('/', validateRequest(orderSchema), orderController.placeOrder);` in `routes/orderroute.js`
  - Example request body:
    ```json
    { "userId": "user123", "items": { "productId": 1, "quantity": 2 }, "totalAmount": 200 }
    ```

### Cart
- **POST /cart/add**
  - Controller: `addToCart` in `controllers/cartcontroller.js`
  - Route: `router.post('/add', validateRequest(cartAddSchema), cartController.addToCart);` in `routes/cartroute.js`
  - Example request body:
    ```json
    { "userId": "user123", "productId": 1, "quantity": 2 }
    ```

### Students
- **POST /students**
  - Controller: `createStudent` in `controllers/studentcontroller.js`
  - Route: `router.post('/', studentController.createStudent);` in `routes/studentroute.js`
  - Example request body:
    ```json
    { "name": "John Doe", "age": 20 }
    ```

### Users
- **POST /users**
  - Controller: `createUser` in `controllers/usercontroller.js`
  - Route: `router.post('/', validateRequest(userSchema), userController.createUser);` in `routes/userroute.js`
  - Example request body:
    ```json
    { "name": "Jane Doe", "email": "jane@example.com" }
    ```
