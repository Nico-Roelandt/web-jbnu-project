const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, adminOnly } = require("../middlewares/auth.js");

////////////////////////////////// USERS //////////////////////////////////

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */
router.get("/users", authMiddleware, adminOnly, adminController.getAllUsers);

////////////////////////////////// WORDS //////////////////////////////////

/**
 * @swagger
 * /admin/words:
 *   post:
 *     summary: Create a new word
 *     tags: [Words]
 *     security:
 *       - bearerAuth: []
 */
router.post("/words", authMiddleware, adminOnly, adminController.createWord);

/**
 * @swagger
 * /admin/words/{id}:
 *   put:
 *     summary: Update a word
 *     tags: [Words]
 *     security:
 *       - bearerAuth: []
 */
router.put("/words/:id", authMiddleware, adminOnly, adminController.updateWord);

/**
 * @swagger
 * /admin/words/{id}:
 *   delete:
 *     summary: Delete a word
 *     tags: [Words]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/words/:id", authMiddleware, adminOnly, adminController.deleteWord);

////////////////////////////////// GAMES //////////////////////////////////

/**
 * @swagger
 * /admin/games/{id}:
 *   delete:
 *     summary: Delete a game
 *     tags: [Games]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/games/:id", authMiddleware, adminOnly, adminController.deleteGame);

////////////////////////////////// DIFFICULTIES //////////////////////////////////

/**
 * @swagger
 * /admin/difficulties:
 *   post:
 *     summary: Create a new difficulty
 *     tags: [Difficulties]
 *     security:
 *       - bearerAuth: []
 */
router.post("/difficulties", authMiddleware, adminOnly, adminController.createDifficulty);

/**
 * @swagger
 * /admin/difficulties/{id}:
 *   put:
 *     summary: Update a difficulty
 *     tags: [Difficulties]
 *     security:
 *       - bearerAuth: []
 */
router.put("/difficulties/:id", authMiddleware, adminOnly, adminController.updateDifficulty);

/**
 * @swagger
 * /admin/difficulties/{id}:
 *   delete:
 *     summary: Delete a difficulty
 *     tags: [Difficulties]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/difficulties/:id", authMiddleware, adminOnly, adminController.deleteDifficulty);

////////////////////////////////// MODES //////////////////////////////////

/**
 * @swagger
 * /admin/modes:
 *   post:
 *     summary: Create a new mode
 *     tags: [Modes]
 *     security:
 *       - bearerAuth: []
 */
router.post("/modes", authMiddleware, adminOnly, adminController.createMode);

/**
 * @swagger
 * /admin/modes/{id}:
 *   put:
 *     summary: Update a mode
 *     tags: [Modes]
 *     security:
 *       - bearerAuth: []
 */
router.put("/modes/:id", authMiddleware, adminOnly, adminController.updateMode);

/**
 * @swagger
 * /admin/modes/{id}:
 *   delete:
 *     summary: Delete a mode
 *     tags: [Modes]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/modes/:id", authMiddleware, adminOnly, adminController.deleteMode);

module.exports = router;
