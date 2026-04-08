import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Source_Sans_3 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Carpe Diem | Ristorante Italiano',
  description: 'Authentische italienische Küche in Berlin-Lichterfelde. Genießen Sie hausgemachte Pasta, traditionelle Pizza und erlesene Weine in warmherziger Atmosphäre.',
  keywords: ['italienisches Restaurant Berlin', ' Lichterfelde', 'Carpe Diem', 'italienische Küche', 'Ristorante'],
  authors: [{ name: 'Carpe Diem Ristorante' }],
  openGraph: {
    title: 'Carpe Diem | Ristorante Italiano',
    description: 'Authentische italienische Küche in Berlin-Lichterfelde',
    locale: 'de_DE',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#722F37',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${sourceSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
