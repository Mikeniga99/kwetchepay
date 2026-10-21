import type { ReactNode } from 'react'

export type IconName =
  | 'arrow'
  | 'bars'
  | 'card'
  | 'check'
  | 'chevron'
  | 'clock'
  | 'code'
  | 'globe'
  | 'link'
  | 'lock'
  | 'menu'
  | 'phone'
  | 'shield'
  | 'trend'
  | 'users'
  | 'webhook'
  | 'x'

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    bars: <><path d="M4 19V9" /><path d="M10 19V5" /><path d="M16 19v-7" /><path d="M22 19V3" /></>,
    card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    code: <><path d="m8 9-3 3 3 3" /><path d="m16 9 3 3-3 3" /><path d="m14 5-4 14" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    phone: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M10 6h4M11 18h2" /></>,
    shield: <><path d="M12 3 5 6v5c0 4.7 2.8 8.4 7 10 4.2-1.6 7-5.3 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    trend: <><path d="M4 17 10 11l4 4 6-8" /><path d="M15 7h5v5" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    webhook: <><path d="M18 16.5a4 4 0 1 1-1.7-6.55" /><path d="m13 13 3.3-3.05L15.5 5" /><path d="M6 7.5a4 4 0 1 1 1.7 6.55" /><path d="m11 11-3.3 3.05L8.5 19" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}
