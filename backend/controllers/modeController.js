const pool = require("../db");

/**
 * Get all modes
 */
exports.getAllModes = async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM mode");
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
