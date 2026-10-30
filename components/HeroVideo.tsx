'use client'

import { useEffect, useRef } from 'react'

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Ajuste l'affiche selon la largeur écran
    if (window.innerWidth <= 768) {
      video.poster = '/images/poster-mobile.webp'
    }

    video.defaultMuted = true
    video.muted = true
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    // Démarre la lecture automatique
    video.play().catch(() => {
      // Si la lecture automatique est bloquée par le navigateur,
      // l'affiche 'poster' reste visible de manière nette et fluide.
    })
  }, [])

  return (
    <div className="hero-video-wrap" aria-hidden="true">
      <video
        ref={videoRef}
        className="hero-video-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/poster-desktop.webp"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source
          src="/images/arrieremobile.mp4"
          type="video/mp4"
          media="(max-width: 768px)"
        />
        <source
          src="/images/arriereplan.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay dégradé cinématographique pour la lisibilité */}
      <div className="hero-video-overlay" />
    </div>
  )
}
