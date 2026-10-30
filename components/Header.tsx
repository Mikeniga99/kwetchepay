'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from './Button'
import { Icon } from './Icon'
import { Logo } from './Logo'

const navItems = [
  { href: '/solutions', label: 'Solutions' },
  { href: '/marchands', label: 'Marchands' },
  { href: '/developpeurs', label: 'Développeurs' },
  { href: '/securite', label: 'Sécurité' },
  { href: '/tarifs', label: 'Tarification' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`header ${scrolled ? 'header-scrolled' : ''} ${open ? 'header-open' : ''}`}>
        <div className="nav-shell">
          <Logo />
          <nav className="nav-links desktop-nav" aria-label="Navigation principale">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isActive ? 'nav-link-active' : ''}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="nav-actions">
            <Link className="login-link" href="/connexion">
              Connexion
            </Link>
            <Button href="/contact">Créer un compte</Button>
          </div>
          <button
            className="menu-button"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>

      {/* Backdrop sombre (couvre le reste de l'écran 35%) */}
      <div
        className={`mobile-drawer-backdrop ${open ? 'mobile-drawer-backdrop-open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar tiroir mobile (occupe au plus 65% de l'écran) */}
      <aside
        className={`mobile-drawer ${open ? 'mobile-drawer-open' : ''}`}
        aria-label="Menu mobile"
        aria-hidden={!open}
      >
        <div className="mobile-drawer-header">
          <Logo size="sm" />
          <button
            className="mobile-drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
          >
            <Icon name="x" size={20} />
          </button>
        </div>

        <nav className="mobile-drawer-links">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-drawer-link ${isActive ? 'nav-link-active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mobile-drawer-actions">
          <Link
            className="mobile-drawer-login"
            href="/connexion"
            onClick={() => setOpen(false)}
          >
            Connexion
          </Link>
          <Button href="/contact" onClick={() => setOpen(false)}>
            Créer un compte
          </Button>
        </div>
      </aside>
    </>
  )
}
