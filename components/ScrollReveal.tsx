'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Révèle les éléments `.observe` quand ils entrent dans le viewport sans perturber l'hydratation React. */
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    // Diffère l'attachement de l'observer après l'hydratation complète de React
    let observer: IntersectionObserver | null = null

    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement
              el.setAttribute('data-visible', 'true')
              el.classList.add('visible')
            }
          })
        },
        { threshold: 0.12 },
      )

      document.querySelectorAll('.observe').forEach((element) => {
        observer?.observe(element)
      })
    }, 120)

    return () => {
      clearTimeout(timer)
      observer?.disconnect()
    }
  }, [pathname])

  return null
}
