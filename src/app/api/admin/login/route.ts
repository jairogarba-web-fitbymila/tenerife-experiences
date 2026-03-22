import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Admin users - add more entries here for coworkers
const ADMIN_USERS = [
  {
    username: process.env.ADMIN_USERNAME || 'Admin',
    email: process.env.ADMIN_EMAIL || 'jairogarba@gmail.com',
    password: process.env.ADMIN_PASSWORD || 'test2026*',
    name: 'Jairo',
    role: 'owner',
  },
  // Add coworker access:
  // {
  //   username: 'Editor',
  //   email: 'coworker@email.com',
  //   password: 'CoworkPass2026!',
  //   name: 'Coworker',
  //   role: 'editor',
  // },
]

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json()

  // Accept login by username OR email
  const loginId = (username || email || '').trim()
  const user = ADMIN_USERS.find(
    (u) =>
      (u.username.toLowerCase() === loginId.toLowerCase() ||
        u.email.toLowerCase() === loginId.toLowerCase()) &&
      u.password === password
  )

  if (user) {
    const cookieStore = await cookies()
    // Store user info in cookie value for identification
    const sessionValue = JSON.stringify({
      authenticated: true,
      email: user.email,
      name: user.name,
      role: user.role,
    })

    cookieStore.set('admin_session', sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    // Non-httpOnly cookie so client-side ReviewProvider can detect admin session
    cookieStore.set('admin_review', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return NextResponse.json({ success: true, name: user.name, role: user.role })
  }

  return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
}
