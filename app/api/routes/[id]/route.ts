import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const result = await query("SELECT * FROM routes WHERE id = $1", [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 })
    }

    const route = result.rows[0]

    return NextResponse.json({
      id: route.id.toString(),
      number: route.number,
      name: route.name,
      frequency: route.frequency,
      startPoint: route.start_point,
      endPoint: route.end_point,
      stops: route.stops,
      status: route.status,
      isAccessible: route.is_accessible,
      isExpress: route.is_express,
    })
  } catch (error) {
    console.error("Error fetching route:", error)
    return NextResponse.json({ error: "Failed to fetch route" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { number, name, frequency, startPoint, endPoint, stops, status, isAccessible, isExpress } = body

    // Validate required fields
    if (!number || !name || !frequency || !startPoint || !endPoint || !stops) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await query(
      `UPDATE routes 
       SET number = $1, name = $2, frequency = $3, start_point = $4, end_point = $5, 
           stops = $6, status = $7, is_accessible = $8, is_express = $9, updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING *`,
      [number, name, frequency, startPoint, endPoint, stops, status, isAccessible, isExpress, id],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 })
    }

    const updatedRoute = result.rows[0]

    return NextResponse.json({
      id: updatedRoute.id.toString(),
      number: updatedRoute.number,
      name: updatedRoute.name,
      frequency: updatedRoute.frequency,
      startPoint: updatedRoute.start_point,
      endPoint: updatedRoute.end_point,
      stops: updatedRoute.stops,
      status: updatedRoute.status,
      isAccessible: updatedRoute.is_accessible,
      isExpress: updatedRoute.is_express,
    })
  } catch (error) {
    console.error("Error updating route:", error)
    return NextResponse.json({ error: "Failed to update route" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const result = await query("DELETE FROM routes WHERE id = $1 RETURNING id", [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting route:", error)
    return NextResponse.json({ error: "Failed to delete route" }, { status: 500 })
  }
}
