const pool = require("../db");

/**
 * Get all modes
 */
exports.getAllModes = (req, res) => {
  const sql = "SELECT * FROM mode";
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};
