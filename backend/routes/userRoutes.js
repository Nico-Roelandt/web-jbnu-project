const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

router.get("/:id", userController.getUser);
router.patch("/:id", userController.updateUserStats);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

module.exports = router;