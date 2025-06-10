import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        id,
        time,
        destination,
        route,
        status,
        day,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM schedules 
      ORDER BY time
    `)

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Error fetching schedules:", error)

    // Return demo data if database is not available
    const demoSchedules = [
      {
        id: "1",
        time: "06:00",
        destination: "Downtown",
        route: "42",
        status: "on-time",
        day: "weekday",
      },
      {
        id: "2",
        time: "06:15",
        destination: "Airport",
        route: "15",
        status: "on-time",
        day: "weekday",
      },
      {
        id: "3",
        time: "07:30",
        destination: "International School",
        route: "101",
        status: "on-time",
        day: "weekday",
      },
    ]

    return NextResponse.json(demoSchedules)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { time, destination, route, status, day } = body

    const result = await query(
      `
      INSERT INTO schedules (time, destination, route, status, day)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING 
        id,
        time,
        destination,
        route,
        status,
        day
    `,
      [time, destination, route, status || "on-time", day],
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Error creating schedule:", error)
    return NextResponse.json({ error: "Failed to create schedule" }, { status: 500 })
  }
}
