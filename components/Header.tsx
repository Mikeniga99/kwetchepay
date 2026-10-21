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
    <header className={`header ${scrolled ? 'header-scrolled' : ''} ${open ? 'header-open' : ''}`}>
      <div className="nav-shell">
        <Logo />
        <nav className={`nav-links ${open ? 'nav-open' : ''}`} aria-label="Navigation principale">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? 'nav-link-active' : ''}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
          <span className="mobile-nav-actions">
            <Link href="/connexion" onClick={() => setOpen(false)}>
              Connexion
            </Link>
            <Button href="/contact">Créer un compte</Button>
          </span>
        </nav>
        <div className="nav-actions">
          <Link className="login-link" href="/connexion">
            Connexion
          </Link>
          <Button href="/contact">Créer un compte</Button>
        </div>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          <Icon name={open ? 'x' : 'menu'} />
        </button>
      </div>
    </header>
  )
}
