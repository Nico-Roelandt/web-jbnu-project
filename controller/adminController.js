const express = require("express");
const router = express.Router();
const pool = require("../db");

////////////////////////////////// USERS //////////////////////////////////

/**
 * Get all users
 */
exports.getAllUsers = (req, res) => {
    const sql = `
        SELECT id, username, nb_victories, nb_games, avg_attempts
        FROM user;
    `;

    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.json(results);
    });
};

router.get("/users", exports.getAllUsers);

////////////////////////////////// WORDS //////////////////////////////////

/**
 * Create a new word
 */
exports.createWord = (req, res) => {
    const sql = `
        INSERT INTO word (word, nb_letters) VALUES (?, ?);
    `;

    pool.query(sql, [req.body.word, req.body.word.length], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.status(201).json({
            message: "Word created",
            id: results.insertId
        });
    });
};

/**
 * Update a word
 */
exports.updateWord = (req, res) => {
    const sql = `
        UPDATE word SET word = ?, nb_letters = ? WHERE id = ?;
    `;

    pool.query(sql, [req.body.word, req.body.word.length, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.status(200).json({
            message: "Word updated"
        });
    });
};

/**
 * Delete a word
 */
exports.deleteWord = (req, res) => {
    const sql = `
        DELETE FROM word WHERE id = ?;
    `;

    pool.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });

        res.status(204).send();
    });
};

router.post("/words", exports.createWord);
router.put("/words/:id", exports.updateWord);
router.delete("/words/:id", exports.deleteWord);

////////////////////////////////// GAMES //////////////////////////////////

/**
 * Delete a game
 */
exports.deleteGame = (req, res) => {
    const sql = `
        DELETE FROM game WHERE id = ?;
    `;

    pool.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });

        res.status(204).send();
    });
};

router.delete("/games/:id", exports.deleteGame);

////////////////////////////////// DIFFICULTIES //////////////////////////////////

/**
 * Create a new difficulty
 */
exports.createDifficulty = (req, res) => {
    const sql = `
        INSERT INTO difficulty (difficulty_label, min_letters, max_letters) VALUES (?, ?, ?);
    `;

    pool.query(sql, [req.body.difficulty_label, req.body.min_letters, req.body.max_letters], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.status(201).json({
            message: "Difficulty created",
            id: results.insertId
        });
    });
};

/**
 * Update a difficulty
 */
exports.updateDifficulty = (req, res) => {
    const sql = `
        UPDATE difficulty SET difficulty_label = ?, min_letters = ?, max_letters = ? WHERE id = ?;
    `;

    pool.query(sql, [req.body.difficulty_label, req.body.min_letters, req.body.max_letters, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.status(200).json({
            message: "Difficulty updated"
        });
    });
};

/**
 * Delete a difficulty
 */
exports.deleteDifficulty = (req, res) => {
    const sql = `
        DELETE FROM difficulty WHERE id = ?;
    `;

    pool.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });

        res.status(204).send();
    });
};

router.post("/difficulties", exports.createDifficulty);
router.put("/difficulties/:id", exports.updateDifficulty);
router.delete("/difficulties/:id", exports.deleteDifficulty);

////////////////////////////////// MODES //////////////////////////////////

/**
 * Create a new mode
 */
exports.createMode = (req, res) => {
    const sql = `
        INSERT INTO mode (mode_label) VALUES (?);
    `;

    pool.query(sql, [req.body.mode_label], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.status(201).json({
            message: "Mode created",
            id: results.insertId
        });
    });
};

/**
 * Update a mode
 */
exports.updateMode = (req, res) => {
    const sql = `
        UPDATE mode SET mode_label = ? WHERE id = ?;
    `;

    pool.query(sql, [req.body.mode_label, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.status(200).json({
            message: "Mode updated"
        });
    });
};

/**
 * Delete a mode
 */
exports.deleteMode = (req, res) => {
    const sql = `
        DELETE FROM mode WHERE id = ?;
    `;

    pool.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err });

        res.status(204).send();
    });
};

router.post("/modes", exports.createMode);
router.put("/modes/:id", exports.updateMode);
router.delete("/modes/:id", exports.deleteMode);

module.exports = router;