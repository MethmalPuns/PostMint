import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'PostMint — AI-Powered SEO Marketing Posts',
  description: 'Generate SEO-optimized marketing posts instantly with PostMint AI. Save time and grow your brand with AI-powered content tailored for your audience',
 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}
                <Analytics />

      </body>
    </html>
  )
}
