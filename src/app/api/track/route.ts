import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

function detectDevice(userAgent: string): string {
  const ua = userAgent.toLowerCase()
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet'
  if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/i.test(ua)) return 'mobile'
  return 'desktop'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page_path, locale, referrer, session_id } = body

    if (!page_path || !session_id) {
      return new NextResponse(null, { status: 400 })
    }

    const userAgent = request.headers.get('user-agent') || ''
    const device = detectDevice(userAgent)

    const supabase = createAdminClient()
    await supabase.from('page_views').insert({
      page_path,
      locale: locale || null,
      referrer: referrer || null,
      session_id,
      device,
    })

    return new NextResponse(null, { status: 204 })
  } catch {
    return new NextResponse(null, { status: 204 })
  }
}
