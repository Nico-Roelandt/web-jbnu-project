const pool = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"

/**
 * Get user by ID
 */
exports.getUser = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM user WHERE id = ?",
      [req.params.id]
    )
    if (!rows.length) return res.status(404).json({ message: "User not found" })
    res.json(rows[0])
  } catch (e) {
    next(e)
  }
}

/**
 * Get all users with pagination & search
 */
exports.getUsers = async (req, res) => {
  try {
    let { page = 1, size = 15, keyword = '' } = req.query
    page = Number(page)
    size = Number(size)
    const offset = (page - 1) * size

    const [[{ total }]] = await pool.query(
      "SELECT COUNT(*) total FROM user WHERE username LIKE ?",
      [`%${keyword}%`]
    )

    const [users] = await pool.query(
      "SELECT * FROM user WHERE username LIKE ? ORDER BY id ASC LIMIT ? OFFSET ?",
      [`%${keyword}%`, size, offset]
    )

    res.json({
      page,
      size,
      total,
      totalPages: Math.ceil(total / size),
      users
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

/**
 * Update user statistics after a game
 */
exports.updateUserStats = async (req, res) => {
  try {
    const userId = req.user.id; 
    const win = req.body.win === "true";
    const attempts = parseInt(req.body.attempts);

    if (!attempts) {
      return res.status(400).json({ error: "Missing attempts parameter" });
    }

    const [rows] = await pool.promise().query(
      "SELECT nb_victories, nb_games, avg_attempts FROM user WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];

    const newNbGames = user.nb_games + 1;
    const newNbVictories = win ? user.nb_victories + 1 : user.nb_victories;
    const newAvg =
      ((user.avg_attempts * user.nb_games) + attempts) / newNbGames;

    await pool.promise().query(
      `UPDATE user
       SET nb_victories = ?, nb_games = ?, avg_attempts = ?
       WHERE id = ?`,
      [newNbVictories, newNbGames, newAvg, userId]
    );

    res.json({
      message: "User stats updated",
      stats: {
        nb_victories: newNbVictories,
        nb_games: newNbGames,
        avg_attempts: newAvg
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Create a new user
 */
exports.createUser = (req, res) => {
  const REQUIRED_FIELDS = ["is_admin", "username", "password"];

  const missingFields = REQUIRED_FIELDS.filter(
    field =>
      req.body[field] === undefined ||
      req.body[field] === null ||
      req.body[field] === ""
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      code: "VALIDATION_ERROR",
      message: "Missing required fields",
      missingFields
    });
  }

  const { is_admin, username, password } = req.body;

  if (password.length < 5) {
    return res.status(400).json({
      code: "VALIDATION_ERROR",
      message: "Password must be at least 5 characters long"
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO user (is_admin, username, password)
    VALUES (?, ?, ?)
  `;

  pool.query(sql, [is_admin, username, hashedPassword], (err, results) => {
    if (err) {
      return res.status(500).json({
        code: "DATABASE_ERROR",
        message: err.message
      });
    }

    res.status(201).json({
      message: "User created",
      id: results.insertId
    });
  });
};

/**
 * Google login 
 */
exports.googleLogin = async (req, res, next) => {
  try {
    const { googleId, username } = req.body
    if (!googleId || !username) {
      return res.status(400).json({ message: "Invalid data" })
    }

    const [rows] = await pool.query(
      "SELECT * FROM user WHERE google_id = ?",
      [googleId]
    )

    let user = rows[0]

    if (!user) {
      const [r] = await pool.query(
        "INSERT INTO user (username, google_id, is_admin, password) VALUES (?, ?, 0, '')",
        [username, googleId]
      )
      user = { id: r.insertId, username, is_admin: 0 }
    }

    const token = jwt.sign(
      { id: user.id, is_admin: user.is_admin },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({ token, user })
  } catch (e) {
    next(e)
  }
}

/**
 * Delete user
 */
exports.deleteUser = async (req, res, next) => {
  try {
    await pool.query("DELETE FROM user WHERE id = ?", [req.params.id])
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
}

/**
 * Get user rankings (victories, attempts, games)
 */
exports.getUserRankings = async (req, res, next) => {
  try {
    const userId = +req.params.id

    const [v] = await pool.query("SELECT id FROM user ORDER BY nb_victories DESC")
    const [a] = await pool.query("SELECT id FROM user ORDER BY avg_attempts ASC")
    const [g] = await pool.query("SELECT id FROM user ORDER BY nb_games DESC")

    const r = l => l.findIndex(u => u.id === userId) + 1

    res.json({
      victories: r(v),
      attempts: r(a),
      games: r(g)
    })
  } catch (e) {
    next(e)
  }
}

