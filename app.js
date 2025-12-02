// app.js
const express = require("express");
const userRoutes = require("./controller/userController");

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/users", userRoutes);

module.exports = app;