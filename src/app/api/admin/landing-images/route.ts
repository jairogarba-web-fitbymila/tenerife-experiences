import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAuthenticated } from '@/lib/auth'

// Check if user is in review mode (admin_session OR admin_review cookie)
async function isReviewAuthorized(): Promise<boolean> {
  if (await isAuthenticated()) return true
  const cookieStore = await cookies()
  const reviewCookie = cookieStore.get('admin_review')
  return reviewCookie?.value === 'true'
}

// GET: Fetch all landing images (public, no auth needed for read)
export async function GET() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('landing_images')
    .select('*')
    .order('category')
    .order('position')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// PUT: Update a landing image (admin only)
export async function PUT(request: NextRequest) {
  if (!(await isReviewAuthorized())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { section_id, image_url, updated_by } = body

  if (!section_id || !image_url) {
    return NextResponse.json(
      { error: 'section_id and image_url are required' },
      { status: 400 }
    )
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('landing_images')
    .update({
      image_url,
      updated_at: new Date().toISOString(),
      updated_by: updated_by || 'admin',
    })
    .eq('section_id', section_id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
