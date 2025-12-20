const pool = require("../db");

/**
 * Create a new game
 */
exports.createGame = (req, res) => {
  const REQUIRED_FIELDS = ["word_id", "user_id", "difficulty_id", "mode_id"];

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

  const { word_id, user_id, difficulty_id, mode_id } = req.body;

  const sql = `
    INSERT INTO game (word_id, user_id, difficulty_id, mode_id)
    VALUES (?, ?, ?, ?)
  `;

  pool.query(
    sql,
    [word_id, user_id, difficulty_id, mode_id],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          code: "DATABASE_ERROR",
          message: err.message
        });
      }

      res.status(201).json({
        message: "Game created",
        game_id: results.insertId
      });
    }
  );
};
