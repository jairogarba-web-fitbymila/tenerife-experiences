import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireEditor } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const user = await requireEditor()
  if (!user) {
    return NextResponse.json({ error: 'No tienes permisos para subir imágenes' }, { status: 403 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' },
      { status: 400 }
    )
  }

  // Max 5MB
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: 'File too large. Maximum 5MB' },
      { status: 400 }
    )
  }

  // Generate unique filename
  const ext = file.name.split('.').pop() || 'jpg'
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const filename = `uploads/${timestamp}-${random}.${ext}`

  const supabase = createAdminClient()
  const buffer = Buffer.from(await file.arrayBuffer())

  const { data, error } = await supabase.storage
    .from('images')
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get the public URL
  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(filename)

  return NextResponse.json({
    success: true,
    url: urlData.publicUrl,
    path: data.path,
  })
}
