const pool = require("../db");

/**
 * Get all difficulties
 */
exports.getAllDifficulties = async (req, res) => {
  const sql = "SELECT * FROM difficulty";
  try {
    const [results] = await pool.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
