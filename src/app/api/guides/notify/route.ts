import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { GUIDE_PRODUCTS, type GuideId } from '@/lib/stripe/config'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

  const guideId = String(body.guideId ?? '').trim()
  const email = String(body.email ?? '').trim().toLowerCase()
  const locale = typeof body.locale === 'string' ? body.locale.slice(0, 5) : null

  if (!guideId || !(guideId in GUIDE_PRODUCTS)) {
    return NextResponse.json({ error: 'invalid_guide' }, { status: 400 })
  }
  if (!email || email.length > 200 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('guide_notify_signups')
    .upsert(
      {
        guide_id: guideId as GuideId,
        email,
        locale,
        ip_address: getClientIp(request),
        user_agent: request.headers.get('user-agent'),
      },
      { onConflict: 'guide_id,email', ignoreDuplicates: true },
    )

  if (error) {
    console.error('[guides/notify] insert failed:', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
