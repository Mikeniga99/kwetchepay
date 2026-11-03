'use client'

import { useEffect, useRef, useState } from 'react'

export function HeroVideo() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null)
  const mobileVideoRef = useRef<HTMLVideoElement>(null)
  const [isDesktopPlaying, setIsDesktopPlaying] = useState(false)
  const [isMobilePlaying, setIsMobilePlaying] = useState(false)

  useEffect(() => {
    const desktopVideo = desktopVideoRef.current
    const mobileVideo = mobileVideoRef.current
    const videos = [desktopVideo, mobileVideo].filter(Boolean) as HTMLVideoElement[]

    videos.forEach((video) => {
      video.muted = true
      video.defaultMuted = true
      video.setAttribute('playsinline', '')
      video.setAttribute('webkit-playsinline', '')
      video.setAttribute('x5-playsinline', '')
      video.setAttribute('x5-video-player-type', 'h5-page')
      video.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback')
    })

    const onDesktopPlay = () => setIsDesktopPlaying(true)
    const onMobilePlay = () => setIsMobilePlaying(true)

    desktopVideo?.addEventListener('playing', onDesktopPlay)
    desktopVideo?.addEventListener('timeupdate', onDesktopPlay)
    mobileVideo?.addEventListener('playing', onMobilePlay)
    mobileVideo?.addEventListener('timeupdate', onMobilePlay)

    const startPlayback = () => {
      const isMobile = window.innerWidth <= 768
      const activeVideo = isMobile ? mobileVideo : desktopVideo
      if (activeVideo) {
        const promise = activeVideo.play()
        if (promise !== undefined) {
          promise.catch(() => {
            // Si bloqué temporairement par le navigateur,
            // l'affiche poster reste visible sans AUCUN bouton Play.
          })
        }
      }
    }

    startPlayback()

    // Déverrouillage silencieux au premier geste si l'autoplay initial a été différé par l'OS
    const handleGesture = () => {
      startPlayback()
      cleanupGestureListeners()
    }

    const cleanupGestureListeners = () => {
      window.removeEventListener('touchstart', handleGesture)
      window.removeEventListener('touchend', handleGesture)
      window.removeEventListener('scroll', handleGesture)
      window.removeEventListener('click', handleGesture)
    }

    window.addEventListener('touchstart', handleGesture, { passive: true })
    window.addEventListener('touchend', handleGesture, { passive: true })
    window.addEventListener('scroll', handleGesture, { passive: true })
    window.addEventListener('click', handleGesture, { passive: true })

    // Reprise automatique quand la page redevient visible
    const handleVisibility = () => {
      if (!document.hidden) {
        startPlayback()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // Changement d'orientation / redimensionnement
    const handleResize = () => {
      startPlayback()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      desktopVideo?.removeEventListener('playing', onDesktopPlay)
      desktopVideo?.removeEventListener('timeupdate', onDesktopPlay)
      mobileVideo?.removeEventListener('playing', onMobilePlay)
      mobileVideo?.removeEventListener('timeupdate', onMobilePlay)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('resize', handleResize)
      cleanupGestureListeners()
    }
  }, [])

  return (
    <div className="hero-video-wrap" aria-hidden="true">
      {/* 
        Affiche d'arrière-plan instantanée (0 ms).
        S'affiche immédiatement sans attendre JS.
        Sans aucun bouton Play grâce à la balise picture séparée.
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

      {/* Vidéo plein écran Desktop (format horizontal natif 1280x720) */}
      <video
        ref={desktopVideoRef}
        className={`hero-video-bg hero-video-desktop ${isDesktopPlaying ? 'is-playing' : ''}`}
        src="/images/arriereplan.mp4"
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
      />

      {/* Vidéo Mobile (format vertical natif 720x1280) */}
      <video
        ref={mobileVideoRef}
        className={`hero-video-bg hero-video-mobile ${isMobilePlaying ? 'is-playing' : ''}`}
        src="/images/arrieremobile.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        aria-hidden="true"
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Overlay dégradé cinématographique pour garantir la lisibilité du texte */}
      <div className="hero-video-overlay" />
    </div>
  )
}
