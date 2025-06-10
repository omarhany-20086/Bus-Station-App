import { type NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcrypt";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { username, email, password, role, full_name, phone, status } = body;

    if (!username || !email || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let queryText = `
      UPDATE users 
      SET username = $1, 
          email = $2, 
          role = $3, 
          full_name = $4, 
          phone = $5, 
          status = $6,
          updated_at = CURRENT_TIMESTAMP
    `;
    let queryParams = [username, email, role, full_name, phone, status];

    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      queryText += `, password_hash = $${queryParams.length + 1}`;
      queryParams.push(passwordHash);
    }

    queryText += ` WHERE id = $${queryParams.length + 1} RETURNING *`;
    queryParams.push(id);

    const result = await query(queryText, queryParams);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = result.rows[0];
    return NextResponse.json({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      full_name: updatedUser.full_name,
      phone: updatedUser.phone,
      status: updatedUser.status,
      createdAt: updatedUser.created_at,
      updatedAt: updatedUser.updated_at,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const result = await query("DELETE FROM users WHERE id = $1 RETURNING id", [
      id,
    ]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
