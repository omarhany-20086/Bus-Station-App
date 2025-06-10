import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        id,
        title,
        description,
        type,
        severity,
        affected_routes as "affectedRoutes",
        status,
        timestamp,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM alerts 
      ORDER BY timestamp DESC
    `)

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Error fetching alerts:", error)

    // Return demo data if database is not available
    const demoAlerts = [
      {
        id: "1",
        title: "Route 42 Detour",
        description:
          "Due to road construction on Main Street, Route 42 is currently on detour via Oak Avenue and Pine Street. Expect delays of 5-10 minutes.",
        type: "detour",
        severity: "medium",
        affectedRoutes: ["42"],
        status: "active",
        timestamp: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Service Disruption on Route 15",
        description:
          "Due to a traffic accident, Route 15 is experiencing significant delays. Buses may be delayed by up to 20 minutes.",
        type: "delay",
        severity: "high",
        affectedRoutes: ["15"],
        status: "active",
        timestamp: new Date().toISOString(),
      },
    ]

    return NextResponse.json(demoAlerts)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, type, severity, affectedRoutes, status } = body

    const result = await query(
      `
      INSERT INTO alerts (title, description, type, severity, affected_routes, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING 
        id,
        title,
        description,
        type,
        severity,
        affected_routes as "affectedRoutes",
        status,
        timestamp
    `,
      [title, description, type, severity, affectedRoutes, status || "active"],
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Error creating alert:", error)
    return NextResponse.json({ error: "Failed to create alert" }, { status: 500 })
  }
}
