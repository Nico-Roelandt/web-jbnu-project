const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminOnly } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: johndoe
 *         is_admin:
 *           type: integer
 *           example: 0
 *         nb_victories:
 *           type: integer
 *           example: 10
 *         nb_games:
 *           type: integer
 *           example: 20
 *         avg_attempts:
 *           type: number
 *           example: 3.5
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *         description: Items per page
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           default: ""
 *         description: Search by username
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 size:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 */
router.get("/", authMiddleware, adminOnly, userController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get("/:id", authMiddleware, userController.getUser);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update user stats after a game
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Stats to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               win:
 *                 type: boolean
 *                 example: true
 *               attempts:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       200:
 *         description: User stats updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.patch("/stats",authMiddleware,userController.updateUserStats);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - is_admin
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *               is_admin:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 */
router.post("/", authMiddleware, adminOnly, userController.createUser);

/**
 * @swagger
 * /users/google-login:
 *   post:
 *     summary: Google login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - googleId
 *               - username
 *             properties:
 *               googleId:
 *                 type: string
 *                 example: "google-id-123"
 *               username:
 *                 type: string
 *                 example: johndoe
 *     responses:
 *       200:
 *         description: User logged in or created
 */
router.post("/google-login", userController.googleLogin);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin only)
 */
router.delete("/:id", authMiddleware, adminOnly, userController.deleteUser);

/**
 * @swagger
 * /users/{id}/rankings:
 *   get:
 *     summary: Get user rankings
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User rankings returned
 *       401:
 *         description: Unauthorized
 */
router.get("/:id/rankings", authMiddleware, userController.getUserRankings);

module.exports = router;
