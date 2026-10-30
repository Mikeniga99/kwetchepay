'use client'

import { useEffect, useState } from 'react'

export function HeroVideo() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [saveData, setSaveData] = useState(false)

  useEffect(() => {
    // Détecte si l'utilisateur a activé le mode économie de données
    const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection
    if (connection?.saveData) {
      setSaveData(true)
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const posterImage = isMobile
    ? '/images/poster-mobile.png'
    : '/images/poster-desktop.png'

  const videoSrc = isMobile
    ? '/images/arrieremobile.mp4'
    : '/images/arriereplan.mp4'

  return (
    <div className="hero-video-wrap" aria-hidden="true">
      {/* 
        Image de couverture instantanée (0 ms) + Vidéo avec cache navigateur permanent.
        Si l'utilisateur active l'économie de données, on garde l'image de couverture pour ne pas gaspiller son forfait.
      */}
      <video
        key={isMobile ? 'mobile' : 'desktop'}
        className="hero-video-bg"
        autoPlay={!saveData}
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterImage}
      >
        {isMobile !== null && !saveData && (
          <source src={videoSrc} type="video/mp4" />
        )}
      </video>

      {/* Overlay bleu nuit semi-transparent pour lisibilité */}
      <div className="hero-video-overlay" />
    </div>
  )
}



