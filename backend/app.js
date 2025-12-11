// app.js
const express = require("express");

const userRoutes = require("./routes/userRoutes");
const wordRoutes = require("./routes/wordRoutes");
const modeRoutes = require("./routes/modeRoutes");
const gameRoutes = require("./routes/gameRoutes");
const difficultyRoutes = require("./routes/difficultyRoutes");
const rankingRoutes = require("./routes/rankingRoutes");
const adminRoutes = require("./routes/adminRoutes");

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