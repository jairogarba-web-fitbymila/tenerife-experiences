import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { safeCompare } from '@/lib/auth'

export async function POST(request: NextRequest) {
  // Require all admin credentials to be set via environment variables
  const adminUsername = process.env.ADMIN_USERNAME?.trim()
  const adminEmail = process.env.ADMIN_EMAIL?.trim()
  const adminPassword = process.env.ADMIN_PASSWORD?.trim()
  const adminName = process.env.ADMIN_NAME || 'Admin'
  const adminRole = process.env.ADMIN_ROLE || 'owner'

  if (!adminUsername || !adminEmail || !adminPassword) {
    console.error('Admin credentials not configured in environment variables')
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  const { username, email, password } = await request.json()
  const loginId = (username || email || '').trim()

  const cleanPassword = (password || '').trim()

  if (!loginId || !cleanPassword) {
    return NextResponse.json(
      { error: 'Credenciales requeridas' },
      { status: 400 }
    )
  }

  // Check credentials with timing-safe comparison
  const loginMatches =
    safeCompare(loginId.toLowerCase(), adminUsername.toLowerCase()) ||
    safeCompare(loginId.toLowerCase(), adminEmail.toLowerCase())

  const passwordMatches = safeCompare(cleanPassword, adminPassword)

  if (loginMatches && passwordMatches) {
    const cookieStore = await cookies()
    const sessionValue = JSON.stringify({
      authenticated: true,
      email: adminEmail,
      name: adminName,
      role: adminRole,
      createdAt: new Date().toISOString(),
    })

    cookieStore.set('admin_session', sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    // Review mode cookie (NOT httpOnly — must be readable by client JS in review-context.tsx)
    cookieStore.set('admin_review', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return NextResponse.json({ success: true, name: adminName, role: adminRole })
  }

  return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
}
