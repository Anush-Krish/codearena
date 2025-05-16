const express = require('express');
const cors = require('cors');

const app = express();
const dbConnection = require("./config/db");
const userRoutes = require("./routes/auth.routes");
const problemRoute = require("./routes/problem.route");

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

dbConnection();

app.use('/api/auth', userRoutes);
app.use('/api/problems', problemRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = app;
