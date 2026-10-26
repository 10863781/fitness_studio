import { betterAuth } from "better-auth"
import pool from "./db/pool.js"

// Better Auth handles signup, login, logout and sessions for us.
// It stores users in our Postgres database (tables: user, session, account,
// verification) and gives each signed-in browser a secure session cookie.
export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  // The public site address. The browser always talks to /api on this same
  // address (Vite proxies it locally, Vercel rewrites it when live), so the
  // session cookie is first-party and survives a page refresh.
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.BETTER_AUTH_URL],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // stay signed in for 7 days
  },
  user: {
    // Extra column on the user table: which membership plan they chose
    additionalFields: {
      plan: { type: "string", required: false, defaultValue: "monthly" },
    },
  },
})
