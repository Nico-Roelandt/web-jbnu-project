const express = require("express")
const router = express.Router()
const gameController = require("../controllers/gameController")

router.get("/start", gameController.startGame)
router.post("/:id/guess", gameController.guess)

module.exports = router
