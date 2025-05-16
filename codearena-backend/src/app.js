const express = require('express');
const cors = require('cors'); // ✅ import cors

const app = express();
const dbConnection = require("./config/db");
const userRoutes = require("./routes/auth.routes");
const problemRoute = require("./routes/problem.route");

// ✅ Use CORS before routes
app.use(cors({
    origin: 'http://localhost:5173', // Frontend Vite origin
    credentials: true
}));

app.use(express.json());

dbConnection();

app.use('/api/auth', userRoutes);
app.use('/api/problems', problemRoute);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = app;
