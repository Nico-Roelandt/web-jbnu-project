const express = require("express");
const router = express.Router();
const difficultyController = require('../controllers/difficultyController');

/**
 * @swagger
 * tags:
 *   name: Difficulties
 *   description: Difficulty management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Difficulty:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         difficulty_label:
 *           type: string
 *           example: Easy
 *         min_letters:
 *           type: integer
 *           example: 3
 *         max_letters:
 *           type: integer
 *           example: 5
 */

/**
 * @swagger
 * /difficulties:
 *   get:
 *     summary: Get all difficulties
 *     tags: [Difficulties]
 *     responses:
 *       200:
 *         description: List of difficulties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Difficulty'
 *       500:
 *         description: Server error
 */
router.get("/", difficultyController.getAllDifficulties);

module.exports = router;
