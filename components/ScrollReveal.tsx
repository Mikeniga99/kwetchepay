'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Révèle les éléments `.observe` quand ils entrent dans le viewport sans perturber l'hydratation React. */
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    let observer: IntersectionObserver | null = null

    // S'assure que React a complètement fini d'hydrater tout l'arbre DOM
    const startObserver = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement
              el.classList.add('visible')
              el.setAttribute('data-visible', 'true')
            }
          })
        },
        { threshold: 0.08 },
      )

      document.querySelectorAll('.observe').forEach((element) => {
        observer?.observe(element)
      })
    }

    // Utilise requestIdleCallback ou un délai sécurisé après hydratation complète
    const frameId = requestAnimationFrame(() => {
      setTimeout(startObserver, 300)
    })

    return () => {
      cancelAnimationFrame(frameId)
      observer?.disconnect()
    }
  }, [pathname])

  return null
}
