import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  cookieStore.delete('admin_review')
  return NextResponse.json({ success: true })
}
