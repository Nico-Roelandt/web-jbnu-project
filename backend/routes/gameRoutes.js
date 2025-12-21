const express = require("express");
const router = express.Router();
const gameController = require('../controllers/gameController');

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Game management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         word_id:
 *           type: integer
 *           example: 12
 *         user_id:
 *           type: integer
 *           example: 5
 *         difficulty_id:
 *           type: integer
 *           example: 2
 *         mode_id:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - word_id
 *               - user_id
 *               - difficulty_id
 *               - mode_id
 *             properties:
 *               word_id:
 *                 type: integer
 *                 example: 12
 *               user_id:
 *                 type: integer
 *                 example: 5
 *               difficulty_id:
 *                 type: integer
 *                 example: 2
 *               mode_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Game created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Game created
 *                 game_id:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: VALIDATION_ERROR
 *                 message:
 *                   type: string
 *                   example: Missing required fields
 *                 missingFields:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Database error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: DATABASE_ERROR
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.post("/", gameController.createGame);

module.exports = router;
