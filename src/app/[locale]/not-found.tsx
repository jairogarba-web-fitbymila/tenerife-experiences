import { Compass, MapPin, Waves, Mountain, BookOpen, Home } from 'lucide-react'
import Link from 'next/link'

const suggestedPages = [
  {
    href: '/que-visitar',
    label: 'Qué visitar / What to visit',
    icon: MapPin,
  },
  {
    href: '/playas-tenerife',
    label: 'Playas / Beaches',
    icon: Waves,
  },
  {
    href: '/experiencias',
    label: 'Experiencias / Experiences',
    icon: Mountain,
  },
  {
    href: '/blog',
    label: 'Blog',
    icon: BookOpen,
  },
]

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0e1a] px-4 text-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-6 rounded-full border border-white/10 bg-white/5 p-5">
          <Compass className="size-12 text-cyan-400" strokeWidth={1.5} />
        </div>

        {/* 404 text */}
        <h1 className="mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-8xl font-bold tracking-tighter text-transparent sm:text-9xl">
          404
        </h1>

        {/* Message */}
        <p className="mb-2 text-xl font-semibold text-white/90 sm:text-2xl">
          Page not found / Página no encontrada
        </p>
        <p className="mb-8 max-w-md text-sm text-white/50">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          <br />
          La página que buscas no existe o ha sido movida.
        </p>

        {/* Back to Home */}
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-cyan-600"
        >
          <Home className="size-4" />
          Back to Home / Volver al inicio
        </Link>

        {/* Suggested pages */}
        <div className="w-full">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-white/40">
            Popular pages you might be looking for
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {suggestedPages.map((page) => {
              const Icon = page.icon
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 transition-all hover:border-cyan-500/30 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-4 text-cyan-400/60 transition-colors group-hover:text-cyan-400" />
                  {page.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
