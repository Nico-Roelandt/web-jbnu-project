const express = require("express");
const router = express.Router();

exports.getAllWords = (req, res) =>
{
    // Logic to get all words
    res.send("Get all words");
}

router.get("/", exports.getAllWords);

module.exports = router;