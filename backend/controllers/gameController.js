const pool = require("../db");

/**
 * Create a new game
 */
exports.createGame = (req, res) => {
  const REQUIRED_FIELDS = ["word_id", "difficulty_id", "mode_id"];

  const missingFields = REQUIRED_FIELDS.filter(
    f => !req.body[f]
  );

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "Missing required fields",
      missingFields
    });
  }

  const user_id = req.user.id; 
  const { word_id, difficulty_id, mode_id } = req.body;

  const sql = `
    INSERT INTO game (word_id, user_id, difficulty_id, mode_id)
    VALUES (?, ?, ?, ?)
  `;

  pool.query(
    sql,
    [word_id, user_id, difficulty_id, mode_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        message: "Game created",
        game_id: results.insertId
      });
    }
  );
};

