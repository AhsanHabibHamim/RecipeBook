# 🍽️ Recipe Book App – Backend

This is the **backend server** for the Recipe Book App, a RESTful API built with **Express.js** and **MongoDB**. It powers all the data operations and authentication functionalities for the app, such as recipe management, user-specific filtering, liking functionality, and secure API routing.

---

## 🚀 Live API

**Server URL:** [https://recipe-ahsan-habib-hamims-projects.vercel.app]

---

## 🧪 Tech Stack

- **Node.js & Express.js** – Server and Routing
- **MongoDB & Mongoose** – Database and ODM
- **Firebase Admin SDK** – Authentication (JWT verification)
- **dotenv** – Secure environment variable management
- **CORS & Helmet** – Security and access control

---

## 🔐 Authentication

- Token-based auth using Firebase.
- Middleware: `validateToken` to verify and authorize requests on private routes.
- Only authenticated users can create, update, delete, or like recipes.

---

## 📁 Main API Endpoints

### 🔓 Public Routes

- `GET /recipes/top` – Top 6 recipes sorted by likes
- `GET /recipes` – All recipes (with optional filtering)
- `GET /recipes/:id` – Recipe details by ID

### 🔐 Protected Routes

> All require a Bearer token in `Authorization` header

- `POST /recipes` – Add a new recipe
- `GET /my-recipes` – Get recipes added by the logged-in user
- `PUT /recipes/:id` – Update recipe (only owner)
- `DELETE /recipes/:id` – Delete recipe (only owner)
- `PATCH /recipes/:id/like` – Like a recipe (cannot like own recipe)

---

## 📦 Environment Variables

Create a `.env` file in your root directory:

