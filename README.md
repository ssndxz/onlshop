# Online Store

## Description
This is a backend API for an online store. It supports user authentication, product management, and order processing. A dedicated import script fetches product data from an external API.

## Features
- **User Authentication:** Register and log in (with an option to create admin users using an admin secret).
- **Products:** CRUD operations for products (admin-only creation/updating/deletion).
- **Orders:** Customers can create orders containing multiple products.
- **Data Import:** Import product data from an external source using the Fake Store API.

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root with:
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- PORT=3000
- ADMIN_SECRET=your_admin_secret
4. Start the server:
- For production: `npm start`
5. To import product data, run: `npm run import`

## API Endpoints
- **Auth**
- `POST /api/auth/register` – Register a new user (optionally include `adminCode` to register as admin).
- `POST /api/auth/login` – Log in and receive a JWT token.
- **Products**
- `POST /api/products` – Create a new product (admin only).
- `GET /api/products` – Retrieve all products.
- `GET /api/products/:id` – Retrieve a single product.
- `PUT /api/products/:id` – Update a product (admin only).
- `DELETE /api/products/:id` – Delete a product (admin only).
- **Orders**
- `POST /api/orders` – Create a new order (authenticated users).
- `GET /api/orders` – Get orders for the logged-in user.

## Data Import
The script fetches product data from [Fake Store API](https://fakestoreapi.com/products) and imports it into the database. (Change API for another data)
