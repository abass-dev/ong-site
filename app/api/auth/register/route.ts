import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth/authUtils"
import { LoggingService } from "@/lib/auth/logging"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    console.log("Registration attempt started")

    const body = await request.json()
    console.log("Request body received:", { email: body.email, hasPassword: !!body.password })

    const { email, password } = body

    if (!email || !password) {
      console.log("Missing required fields")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    console.log("Checking for existing user")
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log("User already exists")
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    console.log("Generating salt and hashing password")
    const salt = AuthService.generateSalt()
    const passwordHash = AuthService.hashPassword(password, salt)
    const twoFactorSecret = AuthService.generateTwoFactorSecret()

    console.log("Creating user in database")
    const user = await prisma.user
      .create({
        data: {
          email,
          passwordHash,
          salt,
          twoFactorSecret,
          twoFactorEnabled: false,
          loginAttempts: 0,
          locked: false,
        },
      })
      .catch((error) => {
        console.error("Database error during user creation:", error)
        throw error
      })

    console.log("User created successfully, logging registration")
    await LoggingService.logUserRegistration(
      email,
      request.ip || "unknown",
      request.headers.get("user-agent") || "unknown",
    )

    console.log("Creating session for new user")
    const session = await AuthService.createSession(user.id, request.headers.get("user-agent"), request.ip)

    return NextResponse.json({
      message: "Registration successful",
      userId: user.id,
      sessionToken: session.token,
    })
  } catch (error) {
    console.error("Registration error:", error)

    LoggingService.logError("Registration failed", {
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      errorStack: error instanceof Error ? error.stack : undefined,
      errorDetails: JSON.stringify(error),
    })

    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json({ error: "Email already registered" }, { status: 409 })
      }

      if (error.message.includes("Database")) {
        return NextResponse.json({ error: "Database connection error" }, { status: 503 })
      }
    }

    return NextResponse.json(
      {
        error: "Registration failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

