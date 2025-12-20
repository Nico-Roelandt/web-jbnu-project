const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

router.get("/:id", userController.getUser);
router.get("/", userController.getUsers);
router.patch("/:id", userController.updateUserStats);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id/rankings", userController.getUserRankings);

module.exports = router;