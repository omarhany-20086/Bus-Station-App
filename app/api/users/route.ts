import { type NextRequest, NextResponse } from "next/server"

// Mock users data - in a real app, this would come from a database
const users = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "parent", status: "active", phone: "+1234567890" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "admin", status: "active", phone: "+1234567891" },
  { id: "3", name: "Child One", email: "child1@example.com", role: "child", status: "active", phone: "+1234567892" },
  { id: "4", name: "Child Two", email: "child2@example.com", role: "child", status: "active", phone: "+1234567893" },
  { id: "5", name: "Parent Two", email: "parent2@example.com", role: "parent", status: "active", phone: "+1234567894" },
]

export async function GET() {
  try {
    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, role, phone, status } = body

    // Validate required fields
    if (!name || !email || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      role,
      phone: phone || "",
      status: status || "active",
    }

    users.push(newUser)

    return NextResponse.json(newUser)
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
