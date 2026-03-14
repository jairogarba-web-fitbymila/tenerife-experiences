'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  FileText,
  Sparkles,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react'

interface Article {
  id: string
  slug: string
  title: Record<string, string>
  published: boolean
  ai_generated: boolean
  created_at: string
  published_at: string | null
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [topic, setTopic] = useState('')

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/articles')
      if (res.ok) {
        const data = await res.json()
        setArticles(data)
      }
    } catch (err) {
      console.error('Failed to fetch articles:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const togglePublish = async (id: string, published: boolean) => {
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, published: !published }),
      })
      if (res.ok) {
        setArticles((prev) =>
          prev.map((a) =>
            a.id === id
              ? {
                  ...a,
                  published: !published,
                  published_at: !published
                    ? new Date().toISOString()
                    : a.published_at,
                }
              : a
          )
        )
      }
    } catch (err) {
      console.error('Failed to toggle publish:', err)
    }
  }

  const deleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return
    try {
      const res = await fetch(`/api/admin/articles?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete article:', err)
    }
  }

  const generateArticle = async () => {
    if (!topic.trim()) return
    setGenerating(true)
    try {
      const res = await fetch('/api/articles/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.__ADMIN_SERVICE_KEY || ''}`,
        },
        body: JSON.stringify({ topic }),
      })
      if (res.ok) {
        setTopic('')
        await fetchArticles()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to generate article')
      }
    } catch (err) {
      console.error('Failed to generate article:', err)
      alert('Failed to generate article')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Articles</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage blog posts and AI-generated content
        </p>
      </div>

      {/* Generate Article */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-orange-400" />
            Generate AI Article
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter article topic (e.g., 'Best sunset spots in Tenerife')"
              className="flex-1 bg-slate-800/50 border-white/10 text-white placeholder:text-gray-500"
              onKeyDown={(e) => e.key === 'Enter' && generateArticle()}
            />
            <Button
              onClick={generateArticle}
              disabled={generating || !topic.trim()}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Articles are generated as drafts. Review and publish manually.
          </p>
        </CardContent>
      </Card>

      {/* Articles List */}
      <Card className="bg-slate-900/50 border-white/5">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-4 w-4" />
            All Articles ({articles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : articles.length === 0 ? (
            <p className="text-center py-12 text-gray-500">
              No articles yet. Generate your first one above.
            </p>
          ) : (
            <div className="space-y-3">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-white">
                        {article.title?.en || article.title?.es || 'Untitled'}
                      </p>
                      {article.ai_generated && (
                        <Badge className="bg-orange-500/10 text-orange-400 border-0 text-[10px]">
                          AI
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                      <span>/{article.slug}</span>
                      <span>
                        {new Date(article.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Badge
                      variant={article.published ? 'default' : 'secondary'}
                      className={
                        article.published
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }
                    >
                      {article.published ? 'Published' : 'Draft'}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() =>
                        togglePublish(article.id, article.published)
                      }
                      className="text-gray-400 hover:text-white"
                    >
                      {article.published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => deleteArticle(article.id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Extend window for service key
declare global {
  interface Window {
    __ADMIN_SERVICE_KEY?: string
  }
}
