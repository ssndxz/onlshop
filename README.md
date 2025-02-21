# Online Store (Final)

## Description
This is a backend REST API for an online store. It supports user authentication, product management, and order processing. A dedicated import script fetches product data from an external API.

### Features
- **User Authentication:** Register and log in (with an option to create admin users using an admin secret).
- **Products:** CRUD operations for products (admin-only creation/updating/deletion).
- **Orders:** Customers can create orders containing multiple products.
- **Data Import:** Import product data from an external source using the Fake Store API.

### Project Structure
online-store/
├── package-lock.json
├── package.json
├── .env
├── index.js
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   └── orders.js
├── middleware/
│   └── auth.js
├── scripts/
│   └── import.js
└── README.md

### Setup Instructions
#### 1. Clone the repository.
#### 2. Run to install dependencies:
```bash
npm install
```
#### 3. Create a `.env` file in the root with:
Create a `.env` file and add:
```ini
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
ADMIN_SECRET=your_admin_secret
```
#### 4. Start the server:
```bash
npm start
```
#### 5. To import product data:
```bash
npm run import
```

### API Endpoints
1. **Auth**
| Method | Endpoint  | Description |
|--------|----------|-------------|
| POST   | `/api/auth/register` | Register a new user (optionally include `adminCode` to register as admin). |
| POST   | `/api/auth/login`    | Log in and receive a JWT token. |
2. **Products**
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| POST   | `/api/products`     | Create a new product (admin only). |
| GET    | `/api/products`     | Retrieve all products. |
| GET    | `/api/products/:id` | Retrieve a single product. |
| PUT    | `/api/products/:id` | Update a product (admin only) |
| DELETE | `/api/products/:id` | Delete a product (admin only) |
3. **Orders**
| Method  | Endpoint                  | Description |
|---------|---------------------------|-------------|
| POST    | `/api/orders`             | Create a new order (authenticated users). |
| GET     | `/api/orders`             | Get orders for the logged-in user. |
| PUT     | `/api/orders/:id`         | Uodate order for the logged-in user. |

Test CRUD operations using Postman.

### Data Import
The script fetches product data from [Fake Store API](https://fakestoreapi.com/products) and imports it into the database. (Change API for another data)
