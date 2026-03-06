# Demo — Backend REST API with Express & MongoDB

A Node.js backend application built with **Express.js** and **MongoDB (Mongoose)** providing REST APIs for `/products`, `/users`, `/cart`, `/orders`, and `/students` with data validation middleware and server-side error handling.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Start the Server](#start-the-server)
- [Seed Dummy Data](#seed-dummy-data)
- [Database Schemas](#database-schemas)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Error Handling](#error-handling)

---

## Project Structure

```
Demo-main/
├── controllers/
│   ├── studentcontroller.js   # Student CRUD operations
│   ├── userController.js      # User CRUD operations
│   ├── productController.js   # Product CRUD operations
│   ├── orderController.js     # Order CRUD operations
│   └── cartController.js      # Cart CRUD operations
├── middleware/
│   ├── validate.js            # Request validation middleware
│   └── errorHandler.js        # Global error handling middleware
├── models/
│   ├── students.js            # Student schema
│   ├── User.js                # User schema
│   ├── Product.js             # Product schema
│   ├── Order.js               # Order schema
│   └── Cart.js                # Cart schema
├── routes/
│   ├── studentroute.js        # /students routes
│   ├── userRoutes.js          # /users routes
│   ├── productRoutes.js       # /products routes
│   ├── orderRoutes.js         # /orders routes
│   └── cartRoutes.js          # /cart routes
├── app.js                     # Express app entry point + MongoDB connection
├── seed.js                    # Script to populate database with dummy data
└── package.json               # Dependencies & scripts
```

---

## Tech Stack

| Technology | Purpose              |
|------------|----------------------|
| Node.js    | JavaScript runtime   |
| Express.js | Web framework        |
| MongoDB    | NoSQL database       |
| Mongoose   | MongoDB ODM library  |

---

## Installation

```bash
cd Demo-main
npm install
```

---

## Start the Server

```bash
node app.js
```

**Output:**
```
MongoDB Connected
Server running on port 3000
```

The API is accessible at `http://localhost:3000`.

**MongoDB Connection:** `mongodb://localhost:27017/Demo`

---

## Seed Dummy Data

```bash
node seed.js
```

This inserts 5 users, 8 products, 3 orders, and 2 carts into the database.

---

## Database Schemas

### User Schema

| Field      | Type   | Required | Constraints                              |
|------------|--------|----------|------------------------------------------|
| `name`     | String | Yes      | Trimmed                                  |
| `email`    | String | Yes      | Unique, lowercase, valid email format    |
| `password` | String | Yes      | Minimum 6 characters                     |
| `role`     | String | No       | Enum: `customer`, `admin` (default: `customer`) |

### Product Schema

| Field         | Type   | Required | Constraints        |
|---------------|--------|----------|--------------------|
| `name`        | String | Yes      | Trimmed            |
| `description` | String | No       | Default: `""`      |
| `price`       | Number | Yes      | Min: 0             |
| `category`    | String | Yes      | —                  |
| `stock`       | Number | No       | Default: 0, min: 0 |
| `image`       | String | No       | Default: `""`      |

### Order Schema

| Field             | Type     | Required | Constraints                                                        |
|-------------------|----------|----------|--------------------------------------------------------------------|
| `user`            | ObjectId | Yes      | References `User`                                                  |
| `items`           | Array    | —        | `[{ product (ref Product), quantity (min 1), price }]`             |
| `totalAmount`     | Number   | Yes      | —                                                                  |
| `status`          | String   | No       | Enum: `pending`, `processing`, `shipped`, `delivered`, `cancelled` |
| `shippingAddress` | Object   | No       | `{ street, city, state, zip, country }`                            |

### Cart Schema

| Field  | Type     | Required | Constraints                                  |
|--------|----------|----------|----------------------------------------------|
| `user` | ObjectId | Yes      | References `User`, unique (one cart per user) |
| `items`| Array    | —        | `[{ product (ref Product), quantity (min 1) }]` |

### Student Schema

| Field       | Type   | Required | Constraints |
|-------------|--------|----------|-------------|
| `name`      | String | Yes      | —           |
| `email`     | String | Yes      | Unique      |
| `course`    | String | No       | —           |
| `createdAt` | Date   | No       | Auto        |

---

## API Endpoints

### Users — `/users`

| Method | Endpoint | Description       | Validation                              |
|--------|----------|-------------------|-----------------------------------------|
| POST   | `/`      | Create a user     | Required: `name`, `email`, `password` + email format |
| GET    | `/`      | Get all users     | —                                       |
| GET    | `/:id`   | Get user by ID    | Valid ObjectId                          |
| PUT    | `/:id`   | Update user       | Valid ObjectId + email format           |
| DELETE | `/:id`   | Delete user       | Valid ObjectId                          |

### Products — `/products`

| Method | Endpoint | Description             | Validation                                      |
|--------|----------|-------------------------|-------------------------------------------------|
| POST   | `/`      | Create a product        | Required: `name`, `price`, `category` + positive numbers |
| GET    | `/`      | Get all products        | Optional query: `?category=Electronics`         |
| GET    | `/:id`   | Get product by ID       | Valid ObjectId                                  |
| PUT    | `/:id`   | Update product          | Valid ObjectId + positive numbers               |
| DELETE | `/:id`   | Delete product          | Valid ObjectId                                  |

### Orders — `/orders`

| Method | Endpoint | Description             | Validation                                |
|--------|----------|-------------------------|-------------------------------------------|
| POST   | `/`      | Create an order         | Required: `user`, `items`, `totalAmount`  |
| GET    | `/`      | Get all orders          | Optional query: `?user=<userId>`          |
| GET    | `/:id`   | Get order by ID         | Valid ObjectId                            |
| PUT    | `/:id`   | Update order            | Valid ObjectId                            |
| DELETE | `/:id`   | Delete order            | Valid ObjectId                            |

### Cart — `/cart`

| Method | Endpoint                | Description            | Validation                        |
|--------|-------------------------|------------------------|-----------------------------------|
| GET    | `/:userId`              | Get user's cart        | Valid ObjectId                    |
| POST   | `/:userId`              | Add item to cart       | Valid ObjectId + required: `productId` |
| PUT    | `/:userId/:productId`   | Update item quantity   | Valid ObjectIds + required: `quantity` |
| DELETE | `/:userId/:productId`   | Remove item from cart  | Valid ObjectIds                   |
| DELETE | `/:userId`              | Clear entire cart      | Valid ObjectId                    |

### Students — `/students`

| Method | Endpoint | Description          |
|--------|----------|----------------------|
| POST   | `/`      | Create a student     |
| GET    | `/`      | Get all students     |
| GET    | `/:id`   | Get student by ID    |
| PUT    | `/:id`   | Update student       |
| DELETE | `/:id`   | Delete student       |

---

## Middleware

### Data Validation (`middleware/validate.js`)

| Middleware              | Purpose                                          |
|-------------------------|--------------------------------------------------|
| `validateRequired(fields)` | Checks that specified fields are present and non-empty |
| `validateEmail`         | Validates email format using regex               |
| `validatePositiveNumber(fields)` | Ensures specified fields are positive numbers |
| `validateObjectId(param)` | Validates MongoDB ObjectId format in URL params |

**Example:** The `POST /products` route uses:
```
validateRequired(["name", "price", "category"])
validatePositiveNumber(["price", "stock"])
```

### Error Handling (`middleware/errorHandler.js`)

Global error handler that catches and formats errors:

| Error Type                | Status Code | Description                        |
|---------------------------|-------------|------------------------------------|
| Mongoose `ValidationError`| 400         | Schema validation failures         |
| Duplicate key (code 11000)| 409         | Unique constraint violations       |
| Mongoose `CastError`      | 400         | Invalid ObjectId or type mismatch  |
| JSON parse error           | 400         | Malformed request body             |
| Unknown errors             | 500         | Internal Server Error              |

All errors pass through `next(error)` in controllers and are handled centrally by this middleware.

---

## Dummy Data Summary

| Collection | Count | Details                                          |
|------------|-------|--------------------------------------------------|
| Users      | 5     | Alice (admin), Bob, Charlie, Diana, Eve          |
| Products   | 8     | Mouse, Keyboard, Shoes, Backpack, Headphones, Bottle, T-Shirt, Lamp |
| Orders     | 3     | Bob (delivered), Charlie (shipped), Diana (pending) |
| Carts      | 2     | Bob (keyboard + bottles), Eve (desk lamp)        |

---

## License

ISC
