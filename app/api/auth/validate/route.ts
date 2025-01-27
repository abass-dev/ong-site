import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/authUtils';
import { LoggingService } from '@/lib/auth/logging';
import { PrismaClient } from '../../../generated/client';


const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { sessionToken } = await request.json();

        if (!sessionToken) {
            return NextResponse.json(
                { error: 'Session token is required' },
                { status: 400 }
            );
        }

        // Validate the session token
        const session = await prisma.session.findUnique({
            where: { token: sessionToken },
            include: { user: true }
        });

        if (!session) {
            return NextResponse.json(
                { error: 'Invalid session' },
                { status: 401 }
            );
        }

        // Check if session is expired
        if (new Date() > session.expiresAt) {
            await prisma.session.delete({
                where: { id: session.id }
            });

            return NextResponse.json(
                { error: 'Session expired' },
                { status: 401 }
            );
        }

        // Extend session expiration
        const extendedExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
        await prisma.session.update({
            where: { id: session.id },
            data: {
                expiresAt: extendedExpiresAt
            }
        });

        // Log successful validation
        await LoggingService.logValidation(
            session.user.email,
            request.ip,
            request.headers.get('user-agent') || undefined
        );

        // Create audit log entry for session validation
        await prisma.auditLog.create({
            data: {
                event: 'SESSION_VALIDATED',
                userEmail: session.user.email,
                ipAddress: request.ip || undefined,
                deviceInfo: request.headers.get('user-agent') || undefined
            }
        });

        return NextResponse.json({
            valid: true,
            user: {
                id: session.user.id,
                email: session.user.email
            },
            sessionExpires: extendedExpiresAt
        });

    } catch (error) {
        LoggingService.logError('Session validation failed', {
            errorMessage: error instanceof Error ? error.message : 'Unknown error'
        });
        return NextResponse.json(
            { error: 'Validation failed' },
            { status: 500 }
        );
    }
}