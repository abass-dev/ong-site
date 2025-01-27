import { PrismaClient } from '@/generated/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export class AuthService {
  // Generate secure session token
  static generateSessionToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }

  // Create a new session
  static async createSession(
    userId: string, 
    device?: string, 
    ipAddress?: string
  ): Promise<string> {
    const token = this.generateSessionToken();
    
    await prisma.session.create({
      data: {
        userId,
        token,
        device,
        ipAddress,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    });

    return token;
  }

  // Validate session token
  static async validateSession(token: string): Promise<string | null> {
    try {
      const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true }
      });

      if (!session || session.expiresAt < new Date()) {
        return null;
      }

      return session.userId;
    } catch (error) {
      console.error('Session validation error:', error);
      return null;
    }
  }

  // Invalidate session
  static async invalidateSession(token: string): Promise<void> {
    await prisma.session.delete({
      where: { token }
    });
  }

  // Get active sessions for a user
  static async getUserSessions(userId: string) {
    return await prisma.session.findMany({
      where: { 
        userId,
        expiresAt: { gt: new Date() }
      },
      select: {
        id: true,
        device: true,
        ipAddress: true,
        createdAt: true,
        expiresAt: true
      }
    });
  }

  // Revoke all user sessions except current
  static async revokeOtherSessions(
    userId: string, 
    currentToken: string
  ): Promise<void> {
    await prisma.session.deleteMany({
      where: { 
        userId,
        token: { not: currentToken }
      }
    });
  }
}