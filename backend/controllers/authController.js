const pool = require('../db'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';
const JWT_EXPIRES = '1h';

/** 
 * Login user
*/
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }

  const sql = "SELECT * FROM user WHERE username = ?";
  pool.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ message: err.message });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.is_admin },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.json({ message: "Login successful", token, user: { id: user.id, username: user.username, is_admin: user.is_admin } });
  });
};

/**
 * Refresh token
 */
exports.refresh = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const newToken = jwt.sign({ id: decoded.id, isAdmin: decoded.isAdmin }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.json({ token: newToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
