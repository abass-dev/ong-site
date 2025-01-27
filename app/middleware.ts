// middleware/authMiddleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthService } from '@/lib/auth/sessions'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('sessionToken')?.value
  const path = request.nextUrl.pathname

  // Public routes
  const publicPaths = ['/login', '/register', '/api/auth/login', '/api/auth/register']

  if (publicPaths.includes(path)) {
    return NextResponse.next()
  }

  // Check for session token
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Validate session
  try {
    const userId = await AuthService.validateSession(token)

    if (!userId) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('sessionToken')
      return response
    }

    return NextResponse.next()
  } catch (error) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('sessionToken')
    return response
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/protected/:path*'
  ]
}