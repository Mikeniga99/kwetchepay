'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
  color: string
  glowColor: string
  label?: string
  pulsePhase: number
  pulseSpeed: number
}

interface Pulse {
  sourceIndex: number
  targetIndex: number
  progress: number // 0 to 1
  speed: number
  color: string
  glowColor: string
  size: number
}

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  color: string
}

const BRAND_PALETTE = [
  { color: '#f45d22', glow: 'rgba(244, 93, 34, 0.45)', weight: 3 }, // KwêTché Orange
  { color: '#16856f', glow: 'rgba(22, 133, 111, 0.45)', weight: 3 }, // Fintech Green
  { color: '#e5a50a', glow: 'rgba(229, 165, 10, 0.45)', weight: 2 }, // MTN Gold
  { color: '#68459b', glow: 'rgba(104, 69, 155, 0.35)', weight: 1 }, // Celtiis Purple
  { color: '#102724', glow: 'rgba(16, 39, 36, 0.25)', weight: 2 },  // Deep Ink
]

const KEY_LABELS = [
  'Cotonou Hub',
  'MTN Gateway',
  'Moov Direct',
  'Celtiis Push',
  'Porto-Novo',
  'Calavi Relais',
  'Parakou Node',
]

export function TelecomConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let isVisible = true
    let width = 0
    let height = 0

    // Entities
    let nodes: Node[] = []
    let pulses: Pulse[] = []
    let ripples: Ripple[] = []
    let lastPulseTime = 0
    let lastRippleTime = 0

    // Mouse influence (subtle, non-intrusive)
    const mouse = { x: -1000, y: -1000, active: false }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height

      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      initNodes()
    }

    const initNodes = () => {
      nodes = []
      // Fewer nodes on small screens for performance
      const isMobile = width < 768
      const nodeCount = isMobile ? 22 : 45

      const colorsList: Array<{ color: string; glow: string }> = []
      BRAND_PALETTE.forEach((item) => {
        for (let i = 0; i < item.weight; i++) {
          colorsList.push({ color: item.color, glow: item.glow })
        }
      })

      for (let i = 0; i < nodeCount; i++) {
        const c = colorsList[i % colorsList.length]
        const label = i < KEY_LABELS.length && !isMobile ? KEY_LABELS[i] : undefined
        const baseRadius = label ? 4.5 : Math.random() * 2 + 2

        nodes.push({
          x: Math.random() * (width - 40) + 20,
          y: Math.random() * (height - 40) + 20,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: baseRadius,
          baseRadius,
          color: c.color,
          glowColor: c.glow,
          label,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
        })
      }
    }

    const spawnPulse = () => {
      if (nodes.length < 2) return
      // Pick a random source node
      const sourceIndex = Math.floor(Math.random() * nodes.length)
      const source = nodes[sourceIndex]

      // Find nearby neighbors connected by a filament
      const maxDist = width < 768 ? 130 : 180
      const candidates: number[] = []

      for (let i = 0; i < nodes.length; i++) {
        if (i === sourceIndex) continue
        const dx = nodes[i].x - source.x
        const dy = nodes[i].y - source.y
        const dist = Math.hypot(dx, dy)
        if (dist < maxDist && dist > 20) {
          candidates.push(i)
        }
      }

      if (candidates.length > 0) {
        const targetIndex = candidates[Math.floor(Math.random() * candidates.length)]
        const target = nodes[targetIndex]
        const isOrange = Math.random() > 0.4

        pulses.push({
          sourceIndex,
          targetIndex,
          progress: 0,
          speed: 0.012 + Math.random() * 0.014,
          color: isOrange ? '#f45d22' : '#16856f',
          glowColor: isOrange ? 'rgba(244, 93, 34, 0.8)' : 'rgba(22, 133, 111, 0.8)',
          size: Math.random() * 2 + 2.5,
        })

        // Occasionally spawn an expanding ripple on source
        if (Math.random() > 0.6) {
          ripples.push({
            x: source.x,
            y: source.y,
            radius: source.radius,
            maxRadius: source.radius + 38,
            opacity: 0.6,
            color: source.color,
          })
        }
      }
    }

    const updateAndDraw = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(updateAndDraw)
        return
      }

      ctx.clearRect(0, 0, width, height)

      const maxDist = width < 768 ? 120 : 170

      // 1. Draw connections (filaments)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const dist = Math.hypot(dx, dy)

          if (dist < maxDist) {
            // Smooth falloff
            const alpha = (1 - dist / maxDist) * 0.16
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(16, 39, 36, ${alpha})`
            ctx.lineWidth = 0.9
            ctx.stroke()
          }
        }
      }

      // 2. Spawn and update pulses along filaments (telecom transactions)
      if (time - lastPulseTime > 350) {
        spawnPulse()
        lastPulseTime = time
      }

      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p]
        pulse.progress += pulse.speed

        if (pulse.progress >= 1) {
          // Arrived at target: create a small bounce or ripple at target node
          const target = nodes[pulse.targetIndex]
          if (target && Math.random() > 0.5) {
            ripples.push({
              x: target.x,
              y: target.y,
              radius: target.radius,
              maxRadius: target.radius + 28,
              opacity: 0.55,
              color: pulse.color,
            })
          }
          pulses.splice(p, 1)
          continue
        }

        const src = nodes[pulse.sourceIndex]
        const tgt = nodes[pulse.targetIndex]
        if (!src || !tgt) {
          pulses.splice(p, 1)
          continue
        }

        const curX = src.x + (tgt.x - src.x) * pulse.progress
        const curY = src.y + (tgt.y - src.y) * pulse.progress

        // Draw glowing head
        ctx.beginPath()
        ctx.arc(curX, curY, pulse.size, 0, Math.PI * 2)
        ctx.fillStyle = pulse.color
        ctx.shadowColor = pulse.glowColor
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0 // Reset

        // Draw small light trail
        const trailProgress = Math.max(0, pulse.progress - 0.08)
        const trailX = src.x + (tgt.x - src.x) * trailProgress
        const trailY = src.y + (tgt.y - src.y) * trailProgress

        ctx.beginPath()
        ctx.moveTo(curX, curY)
        ctx.lineTo(trailX, trailY)
        ctx.strokeStyle = pulse.glowColor
        ctx.lineWidth = pulse.size * 0.9
        ctx.stroke()
      }

      // 3. Update & Draw ripples (radar waves)
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r]
        rip.radius += 0.7
        rip.opacity -= 0.015

        if (rip.opacity <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2)
        ctx.strokeStyle = rip.color
        ctx.globalAlpha = Math.max(0, rip.opacity)
        ctx.lineWidth = 1.2
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      // 4. Update and Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        // Natural organic drift
        node.x += node.vx
        node.y += node.vy

        // Bounce gently off boundaries
        if (node.x < 15) {
          node.x = 15
          node.vx *= -1
        } else if (node.x > width - 15) {
          node.x = width - 15
          node.vx *= -1
        }

        if (node.y < 15) {
          node.y = 15
          node.vy *= -1
        } else if (node.y > height - 15) {
          node.y = height - 15
          node.vy *= -1
        }

        // Breathing pulse
        node.pulsePhase += node.pulseSpeed
        const pulseFactor = Math.sin(node.pulsePhase) * 0.6
        const currentRadius = Math.max(1.5, node.baseRadius + pulseFactor)

        // Mouse avoidance/attraction
        if (mouse.active) {
          const mdx = mouse.x - node.x
          const mdy = mouse.y - node.y
          const mDist = Math.hypot(mdx, mdy)
          if (mDist < 120 && mDist > 0) {
            const force = (120 - mDist) / 120
            node.x -= (mdx / mDist) * force * 1.5
            node.y -= (mdy / mDist) * force * 1.5
          }
        }

        // Draw soft ambient halo
        ctx.beginPath()
        ctx.arc(node.x, node.y, currentRadius * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = node.glowColor
        ctx.fill()

        // Draw core node
        ctx.beginPath()
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()

        // Draw subtle city/gateway label if present
        if (node.label) {
          ctx.font = '500 9px system-ui, -apple-system, sans-serif'
          ctx.fillStyle = 'rgba(16, 39, 36, 0.45)'
          ctx.fillText(node.label, node.x + 8, node.y + 3)
        }
      }

      animationFrameId = requestAnimationFrame(updateAndDraw)
    }

    // Resize observer
    resize()
    window.addEventListener('resize', resize)

    // Visibility management
    const handleVisibility = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // Mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const handleMouseLeave = () => {
      mouse.active = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    animationFrameId = requestAnimationFrame(updateAndDraw)

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  )
}
