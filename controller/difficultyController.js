const express = require("express");
const router = express.Router();

exports.getAllDifficulties = (req, res) =>
{
    // Logic to get all difficulties
    res.send("Get all difficulties");
}

router.get("/", exports.getAllDifficulties);
module.exports = router;