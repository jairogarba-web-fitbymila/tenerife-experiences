import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  MapPin,
  Handshake,
  CalendarDays,
  Users,
  Target,
  LogOut,
  ScrollText,
  DollarSign,
  Mail,
  BarChart3,
  ImageIcon,
} from 'lucide-react'

const mainNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/leads', label: 'Leads', icon: Target },
  { href: '/dashboard/contracts', label: 'Contracts', icon: ScrollText },
  { href: '/dashboard/ventas', label: 'Sales', icon: DollarSign },
  { href: '/dashboard/emails', label: 'Emails', icon: Mail },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
]

const contentNavItems = [
  { href: '/dashboard/articles', label: 'Articles', icon: FileText },
  { href: '/dashboard/items', label: 'Items', icon: MapPin },
  { href: '/dashboard/categories', label: 'Categories', icon: FolderTree },
  { href: '/dashboard/events', label: 'Events', icon: CalendarDays },
  { href: '/dashboard/partners', label: 'Partners', icon: Handshake },
  { href: '/dashboard/subscribers', label: 'Subscribers', icon: Users },
  { href: '/dashboard/photos', label: 'Photo Bank', icon: ImageIcon },
]

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session) {
    redirect(`/${locale}/login`)
  }

  let isAuth = false
  let userName = 'Admin'
  let userRole = 'owner'
  try {
    const parsed = JSON.parse(session.value)
    isAuth = parsed.authenticated === true
    userName = parsed.name || 'Admin'
    userRole = parsed.role || 'owner'
  } catch {
    isAuth = false
  }

  if (!isAuth) {
    redirect(`/${locale}/login`)
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/5 bg-slate-950">
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-white/5 px-6">
          <div className="h-7 w-7 rounded-lg bg-orange-500 flex items-center justify-center text-xs font-bold text-white">
            TE
          </div>
          <span className="text-sm font-semibold text-white">Admin Panel</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
          <div className="my-4 border-t border-white/5" />
          <div className="space-y-1">
            {contentNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/5 p-3 space-y-1">
          <div className="px-3 py-2">
            <p className="text-xs font-medium text-white">{userName}</p>
            <p className="text-xs text-gray-500 capitalize">{userRole}</p>
          </div>
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
