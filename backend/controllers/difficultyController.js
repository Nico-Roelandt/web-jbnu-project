const pool = require("../db");

/**
 * Get all difficulties
 */
exports.getAllDifficulties = (req, res) => {
  const sql = "SELECT * FROM difficulty";
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};
