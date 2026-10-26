// Creates our tables by running schema.sql against the database.
// Usage: npm run db:schema
import "dotenv/config"
import { readFile } from "node:fs/promises"
import pool from "./pool.js"

const sql = await readFile(new URL("./schema.sql", import.meta.url), "utf8")
await pool.query(sql)
console.log("Tables created (or already existed).")
await pool.end()
