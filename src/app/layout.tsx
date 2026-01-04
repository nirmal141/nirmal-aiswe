import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '../lib/theme-context'
import CustomCursor from '../components/ui/CustomCursor'
import SmoothScroll from '../components/ui/SmoothScroll'
import ChatBot from '../components/ui/ChatBot'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {/* <SmoothScroll /> */}
          <div className="hidden md:block">
            <CustomCursor />
          </div>
          {children}
          <ChatBot />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}