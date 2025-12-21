const express = require("express");
const router = express.Router();
const wordController = require('../controllers/wordController');

/**
 * @swagger
 * tags:
 *   name: Words
 *   description: Word management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Word:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         word:
 *           type: string
 *           example: apple
 *         nb_letters:
 *           type: integer
 *           example: 5
 */

/**
 * @swagger
 * /words:
 *   get:
 *     summary: Get all words
 *     description: Retrieve all words with pagination and keyword search
 *     tags: [Words]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 15
 *         description: Number of items per page
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           default: ""
 *         description: Filter words by keyword
 *     responses:
 *       200:
 *         description: List of words
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Word'
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *       500:
 *         description: Server error
 */
router.get("/", wordController.getAllWords);

module.exports = router;
