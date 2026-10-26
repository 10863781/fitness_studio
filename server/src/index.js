import "dotenv/config"
import express from "express"
import { toNodeHandler, fromNodeHeaders } from "better-auth/node"
import { auth } from "./auth.js"
import classesRouter from "./routes/classes.js"
import membershipsRouter from "./routes/memberships.js"

const app = express()
const port = process.env.PORT || 3000

// Better Auth must come before express.json(): it reads the request body itself.
// It handles every /api/auth/... URL (sign-up/email, sign-in/email, sign-out, get-session)
app.all("/api/auth/*splat", toNodeHandler(auth))

app.use(express.json())

// Simple check that the server is up — handy after deploying
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
})

app.use("/api/classes", classesRouter)
app.use("/api/memberships", membershipsRouter)

// Example protected route: only works with a valid session cookie
app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })
  if (!session) {
    return res.status(401).json({ error: "Not signed in" })
  }
  res.json(session.user)
})

// Any /api URL we don't handle
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not found" })
})

// If a route throws (e.g. the database is unreachable), Express 5 sends the
// error here. Log the details on the server, give the browser a short message.
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: "Something went wrong on the server" })
})

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
