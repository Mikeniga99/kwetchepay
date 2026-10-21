'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { FintechLiveBackground } from './FintechLiveBackground'

const rain = Array.from({ length: 120 }, (_, index) => index)
const stars = Array.from({ length: 9 }, (_, index) => index)
const splashCount = 12
const phases = ['rain', 'sun', 'night'] as const

export function HeroWeatherBackground() {
  const [phase, setPhase] = useState<(typeof phases)[number]>('rain')
  const phaseRef = useRef(phase)
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const rainRefs = useRef<(HTMLSpanElement | null)[]>([])
  const splashRefs = useRef<(HTMLSpanElement | null)[]>([])
  phaseRef.current = phase

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => {
      setPhase((current) => phases[(phases.indexOf(current) + 1) % phases.length])
    }, 2000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const section = sceneRef.current?.parentElement
    if (!section) return
    section.classList.remove('weather-phase-rain', 'weather-phase-sun', 'weather-phase-night')
    section.classList.add(`weather-phase-${phase}`)
    return () => section.classList.remove(`weather-phase-${phase}`)
  }, [phase])

  useEffect(() => {
    document.body.classList.toggle('weather-cycle-night', phase === 'night')
    return () => document.body.classList.remove('weather-cycle-night')
  }, [phase])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let width = scene.clientWidth
    let height = scene.clientHeight
    let frame = 0
    let lastTime = 0
    let splashIndex = 0
    let rainWasActive = false
    const waterLine = () => height * 0.76
    const drops = rain.map(() => ({
      x: Math.random() * width,
      y: Math.random() * waterLine(),
      speed: 185 + Math.random() * 115,
      drift: (Math.random() - 0.5) * 28,
    }))
    const splashes = Array.from({ length: splashCount }, () => ({ x: 0, age: 1 }))

    const resize = () => {
      width = scene.clientWidth
      height = scene.clientHeight
    }
    const observer = new ResizeObserver(resize)
    observer.observe(scene)

    const render = (time: number) => {
      frame = requestAnimationFrame(render)
      if (document.hidden) {
        lastTime = time
        return
      }
      const delta = Math.min((time - (lastTime || time)) / 1000, 0.05)
      lastTime = time

      if (phaseRef.current === 'rain') {
        rainWasActive = true
        for (let index = 0; index < drops.length; index++) {
          const drop = drops[index]
          const node = rainRefs.current[index]
          drop.y += drop.speed * delta
          drop.x += drop.drift * delta

          const dropLength = 10 + (index % 5) * 1.5
          if (drop.y + dropLength >= waterLine()) {
            drop.y = -Math.random() * height * 0.35
            drop.x = Math.random() * width
            drop.speed = 185 + Math.random() * 115
            drop.drift = (Math.random() - 0.5) * 28
            splashes[splashIndex] = { x: drop.x, age: 0 }
            splashIndex = (splashIndex + 1) % splashCount
          }

          if (node) {
            node.style.transform = `translate3d(${drop.x}px, ${drop.y}px, 0) rotate(${drop.drift * 0.035}deg)`
            node.style.opacity = '1'
          }
        }
      } else if (rainWasActive) {
        rainRefs.current.forEach((node) => { if (node) node.style.opacity = '0' })
        rainWasActive = false
      }

      for (let index = 0; index < splashes.length; index++) {
        const splash = splashes[index]
        const node = splashRefs.current[index]
        splash.age += delta
        if (!node) continue
        node.style.left = `${splash.x}px`
        node.style.top = `${waterLine()}px`
        node.style.transform = `translate(-50%, -50%) scale(${1 + Math.max(0, splash.age) * 2.8})`
        node.style.opacity = phaseRef.current === 'rain' && splash.age < 0.42 ? `${1 - splash.age / 0.42}` : '0'
      }
    }

    frame = requestAnimationFrame(render)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={sceneRef} className={`hero-weather hero-weather-${phase}`} aria-hidden="true">
      <div className="hero-weather-scene">
        <FintechLiveBackground showMoneyRain={false} />
      </div>
      <div className="weather-sun" />
      <div className="weather-moon" />
      <div className="weather-stars">
        {stars.map((star) => <i key={star} style={{ left: `${12 + star * 8.5}%`, top: `${12 + (star * 17) % 44}%`, animationDelay: `${star * -0.31}s` } as CSSProperties} />)}
      </div>
      <div className="weather-rain">
        {rain.map((drop) => <i key={drop} ref={(node) => { rainRefs.current[drop] = node }} style={{ height: `${10 + (drop % 5) * 1.5}px`, width: drop % 4 === 0 ? '2px' : '1px' }} />)}
      </div>
      <div className="weather-splashes">
        {Array.from({ length: splashCount }, (_, index) => <i key={index} ref={(node) => { splashRefs.current[index] = node }} />)}
      </div>
      <div className="weather-haze" />
    </div>
  )
}
