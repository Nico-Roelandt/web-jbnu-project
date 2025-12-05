const express = require("express");
const router = express.Router();
const pool = require("../db");

/**
 * Get the ranking of users based on number of victories
 */
exports.getVictoriesRanking = (req, res) => {
    const sql = `
        SELECT id, username, nb_victories
        FROM user
        ORDER BY nb_victories DESC;
    `;

    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.json(results);
    });
};

/**
 * Get the podium (top 3 users) based on number of victories
 */
exports.getVictoriesTop3 = (req, res) => {
    const sql = `
        SELECT id, username, nb_victories
        FROM user
        ORDER BY nb_victories DESC
        LIMIT 3;
    `;

    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.json(results);
    });
};

/**
 * Get the ranking of users based on average attempt number
 */
exports.getAttemptsRanking = (req, res) => {
    const sql = `
        SELECT id, username, avg_attempts
        FROM user
        ORDER BY avg_attempts ASC;
    `;

    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.json(results);
    });
};

/**
 * Get the podium (top 3 users) based on average attempt number
 */
exports.getAttemptsTop3 = (req, res) => {
    const sql = `
        SELECT id, username, avg_attempts
        FROM user
        ORDER BY avg_attempts ASC
        LIMIT 3;
    `;

    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.json(results);
    });
};

/**
 * Get the ranking of users based on number of games played
 */
exports.getGamesRanking = (req, res) => {
    const sql = `
        SELECT id, username, nb_games
        FROM user
        ORDER BY nb_games DESC;
    `;

    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.json(results);
    });
};

/**
 * Get the podium (top 3 users) based on number of games played
 */
exports.getGamesTop3 = (req, res) => {
    const sql = `
        SELECT id, username, nb_games
        FROM user
        ORDER BY nb_games DESC
        LIMIT 3;
    `;

    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.json(results);
    });
};


router.get("/victories", exports.getVictoriesRanking);
router.get("/victories/top3", exports.getVictoriesTop3);
router.get("/attempts", exports.getAttemptsRanking);
router.get("/attempts/top3", exports.getAttemptsTop3);
router.get("/games", exports.getGamesRanking);
router.get("/games/top3", exports.getGamesTop3);
module.exports = router;