# 🍽️ Recipe Book App

**Live Site:** [https://recipe-book-39501.web.app/]

## 🌟 Overview

The **Recipe Book App** is a dynamic and user-friendly platform for food lovers to share, discover, and manage recipes. With social features like liking and saving recipes to a wishlist, this app creates an engaging cooking community experience.

## 🚀 Features

- 🔐 **User Authentication** with Email/Password & Google Sign-In.
- 🏆 **Top Recipes Section**: Displays the 6 most liked recipes dynamically.
- 🍲 **CRUD Functionality**: Users can add, view, update, and delete their own recipes.
- 🎨 **Responsive and Unique Design** for all devices (mobile, tablet, desktop).
- 🌙 **Dark/Light Theme Toggle** with engaging animations via Lottie and Reveal libraries.

## 🛠️ Technologies Used

- **Frontend**: React.js, Tailwind CSS, DaisyUI, React Router
- **Backend**: Express.js, MongoDB, Mongoose
- **Authentication**: Firebase Auth
- **Hosting**: Netlify (Client), Vercel (Server)
- **Animation Libraries**: Lottie React, React Awesome Reveal

## 🗂️ Main Pages & Functionalities

### 🔹 Home Page
- Navbar with conditional rendering based on auth status.
- Top Recipes section (based on like count).
- Interactive slider/banner and extra static sections.
- Dark/Light mode toggle switch.

### 🔹 All Recipes Page
- Displays all user-added recipes in a 4-column grid layout.
- Includes a filter by cuisine type dropdown.
- “See Details” buttons for each recipe.

### 🔹 Recipe Details Page *(Private Route)*
- Full details of the selected recipe.
- Like button to increase interest count (not allowed on own recipes).
- Live like count display at the top.

### 🔹 Add Recipe Page *(Private Route)*
- Form with inputs: title, image, ingredients, instructions, cuisine, categories, etc.
- Submission stores recipe to database with a toast success alert.

### 🔹 My Recipes Page *(Private Route)*
- Shows recipes added by the logged-in user only.
- Includes Update and Delete options for each recipe.
- Update form opens in a modal and updates database in real-time.

### 🔹 Login/Register Pages
- Firebase Email/Password auth.
- Google Social Login.
- Proper error handling with toast messages.
- Strong password validation.

### 🔹 404 Page
- Custom food-themed design.
- Excludes navbar/footer for clarity.

## 🔐 Environment Variables

Environment variables are used to secure:
- Firebase config
- MongoDB credentials

Example `.env` structure:
