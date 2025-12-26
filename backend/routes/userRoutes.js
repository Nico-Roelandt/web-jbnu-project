const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const { authMiddleware, adminOnly } = require("../middlewares/auth")

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
 *         username:
 *           type: string
 *         is_admin:
 *           type: integer
 *         nb_victories:
 *           type: integer
 *         nb_games:
 *           type: integer
 *         avg_attempts:
 *           type: number
 *
 *     PaginatedUsers:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *         size:
 *           type: integer
 *         total:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *
 *     GoogleLogin:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *
 *     Rankings:
 *       type: object
 *       properties:
 *         victories:
 *           type: integer
 *         attempts:
 *           type: integer
 *         games:
 *           type: integer
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 15
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           default: ""
 *     responses:
 *       200:
 *         description: Paginated users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedUsers'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", authMiddleware, adminOnly, userController.getUsers)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by id
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
 *         description: User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", authMiddleware, userController.getUser)

/**
 * @swagger
 * /users/stats:
 *   patch:
 *     summary: Update authenticated user stats
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - attempts
 *             properties:
 *               win:
 *                 type: boolean
 *               attempts:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Stats updated
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 */
router.patch("/stats", authMiddleware, userController.updateUserStats)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create user (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
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
 *               password:
 *                 type: string
 *               is_admin:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User created
 *       403:
 *         description: Forbidden
 */
router.post("/", authMiddleware, adminOnly, userController.createUser)

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
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GoogleLogin'
 */
router.post("/google-login", userController.googleLogin)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
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
 *         description: Deleted
 */
router.delete("/:id", authMiddleware, adminOnly, userController.deleteUser)

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
 *         description: Rankings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rankings'
 */
router.get("/:id/rankings", authMiddleware, userController.getUserRankings)

module.exports = router
