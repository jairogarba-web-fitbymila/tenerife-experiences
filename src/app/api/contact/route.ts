import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_LEN = { name: 120, email: 200, subject: 200, message: 4000 }

function getClientIp(request: NextRequest): string | null {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip')
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim().toLowerCase()
  const subject = String(body.subject ?? '').trim()
  const message = String(body.message ?? '').trim()
  const locale = typeof body.locale === 'string' ? body.locale.slice(0, 5) : null

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }
  if (
    name.length > MAX_LEN.name ||
    email.length > MAX_LEN.email ||
    subject.length > MAX_LEN.subject ||
    message.length > MAX_LEN.message
  ) {
    return NextResponse.json({ error: 'too_long' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    subject,
    message,
    locale,
    ip_address: getClientIp(request),
    user_agent: request.headers.get('user-agent'),
  })

  if (error) {
    console.error('[contact] insert failed:', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
