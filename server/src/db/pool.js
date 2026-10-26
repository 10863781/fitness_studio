import pg from "pg"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing – copy server/.env.example to server/.env and fill it in")
}

// A pool keeps a few database connections open and hands them out to each
// query, so we don't reconnect to Postgres on every request.
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })

export default pool
