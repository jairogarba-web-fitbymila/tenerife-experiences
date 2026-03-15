'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-red-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex max-w-md flex-col items-center">
        {/* Icon */}
        <div className="mb-6 rounded-full border border-red-500/20 bg-red-500/10 p-4">
          <AlertTriangle className="size-8 text-red-400" strokeWidth={1.5} />
        </div>

        {/* Message */}
        <h2 className="mb-2 text-2xl font-semibold text-white">
          Something went wrong
        </h2>
        <p className="mb-8 text-sm text-white/50">
          An unexpected error occurred. Please try again or go back to the home
          page.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            <RefreshCw className="size-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-transparent px-5 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white"
          >
            <Home className="size-4" />
            Go home
          </Link>
        </div>

        {/* Error digest for debugging */}
        {error.digest && (
          <p className="mt-8 text-xs text-white/20">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
