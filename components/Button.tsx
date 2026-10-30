import Link from 'next/link'
import type { ReactNode } from 'react'
import { Icon } from './Icon'

export function Button({
  children,
  variant = 'primary',
  href = '/contact',
  className = '',
  onClick,
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'light'
  href?: string
  className?: string
  onClick?: () => void
}) {
  const classes = `button button-${variant} ${className}`.trim()
  const content = (
    <>
      {children}
      <Icon name="arrow" size={18} />
    </>
  )

  if (href.startsWith('/')) {
    return (
      <Link className={classes} href={href} onClick={onClick}>
        {content}
      </Link>
    )
  }

  return (
    <a className={classes} href={href} onClick={onClick}>
      {content}
    </a>
  )
}
