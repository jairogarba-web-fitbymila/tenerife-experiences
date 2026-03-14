import { createAdminClient } from '@/lib/supabase/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  FolderTree,
  Layers,
  MapPin,
  FileText,
  Handshake,
  Users,
  Plus,
  Sparkles,
} from 'lucide-react'

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = createAdminClient()

  // Fetch counts in parallel
  const [
    { count: categoriesCount },
    { count: subcategoriesCount },
    { count: itemsCount },
    { count: articlesCount },
    { count: partnersCount },
    { count: subscribersCount },
    { data: recentItems },
  ] = await Promise.all([
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('subcategories').select('*', { count: 'exact', head: true }),
    supabase.from('items').select('*', { count: 'exact', head: true }),
    supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('published', true),
    supabase.from('partners').select('*', { count: 'exact', head: true }),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }),
    supabase
      .from('items')
      .select('id, slug, name, created_at, visible')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const stats = [
    {
      label: 'Categories',
      value: categoriesCount ?? 0,
      icon: FolderTree,
      color: 'text-blue-400',
    },
    {
      label: 'Subcategories',
      value: subcategoriesCount ?? 0,
      icon: Layers,
      color: 'text-cyan-400',
    },
    {
      label: 'Items',
      value: itemsCount ?? 0,
      icon: MapPin,
      color: 'text-green-400',
    },
    {
      label: 'Published Articles',
      value: articlesCount ?? 0,
      icon: FileText,
      color: 'text-orange-400',
    },
    {
      label: 'Partners',
      value: partnersCount ?? 0,
      icon: Handshake,
      color: 'text-purple-400',
    },
    {
      label: 'Subscribers',
      value: subscribersCount ?? 0,
      icon: Users,
      color: 'text-pink-400',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-400">
          Overview of your Tenerife Experiences content
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className="bg-slate-900/50 border-white/5"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="mt-1 text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`rounded-xl bg-white/5 p-3 ${stat.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions + Recent Items */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link
              href={`/${locale}/dashboard/articles`}
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm text-gray-300 transition-colors hover:border-orange-400/20 hover:bg-white/5"
            >
              <div className="rounded-lg bg-orange-500/10 p-2">
                <Sparkles className="h-4 w-4 text-orange-400" />
              </div>
              Generate AI Article
            </Link>
            <Link
              href={`/${locale}/dashboard/articles`}
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm text-gray-300 transition-colors hover:border-blue-400/20 hover:bg-white/5"
            >
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Plus className="h-4 w-4 text-blue-400" />
              </div>
              Manage Articles
            </Link>
            <Link
              href={`/${locale}/dashboard/partners`}
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm text-gray-300 transition-colors hover:border-purple-400/20 hover:bg-white/5"
            >
              <div className="rounded-lg bg-purple-500/10 p-2">
                <Handshake className="h-4 w-4 text-purple-400" />
              </div>
              Manage Partners
            </Link>
          </CardContent>
        </Card>

        {/* Recent Items */}
        <Card className="bg-slate-900/50 border-white/5">
          <CardHeader>
            <CardTitle className="text-white">Recent Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {typeof item.name === 'object' && item.name !== null
                        ? (item.name as Record<string, string>).en ||
                          (item.name as Record<string, string>).es ||
                          'Untitled'
                        : String(item.name)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    variant={item.visible ? 'default' : 'secondary'}
                    className={
                      item.visible
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-gray-500/10 text-gray-400'
                    }
                  >
                    {item.visible ? 'Visible' : 'Hidden'}
                  </Badge>
                </div>
              ))}
              {(!recentItems || recentItems.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No items yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
