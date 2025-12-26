const pool = require("../db");

/**
 * Get the ranking of users based on number of victories
 */
exports.getVictoriesRanking = async (req, res) => {
    const sql = `
        SELECT id, username, nb_victories
        FROM user
        ORDER BY nb_victories DESC;
    `;
    try {
        const [results] = await pool.query(sql);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

/**
 * Get the podium (top 3 users) based on number of victories
 */
exports.getVictoriesTop3 = async (req, res) => {
    const sql = `
        SELECT id, username, nb_victories
        FROM user
        ORDER BY nb_victories DESC
        LIMIT 3;
    `;
    try {
        const [results] = await pool.query(sql);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

/**
 * Get the ranking of users based on average attempt number
 */
exports.getAttemptsRanking = async (req, res) => {
    const sql = `
        SELECT id, username, avg_attempts
        FROM user
        ORDER BY avg_attempts ASC;
    `;
    try {
        const [results] = await pool.query(sql);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

/**
 * Get the podium (top 3 users) based on average attempt number
 */
exports.getAttemptsTop3 = async (req, res) => {
    const sql = `
        SELECT id, username, avg_attempts
        FROM user
        ORDER BY avg_attempts ASC
        LIMIT 3;
    `;
    try {
        const [results] = await pool.query(sql);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

/**
 * Get the ranking of users based on number of games played
 */
exports.getGamesRanking = async (req, res) => {
    const sql = `
        SELECT id, username, nb_games
        FROM user
        ORDER BY nb_games DESC;
    `;
    try {
        const [results] = await pool.query(sql);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

/**
 * Get the podium (top 3 users) based on number of games played
 */
exports.getGamesTop3 = async (req, res) => {
    const sql = `
        SELECT id, username, nb_games
        FROM user
        ORDER BY nb_games DESC
        LIMIT 3;
    `;
    try {
        const [results] = await pool.query(sql);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
