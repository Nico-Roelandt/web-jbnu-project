const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: "No token provided" })

  const parts = authHeader.split(" ")
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" })
  }

  try {
    const decoded = jwt.verify(parts[1], JWT_SECRET)
    req.user = decoded
    next()
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

exports.adminOnly = (req, res, next) => {
  const isAdmin = !!(req.user?.is_admin || req.user?.isAdmin)
  if (!isAdmin) return res.status(403).json({ message: "Admin access required" })
  next()
}
