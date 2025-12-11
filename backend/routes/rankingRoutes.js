const express = require("express");
const router = express.Router();
const rankingController = require('../controllers/rankingController');

router.get("/victories", rankingController.getVictoriesRanking);
router.get("/victories/top3", rankingController.getVictoriesTop3);
router.get("/attempts", rankingController.getAttemptsRanking);
router.get("/attempts/top3", rankingController.getAttemptsTop3);
router.get("/games", rankingController.getGamesRanking);
router.get("/games/top3", rankingController.getGamesTop3);

module.exports = router;