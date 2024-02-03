import { MongoClient, ServerApiVersion } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const uri = process.env.MONGODB_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function connectToDatabase() {
  try {
    await client.connect()
    await client.db("admin").command({ ping: 1 })
    console.info("✅ Connected to MongoDB!")
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error)
  }
}

// Keep this line for connecting to the database on application startup
connectToDatabase().catch(console.dir)

export { client, connectToDatabase }
