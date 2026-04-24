import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireEditor } from '@/lib/auth'

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
  const user = await requireEditor()
  if (!user) {
    return NextResponse.json({ error: 'No tienes permisos para editar imágenes' }, { status: 403 })
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
