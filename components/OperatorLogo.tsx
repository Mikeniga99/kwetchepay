import Image from 'next/image'

export type OperatorType = 'mtn' | 'moov' | 'celtiis' | 'xof'

export function getOperatorFromChannel(channel: string): OperatorType {
  const c = channel.toLowerCase()
  if (c.includes('moov')) return 'moov'
  if (c.includes('celtiis') || c.includes('celtis')) return 'celtiis'
  if (c.includes('mtn')) return 'mtn'
  return 'xof'
}

interface OperatorLogoProps {
  operator: OperatorType
  size?: number
  className?: string
}

export function OperatorLogo({ operator, size = 26, className = '' }: OperatorLogoProps) {
  const roundedSize = Math.round(size)

  if (operator === 'moov') {
    return (
      <span
        className={`operator-logo-wrap ${className}`}
        style={{
          width: `${roundedSize}px`,
          height: `${Math.round(roundedSize * 0.85)}px`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '5px',
          overflow: 'hidden',
          background: '#005baa',
          padding: '1px',
          flexShrink: 0,
        }}
      >
        <Image
          src="/images/moov logo.webp"
          alt="Moov Money"
          width={roundedSize}
          height={Math.round(roundedSize * 0.85)}
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        />
      </span>
    )
  }

  if (operator === 'celtiis') {
    const celtiisWidth = Math.max(roundedSize, Math.round(roundedSize * 1.15))
    const celtiisHeight = Math.round(roundedSize * 0.85)

    return (
      <span
        className={`operator-logo-wrap ${className}`}
        style={{
          width: `${celtiisWidth}px`,
          height: `${celtiisHeight}px`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '5px',
          overflow: 'hidden',
          background: '#1d377b',
          padding: '1px 2px',
          flexShrink: 0,
        }}
      >
        <Image
          src="/images/Celtiis-Benin-logo.jpg"
          alt="Celtiis Cash"
          width={celtiisWidth}
          height={celtiisHeight}
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        />
      </span>
    )
  }

  if (operator === 'mtn') {
    return (
      <span
        className={`operator-logo-wrap op-mark mtn ${className}`}
        style={{
          width: `${roundedSize}px`,
          height: `${Math.round(roundedSize * 0.85)}px`,
          borderRadius: '5px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffca05',
          color: '#111111',
          fontWeight: 800,
          fontSize: `${Math.max(7, Math.round(roundedSize * 0.32))}px`,
          letterSpacing: '-0.3px',
          flexShrink: 0,
        }}
      >
        MTN
      </span>
    )
  }

  // XOF
  return (
    <span
      className={`operator-logo-wrap op-mark xof ${className}`}
      style={{
        width: `${roundedSize}px`,
        height: `${Math.round(roundedSize * 0.85)}px`,
        borderRadius: '5px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#102724',
        color: '#ffffff',
        fontWeight: 800,
        fontSize: `${Math.max(7, Math.round(roundedSize * 0.38))}px`,
        flexShrink: 0,
      }}
    >
      ₣
    </span>
  )
}
