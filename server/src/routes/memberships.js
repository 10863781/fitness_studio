import { Router } from "express"
import pool from "../db/pool.js"

const router = Router()

// GET /api/memberships -> every plan, in display order
router.get("/", async (req, res) => {
  const result = await pool.query(
    "SELECT id, name, blurb, price, period FROM memberships ORDER BY sort_order",
  )
  res.json(result.rows)
})

export default router
