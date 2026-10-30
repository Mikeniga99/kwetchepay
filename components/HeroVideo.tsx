'use client'

import { useEffect, useRef, useState } from 'react'

export function HeroVideo() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [saveData, setSaveData] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.defaultMuted = true
    video.muted = true
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // iOS a bloqué la lecture auto (mode économie d'énergie, réseau lent, etc.)
        // On masque l'élément vidéo pour éviter que Safari n'affiche son bouton Play gris,
        // et le fond d'écran WebP prend le relais de façon transparente.
        video.style.opacity = '0'
      })
    }
  }, [isMobile, saveData])

  const posterImage = isMobile
    ? '/images/poster-mobile.webp'
    : '/images/poster-desktop.webp'

  const videoSrc = isMobile
    ? '/images/arrieremobile.mp4'
    : '/images/arriereplan.mp4'

  return (
    <div
      className="hero-video-wrap"
      aria-hidden="true"
      style={{
        backgroundImage: `url(${posterImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
      }}
    >
      <video
        ref={videoRef}
        key={isMobile ? 'mobile' : 'desktop'}
        className="hero-video-bg"
        autoPlay={!saveData}
        muted
        loop
        playsInline
        preload="auto"
        poster={posterImage}
        disablePictureInPicture
        disableRemotePlayback
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
