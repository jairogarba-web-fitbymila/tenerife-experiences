import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'
import { logActivity } from '@/lib/activity-log'

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
    await logActivity({
      action: 'login_failed',
      entityType: 'auth',
      request,
      metadata: { loginId, reason: 'user_not_found' },
    })
    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
  }

  // Verify password with bcrypt
  const passwordValid = await bcrypt.compare(cleanPassword, user.password_hash)
  if (!passwordValid) {
    await logActivity({
      user: { id: user.id, name: user.name, role: user.role },
      action: 'login_failed',
      entityType: 'auth',
      request,
      metadata: { loginId, reason: 'bad_password' },
    })
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

  await logActivity({
    user: { id: user.id, name: user.name, role: user.role },
    action: 'login',
    entityType: 'session',
    request,
  })

  return NextResponse.json({ success: true, name: user.name, role: user.role })
}
