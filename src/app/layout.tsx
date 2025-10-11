import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '../lib/theme-context'
import CustomCursor from '../components/ui/CustomCursor'
import { SplashCursor } from '../components/ui/splash-cursor'
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
          <CustomCursor />
          <SplashCursor 
  // SPLAT_RADIUS={0.05}        // Splash size (default: 0.2)
  // SPLAT_FORCE={15000}        // Splash intensity (default: 6000)
  // COLOR_UPDATE_SPEED={5}   // Color change speed (default: 10)
  // DENSITY_DISSIPATION={4}   // How fast colors fade (default: 3.5)
/>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}