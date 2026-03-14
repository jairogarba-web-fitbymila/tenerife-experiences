import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Tenerife Experiences',
    default: 'Tenerife Experiences - Your Complete Guide to Tenerife',
  },
  description:
    'Discover the best experiences, beaches, excursions, restaurants and things to do in Tenerife. Book tours, find local tips and plan your perfect trip.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tenerifeexperiences.com'
  ),
  openGraph: {
    type: 'website',
    siteName: 'Tenerife Experiences',
    locale: 'en_GB',
    alternateLocale: ['es_ES', 'de_DE', 'fr_FR', 'ru_RU', 'it_IT'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
