const express = require("express");
const router = express.Router();

exports.getRanking = (req, res) =>
{
    // Logic to get ranking
    res.send("Get the ranking");
}

router.get("/", exports.getRanking);
module.exports = router;