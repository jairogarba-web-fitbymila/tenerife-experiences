import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0e1a]">
      {/* Hero / Header placeholder */}
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-8">
        <Skeleton className="mb-4 h-10 w-2/3 bg-white/5" />
        <Skeleton className="mb-2 h-5 w-1/2 bg-white/5" />
        <Skeleton className="h-5 w-1/3 bg-white/5" />
      </div>

      {/* Content skeleton cards */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              {/* Image placeholder */}
              <Skeleton className="h-48 w-full rounded-none bg-white/5" />
              {/* Content */}
              <div className="space-y-3 p-4">
                <Skeleton className="h-5 w-3/4 bg-white/5" />
                <Skeleton className="h-4 w-full bg-white/5" />
                <Skeleton className="h-4 w-2/3 bg-white/5" />
                <div className="flex items-center gap-2 pt-2">
                  <Skeleton className="h-6 w-16 rounded-full bg-white/5" />
                  <Skeleton className="h-6 w-20 rounded-full bg-white/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
