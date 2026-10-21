'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollReveal } from './ScrollReveal'

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith('/dashboard')

  if (isDashboard) {
    return <div className="dashboard-root">{children}</div>
  }

  return (
    <div className="site">
      <ScrollReveal />
      <Header />
      {children}
      <Footer />
    </div>
  )
}
