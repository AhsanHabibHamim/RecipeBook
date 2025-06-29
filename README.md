# 🍽️ Recipe Book App

🔗 **Live Client:** [https://recipe-book-39501.web.app/](https://recipe-book-39501.web.app/)  
🔗 **Live Server:** [https://recipe-ahsan-habib-hamims-projects.vercel.app](https://recipe-ahsan-habib-hamims-projects.vercel.app)

---

## 🌟 Overview

**Recipe Book App** is a full-stack, responsive, and user-friendly platform where cooking enthusiasts can share, explore, and manage recipes. It supports real-time updates, authentication, and community interactions through likes and saved items.

---

## 🔥 Features at a Glance

- 🔐 Firebase Auth (Email/Password & Google)
- 🏆 Top 6 liked recipes on the homepage
- 📝 Full CRUD functionality for recipes
- 🎨 Responsive UI with light/dark theme support
- 📊 Admin Dashboard with analytics
- 🔎 Filter & sort by cuisine/category
- 📬 Newsletter and contact support sections
- ❌ Custom 404 page

---


## 🖥️ Tech Stack

### 💻 Frontend
- React.js, Tailwind CSS, DaisyUI, React Router DOM
- Lottie React, React Awesome Reveal (for animations)
- Firebase (Authentication)
- Netlify (Hosting)

### 🧪 Backend
- Node.js, Express.js
- MongoDB with Mongoose
- Firebase Admin SDK (JWT Verification)
- Vercel (Hosting)

---

## 📁 Folder Structure (Client)

/src
┣ /pages
┣ /components
┣ /routes
┣ /contexts
┗ /utils

---

## 🧩 Key Frontend Pages & Features

### 🔹 Navbar & Footer
- Responsive design with logo, 5+ links, and social icons
- Sticky navbar on scroll
- Footer contains logo, useful links, and social links

### 🔹 Home Page
- Hero section (max 70% viewport height)
- Dynamic Top Recipes Section
- Multiple sliders, categories, blogs, newsletter, and promotions
- Minimum 7 meaningful sections

### 🔹 All Recipes Page
- Public access
- 4-column card layout with image, title, short description, and “See More”
- Filter and sort functionalities
- Clean details page on “See More” click

### 🔹 Add Recipe Page *(Private)*
- Form includes title, image, cuisine, category, ingredients, and instructions
- Toast success message on submission

### 🔹 My Recipes Page *(Private)*
- Shows user’s recipes with update/delete buttons
- Modal-based update form

### 🔹 Recipe Details Page *(Private)*
- Displays full recipe info
- Like feature (except on own recipes)
- Live like count

### 🔹 Auth Pages
- Login/Register with Firebase
- Google sign-in
- Form validation and toast notifications

### 🔹 Dashboard *(Private)*
- Default overview with stats cards: Total Recipes, My Recipes, Likes, etc.
- Functional routes:
  - All Items (table view)
  - Add Item
  - My Items

### 🔹 Error Pages
- Custom 404 with clean, food-themed design
- No navbar/footer

---

## 🧠 Backend API Documentation

### 🔓 Public Routes

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| GET    | `/recipes/top`       | Get top 6 recipes by likes           |
| GET    | `/recipes`           | Fetch all recipes (supports filters) |
| GET    | `/recipes/:id`       | Get recipe details by ID             |

### 🔐 Protected Routes (Requires Bearer Token)

| Method | Endpoint              | Description                              |
|--------|-----------------------|------------------------------------------|
| POST   | `/recipes`            | Add new recipe (auth required)           |
| GET    | `/my-recipes`         | Get logged-in user's recipes             |
| PUT    | `/recipes/:id`        | Update a recipe (only owner)             |
| DELETE | `/recipes/:id`        | Delete a recipe (only owner)             |
| PATCH  | `/recipes/:id/like`   | Like a recipe (cannot like own recipe)   |

---

## 🔐 Backend Authentication

- Firebase Admin SDK for server-side token verification
- `validateToken` middleware for protecting routes

---

## 🧪 Backend Tech Highlights

- Express.js API with RESTful structure
- MongoDB via Mongoose schema modeling
- dotenv for secure config
- Helmet and CORS for security
- Vercel deployed API endpoint

---

## 📦 Environment Variables (Frontend & Backend)

### Frontend `.env`

VITE_API_BASE_URL=https://your-server-url
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain

### Backend `.env`

PORT=5000
MONGODB_URI=your_mongo_connection
FIREBASE_TYPE=...
FIREBASE_PROJECT_ID=...

---

## 📱 Responsiveness & UI Notes

- Designed for all devices: mobile, tablet, desktop
- Consistent spacing and margins across sections
- Light/Dark mode support with contrast-checked colors
- No unclickable or broken links/buttons
- Clean and minimalistic UI with professional animations

---

## 📌 Final Notes

- All dummy text removed — real content throughout
- All buttons and routes fully functional
- Admin dashboard is private and secure
- Error pages included and fully styled
- Fully deployed and production-ready frontend + backend
