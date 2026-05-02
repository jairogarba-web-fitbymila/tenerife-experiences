import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAdminUser } from '@/lib/auth'
import { logActivity } from '@/lib/activity-log'

export async function POST(request: NextRequest) {
  const user = await getAdminUser()
  if (user) {
    await logActivity({ user, action: 'logout', entityType: 'session', request })
  }
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  cookieStore.delete('admin_review')
  cookieStore.delete('admin_role')
  return NextResponse.json({ success: true })
}
