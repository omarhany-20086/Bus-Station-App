import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        id,
        number,
        name,
        frequency,
        start_point as "startPoint",
        end_point as "endPoint",
        stops,
        status,
        is_accessible as "isAccessible",
        is_express as "isExpress",
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM routes 
      ORDER BY number
    `)

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Error fetching routes:", error)

    // Return demo data if database is not available
    const demoRoutes = [
      {
        id: "1",
        number: "42",
        name: "Downtown Express",
        frequency: "Every 10 min",
        startPoint: "Central Station",
        endPoint: "Business District",
        stops: 18,
        status: "active",
        isAccessible: true,
        isExpress: true,
      },
      {
        id: "2",
        number: "15",
        name: "Airport Shuttle",
        frequency: "Every 15 min",
        startPoint: "Central Station",
        endPoint: "International Airport",
        stops: 12,
        status: "active",
        isAccessible: true,
        isExpress: false,
      },
      {
        id: "3",
        number: "101",
        name: "School Route A",
        frequency: "Every 30 min",
        startPoint: "Residential Area",
        endPoint: "International School",
        stops: 8,
        status: "active",
        isAccessible: true,
        isExpress: false,
      },
    ]

    return NextResponse.json(demoRoutes)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { number, name, frequency, startPoint, endPoint, stops, status, isAccessible, isExpress } = body

    const result = await query(
      `
      INSERT INTO routes (number, name, frequency, start_point, end_point, stops, status, is_accessible, is_express)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING 
        id,
        number,
        name,
        frequency,
        start_point as "startPoint",
        end_point as "endPoint",
        stops,
        status,
        is_accessible as "isAccessible",
        is_express as "isExpress"
    `,
      [number, name, frequency, startPoint, endPoint, stops, status, isAccessible, isExpress],
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Error creating route:", error)
    return NextResponse.json({ error: "Failed to create route" }, { status: 500 })
  }
}
