const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');

////////////////////////////////// USERS //////////////////////////////////

router.get("/users", adminController.getAllUsers);

////////////////////////////////// WORDS //////////////////////////////////

router.post("/words", adminController.createWord);
router.put("/words/:id", adminController.updateWord);
router.delete("/words/:id", adminController.deleteWord);

////////////////////////////////// GAMES //////////////////////////////////

router.delete("/games/:id", adminController.deleteGame);

////////////////////////////////// DIFFICULTIES //////////////////////////////////

router.post("/difficulties", adminController.createDifficulty);
router.put("/difficulties/:id", adminController.updateDifficulty);
router.delete("/difficulties/:id", adminController.deleteDifficulty);

////////////////////////////////// MODES //////////////////////////////////

router.post("/modes", adminController.createMode);
router.put("/modes/:id", adminController.updateMode);
router.delete("/modes/:id", adminController.deleteMode);

module.exports = router;