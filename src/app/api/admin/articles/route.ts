import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAuthenticated } from '@/lib/auth'
import { logActivity, requireEditorOrForbidden } from '@/lib/activity-log'

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('articles')
    .select('id, slug, title, published, ai_generated, created_at, published_at')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PUT(request: NextRequest) {
  const user = await requireEditorOrForbidden(request, 'article')
  if (!user) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const { id, ...updates } = body

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  // If publishing, set published_at
  if (updates.published === true) {
    updates.published_at = new Date().toISOString()
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  await logActivity({
    user,
    action: 'update',
    entityType: 'article',
    entityId: id,
    entityLabel: data?.title ?? data?.slug ?? null,
    changes: updates,
    request,
  })

  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest) {
  const user = await requireEditorOrForbidden(request, 'article')
  if (!user) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }

  const supabase = createAdminClient()
  const { data: existing } = await supabase
    .from('articles')
    .select('title, slug')
    .eq('id', id)
    .maybeSingle()

  const { error } = await supabase.from('articles').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  await logActivity({
    user,
    action: 'delete',
    entityType: 'article',
    entityId: id,
    entityLabel: existing?.title ?? existing?.slug ?? null,
    request,
  })

  return NextResponse.json({ success: true })
}
