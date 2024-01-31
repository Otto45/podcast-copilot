"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/utilities/providers'
import { GlobalState } from '@/components/utilities/global-state'

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="dark">
          <div className="bg-background text-foreground">
            <GlobalState>
              {children}
            </GlobalState>
          </div>
        </Providers>
      </body>
    </html>
  )
}
