import express from "express"
import dotenv from "dotenv"
import { client, connectToDatabase } from "./database.js"
import taskRouter from "./src/routes/index.js"

const app = express()
dotenv.config()
const { API_PORT } = process.env

connectToDatabase()

app.use("/tasks", taskRouter)

try {
  app.listen(API_PORT, () => {
    console.info("✅ App is listening!")
  })
} catch (error) {
  console.error("❌ Error starting the server:", error)
}

// Close MongoDB connection when the application exits
process.on("SIGINT", async () => {
  await client.close()
  console.info("🚪 MongoDB connection closed")
  process.exit(0)
})
