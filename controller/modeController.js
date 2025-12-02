const express = require("express");
const router = express.Router();

exports.getAllModes = (req, res) =>
{
    // Logic to get all modes
    res.send("Get all modes");
}

router.get("/", exports.getAllModes);
module.exports = router;