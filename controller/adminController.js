const express = require("express");
const router = express.Router();

exports.getAllAdmins = (req, res) =>
{
    // Logic to get all admins
    res.send("Welcome to the admin panel");
}

router.get("/", exports.getAllAdmins);

module.exports = router;