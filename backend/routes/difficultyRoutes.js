const express = require("express");
const router = express.Router();
const difficultyController = require('../controllers/difficultyController');

router.get("/", difficultyController.getAllDifficulties);

module.exports = router;