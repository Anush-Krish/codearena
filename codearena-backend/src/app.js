const express = require('express');
const app = express();
const dbConnection = require("./config/db");
const userRoutes = require("../src/routes/user.routes")

app.use(express.json());

dbConnection();

app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});

module.exports = app;
