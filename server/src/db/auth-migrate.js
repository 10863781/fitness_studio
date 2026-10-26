// Creates (or updates) the tables Better Auth needs: user, session, account,
// verification. Usage: npm run db:auth
import "dotenv/config"
import { getMigrations } from "better-auth/db/migration"
import { auth } from "../auth.js"
import pool from "./pool.js"

const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(auth.options)

if (toBeCreated.length === 0 && toBeAdded.length === 0) {
  console.log("Auth tables are already up to date.")
} else {
  await runMigrations()
  console.log("Created auth tables:", toBeCreated.map((t) => t.table).join(", ") || "none")
}
await pool.end()
