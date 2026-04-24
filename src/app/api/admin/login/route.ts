import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json()
  const loginId = (username || email || '').trim()
  const cleanPassword = (password || '').trim()

  if (!loginId || !cleanPassword) {
    return NextResponse.json(
      { error: 'Credenciales requeridas' },
      { status: 400 }
    )
  }

  // Look up user in admin_users table (case-insensitive username or email match)
  const { data: user, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('active', true)
    .or(`username.ilike.${loginId},email.ilike.${loginId}`)
    .single()

  if (error || !user) {
    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
  }

  // Verify password with bcrypt
  const passwordValid = await bcrypt.compare(cleanPassword, user.password_hash)
  if (!passwordValid) {
    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
  }

  const cookieStore = await cookies()
  const sessionValue = JSON.stringify({
    authenticated: true,
    email: user.email || '',
    name: user.name,
    role: user.role,
    userId: user.id,
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

  // Role cookie (NOT httpOnly — client needs to check role for UI permissions)
  cookieStore.set('admin_role', user.role, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return NextResponse.json({ success: true, name: user.name, role: user.role })
}
