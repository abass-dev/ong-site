import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@/generated/client';
import { AuthService } from '@/lib/auth/authUtils';
import { LoggingService } from '@/lib/auth/logging';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists first to avoid race conditions
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true } // Only select ID for performance
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const salt = AuthService.generateSalt();
    const passwordHash = AuthService.hashPassword(password, salt);
    const twoFactorSecret = AuthService.generateTwoFactorSecret();

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        salt,
        twoFactorSecret,
        twoFactorEnabled: false,
        loginAttempts: 0,
        locked: false
      }
    });

    await LoggingService.logUserRegistration(
      email,
      request.ip || 'unknown',
      request.headers.get('user-agent') || 'unknown'
    );

    return NextResponse.json({
      message: 'Registration successful',
      userId: user.id
    });

  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle unique constraint violation
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        );
      }

      // Handle other Prisma errors
      LoggingService.logError('Prisma error during registration', {
        code: error.code,
        message: error.message
      });

      return NextResponse.json(
        { error: 'Registration failed' },
        { status: 500 }
      );
    }

    // Handle other errors
    LoggingService.logError('Registration failed', {
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    });

    return NextResponse.json(
      { error: 'Registration failed. Please try again later.' },
      { status: 500 }
    );
  }
}