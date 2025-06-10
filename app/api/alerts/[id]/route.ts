import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const result = await query("SELECT * FROM alerts WHERE id = $1", [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 })
    }

    const alert = result.rows[0]

    return NextResponse.json({
      id: alert.id.toString(),
      title: alert.title,
      description: alert.description,
      type: alert.type,
      severity: alert.severity,
      affectedRoutes: alert.affected_routes,
      status: alert.status,
      timestamp: alert.timestamp,
    })
  } catch (error) {
    console.error("Error fetching alert:", error)
    return NextResponse.json({ error: "Failed to fetch alert" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { title, description, type, severity, affectedRoutes, status } = body

    // Validate required fields
    if (!title || !description || !type || !severity || !affectedRoutes) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await query(
      `UPDATE alerts 
       SET title = $1, description = $2, type = $3, severity = $4, 
           affected_routes = $5, status = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [title, description, type, severity, affectedRoutes, status || "active", id],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 })
    }

    const updatedAlert = result.rows[0]

    return NextResponse.json({
      id: updatedAlert.id.toString(),
      title: updatedAlert.title,
      description: updatedAlert.description,
      type: updatedAlert.type,
      severity: updatedAlert.severity,
      affectedRoutes: updatedAlert.affected_routes,
      status: updatedAlert.status,
      timestamp: updatedAlert.timestamp,
    })
  } catch (error) {
    console.error("Error updating alert:", error)
    return NextResponse.json({ error: "Failed to update alert" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const result = await query("DELETE FROM alerts WHERE id = $1 RETURNING id", [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting alert:", error)
    return NextResponse.json({ error: "Failed to delete alert" }, { status: 500 })
  }
}
