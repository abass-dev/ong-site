import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/authUtils';
import { LoggingService } from '@/lib/auth/logging';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, password, twoFactorToken } = await request.json();

    // Check login attempts
    const canAttemptLogin = await AuthService.handleLoginAttempt(email);
    if (!canAttemptLogin) {
      return NextResponse.json(
        { error: 'Too many login attempts. Account locked.' },
        { status: 429 }
      );
    }

    // Verify password
    const isPasswordValid = await AuthService.verifyPassword(email, password);
    if (!isPasswordValid) {
      await LoggingService.logLoginAttempt(
        email,
        false,
        request.ip,
        request.headers.get('user-agent') || undefined
      );
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // 2FA check if enabled
    if (user.twoFactorEnabled) {
      if (!twoFactorToken) {
        return NextResponse.json(
          { error: 'Two-factor token required' },
          { status: 400 }
        );
      }

      const is2FAValid = AuthService.verifyTwoFactorToken(
        user.twoFactorSecret || '',
        twoFactorToken
      );

      if (!is2FAValid) {
        return NextResponse.json(
          { error: 'Invalid two-factor token' },
          { status: 401 }
        );
      }
    }

    // Create session
    const sessionToken = await AuthService.createSession(
      user.id,
      request.headers.get('user-agent') || undefined,
      request.ip
    );

    // Reset login attempts
    await prisma.user.update({
      where: { id: user.id },
      data: { loginAttempts: 0, locked: false, lockoutExpiration: null }
    });

    // Log successful login
    await LoggingService.logLoginAttempt(
      email,
      true,
      request.ip,
      request.headers.get('user-agent') || undefined
    );

    return NextResponse.json({
      message: 'Login successful',
      sessionToken,
      requiresTwoFactor: user.twoFactorEnabled
    });
  } catch (error) {
    LoggingService.logError('Login failed', { errorMessage: error instanceof Error ? error.message : 'Unknown error' });
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}


