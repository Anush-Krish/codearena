# 🧠 Code Arena - Online Judge Platform

**Code Arena** is an online judge platform where users can register, log in, solve coding problems, and submit their solutions for real-time evaluation. Built with the MERN stack and secured using JWT-based authentication.

---

## 🚀 Features

- 👤 User Registration & Login (JWT Auth)
- 🧪 Submit code in supported languages
- ⚙️ Real-time code execution and judging
- 📊 View submission history
- 📁 Organized problem sets
- 🤖 AI-powered code review with Gemini Pro

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

## 🤖 Gemini AI Code Review

Code Arena integrates **Gemini Pro** to provide AI-powered feedback for your code submissions. This helps users:

- Understand potential bugs or logic issues
- Improve code quality and structure

- Learn best practices in C++ and other supported languages

### How It Works:

- After writing your solution, click the **"AI Review"** button
- Your code is securely sent to the Gemini AI review API
- The AI analyzes your code and provides:
  - Suggestions for improvement
  - Potential logical or syntactical issues
  - Feedback on performance or readability

### Example Output:
<img width="1677" alt="Screenshot 2025-05-27 at 2 06 58 PM" src="https://github.com/user-attachments/assets/1a5b4797-da94-4128-ada6-37c7158bc7d1" />
<img width="1675" alt="Screenshot 2025-05-27 at 2 07 42 PM" src="https://github.com/user-attachments/assets/85d93ff5-7651-48a5-bc7b-9ee017457494" />
<img width="1645" alt="Screenshot 2025-05-27 at 2 07 16 PM" src="https://github.com/user-attachments/assets/ca00d983-0c4e-460b-ab1c-6d43768b926c" />
<img width="1676" alt="Screenshot 2025-05-27 at 2 07 30 PM" src="https://github.com/user-attachments/assets/23be7646-691a-412a-97ba-f2ac65c2f0dc" />
