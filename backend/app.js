require("dotenv").config()
const express = require("express")

const userRoutes = require("./routes/userRoutes")
const wordRoutes = require("./routes/wordRoutes")
const modeRoutes = require("./routes/modeRoutes")
const gameRoutes = require("./routes/gameRoutes")
const difficultyRoutes = require("./routes/difficultyRoutes")
const rankingRoutes = require("./routes/rankingRoutes")
const adminRoutes = require("./routes/adminRoutes")
const authRoutes = require("./routes/authRoutes")
const errorHandler = require("./middlewares/errorHandler")

const db = require("./db")
const { swaggerUi, swaggerSpec } = require("./swagger")

const app = express()

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  res.setHeader("Access-Control-Allow-Credentials", "true")
  if (req.method === "OPTIONS") return res.sendStatus(204)
  next()
})

app.use(express.json())

app.get("/db-test", async (req, res, next) => {
  try {
    const [rows] = await db.query("SELECT 1 AS ok")
    res.json(rows[0])
  } catch (e) {
    next(e)
  }
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use("/users", userRoutes)
app.use("/words", wordRoutes)
app.use("/modes", modeRoutes)
app.use("/games", gameRoutes)
app.use("/difficulties", difficultyRoutes)
app.use("/rankings", rankingRoutes)
app.use("/admin", adminRoutes)
app.use("/", authRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Welcome on the Wordle API" })
})

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    name: "api",
    version: process.env.npm_package_version || "unknown",
    node: process.version,
    env: process.env.NODE_ENV || "production",
    buildTime: process.env.BUILD_TIME || null,
    uptime: process.uptime()
  })
})

app.use((req, res, next) => {
  const err = new Error("Resource not found")
  err.status = 404
  err.code = "RESOURCE_NOT_FOUND"
  next(err)
})

app.use(errorHandler)

module.exports = app
