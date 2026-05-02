import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    // Legacy Spanish slugs → canonical English slugs (preserves both /old and /<locale>/old)
    const legacy: Array<[string, string]> = [
      ['experiencias', 'experiences'],
      ['gastronomia', 'food'],
      ['playas-tenerife', 'beaches'],
    ]
    const rules = []
    for (const [from, to] of legacy) {
      rules.push({ source: `/${from}`, destination: `/${to}`, permanent: true })
      rules.push({ source: `/${from}/:path*`, destination: `/${to}/:path*`, permanent: true })
      rules.push({ source: `/:locale(es|de|fr|ru|it)/${from}`, destination: '/:locale/' + to, permanent: true })
      rules.push({ source: `/:locale(es|de|fr|ru|it)/${from}/:path*`, destination: '/:locale/' + to + '/:path*', permanent: true })
    }
    return rules
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' https: data: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co https://api.stripe.com https://www.google-analytics.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
              "object-src 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
