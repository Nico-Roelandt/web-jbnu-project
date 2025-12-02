// app.js
const express = require("express");
const userRoutes = require("./controller/userController");
const wordRoutes = require("./controller/wordController");
const modeRoutes = require("./controller/modeController");
const gameRoutes = require("./controller/gameController");
const difficultyRoutes = require("./controller/difficultyController");
const rankingRoutes = require("./controller/rankingController");
const adminRoutes = require("./controller/adminController");

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/words", wordRoutes);
app.use("/modes", modeRoutes);
app.use("/games", gameRoutes);
app.use("/difficulties", difficultyRoutes);
app.use("/ranking", rankingRoutes);
app.use("/admin", adminRoutes);

module.exports = app;