import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAuthenticated } from '@/lib/auth'

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

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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

  return NextResponse.json({ success: true, data })
}
