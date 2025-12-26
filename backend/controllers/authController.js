const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * Login user and return JWT token
 */
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const [rows] = await db.query('SELECT * FROM user WHERE username = ? LIMIT 1', [username])
    const user = rows[0]
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.password || '')
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { id: user.id, is_admin: !!user.is_admin },
      process.env.JWT_SECRET || 'dev_secret',
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: { id: user.id, username: user.username, is_admin: user.is_admin }
    })
  } catch (e) {
    next(e)
  }
}

/**
 * Register a new user
 */
exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password || password.length < 5) {
      return res.status(400).json({ message: 'Invalid data' })
    }

    const [exists] = await db.query('SELECT id FROM user WHERE username = ? LIMIT 1', [username])
    if (exists.length) return res.status(409).json({ message: 'Username already exists' })

    const hash = await bcrypt.hash(password, 10)
    const [r] = await db.query(
      'INSERT INTO user (username, password, is_admin, nb_victories, nb_games, avg_attempts) VALUES (?, ?, 0, 0, 0, 100)',
      [username, hash]
    )

    res.status(201).json({ id: r.insertId, username })
  } catch (e) {
    next(e)
  }
}

/**
 * Refresh token 
 */
exports.refresh = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const newToken = jwt.sign(
      { id: decoded.id, is_admin: decoded.is_admin }, 
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ token: newToken });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
