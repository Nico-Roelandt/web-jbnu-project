const express = require("express")
const router = express.Router()
const gameController = require("../controllers/gameController")

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Game lifecycle and guesses
 */

/**
 * @swagger
 * /games/start:
 *   get:
 *     summary: Start a new game
 *     tags: [Games]
 *     description: |
 *       Starts a new game by selecting a random word from the database.
 *       A new game entry is created and the word length is returned.
 *     responses:
 *       200:
 *         description: Game successfully started
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 game_id:
 *                   type: integer
 *                   example: 12
 *                 length:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Server error or no word found
 */
router.get("/start", gameController.startGame)

/**
 * @swagger
 * /games/{id}/guess:
 *   post:
 *     summary: Make a guess in a game
 *     tags: [Games]
 *     description: |
 *       Submit a guessed word for a given game.
 *       The API checks:
 *       - if the word exists in the database
 *       - if the guess length is correct
 *       - letter correctness (correct / present / absent)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Game ID
 *         schema:
 *           type: integer
 *           example: 12
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - guess
 *             properties:
 *               guess:
 *                 type: string
 *                 example: apple
 *     responses:
 *       200:
 *         description: Guess processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inDb:
 *                   type: boolean
 *                   example: true
 *                 win:
 *                   type: boolean
 *                   example: false
 *                 result:
 *                   type: array
 *                   items:
 *                     type: string
 *                     enum: [correct, present, absent]
 *                   example: ["correct", "present", "absent", "absent", "correct"]
 *       400:
 *         description: Invalid game or invalid guess length
 *       500:
 *         description: Server error
 */
router.post("/:id/guess", gameController.guess)

module.exports = router
