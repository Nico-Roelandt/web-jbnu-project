const pool = require("../db");

/**
 * Get all words
 */
exports.getAllWords = (req, res) => {
    let { page = 1, size = 15, keyword = "" } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    const offset = (page - 1) * size;

    const countSql = "SELECT COUNT(*) AS total FROM word WHERE word LIKE ?";
    pool.query(countSql, [`%${keyword}%`], (err, countResult) => {
        if (err) return res.status(500).json({ error: err });

        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / size);

        const sql = "SELECT * FROM word WHERE word LIKE ? LIMIT ? OFFSET ?";
        pool.query(sql, [`%${keyword}%`, size, offset], (err, results) => {
            if (err) return res.status(500).json({ error: err });

            res.json({
                items: results,
                totalPages
            });
        });
    });
};

