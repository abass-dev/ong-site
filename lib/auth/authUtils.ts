import * as crypto from 'crypto'
import { authenticator } from 'otplib'
import * as speakeasy from 'speakeasy'
import prisma from '../prisma'

export class AuthService {
  // Generate secure salt
  static generateSalt(): string {
    return crypto.randomBytes(32).toString('hex')
  }

  // Secure password hashing
  static hashPassword(password: string, salt: string): string {
    return crypto.pbkdf2Sync(
      password,
      salt,
      100000, // High iteration count
      64,     // Key length
      'sha512' // Strong hash algorithm
    ).toString('hex')
  }

  // Verify password
  static async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return false

    const hashedPassword = this.hashPassword(password, user.salt)
    return hashedPassword === user.passwordHash
  }

  // Generate 2FA secret
  static generateTwoFactorSecret(): string {
    return speakeasy.generateSecret({ length: 32 }).base32
  }

  // Verify 2FA token
  static verifyTwoFactorToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token
    })
  }

  // Brute force protection
  static async handleLoginAttempt(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) return false

    const MAX_ATTEMPTS = 5
    const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

    if (user.locked && user.lockoutExpiration && user.lockoutExpiration > new Date()) {
      return false
    }

    if (user.loginAttempts >= MAX_ATTEMPTS) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          locked: true,
          lockoutExpiration: new Date(Date.now() + LOCKOUT_DURATION),
          loginAttempts: 0
        }
      })
      return false
    }

    // Increment login attempts
    await prisma.user.update({
      where: { id: user.id },
      data: {
        loginAttempts: { increment: 1 },
        lastLoginAttempt: new Date()
      }
    })

    return true
  }

  // Generate secure session token
  static generateSessionToken(): string {
    return crypto.randomBytes(64).toString('hex')
  }

  // Create user session
  static async createSession(userId: string, device?: string, ipAddress?: string): Promise<string> {
    const token = this.generateSessionToken()

    await prisma.session.create({
      data: {
        userId,
        token,
        device,
        ipAddress,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      }
    })

    return token
  }

  // Validate session
  static async validateSession(token: string): Promise<string | null> {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!session || session.expiresAt < new Date()) {
      return null
    }

    return session.userId
  }
}

export async function registerUser(email: string, password: string) {
  const salt = AuthService.generateSalt()
  const passwordHash = AuthService.hashPassword(password, salt)
  const twoFactorSecret = AuthService.generateTwoFactorSecret()

  return await prisma.user.create({
    data: {
      email,
      salt,
      passwordHash,
      twoFactorSecret,
      twoFactorEnabled: false
    }
  })
}