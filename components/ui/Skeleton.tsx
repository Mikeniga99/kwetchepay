import React from 'react'

export function Skeleton({
  width,
  height,
  className = '',
  style,
}: {
  width?: string | number
  height?: string | number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <span
      className={`skeleton ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
    />
  )
}

export function SkeletonKpiCards() {
  return (
    <div className="kpi-grid">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="kpi-card" style={{ gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton width="45%" height={12} />
            <Skeleton width={18} height={18} className="skeleton-circle" />
          </div>
          <Skeleton width="65%" height={26} />
          <Skeleton width="50%" height={12} />
        </div>
      ))}
    </div>
  )
}

export function SkeletonTable({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="dash-table-wrap">
      <table className="dash-table">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i}>
                <Skeleton width={60 + (i % 3) * 20} height={10} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              <td>
                <Skeleton width={90} height={14} />
              </td>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <Skeleton width={120} height={13} />
                  <Skeleton width={80} height={10} />
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Skeleton width={22} height={18} />
                  <Skeleton width={70} height={12} />
                </div>
              </td>
              <td>
                <Skeleton width={85} height={14} />
              </td>
              <td>
                <Skeleton width={65} height={14} />
              </td>
              <td>
                <Skeleton width={75} height={20} className="skeleton-badge" />
              </td>
              {cols > 6 && (
                <td>
                  <Skeleton width={60} height={26} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
