// Fills the classes and memberships tables with our starting data.
// Safe to run more than once: it empties the tables first.
// Usage: npm run db:seed
import "dotenv/config"
import pool from "./pool.js"
import { classes, memberships } from "./seed-data.js"

// One client for the whole seed so we can wrap it in a transaction:
// either every row goes in, or (if anything fails) none do.
const client = await pool.connect()

try {
  await client.query("BEGIN")
  await client.query("TRUNCATE classes, memberships RESTART IDENTITY")

  for (const [index, plan] of memberships.entries()) {
    await client.query(
      `INSERT INTO memberships (id, name, blurb, price, period, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [plan.id, plan.name, plan.blurb, plan.price, plan.period, index],
    )
  }

  for (const item of classes) {
    await client.query(
      `INSERT INTO classes
         (name, category, trainer, start_time, duration_minutes, max_spots, image, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        item.name,
        item.category,
        item.trainer,
        item.startTime,
        item.durationMinutes,
        item.maxSpots,
        item.image,
        item.description,
      ],
    )
  }

  await client.query("COMMIT")
  console.log(`Seeded ${memberships.length} memberships and ${classes.length} classes.`)
} catch (error) {
  await client.query("ROLLBACK")
  console.error("Seed failed, nothing was changed:", error.message)
  process.exitCode = 1
} finally {
  client.release()
  await pool.end()
}
