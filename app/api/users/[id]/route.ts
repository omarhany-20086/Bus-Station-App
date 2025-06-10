import { type NextRequest, NextResponse } from "next/server"

// Mock users data - in a real app, this would come from a database
const users = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "parent", status: "active", phone: "+1234567890" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "admin", status: "active", phone: "+1234567891" },
  { id: "3", name: "Child One", email: "child1@example.com", role: "child", status: "active", phone: "+1234567892" },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const user = users.find((u) => u.id === id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { name, email, role, phone, status } = body

    // Find user index
    const userIndex = users.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      email: email || users[userIndex].email,
      role: role || users[userIndex].role,
      phone: phone || users[userIndex].phone,
      status: status || users[userIndex].status,
    }

    return NextResponse.json(users[userIndex])
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const userIndex = users.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    users.splice(userIndex, 1)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
