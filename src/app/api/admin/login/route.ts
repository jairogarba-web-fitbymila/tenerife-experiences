import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Admin users - add more entries here for coworkers
const ADMIN_USERS = [
  {
    email: process.env.ADMIN_EMAIL || 'jairogarba@gmail.com',
    password: process.env.ADMIN_PASSWORD || 'TenerifeAdmin2026!',
    name: 'Jairo',
    role: 'owner',
  },
  // Add coworker access:
  // {
  //   email: process.env.ADMIN_EMAIL_2 || 'coworker@email.com',
  //   password: process.env.ADMIN_PASSWORD_2 || 'CoworkPass2026!',
  //   name: 'Coworker',
  //   role: 'editor',
  // },
]

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  const user = ADMIN_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
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

    return NextResponse.json({ success: true, name: user.name, role: user.role })
  }

  return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
}
