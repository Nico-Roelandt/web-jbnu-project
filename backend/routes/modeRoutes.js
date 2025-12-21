const express = require("express");
const router = express.Router();
const modeController = require('../controllers/modeController');

/**
 * @swagger
 * tags:
 *   name: Modes
 *   description: Mode management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Mode:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         mode_label:
 *           type: string
 *           example: "Classic"
 */

/**
 * @swagger
 * /modes:
 *   get:
 *     summary: Get all modes
 *     description: Retrieve all modes
 *     tags: [Modes]
 *     responses:
 *       200:
 *         description: List of modes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mode'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.get("/", modeController.getAllModes);

module.exports = router;
