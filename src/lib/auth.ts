import { cookies } from 'next/headers'

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  if (!session) return false

  // Support both old format (plain string) and new format (JSON)
  try {
    const parsed = JSON.parse(session.value)
    return parsed.authenticated === true
  } catch {
    return session.value === 'authenticated'
  }
}

export async function getAdminUser(): Promise<{
  email: string
  name: string
  role: string
} | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  if (!session) return null

  try {
    const parsed = JSON.parse(session.value)
    if (parsed.authenticated) {
      return { email: parsed.email, name: parsed.name, role: parsed.role }
    }
  } catch {
    // Old format - return default user
    if (session.value === 'authenticated') {
      return { email: 'jairogarba@gmail.com', name: 'Jairo', role: 'owner' }
    }
  }
  return null
}
