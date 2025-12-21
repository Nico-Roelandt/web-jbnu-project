const express = require("express");
const router = express.Router();
const rankingController = require('../controllers/rankingController');

/**
 * @swagger
 * tags:
 *   name: Rankings
 *   description: User ranking and leaderboard
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRanking:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: "john_doe"
 *         nb_victories:
 *           type: integer
 *           example: 10
 *         avg_attempts:
 *           type: number
 *           format: float
 *           example: 3.5
 *         nb_games:
 *           type: integer
 *           example: 20
 */

/**
 * @swagger
 * /rankings/victories:
 *   get:
 *     summary: Get the ranking of users by victories
 *     tags: [Rankings]
 *     responses:
 *       200:
 *         description: List of users ordered by victories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserRanking'
 */
router.get("/victories", rankingController.getVictoriesRanking);

/**
 * @swagger
 * /rankings/victories/top3:
 *   get:
 *     summary: Get top 3 users by victories
 *     tags: [Rankings]
 *     responses:
 *       200:
 *         description: Top 3 users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserRanking'
 */
router.get("/victories/top3", rankingController.getVictoriesTop3);

/**
 * @swagger
 * /rankings/attempts:
 *   get:
 *     summary: Get the ranking of users by average attempts
 *     tags: [Rankings]
 *     responses:
 *       200:
 *         description: List of users ordered by average attempts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserRanking'
 */
router.get("/attempts", rankingController.getAttemptsRanking);

/**
 * @swagger
 * /rankings/attempts/top3:
 *   get:
 *     summary: Get top 3 users by average attempts
 *     tags: [Rankings]
 *     responses:
 *       200:
 *         description: Top 3 users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserRanking'
 */
router.get("/attempts/top3", rankingController.getAttemptsTop3);

/**
 * @swagger
 * /rankings/games:
 *   get:
 *     summary: Get the ranking of users by number of games played
 *     tags: [Rankings]
 *     responses:
 *       200:
 *         description: List of users ordered by number of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserRanking'
 */
router.get("/games", rankingController.getGamesRanking);

/**
 * @swagger
 * /rankings/games/top3:
 *   get:
 *     summary: Get top 3 users by number of games played
 *     tags: [Rankings]
 *     responses:
 *       200:
 *         description: Top 3 users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserRanking'
 */
router.get("/games/top3", rankingController.getGamesTop3);

module.exports = router;
