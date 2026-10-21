'use client'

import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  light?: boolean
  size?: 'sm' | 'md' | 'lg'
  stacked?: boolean
}

export function Logo({ light = false, size = 'md', stacked = false }: LogoProps) {
  const iconConfig = {
    sm: { w: 28, h: 26, fontSize: '18px' },
    md: { w: 36, h: 34, fontSize: '22px' },
    lg: { w: 46, h: 43, fontSize: '26px' },
  }
  const current = iconConfig[size] || iconConfig.md

  return (
    <Link
      className={`logo ${light ? 'logo-light' : ''} ${stacked ? 'logo-stacked' : ''}`}
      href="/"
      aria-label="KwêTché Pay — Accueil"
    >
      <Image
        src="/images/kwetche_icon.png"
        alt="Logo KwêTché Pay"
        width={current.w}
        height={current.h}
        className="logo-icon-img"
        priority
      />
      <span className="logo-text-brand" style={{ fontSize: current.fontSize }}>
        <span style={{ color: light ? '#ffffff' : '#0E3864', fontWeight: 800 }}>KwêTché</span>
        <span style={{ color: 'var(--orange)', fontWeight: 800 }}>Pay</span>
      </span>
    </Link>
  )
}
