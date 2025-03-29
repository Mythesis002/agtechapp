import { NextResponse } from "next/server"
import { findUserByEmail, validatePassword } from "@/lib/auth-utils"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Find user by email
    const user = findUserByEmail(email)

    if (!user || !validatePassword(user, password)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // In a real app, you would create a session or JWT token here
    // For now, we'll just return the user (excluding the password)
    const { password: _, ...userWithoutPassword } = user

    // Add artificial delay to simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json({
      user: userWithoutPassword,
      message: "Login successful",
    })
  } catch (error) {
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}

