import { Router } from "express"
import pool from "../db/pool.js"

const router = Router()

// Column list shared by both queries. "AS" renames snake_case columns to the
// camelCase names the React app uses.
const columns = `
  id, name, category, trainer,
  to_char(start_time, 'HH24:MI') AS "startTime",
  duration_minutes AS "durationMinutes",
  max_spots AS "maxSpots",
  image, description
`

// GET /api/classes            -> every class
// GET /api/classes?category=Cardio -> only classes in that category
router.get("/", async (req, res) => {
  const { category } = req.query
  const result = category
    ? await pool.query(`SELECT ${columns} FROM classes WHERE category = $1 ORDER BY id`, [category])
    : await pool.query(`SELECT ${columns} FROM classes ORDER BY id`)
  res.json(result.rows)
})

// GET /api/classes/3 -> one class, or 404 if it doesn't exist
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Class id must be a number" })
  }
  const result = await pool.query(`SELECT ${columns} FROM classes WHERE id = $1`, [id])
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Class not found" })
  }
  res.json(result.rows[0])
})

export default router
