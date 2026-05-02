import { redirect } from 'next/navigation'
import { getAdminUser } from '@/lib/auth'

export default async function EmailsLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const user = await getAdminUser()
  if (!user || user.role !== 'owner') {
    redirect(`/${locale}/dashboard`)
  }
  return <>{children}</>
}
