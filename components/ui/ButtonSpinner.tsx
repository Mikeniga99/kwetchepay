import React from 'react'

interface ButtonSpinnerProps {
  label?: string
  color?: string
}

export function ButtonSpinner({ label = 'Traitement...', color }: ButtonSpinnerProps) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <span className="btn-spinner" style={color ? { borderTopColor: color } : undefined} />
      {label && <span>{label}</span>}
    </span>
  )
}
