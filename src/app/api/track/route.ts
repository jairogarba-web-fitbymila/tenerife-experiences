import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { rateLimit, getClientIP } from '@/lib/rate-limit'

function detectDevice(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet'
  if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/i.test(ua)) return 'mobile'
  return 'desktop'
}

export async function POST(request: NextRequest) {
  // Rate limit: 100 page views per minute per IP (generous for normal browsing)
  const ip = getClientIP(request)
  const { success } = rateLimit(ip, { limit: 100, windowSeconds: 60 })
  if (!success) {
    return new NextResponse(null, { status: 429 })
  }

  try {
    const body = await request.json()
    const { page_path, locale, referrer, session_id } = body

    if (!page_path || !session_id) {
      return new NextResponse(null, { status: 400 })
    }

    // Input validation
    if (typeof page_path !== 'string' || page_path.length > 500) {
      return new NextResponse(null, { status: 400 })
    }
    if (typeof session_id !== 'string' || session_id.length > 100) {
      return new NextResponse(null, { status: 400 })
    }

    const userAgent = request.headers.get('user-agent') || ''
    const device = detectDevice(userAgent)

    const supabase = createAdminClient()
    await supabase.from('page_views').insert({
      page_path,
      locale: locale || null,
      referrer: referrer ? String(referrer).slice(0, 500) : null,
      session_id,
      device,
    })

    return new NextResponse(null, { status: 204 })
  } catch {
    return new NextResponse(null, { status: 204 })
  }
}
