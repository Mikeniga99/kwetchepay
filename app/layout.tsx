import type { Metadata, Viewport } from 'next'
import { DM_Mono, Manrope } from 'next/font/google'
import { SiteShell } from '@/components/SiteShell'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KwêTché Pay — Tous vos paiements. Une seule plateforme.',
  description:
    'Acceptez le Mobile Money, automatisez vos encaissements et pilotez votre activité avec une infrastructure de paiement conçue pour les entreprises d’Afrique de l’Ouest.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${manrope.variable} ${dmMono.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
