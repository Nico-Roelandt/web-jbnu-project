// app.js
require("dotenv").config();
const express = require("express");

const userRoutes = require("./routes/userRoutes");
const wordRoutes = require("./routes/wordRoutes");
const modeRoutes = require("./routes/modeRoutes");
const gameRoutes = require("./routes/gameRoutes");
const difficultyRoutes = require("./routes/difficultyRoutes");
const rankingRoutes = require("./routes/rankingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Swagger setup
const { swaggerUi, swaggerSpec } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
app.use("/", authRoutes);

// Root
app.get("/", (req, res) => {
    res.json({ message: "Welcome on the Wordle API" });
});

// health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    name: "api",
    version: process.env.npm_package_version || "unknown",
    node: process.version,
    env: process.env.NODE_ENV || "production",
    buildTime: process.env.BUILD_TIME || null,
    uptime: process.uptime()
  });
});

// Middleware for routes not found
app.use((req, res, next) => {
    const err = new Error('Resource not found');
    err.status = 404;
    err.code = 'RESOURCE_NOT_FOUND';
    next(err);
});

// Middlewares
app.use(errorHandler);

module.exports = app;