import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { logActivity, requireEditorOrForbidden, type ActivityEntity } from '@/lib/activity-log'

// Allowed tables and their image field names
const ALLOWED_TABLES: Record<string, string> = {
  items: 'image',
  articles: 'image',
  categories: 'image',
  subcategories: 'image',
  areas: 'image',
  events: 'image',
  partners: 'image',
}

const TABLE_TO_ENTITY: Record<string, ActivityEntity> = {
  items: 'item',
  articles: 'article',
  categories: 'category',
  subcategories: 'category',
  areas: 'category',
  events: 'event',
  partners: 'partner',
}

export async function PUT(request: NextRequest) {
  const user = await requireEditorOrForbidden(request, 'item_image')
  if (!user) {
    return NextResponse.json({ error: 'No tienes permisos para editar imágenes' }, { status: 403 })
  }

  const body = await request.json()
  const { table, id, image_url } = body

  if (!table || !id || !image_url) {
    return NextResponse.json(
      { error: 'table, id, and image_url are required' },
      { status: 400 }
    )
  }

  if (!ALLOWED_TABLES[table]) {
    return NextResponse.json(
      { error: `Table "${table}" is not allowed` },
      { status: 400 }
    )
  }

  const fieldName = ALLOWED_TABLES[table]
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from(table)
    .update({
      [fieldName]: image_url,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('id, slug, ' + fieldName)
    .single()

  if (error) {
    console.error('Update image error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  await logActivity({
    user,
    action: 'update',
    entityType: TABLE_TO_ENTITY[table] ?? 'item_image',
    entityId: id,
    entityLabel: (data as { slug?: string } | null)?.slug ?? null,
    changes: { image: image_url },
    metadata: { table },
    request,
  })

  return NextResponse.json({ success: true, data })
}
