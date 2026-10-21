import React from 'react'

export function BrandLoader({ label = 'Chargement KwêTché Pay...' }: { label?: string }) {
  return (
    <div className="route-loader-backdrop">
      <div className="brand-loader-logo">
        <span className="logo-symbol" style={{ width: '42px', height: '42px', display: 'inline-block' }}>
          <span style={{ width: '22px', height: '36px', borderWidth: '6px' }} />
          <span style={{ width: '22px', height: '36px', borderWidth: '6px' }} />
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <b style={{ fontSize: '14px', letterSpacing: '-0.2px', color: 'var(--ink)' }}>{label}</b>
        <small style={{ fontSize: '11px', color: 'var(--muted)' }}>Passerelle sécurisée 256-bit SSL</small>
      </div>

      <div style={{ width: '120px', height: '3px', background: '#e8ecea', borderRadius: '99px', overflow: 'hidden' }}>
        <div
          className="skeleton"
          style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #f45d22 25%, #16856f 50%, #f45d22 75%)' }}
        />
      </div>
    </div>
  )
}
