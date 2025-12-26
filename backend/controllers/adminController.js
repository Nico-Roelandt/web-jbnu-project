const pool = require("../db");

////////////////////////////////// USERS //////////////////////////////////

/**
 * Get all users
 */
exports.getAllUsers = async (req, res) => {
    const sql = `
        SELECT id, username, nb_victories, nb_games, avg_attempts
        FROM user;
    `;

    try {
        const [results] = await pool.query(sql);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

////////////////////////////////// WORDS //////////////////////////////////

/**
 * Create a new word
 */
exports.createWord = async (req, res) => {
    const sql = `
        INSERT INTO word (word, nb_letters) VALUES (?, ?);
    `;

    try {
        const [results] = await pool.query(sql, [req.body.word, req.body.word.length]);
        res.status(201).json({
            message: "Word created",
            id: results.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

/**
 * Update a word
 */
exports.updateWord = async (req, res) => {
    const sql = `
        UPDATE word SET word = ?, nb_letters = ? WHERE id = ?;
    `;

    try {
        await pool.query(sql, [req.body.word, req.body.word.length, req.params.id]);
        res.status(200).json({
            message: "Word updated"
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

/**
 * Delete a word
 */
exports.deleteWord = async (req, res) => {
    const sql = `
        DELETE FROM word WHERE id = ?;
    `;

    try {
        await pool.query(sql, [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

////////////////////////////////// GAMES //////////////////////////////////

/**
 * Delete a game
 */
exports.deleteGame = async (req, res) => {
    const sql = `
        DELETE FROM game WHERE id = ?;
    `;

    try {
        await pool.query(sql, [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

////////////////////////////////// DIFFICULTIES //////////////////////////////////

/**
 * Create a new difficulty
 */
exports.createDifficulty = async (req, res) => {
    const sql = `
        INSERT INTO difficulty (difficulty_label, min_letters, max_letters) VALUES (?, ?, ?);
    `;

    try {
        const [results] = await pool.query(sql, [req.body.difficulty_label, req.body.min_letters, req.body.max_letters]);
        res.status(201).json({
            message: "Difficulty created",
            id: results.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

/**
 * Update a difficulty
 */
exports.updateDifficulty = async (req, res) => {
    const sql = `
        UPDATE difficulty SET difficulty_label = ?, min_letters = ?, max_letters = ? WHERE id = ?;
    `;

    try {
        await pool.query(sql, [req.body.difficulty_label, req.body.min_letters, req.body.max_letters, req.params.id]);
        res.status(200).json({
            message: "Difficulty updated"
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

/**
 * Delete a difficulty
 */
exports.deleteDifficulty = async (req, res) => {
    const sql = `
        DELETE FROM difficulty WHERE id = ?;
    `;

    try {
        await pool.query(sql, [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

////////////////////////////////// MODES //////////////////////////////////

/**
 * Create a new mode
 */
exports.createMode = async (req, res) => {
    const sql = `
        INSERT INTO mode (mode_label) VALUES (?);
    `;

    try {
        const [results] = await pool.query(sql, [req.body.mode_label]);
        res.status(201).json({
            message: "Mode created",
            id: results.insertId
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

/**
 * Update a mode
 */
exports.updateMode = async (req, res) => {
    const sql = `
        UPDATE mode SET mode_label = ? WHERE id = ?;
    `;

    try {
        await pool.query(sql, [req.body.mode_label, req.params.id]);
        res.status(200).json({
            message: "Mode updated"
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

/**
 * Delete a mode
 */
exports.deleteMode = async (req, res) => {
    const sql = `
        DELETE FROM mode WHERE id = ?;
    `;

    try {
        await pool.query(sql, [req.params.id]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err });
    }
};