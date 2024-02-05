import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import router from "./src/router.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)

const { API_PORT } = process.env

try {
  app.listen(API_PORT, () => {
    console.info("✅ App is listening.")
  })
} catch (error) {
  console.error("❌ Error starting the server:", error)
}
