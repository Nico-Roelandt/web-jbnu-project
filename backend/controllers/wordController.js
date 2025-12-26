const db = require('../db')

exports.getAllWords = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1)
    const size = Math.max(parseInt(req.query.size || '15', 10), 1)
    const keyword = (req.query.keyword || '').trim()

    const offset = (page - 1) * size

    const where = keyword ? 'WHERE word LIKE ?' : ''
    const params = keyword ? [`%${keyword}%`, size, offset] : [size, offset]

    const [items] = await db.query(
      `SELECT id, word, nb_letters FROM word ${where} ORDER BY id LIMIT ? OFFSET ?`,
      params
    )

    const countParams = keyword ? [`%${keyword}%`] : []
    const [countRows] = await db.query(
      `SELECT COUNT(*) AS total FROM word ${where}`,
      countParams
    )

    const total = countRows[0].total
    const totalPages = Math.max(Math.ceil(total / size), 1)

    res.json({ items, totalPages })
  } catch (e) {
    next(e)
  }
}
