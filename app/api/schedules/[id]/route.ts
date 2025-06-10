import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const result = await query("SELECT * FROM schedules WHERE id = $1", [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Schedule not found" }, { status: 404 })
    }

    const schedule = result.rows[0]

    return NextResponse.json({
      id: schedule.id.toString(),
      time: schedule.time,
      destination: schedule.destination,
      route: schedule.route,
      status: schedule.status,
      day: schedule.day,
    })
  } catch (error) {
    console.error("Error fetching schedule:", error)
    return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { time, destination, route, status, day } = body

    // Validate required fields
    if (!time || !destination || !route || !day) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await query(
      `UPDATE schedules 
       SET time = $1, destination = $2, route = $3, status = $4, day = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [time, destination, route, status, day, id],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Schedule not found" }, { status: 404 })
    }

    const updatedSchedule = result.rows[0]

    return NextResponse.json({
      id: updatedSchedule.id.toString(),
      time: updatedSchedule.time,
      destination: updatedSchedule.destination,
      route: updatedSchedule.route,
      status: updatedSchedule.status,
      day: updatedSchedule.day,
    })
  } catch (error) {
    console.error("Error updating schedule:", error)
    return NextResponse.json({ error: "Failed to update schedule" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const result = await query("DELETE FROM schedules WHERE id = $1 RETURNING id", [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Schedule not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting schedule:", error)
    return NextResponse.json({ error: "Failed to delete schedule" }, { status: 500 })
  }
}
