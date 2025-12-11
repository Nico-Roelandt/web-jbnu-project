const express = require("express");
const router = express.Router();
const modeController = require('../controllers/modeController');

router.get("/", modeController.getAllModes);

module.exports = router;