import { SkeletonKpiCards, SkeletonTable } from '@/components/ui/Skeleton'

export default function DashboardLoading() {
  return (
    <div>
      <div className="dash-title-row">
        <div>
          <div className="skeleton skeleton-title" style={{ width: '220px', height: '28px', marginBottom: '8px' }} />
          <div className="skeleton skeleton-text" style={{ width: '360px', height: '14px' }} />
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <SkeletonKpiCards />
      </div>

      <div className="dash-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div className="skeleton skeleton-title" style={{ width: '180px', height: '20px' }} />
          <div className="skeleton skeleton-badge" style={{ width: '90px' }} />
        </div>
        <SkeletonTable rows={6} cols={6} />
      </div>
    </div>
  )
}
