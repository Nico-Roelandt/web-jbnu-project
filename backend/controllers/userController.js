const pool = require("../db");
const bcrypt = require('bcryptjs');

/**
 * Get user by ID
 */
exports.getUser = (req, res) => {
    const sql = `
        SELECT *
        FROM user
        where id = ?;
    `;

    pool.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.json(results);
    });
};

/**
 * Get all users with pagination & search
 */
exports.getUsers = (req, res) => {
    let { page = 1, size = 15, keyword = '' } = req.query; // 15 items per page
    page = parseInt(page);
    size = parseInt(size);
    const offset = (page - 1) * size;

    const countSql = `SELECT COUNT(*) AS total FROM user WHERE username LIKE ?`;
    pool.query(countSql, [`%${keyword}%`], (err, countResult) => {
        if (err) return res.status(500).json({ error: err });
        const total = countResult[0].total;
        const totalPages = Math.ceil(total / size);

        const sql = `
            SELECT * FROM user 
            WHERE username LIKE ? 
            ORDER BY id ASC
            LIMIT ? OFFSET ?
        `;
        pool.query(sql, [`%${keyword}%`, size, offset], (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json({
                page,
                size,
                total,
                totalPages,
                users: results
            });
        });
    });
};

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
exports.googleLogin = (req, res) => {
  const { googleId, username } = req.body;

  const sql = "SELECT * FROM user WHERE google_id = ?";
  pool.query(sql, [googleId], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    if (results.length > 0) {
      return res.json({ message: "User exists", user: results[0] });
    }

    const sqlInsert = `
      INSERT INTO user (username, google_id, is_admin, password)
      VALUES (?, ?, 0, '')
    `;
    pool.query(sqlInsert, [username, googleId], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      res.status(201).json({
        message: "User created",
        user: { id: result.insertId, username, is_admin: 0 }
      });
    });
  });
};

/**
 * Delete user
 */
exports.deleteUser = (req, res) => {
    const sql = `
        DELETE FROM user WHERE id = ?;
    `;

    pool.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });

        res.status(204).send();
    });
};

/**
 * Get user rankings (victories, attempts, games)
 */
exports.getUserRankings = (req, res) => {
    const userId = Number(req.params.id);

    const victoriesSql = `
        SELECT id
        FROM user
        ORDER BY nb_victories DESC
    `;

    const attemptsSql = `
        SELECT id
        FROM user
        ORDER BY avg_attempts ASC
    `;

    const gamesSql = `
        SELECT id
        FROM user
        ORDER BY nb_games DESC
    `;

    pool.query(victoriesSql, (err, victories) => {
        if (err) return res.status(500).json({ error: err });

        pool.query(attemptsSql, (err, attempts) => {
            if (err) return res.status(500).json({ error: err });

            pool.query(gamesSql, (err, games) => {
                if (err) return res.status(500).json({ error: err });

                const getRank = (list) =>
                    list.findIndex(u => u.id === userId) + 1;

                res.json({
                    victories: getRank(victories),
                    attempts: getRank(attempts),
                    games: getRank(games)
                });
            });
        });
    });
};
