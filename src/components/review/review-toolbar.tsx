'use client'

import { useState } from 'react'
import { useReview } from './review-context'

export function ReviewToolbar() {
  const { isReviewMode, stats, exportNotes, logout } = useReview()
  const [showExport, setShowExport] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!isReviewMode) return null

  const exportText = exportNotes()

  function handleCopy() {
    navigator.clipboard.writeText(exportText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleDownload() {
    const blob = new Blob([exportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `revision-tenerife-${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {/* Fixed bottom toolbar */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-slate-950/95 backdrop-blur-xl border-t border-orange-500/30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Mode indicator */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              ADMIN · REVISIÓN
            </span>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <span className="text-white/60">
              Revisadas: <strong className="text-white">{stats.total}</strong>
            </span>
            <span className="text-green-400">
              ✅ {stats.approved}
            </span>
            <span className="text-red-400">
              🔄 {stats.changes}
            </span>
            <span className="text-yellow-400">
              ⏳ {stats.pending}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="/es/dashboard"
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              Dashboard
            </a>
            <button
              onClick={() => setShowExport(!showExport)}
              className="px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold transition-colors"
            >
              📋 Exportar
            </button>
            <button
              onClick={logout}
              className="px-3 py-2 rounded-lg bg-red-600/80 hover:bg-red-500 text-white text-sm font-medium transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Export modal */}
      {showExport && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowExport(false)} />
          <div className="relative w-full max-w-2xl bg-slate-900 border border-orange-500/30 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Resumen de Revisión</h3>
              <button onClick={() => setShowExport(false)} className="text-white/50 hover:text-white text-xl">&times;</button>
            </div>

            <pre className="bg-slate-800 rounded-lg p-4 text-sm text-white/80 whitespace-pre-wrap font-mono max-h-96 overflow-auto">
              {exportText}
            </pre>

            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-semibold transition-colors"
              >
                {copied ? '✅ ¡Copiado!' : '📋 Copiar al portapapeles'}
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors"
              >
                💾 Descargar .txt
              </button>
            </div>

            <p className="text-xs text-white/40 text-center">
              Copia este texto y pégamelo en el chat para que corrija todo
            </p>
          </div>
        </div>
      )}

      {/* Bottom padding to prevent content from hiding behind toolbar */}
      <div className="h-16" />
    </>
  )
}
