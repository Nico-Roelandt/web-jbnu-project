const express = require("express");
const router = express.Router();

exports.getAllGames = (req, res) =>
{
    // Logic to get all games
    res.send("Get all games");
}

router.get("/", exports.getAllGames);

module.exports = router;