import { Pool } from "pg"

// Create a PostgreSQL connection pool
let pool: Pool | null = null

try {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  })
} catch (error) {
  console.warn("Database connection not available, using demo mode")
}

// Helper function to execute SQL queries
export async function query(text: string, params?: any[]) {
  if (!pool) {
    throw new Error("Database not available")
  }

  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log("Executed query", { text, duration, rows: res.rowCount })
    return res
  } catch (error) {
    console.error("Error executing query", { text, error })
    throw error
  }
}

// Initialize database tables if they don't exist
export async function initDatabase() {
  if (!pool) {
    console.warn("Database not available for initialization")
    return
  }

  try {
    // Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        full_name VARCHAR(100),
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create routes table
    await query(`
      CREATE TABLE IF NOT EXISTS routes (
        id SERIAL PRIMARY KEY,
        number VARCHAR(10) NOT NULL,
        name VARCHAR(100) NOT NULL,
        frequency VARCHAR(50) NOT NULL,
        start_point VARCHAR(100) NOT NULL,
        end_point VARCHAR(100) NOT NULL,
        stops INTEGER NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        is_accessible BOOLEAN DEFAULT false,
        is_express BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create alerts table
    await query(`
      CREATE TABLE IF NOT EXISTS alerts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        type VARCHAR(20) NOT NULL,
        severity VARCHAR(20) NOT NULL,
        affected_routes TEXT[] NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create schedules table
    await query(`
      CREATE TABLE IF NOT EXISTS schedules (
        id SERIAL PRIMARY KEY,
        time VARCHAR(10) NOT NULL,
        destination VARCHAR(100) NOT NULL,
        route VARCHAR(10) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'on-time',
        day VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Error initializing database", error)
    throw error
  }
}
