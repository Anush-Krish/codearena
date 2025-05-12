const express = require('express');
const app = express();
const dbConnection = require("./config/db");

app.use(express.json());

dbConnection();

// const userRoutes = require('./routes/user.routes');
// app.use('/api/users', userRoutes);
//
//
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Something went wrong' });
// });

module.exports = app;
