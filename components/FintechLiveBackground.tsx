'use client'

import { useEffect, useRef } from 'react'

interface FallingBanknote {
  x: number
  y: number
  vy: number
  wobblePhase: number
  wobbleSpeed: number
  wobbleWidth: number
  flipPhase: number
  flipSpeed: number
  rotation: number
  vRot: number
  width: number
  height: number
  value: string
  bgColor: string
  borderColor: string
  textColor: string
  opacity: number
}

interface FallingCoin {
  x: number
  y: number
  vy: number
  vx: number
  spinPhase: number
  spinSpeed: number
  radius: number
  opacity: number
  color: string
  shimmer: number
}

interface LeapingFish {
  x: number
  y: number
  startY: number
  vx: number
  vy: number
  gravity: number
  size: number
  isCoin: boolean
  rotation: number
  vRot: number
}

interface WaterDrop {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  color: string
}

interface WaterRipple {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  color: string
}

interface ThrusterSpark {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
}

interface Firefly {
  x: number
  y: number
  size: number
  alpha: number
  baseAlpha: number
  twinkleSpeed: number
  phase: number
  vx: number
  vy: number
}

export function FintechLiveBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let isRunning = true
    let width = 0
    let height = 0

    // Pirogue state & entrance timing
    let pirogueStartTime = Date.now() + 1200 // Starts sailing after 1.2s so the money rain starts first!
    let pirogueX = -160
    let pirogueY = 0
    let pirogueTilt = 0
    let pirogueAltitude = 0
    let pirogueMode: 'water' | 'hover' = 'water'

    // Dynamic collections
    let banknotes: FallingBanknote[] = []
    let coins: FallingCoin[] = []
    let ripples: WaterRipple[] = []
    let fishList: LeapingFish[] = []
    let drops: WaterDrop[] = []
    let thrusterSparks: ThrusterSpark[] = []
    let fireflies: Firefly[] = []
    let wavePhase = 0
    let lastFishSpawn = 0

    const resize = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width || window.innerWidth || 1200
      height = rect.height || 420

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      initEntities()
    }

    const initEntities = () => {
      // 1. Initial Rain of Banknotes (pre-populated across the sky)
      const banknoteCount = width < 768 ? 16 : 30
      banknotes = []

      const banknoteTypes = [
        {
          value: '10 000',
          bgColor: '#7b2cbf', // Violet FCFA 10 000
          borderColor: '#9d4edd',
          textColor: '#ffffff',
        },
        {
          value: '5 000',
          bgColor: '#16856f', // Vert émeraude FCFA 5 000
          borderColor: '#2ec4b6',
          textColor: '#ffffff',
        },
        {
          value: '2 000',
          bgColor: '#0077b6', // Bleu cyan FCFA 2 000
          borderColor: '#48cae4',
          textColor: '#ffffff',
        },
      ]

      for (let i = 0; i < banknoteCount; i++) {
        const type = banknoteTypes[i % banknoteTypes.length]
        banknotes.push({
          x: Math.random() * width,
          y: Math.random() * height - 30, // Distributed across sky
          vy: Math.random() * 0.9 + 0.65,
          wobblePhase: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.03 + 0.018,
          wobbleWidth: Math.random() * 22 + 14,
          flipPhase: Math.random() * Math.PI * 2,
          flipSpeed: Math.random() * 0.045 + 0.025,
          rotation: (Math.random() - 0.5) * 0.5,
          vRot: (Math.random() - 0.5) * 0.015,
          width: width < 768 ? 28 : 36,
          height: width < 768 ? 16 : 20,
          value: type.value,
          bgColor: type.bgColor,
          borderColor: type.borderColor,
          textColor: type.textColor,
          opacity: Math.random() * 0.45 + 0.45,
        })
      }

      // 2. Initial Rain of Gold Coins (500 F CFA)
      const coinCount = width < 768 ? 22 : 45
      coins = []
      for (let i = 0; i < coinCount; i++) {
        coins.push({
          x: Math.random() * width,
          y: Math.random() * height - 20,
          vy: Math.random() * 1.3 + 0.9,
          vx: (Math.random() - 0.5) * 0.4,
          spinPhase: Math.random() * Math.PI * 2,
          spinSpeed: Math.random() * 0.06 + 0.03,
          radius: Math.random() * 2.5 + 4,
          opacity: Math.random() * 0.45 + 0.55,
          color: '#ffca05',
          shimmer: Math.random() * Math.PI * 2,
        })
      }

      // 3. Fireflies
      fireflies = []
      const flyCount = width < 768 ? 14 : 26
      for (let i = 0; i < flyCount; i++) {
        fireflies.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.72),
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.6 + 0.2,
          baseAlpha: Math.random() * 0.4 + 0.3,
          twinkleSpeed: Math.random() * 0.04 + 0.02,
          phase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.2,
        })
      }
    }

    const spawnFish = () => {
      const startX = Math.random() * (width - 180) + 90
      const waterY = height * 0.76
      fishList.push({
        x: startX,
        y: waterY,
        startY: waterY,
        vx: (Math.random() - 0.3) * 1.8 + 1.2,
        vy: -(Math.random() * 2.6 + 5.0),
        gravity: 0.14,
        size: Math.random() * 5 + 14,
        isCoin: false,
        rotation: -0.6,
        vRot: 0.032,
      })

      // Splash drops on jump
      for (let i = 0; i < 6; i++) {
        drops.push({
          x: startX + (Math.random() - 0.5) * 12,
          y: waterY,
          vx: (Math.random() - 0.5) * 2.5,
          vy: -(Math.random() * 3 + 1.5),
          radius: Math.random() * 1.8 + 1,
          alpha: 0.8,
          color: '#ffca05',
        })
      }
    }

    const render = (time: number) => {
      if (!isRunning) {
        animId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      wavePhase += 0.016
      const waterY = height * 0.76

      // ========================================================
      // 1. THE GLOWING KWÊTCHÉ MOON (Upper Right Sky)
      // ========================================================
      const moonX = width < 768 ? width * 0.82 : width * 0.78
      const moonY = height * 0.3
      const moonRadius = width < 768 ? 44 : 58

      const moonGlow = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.5, moonX, moonY, moonRadius * 2.8)
      moonGlow.addColorStop(0, 'rgba(255, 183, 3, 0.24)')
      moonGlow.addColorStop(0.5, 'rgba(244, 93, 34, 0.1)')
      moonGlow.addColorStop(1, 'rgba(247, 246, 241, 0)')
      ctx.beginPath()
      ctx.arc(moonX, moonY, moonRadius * 2.8, 0, Math.PI * 2)
      ctx.fillStyle = moonGlow
      ctx.fill()

      const moonGrad = ctx.createLinearGradient(moonX - moonRadius, moonY - moonRadius, moonX + moonRadius, moonY + moonRadius)
      moonGrad.addColorStop(0, '#ffffff')
      moonGrad.addColorStop(0.4, '#fff7e0')
      moonGrad.addColorStop(1, '#ffd073')
      ctx.beginPath()
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2)
      ctx.fillStyle = moonGrad
      ctx.shadowColor = 'rgba(255, 195, 0, 0.55)'
      ctx.shadowBlur = 18
      ctx.fill()
      ctx.shadowBlur = 0

      // Embossed KwêTché Rings
      ctx.save()
      ctx.translate(moonX, moonY)
      ctx.rotate(-0.16)
      ctx.strokeStyle = 'rgba(244, 93, 34, 0.35)'
      ctx.lineWidth = 3.5
      ctx.beginPath()
      ctx.ellipse(-7, 0, 7, 12, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.ellipse(7, 0, 7, 12, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()

      // ========================================================
      // 2. THE RAIN OF BANKNOTES (BILLET FALLING FLUTTER)
      // ========================================================
      for (let i = 0; i < banknotes.length; i++) {
        const b = banknotes[i]

        b.y += b.vy
        b.wobblePhase += b.wobbleSpeed
        b.flipPhase += b.flipSpeed
        b.rotation += b.vRot

        // Fluttering horizontal drift
        const curX = b.x + Math.sin(b.wobblePhase) * b.wobbleWidth
        // 3D paper flip perspective simulation
        const flipScale = Math.sin(b.flipPhase)

        // Hit the water surface
        if (b.y >= waterY) {
          ripples.push({
            x: curX,
            y: waterY,
            radius: 2,
            maxRadius: 24,
            opacity: 0.6,
            color: b.bgColor,
          })
          b.y = -35
          b.x = Math.random() * width
          continue
        }

        ctx.save()
        ctx.translate(curX, b.y)
        ctx.rotate(b.rotation)
        ctx.scale(1, flipScale) // Flip effect

        // Banknote Body
        ctx.globalAlpha = Math.abs(flipScale) * b.opacity
        ctx.fillStyle = b.bgColor
        ctx.strokeStyle = b.borderColor
        ctx.lineWidth = 1

        // Rounded rect
        const rx = -b.width / 2
        const ry = -b.height / 2
        ctx.beginPath()
        ctx.roundRect(rx, ry, b.width, b.height, 3)
        ctx.fill()
        ctx.stroke()

        // Subtle value stamp inside
        if (Math.abs(flipScale) > 0.45) {
          ctx.fillStyle = b.textColor
          ctx.font = '700 8px system-ui, sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(b.value, 0, 0)
        }

        ctx.restore()
        ctx.globalAlpha = 1
      }

      // ========================================================
      // 3. THE RAIN OF GOLD COINS (500 F CFA)
      // ========================================================
      for (let i = 0; i < coins.length; i++) {
        const c = coins[i]

        c.y += c.vy
        c.x += c.vx
        c.spinPhase += c.spinSpeed
        c.shimmer += 0.05

        const spinWidth = Math.abs(Math.cos(c.spinPhase)) * c.radius

        // Hit water
        if (c.y >= waterY) {
          ripples.push({
            x: c.x,
            y: waterY,
            radius: 2,
            maxRadius: 18,
            opacity: 0.7,
            color: '#ffca05',
          })
          c.y = -20
          c.x = Math.random() * width
          continue
        }

        ctx.save()
        ctx.translate(c.x, c.y)

        // Coin Outer Disc
        ctx.beginPath()
        ctx.ellipse(0, 0, Math.max(1, spinWidth), c.radius, 0, 0, Math.PI * 2)
        ctx.fillStyle = c.color
        ctx.shadowColor = '#ffb703'
        ctx.shadowBlur = 8
        ctx.globalAlpha = c.opacity
        ctx.fill()

        // Coin Inner Ring
        if (spinWidth > 2.5) {
          ctx.beginPath()
          ctx.ellipse(0, 0, spinWidth * 0.7, c.radius * 0.7, 0, 0, Math.PI * 2)
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 0.8
          ctx.stroke()
        }

        ctx.restore()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      }

      // ========================================================
      // 4. WATER RIPPLE RINGS (from falling money & splash)
      // ========================================================
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        r.radius += 0.6
        r.opacity -= 0.018

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.ellipse(r.x, r.y, r.radius * 1.8, r.radius * 0.6, 0, 0, Math.PI * 2)
        ctx.strokeStyle = r.color
        ctx.lineWidth = 1.2
        ctx.globalAlpha = Math.max(0, r.opacity)
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      // ========================================================
      // 5. AMBIENT FIREFLIES (Les Lucioles)
      // ========================================================
      fireflies.forEach((f) => {
        f.x += f.vx
        f.y += f.vy
        if (f.x < 0) f.x = width
        if (f.x > width) f.x = 0
        if (f.y < 0) f.y = height * 0.72
        if (f.y > height * 0.72) f.y = 0

        f.phase += f.twinkleSpeed
        const alpha = Math.max(0.1, (Math.sin(f.phase) + 1) * 0.5 * f.baseAlpha)

        ctx.beginPath()
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2)
        ctx.fillStyle = '#ffca05'
        ctx.shadowColor = '#ffb703'
        ctx.shadowBlur = 6
        ctx.globalAlpha = alpha
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      })

      // ========================================================
      // 6. THE GOLDEN RIVER OF LAKE NOKOUÉ
      // ========================================================
      const drawRiverWave = (baseOffset: number, amplitude: number, freq: number, phaseShift: number, colorTop: string, colorBottom: string) => {
        ctx.beginPath()
        ctx.moveTo(0, height)
        for (let x = 0; x <= width + 8; x += 8) {
          const y = waterY + baseOffset + Math.sin(x * freq + wavePhase + phaseShift) * amplitude
          if (x === 0) ctx.lineTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.lineTo(width, height)
        ctx.closePath()

        const waveGrad = ctx.createLinearGradient(0, waterY, 0, height)
        waveGrad.addColorStop(0, colorTop)
        waveGrad.addColorStop(1, colorBottom)
        ctx.fillStyle = waveGrad
        ctx.fill()
      }

      drawRiverWave(-12, 14, 0.0035, 0, 'rgba(22, 133, 111, 0.22)', 'rgba(244, 93, 34, 0.08)')
      drawRiverWave(0, 18, 0.0042, 1.8, 'rgba(255, 183, 3, 0.32)', 'rgba(251, 133, 0, 0.12)')

      // ========================================================
      // 7. THE NEO-PIROGUE (ENTERING & FLYING TOWARDS MOON)
      // ========================================================
      const canSail = Date.now() >= pirogueStartTime

      if (canSail) {
        pirogueX += 1.45
        if (pirogueX > width + 150) {
          pirogueX = -150
          pirogueAltitude = 0
          pirogueMode = 'water'
        }

        // Flight cycle: sail on water, then hover levitate towards the moon!
        if (pirogueX > width * 0.35 && pirogueX < width * 0.72) {
          pirogueMode = 'hover'
          pirogueAltitude = Math.sin(((pirogueX - width * 0.35) / (width * 0.37)) * Math.PI) * 48
        } else {
          pirogueMode = 'water'
          pirogueAltitude = Math.sin(wavePhase * 2) * 3
        }

        const currentWaterLevel = waterY + Math.sin(pirogueX * 0.0042 + wavePhase + 1.8) * 18
        pirogueY = currentWaterLevel - pirogueAltitude
        pirogueTilt = pirogueMode === 'hover' ? -0.12 : Math.cos(wavePhase * 2) * 0.06

        ctx.save()
        ctx.translate(pirogueX, pirogueY)
        ctx.rotate(pirogueTilt)

        // Thruster Jet Flames
        const isHover = pirogueMode === 'hover'
        const flameLength = isHover ? Math.random() * 12 + 22 : Math.random() * 6 + 10

        // Left Thruster Flame (KwêTché Orange)
        ctx.beginPath()
        ctx.moveTo(-28, 4)
        ctx.lineTo(-44 - flameLength, 7)
        ctx.lineTo(-28, 10)
        ctx.closePath()
        ctx.fillStyle = 'rgba(253, 109, 0, 0.88)'
        ctx.shadowColor = '#FD6D00'
        ctx.shadowBlur = 12
        ctx.fill()

        // Right Thruster Flame (Fintech Green / Gold)
        ctx.beginPath()
        ctx.moveTo(18, 4)
        ctx.lineTo(2 - flameLength * 0.8, 8)
        ctx.lineTo(18, 10)
        ctx.closePath()
        ctx.fillStyle = 'rgba(22, 133, 111, 0.82)'
        ctx.shadowColor = '#5fe0a8'
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0

        // Thruster sparks
        if (Math.random() > 0.4) {
          thrusterSparks.push({
            x: pirogueX - 35,
            y: pirogueY + 8,
            vx: -(Math.random() * 3 + 1.5),
            vy: (Math.random() - 0.5) * 1.5,
            size: Math.random() * 2 + 1,
            alpha: 0.9,
            color: Math.random() > 0.5 ? '#FD6D00' : '#ffca05',
          })
        }

        // Traditional Pirogue Hull
        ctx.beginPath()
        ctx.moveTo(-58, -3)
        ctx.quadraticCurveTo(-20, 14, 52, 2)
        ctx.quadraticCurveTo(62, -2, 65, -8)
        ctx.quadraticCurveTo(20, 2, -58, -3)
        ctx.closePath()

        const woodGrad = ctx.createLinearGradient(-50, 0, 50, 0)
        woodGrad.addColorStop(0, '#1c150e')
        woodGrad.addColorStop(0.5, '#3d2817')
        woodGrad.addColorStop(1, '#1c150e')
        ctx.fillStyle = woodGrad
        ctx.fill()

        // Glowing Neon Trim
        ctx.strokeStyle = '#FD6D00'
        ctx.lineWidth = 1.8
        ctx.shadowColor = '#FD6D00'
        ctx.shadowBlur = 8
        ctx.stroke()
        ctx.shadowBlur = 0

        // Piroguier
        ctx.fillStyle = '#0E3864'
        ctx.beginPath()
        ctx.arc(10, -26, 4.5, 0, Math.PI * 2)
        ctx.fill()

        // Hat
        ctx.beginPath()
        ctx.moveTo(10, -32)
        ctx.lineTo(1, -26)
        ctx.lineTo(19, -26)
        ctx.closePath()
        ctx.fillStyle = '#e5a50a'
        ctx.fill()

        // Torso
        ctx.fillStyle = '#0E3864'
        ctx.beginPath()
        ctx.moveTo(10, -21)
        ctx.lineTo(6, -7)
        ctx.lineTo(14, -7)
        ctx.closePath()
        ctx.fill()

        // Paddle
        ctx.beginPath()
        ctx.moveTo(4, -20)
        ctx.lineTo(-4, 18)
        ctx.strokeStyle = '#d4a373'
        ctx.lineWidth = 2
        ctx.stroke()

        // Glowing paddle tip
        ctx.beginPath()
        ctx.ellipse(-4, 19, 3, 7, -0.4, 0, Math.PI * 2)
        ctx.fillStyle = '#ffca05'
        ctx.shadowColor = '#ffca05'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0

        ctx.restore()
      }

      // Thruster sparks physics
      for (let i = thrusterSparks.length - 1; i >= 0; i--) {
        const sp = thrusterSparks[i]
        sp.x += sp.vx
        sp.y += sp.vy
        sp.alpha -= 0.025

        if (sp.alpha <= 0) {
          thrusterSparks.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2)
        ctx.fillStyle = sp.color
        ctx.globalAlpha = sp.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // ========================================================
      // 8. LEAPING GOLDEN FISH -> METAMORPHOSIS
      // ========================================================
      if (time - lastFishSpawn > 3400) {
        spawnFish()
        lastFishSpawn = time
      }

      for (let i = fishList.length - 1; i >= 0; i--) {
        const fish = fishList[i]
        fish.x += fish.vx
        fish.y += fish.vy
        fish.vy += fish.gravity
        fish.rotation += fish.vRot

        if (fish.vy > -2 && fish.vy < 2) {
          fish.isCoin = true
        }

        if (fish.y >= fish.startY && fish.vy > 0) {
          for (let d = 0; d < 8; d++) {
            drops.push({
              x: fish.x + (Math.random() - 0.5) * 14,
              y: fish.startY,
              vx: (Math.random() - 0.5) * 3,
              vy: -(Math.random() * 3 + 1),
              radius: Math.random() * 2 + 1,
              alpha: 0.8,
              color: '#ffca05',
            })
          }
          fishList.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.translate(fish.x, fish.y)
        ctx.rotate(fish.rotation)

        if (fish.isCoin) {
          const coinWidth = Math.abs(Math.cos(fish.rotation * 3)) * 12 + 2
          ctx.beginPath()
          ctx.ellipse(0, 0, coinWidth, 12, 0, 0, Math.PI * 2)
          ctx.fillStyle = '#ffca05'
          ctx.shadowColor = '#f45d22'
          ctx.shadowBlur = 14
          ctx.fill()
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 1.2
          ctx.stroke()
          ctx.shadowBlur = 0
        } else {
          ctx.beginPath()
          ctx.moveTo(-fish.size, 0)
          ctx.quadraticCurveTo(0, -fish.size * 0.45, fish.size, 0)
          ctx.quadraticCurveTo(0, fish.size * 0.45, -fish.size, 0)
          ctx.closePath()

          const fishGrad = ctx.createLinearGradient(-fish.size, 0, fish.size, 0)
          fishGrad.addColorStop(0, '#f45d22')
          fishGrad.addColorStop(0.6, '#ffca05')
          fishGrad.addColorStop(1, '#ffffff')
          ctx.fillStyle = fishGrad
          ctx.shadowColor = '#ffca05'
          ctx.shadowBlur = 12
          ctx.fill()

          ctx.beginPath()
          ctx.moveTo(-fish.size, 0)
          ctx.lineTo(-fish.size - 7, -6)
          ctx.lineTo(-fish.size - 4, 0)
          ctx.lineTo(-fish.size - 7, 6)
          ctx.closePath()
          ctx.fillStyle = '#f45d22'
          ctx.fill()
          ctx.shadowBlur = 0
        }

        ctx.restore()
      }

      // Splash drops
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i]
        d.x += d.vx
        d.y += d.vy
        d.vy += 0.12
        d.alpha -= 0.025

        if (d.alpha <= 0) {
          drops.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2)
        ctx.fillStyle = d.color
        ctx.globalAlpha = d.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Foreground river highlight
      drawRiverWave(12, 12, 0.005, 3.4, 'rgba(244, 93, 34, 0.28)', 'rgba(255, 183, 3, 0.0)')

      animId = requestAnimationFrame(render)
    }

    resize()

    const observer = new ResizeObserver(() => {
      resize()
    })
    observer.observe(container)

    const handleVisibility = () => {
      isRunning = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    animId = requestAnimationFrame(render)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      {/* Warm Ambient Twilight Volumetric Lighting */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '5%',
          width: '540px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 183, 3, 0.25) 0%, rgba(244, 93, 34, 0.14) 45%, transparent 70%)',
          filter: 'blur(45px)',
          animation: 'flame-breath 8s ease-in-out infinite alternate',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-5%',
          left: '10%',
          width: '480px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22, 133, 111, 0.18) 0%, rgba(244, 93, 34, 0.08) 50%, transparent 70%)',
          filter: 'blur(45px)',
          animation: 'flame-breath 10s ease-in-out infinite alternate-reverse',
          pointerEvents: 'none',
        }}
      />

      {/* HTML5 Canvas: Money Rain + Ganvié Neo-Pirogue Sailing Towards the Moon */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  )
}
