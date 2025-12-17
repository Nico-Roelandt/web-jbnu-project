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
    let { page = 1, size = 10, keyword = '' } = req.query;
    page = parseInt(page); size = parseInt(size);
    const offset = (page - 1) * size;

    const sql = `
        SELECT * FROM user 
        WHERE username LIKE ? 
        LIMIT ? OFFSET ?
    `;
    pool.query(sql, [`%${keyword}%`, size, offset], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Update user statistics after a game
 */
exports.updateUserStats = async (req, res) => {
    try {
        const userId = req.params.id;
        const win = req.body.win === "true";
        const attempts = parseInt(req.body.attempts);

        if (!attempts) {
            return res.status(400).json({ error: "Missing attempts parameter" });
        }

        // Get user current stats
        const rows = await pool.promise().query(
            "SELECT nb_victories, nb_games, avg_attempts FROM user WHERE id = ?",
            [userId]
        ).then(([results]) => results);

        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = rows[0];

        // Update calculations
        const newNbGames = user.nb_games + 1;
        const newNbVictories = win ? user.nb_victories + 1 : user.nb_victories;
        const newAvg = ((user.avg_attempts * user.nb_games) + attempts) / newNbGames;

        // Update user stats in the database
        pool.query(
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
