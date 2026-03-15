'use client'

import { Download } from 'lucide-react'

export function ExportLeadsCsvButton() {
  const handleExport = async () => {
    try {
      const res = await fetch('/api/admin/leads/export')
      if (!res.ok) throw new Error('Export failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Export failed:', err)
    }
  }

  return (
    <button
      onClick={handleExport}
      className="flex w-full items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4 text-sm text-gray-300 transition-colors hover:border-green-400/20 hover:bg-white/5"
    >
      <div className="rounded-lg bg-green-500/10 p-2">
        <Download className="h-4 w-4 text-green-400" />
      </div>
      Export Leads CSV
    </button>
  )
}
