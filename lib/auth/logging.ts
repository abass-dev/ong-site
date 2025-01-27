import winston from 'winston'
import prisma from '../prisma'

// Configure Winston logger 
const logger = winston.createLogger({
  level: 'info', format: winston.format.combine(
    winston.format.timestamp(), winston.format.json()), transports: [
      // Log to console    
      new winston.transports.Console({
        format: winston.format.simple()
      }),
      // Log to file    
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })]
})
// Logging Service 
export class LoggingService {
  // Log user registration 
  static async logUserRegistration(email: string,
    ipAddress?: string, device?: string) {
    const logEntry = {
      event: 'USER_REGISTRATION',
      email, ipAddress, device,
      timestamp: new Date()
    }
    logger.info(JSON.stringify(logEntry))
    // Optional: Store in database for long-term audit trail 
    await prisma.auditLog.create({
      data: {
        event: 'USER_REGISTRATION',
        userEmail: email, ipAddress,
        deviceInfo: device
      }
    })
  }
  // Log login attempt  
  static async logLoginAttempt(
    email: string, success: boolean,
    ipAddress?: string, device?: string) {
    const logEntry = {
      event: success ? 'LOGIN_SUCCESS' : 'LOGIN_FAILED',
      email, ipAddress, device,
      timestamp: new Date()
    };
    logger.info(JSON.stringify(logEntry))
    await prisma.auditLog.create({
      data: {
        event: success ? 'LOGIN_SUCCESS' : 'LOGIN_FAILED',
        userEmail: email, ipAddress, deviceInfo: device
      }
    })
  }    // Log 2FA events 
  static async log2FAEvent(
    email: string,
    eventType: '2FA_ENABLED' | '2FA_DISABLED' | '2FA_VERIFIED',
    ipAddress?: string, device?: string) {
    const logEntry = {
      event: eventType,
      email, ipAddress, device,
      timestamp: new Date()
    }
    logger.info(JSON.stringify(logEntry))
    await prisma.auditLog.create({
      data: {
        event: eventType,
        userEmail: email,
        ipAddress,
        deviceInfo: device
      }
    })
  }
  static async logValidation(
    email: string,
    ipAddress?: string,
    device?: string
  ) {
    const logEntry = {
      event: 'SESSION_VALIDATION',
      email,
      ipAddress,
      device,
      timestamp: new Date()
    }

    logger.info(JSON.stringify(logEntry))

    await prisma.auditLog.create({
      data: {
        event: 'SESSION_VALIDATION',
        userEmail: email,
        ipAddress,
        deviceInfo: device
      }
    })
  }
  // Log security events   
  static async logSecurityEvent(email: string,
    eventType: 'ACCOUNT_LOCKED' | 'PASSWORD_RESET' | 'SESSION_INVALIDATED',
    ipAddress?: string, device?: string) {
    const logEntry = {
      event: eventType,
      email, ipAddress, device, timestamp: new Date()
    }
    logger.warn(JSON.stringify(logEntry))
    await prisma.auditLog.create({
      data: {
        event: eventType, userEmail: email, ipAddress,
        deviceInfo: device
      }
    })
  }
  // Centralized error logging  
  static logError(errorMessage: string, context?: Record<string, any>) {
    logger.error(JSON.stringify({
      message: errorMessage, context,
      timestamp: new Date()
    }))
  }
}