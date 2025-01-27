import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth/authUtils"
import { LoggingService } from "@/lib/auth/logging"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
    try {
        const contentType = request.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
            return NextResponse.json({ error: "Invalid content type. Expected JSON." }, { status: 400 })
        }

        const body = await request.text()
        if (!body) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 })
        }

        let sessionToken
        try {
            const json = JSON.parse(body)
            sessionToken = json.sessionToken
        } catch (parseError) {
            console.error("JSON parsing error:", parseError)
            return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
        }

        if (!sessionToken) {
            return NextResponse.json({ error: "Session token is required" }, { status: 400 })
        }

        // Validate the session token
        const session = await prisma.session.findUnique({
            where: { token: sessionToken },
            include: { user: true },
        })

        if (!session) {
            return NextResponse.json({ error: "Invalid session" }, { status: 401 })
        }

        // Check if session is expired
        if (new Date() > session.expiresAt) {
            await prisma.session.delete({
                where: { id: session.id },
            })

            return NextResponse.json({ error: "Session expired" }, { status: 401 })
        }

        // Extend session expiration
        const extendedExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
        await prisma.session.update({
            where: { id: session.id },
            data: {
                expiresAt: extendedExpiresAt,
            },
        })

        // Log successful validation
        await LoggingService.logValidation(
            session.user.email,
            request.ip || "unknown",
            request.headers.get("user-agent") || "unknown",
        )

        // Create audit log entry for session validation
        await prisma.auditLog.create({
            data: {
                event: "SESSION_VALIDATED",
                userEmail: session.user.email,
                ipAddress: request.ip || "unknown",
                deviceInfo: request.headers.get("user-agent") || "unknown",
            },
        })

        return NextResponse.json({
            valid: true,
            user: {
                id: session.user.id,
                email: session.user.email,
            },
            sessionExpires: extendedExpiresAt,
        })
    } catch (error) {
        console.error("Session validation error:", error)
        LoggingService.logError("Session validation failed", {
            errorMessage: error instanceof Error ? error.message : "Unknown error",
        })
        return NextResponse.json({ error: "Validation failed" }, { status: 500 })
    }
}

