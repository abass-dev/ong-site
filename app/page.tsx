'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import * as crypto from 'crypto'

const AuthUtils = {
  generateChallenge: () => crypto.randomBytes(32).toString('hex'),
  
  hashPassphrase: (passphrase: string, salt: string) => {
    return crypto.pbkdf2Sync(
      passphrase, 
      salt, 
      100000, 
      64, 
      'sha512'
    ).toString('hex')
  },
  
  generateSessionToken: () => crypto.randomBytes(64).toString('hex'),
  
  validateSession: () => {
    const token = localStorage.getItem('sessionToken')
    const tokenTimestamp = localStorage.getItem('sessionTimestamp')
    
    if (!token || !tokenTimestamp) return false
    
    const SESSION_DURATION = 4 * 60 * 60 * 1000 // 4 hours
    return (Date.now() - parseInt(tokenTimestamp)) < SESSION_DURATION
  }
}

export default function Home() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [lockoutRemaining, setLockoutRemaining] = useState(0)

  // Lockout mechanism with countdown
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;
    
    if (attempts >= 3) {
      setLockoutRemaining(300) // 5-minute lockout
      
      countdownInterval = setInterval(() => {
        setLockoutRemaining(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval)
            setAttempts(0)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (countdownInterval) clearInterval(countdownInterval)
    }
  }, [attempts])

  // Check existing session on component mount
  useEffect(() => {
    // CRITICAL: Default initialization if no auth exists
    if (!localStorage.getItem('authHash')) {
      const initialSalt = 'fixed-salt-for-testing123' // Fixed salt
      const initialPassphrase = 'testing123'
      const initialHash = AuthUtils.hashPassphrase(initialPassphrase, initialSalt)
      
      localStorage.setItem('authSalt', initialSalt)
      localStorage.setItem('authHash', initialHash)
    }

    // Check existing valid session
    if (AuthUtils.validateSession()) {
      setIsAuthorized(true)
      router.push('/dashboard')
    }
  }, [router])

  const initializeSession = () => {
    // Prevent excessive attempts
    if (attempts >= 3) {
      alert(`Too many failed attempts. Try again in ${lockoutRemaining} seconds.`)
      return
    }

    const challenge = AuthUtils.generateChallenge()
    const passphrase = prompt(`Enter access key (Challenge: ${challenge.slice(0,10)}...)`)
    
    if (!passphrase) return

    const storedSalt = localStorage.getItem('authSalt') || 'fixed-salt-for-testing123'
    const storedHash = localStorage.getItem('authHash')
    const computedHash = AuthUtils.hashPassphrase(passphrase, storedSalt)

    if (storedHash === computedHash) {
      // Successful authentication
      const sessionToken = AuthUtils.generateSessionToken()
      localStorage.setItem('sessionToken', sessionToken)
      localStorage.setItem('sessionTimestamp', Date.now().toString())
      
      setIsAuthorized(true)
      setAttempts(0)
      router.push('/dashboard')
    } else {
      // Failed attempt
      setAttempts(prev => prev + 1)
      alert("Access Denied")
    }
  }

  return (
    <main className="min-h-screen bg-black text-green-400 flex flex-col justify-center items-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          Phantom Terminal
        </h1>
        <p className="text-sm text-green-600 mb-8">
          Access Secured • Private Network
        </p>
        <div className="space-y-4">
          {attempts >= 3 ? (
            <div className="text-red-500">
              Locked out. Try again in {lockoutRemaining} seconds
            </div>
          ) : (
            <button 
              onClick={initializeSession}
              className="w-full bg-green-800 text-green-300 py-2 rounded hover:bg-green-900 transition"
            >
              Initialize Session
            </button>
          )}
        </div>
      </div>
    </main>
  )
}