# 🧠 Code Arena - Online Judge Platform

**Code Arena** is an online judge platform where users can register, log in, solve coding problems, and submit their solutions for real-time evaluation. Built with the MERN stack and secured using JWT-based authentication.

---

## 🚀 Features

- 👤 User Registration & Login (JWT Auth)
- 🧪 Submit code in supported languages
- ⚙️ Real-time code execution and judging
- 📊 View submission history
- 📁 Organized problem sets

---

## 🛠 Tech Stack

### Frontend (React.js)
- React + React Router DOM
- Axios for API calls
- Tailwind CSS 
- JWT stored in localStorage 

### Backend (Node.js + Express)
- Express.js RESTful API
- JWT for authentication and route protection
- Mongoose ODM

### Database
- MongoDB for storing users, problems, and submissions

---

## 🔐 Authentication

- **Register/Login APIs** issue a **JWT token**
- Token is sent with each protected request via the `Authorization: Bearer <token>` header
- Middleware verifies token and attaches the user to the request
- Tokens expire after a set duration (`1d`, etc.)

---




