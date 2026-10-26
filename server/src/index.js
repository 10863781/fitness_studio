import "dotenv/config"
import express from "express"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// Simple check that the server is up — handy after deploying
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
})

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
