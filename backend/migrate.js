import dotenv from "dotenv"
import fs from "fs"
import mysql from "mysql2/promise"

dotenv.config()

const migrateDatabase = async () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env

  let connection
  try {
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true,
    })

    await connection.query(`drop database if exists ${DB_NAME}`)
    await connection.query(`create database ${DB_NAME}`)
    await connection.query(`use ${DB_NAME}`)

    const sql = fs.readFileSync("./database.sql", "utf8")

    await connection.query(sql)
    console.info("✅ Database migration successful.")
  } catch (err) {
    console.error("❌ Error executing database migration.", err)
  } finally {
    if (connection) {
      connection.end()
    }
  }
}

export default migrateDatabase
