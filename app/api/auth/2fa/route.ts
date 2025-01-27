import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/authUtils';
import { LoggingService } from '@/lib/auth/logging';
import prisma from '@/lib/prisma';



export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create user
    const salt = AuthService.generateSalt();
    const passwordHash = AuthService.hashPassword(password, salt);
    const twoFactorSecret = AuthService.generateTwoFactorSecret();

    const user = await prisma.user.create({
      data: {
        email,
        salt,
        passwordHash,
        twoFactorSecret,
        twoFactorEnabled: false
      }
    });

    // Log registration
    await LoggingService.logUserRegistration(
      email,
      request.ip,
      request.headers.get('user-agent') || undefined
    );

    return NextResponse.json({
      message: 'User registered successfully',
      twoFactorSecret: user.twoFactorSecret
    }, { status: 201 });
  } catch (error) {
    LoggingService.logError('Registration failed', { errorMessage: error instanceof Error ? error.message : 'Unknown error' });
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}