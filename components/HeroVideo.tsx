'use client'

import { useEffect, useRef, useState } from 'react'

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Propriétés impératives pour garantir le démarrage silencieux sans blocage navigateur
    video.muted = true
    video.defaultMuted = true
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.setAttribute('x5-playsinline', '')
    video.setAttribute('x5-video-player-type', 'h5-page')
    video.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback')

    // Sélectionne la source optimale selon la largeur d'écran
    const isMobile = window.innerWidth <= 768
    const optimalSrc = isMobile ? '/images/arrieremobile.mp4' : '/images/arriereplan.mp4'

    if (!video.currentSrc || !video.currentSrc.endsWith(optimalSrc)) {
      video.src = optimalSrc
      video.load()
    }

    const onPlaySuccess = () => {
      setIsPlaying(true)
    }

    video.addEventListener('playing', onPlaySuccess)
    video.addEventListener('timeupdate', onPlaySuccess)

    // Si la vidéo est déjà en lecture
    if (!video.paused && video.currentTime > 0) {
      setIsPlaying(true)
    }

    const startPlayback = () => {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.then(onPlaySuccess).catch(() => {
          // Si le navigateur bloque l'autoplay (ex: mode économie d'énergie iOS),
          // l'affiche poster reste affichée sans AUCUN bouton Play.
        })
      }
    }

    startPlayback()

    // Déverrouillage silencieux au premier geste si l'autoplay initial a été différé par l'OS
    const unlockOnGesture = () => {
      if (video.paused) {
        startPlayback()
      }
      removeUnlockListeners()
    }

    const removeUnlockListeners = () => {
      window.removeEventListener('touchstart', unlockOnGesture)
      window.removeEventListener('touchend', unlockOnGesture)
      window.removeEventListener('scroll', unlockOnGesture)
      window.removeEventListener('click', unlockOnGesture)
    }

    window.addEventListener('touchstart', unlockOnGesture, { passive: true })
    window.addEventListener('touchend', unlockOnGesture, { passive: true })
    window.addEventListener('scroll', unlockOnGesture, { passive: true })
    window.addEventListener('click', unlockOnGesture, { passive: true })

    // Reprise automatique quand l'onglet redevient visible
    const handleVisibilityChange = () => {
      if (!document.hidden && video.paused) {
        startPlayback()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Boucle continue sans interruption
    const handleVideoEnded = () => {
      video.currentTime = 0
      startPlayback()
    }
    video.addEventListener('ended', handleVideoEnded)

    // Changement d'orientation ou redimensionnement d'écran
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleViewportChange = (e: MediaQueryListEvent) => {
      const targetSrc = e.matches ? '/images/arrieremobile.mp4' : '/images/arriereplan.mp4'
      if (!video.currentSrc.endsWith(targetSrc)) {
        video.src = targetSrc
        video.load()
        startPlayback()
      }
    }
    mediaQuery.addEventListener('change', handleViewportChange)

    return () => {
      video.removeEventListener('playing', onPlaySuccess)
      video.removeEventListener('timeupdate', onPlaySuccess)
      video.removeEventListener('ended', handleVideoEnded)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      mediaQuery.removeEventListener('change', handleViewportChange)
      removeUnlockListeners()
    }
  }, [])

  return (
    <div className="hero-video-wrap" aria-hidden="true">
      {/* 
        Affiche d'arrière-plan instantanée (0 ms).
        Elle s'affiche dès le HTML sans attendre JS ni le chargement de la vidéo.
        AUCUN bouton play n'est dessiné par le navigateur car elle est séparée du tag <video>.
      */}
      <picture className="hero-video-poster">
        <source media="(max-width: 768px)" srcSet="/images/poster-mobile.webp" />
        <img
          src="/images/poster-desktop.webp"
          alt=""
          className="hero-video-poster-img"
          draggable={false}
          loading="eager"
        />
      </picture>

      {/* 
        Élément vidéo d'arrière-plan sans attribut 'poster' direct pour interdire 
        à Safari / WebKit d'afficher son bouton de lecture au centre.
      */}
      <video
        ref={videoRef}
        className={`hero-video-bg ${isPlaying ? 'is-playing' : ''}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        aria-hidden="true"
        onContextMenu={(e) => e.preventDefault()}
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

      {/* Overlay dégradé cinématographique pour garantir la lisibilité du texte */}
      <div className="hero-video-overlay" />
    </div>
  )
}
