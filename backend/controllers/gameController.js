const pool = require("../db")

let currentTargetByGameId = new Map()

/**
 * Start a new game
 */
exports.startGame = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, word FROM word ORDER BY RAND() LIMIT 1"
    )

    if (!rows.length) return res.status(500).json({ error: "No word found" })

    const picked = rows[0]

    const GUEST_USER_ID = 1
    const DEFAULT_DIFFICULTY_ID = 1
    const DEFAULT_MODE_ID = 1

    const [result] = await pool.query(
      "INSERT INTO game (word_id, user_id, difficulty_id, mode_id) VALUES (?, ?, ?, ?)",
      [picked.id, GUEST_USER_ID, DEFAULT_DIFFICULTY_ID, DEFAULT_MODE_ID]
    )

    currentTargetByGameId.set(String(result.insertId), picked.word)

    res.json({
      game_id: result.insertId,
      length: picked.word.length
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}


/**
 * Make a guess in a game
 */
exports.guess = async (req, res) => {
  try {
    const gameId = String(req.params.id)
    const guess = String(req.body.guess || "").toLowerCase()

    const target = currentTargetByGameId.get(gameId)
    if (!target) return res.status(400).json({ error: "Game not started" })

    if (guess.length !== target.length) {
      return res.status(400).json({ error: "Bad length" })
    }

    const [exists] = await pool.query(
      "SELECT id FROM word WHERE word = ? LIMIT 1",
      [guess]
    )
    const inDb = exists.length > 0

    const result = guess.split("").map((c, i) => {
      if (c === target[i]) return "correct"
      if (target.includes(c)) return "present"
      return "absent"
    })

    const win = result.every(r => r === "correct")

    res.json({
      inDb,
      win,
      result
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}
