'use client'

import { Icon } from '@/components/Icon'
import { OperatorLogo } from '@/components/OperatorLogo'
import { useState } from 'react'

type Period = 'oct2026' | 'sep2026' | 'q3'

const PERIODS: { value: Period; label: string }[] = [
  { value: 'oct2026', label: 'Octobre 2026' },
  { value: 'sep2026', label: 'Septembre 2026' },
  { value: 'q3', label: 'Trimestre 3 (2026)' },
]

const PERIOD_DATA: Record<Period, { volume: number; transactions: number; successRate: number }> = {
  oct2026: { volume: 8472500, transactions: 1284, successRate: 96.8 },
  sep2026: { volume: 7901200, transactions: 1197, successRate: 95.4 },
  q3: { volume: 22650000, transactions: 3438, successRate: 96.1 },
}

const MONTHLY_TRENDS = [
  { month: 'Mai', value: 4.2 },
  { month: 'Juin', value: 5.1 },
  { month: 'Juil', value: 6.8 },
  { month: 'Août', value: 7.2 },
  { month: 'Sep', value: 7.9 },
  { month: 'Oct', value: 8.4 },
]

const OPERATORS = [
  { key: 'mtn' as const, name: 'MTN MoMo', pct: 62, amount: 5252750, color: '#ffca05' },
  { key: 'moov' as const, name: 'Moov Money', pct: 26, amount: 2202850, color: '#005baa' },
  { key: 'celtiis' as const, name: 'Celtiis Cash', pct: 12, amount: 1016900, color: '#1d377b' },
]

export default function RapportsPage() {
  const [period, setPeriod] = useState<Period>('oct2026')
  const [exporting, setExporting] = useState<string | null>(null)

  const data = PERIOD_DATA[period]

  const handleExport = (type: string) => {
    setExporting(type)

    if (type === 'CSV') {
      setTimeout(() => {
        const headers = 'Date,Reference,Client,Montant,Statut\n'
        const rows = '2026-10-21,#KP-102,Afi Koudjo,50000,SUCCESS\n2026-10-20,#KP-101,Diane Mensah,120000,SUCCESS'
        const blob = new Blob([headers + rows], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `kwetche_report_${period}.csv`
        a.click()
        setExporting(null)
      }, 1000)
    } else {
      // Simulation pour PDF et Excel
      setTimeout(() => setExporting(null), 2000)
    }
  }

  return (
    <div className="reports-page">
      <div className="dash-title-row">
        <div>
          <h1>Rapports & Analyses</h1>
          <p>Visualisez la croissance de votre activité et exportez vos données.</p>
        </div>

        <div className="period-selector-glass">
          <Icon name="clock" size={16} />
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as Period)}
            className="period-select"
          >
            {PERIODS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--orange)' }}>
          <small>Volume total encaissé</small>
          <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '10px' }}>
            <strong style={{ fontSize: '24px' }}>{data.volume.toLocaleString()}</strong>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', marginLeft: '6px' }}>FCFA</span>
          </div>
          <div className="kpi-trend trend-up" style={{ marginTop: 'auto' }}>
            <Icon name="trend" size={12} /> +12.5% vs mois dernier
          </div>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid var(--green)' }}>
          <small>Transactions réussies</small>
          <div style={{ marginTop: '10px' }}>
            <strong style={{ fontSize: '24px' }}>{data.transactions.toLocaleString()}</strong>
          </div>
          <div className="kpi-trend trend-up" style={{ marginTop: 'auto' }}>
             <Icon name="check" size={12} /> {data.successRate}% de succès
          </div>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid var(--navy)' }}>
          <small>Panier moyen</small>
          <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '10px' }}>
            <strong style={{ fontSize: '24px' }}>{Math.round(data.volume / data.transactions).toLocaleString()}</strong>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', marginLeft: '6px' }}>FCFA</span>
          </div>
          <div className="kpi-trend trend-neutral" style={{ marginTop: 'auto' }}>Stable</div>
        </div>
      </div>

      <div className="dash-grid-2-1">
        {/* Trend Chart (Volume Global) */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <div>
              <h3>Tendance du volume global</h3>
              <small style={{ color: 'var(--muted)', fontSize: '11px' }}>6 derniers mois (Millions FCFA)</small>
            </div>
          </div>
          <div className="chart-container-sim">
            <div className="bar-chart-flex">
              {MONTHLY_TRENDS.map((item) => (
                <div key={item.month} className="bar-col">
                  <div
                    className="bar-fill"
                    style={{
                      height: `${(item.value / 9) * 100}%`,
                      background: item.month === 'Oct' ? 'var(--orange)' : 'var(--navy)'
                    }}
                  >
                    <span className="bar-tooltip">{item.value}M</span>
                  </div>
                  <span className="bar-label">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Operator Distribution */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <div>
              <h3>Répartition Opérateurs</h3>
              <small style={{ color: 'var(--muted)', fontSize: '11px' }}>Part du volume total</small>
            </div>
          </div>
          <div className="operator-dist-list">
            {OPERATORS.map((op) => (
              <div key={op.key} className="op-dist-item">
                <div className="op-info">
                  <OperatorLogo operator={op.key} size={24} />
                  <span className="op-name" style={{ fontSize: '13px', fontWeight: 700 }}>{op.name}</span>
                  <span className="op-pct" style={{ marginLeft: 'auto', color: 'var(--navy)', fontWeight: 800 }}>{op.pct}%</span>
                </div>
                <div className="op-progress-bg" style={{ height: '8px', background: '#edf2f0', borderRadius: '4px', overflow: 'hidden', margin: '4px 0' }}>
                  <div
                    className="op-progress-fill"
                    style={{ width: `${op.pct}%`, backgroundColor: op.color, height: '100%', borderRadius: '4px' }}
                  />
                </div>
                <div className="op-amount" style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>{op.amount.toLocaleString()} FCFA</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="dash-panel">
        <div className="dash-panel-header">
          <div>
            <h3>Centre d'Exports</h3>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)' }}>Téléchargez vos rapports pour votre comptabilité ou vos présentations.</p>
          </div>
        </div>

        <div className="export-actions">
          {[
            { name: 'CSV', label: 'Détail des transactions', icon: 'card' },
            { name: 'Excel', label: 'Réconciliation mensuelle', icon: 'bars' },
            { name: 'PDF', label: 'Rapport d\'activité pro', icon: 'shield' }
          ].map((type) => (
            <button
              key={type.name}
              className={`export-card ${exporting === type.name ? 'loading' : ''}`}
              onClick={() => handleExport(type.name)}
              disabled={!!exporting}
            >
              <div className="export-icon-box">
                <Icon name={type.icon as any} size={20} />
              </div>
              <div className="export-meta">
                <span className="export-type">{type.name}</span>
                <span className="export-desc">{type.label}</span>
              </div>
              <div className="export-action-btn">
                {exporting === type.name ? 'Génération...' : 'Télécharger'}
              </div>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .reports-page {
          animation: fadeIn 0.5s ease-out;
        }
        .period-selector-glass {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid var(--line);
          padding: 8px 16px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .period-select {
          border: none;
          background: transparent;
          font-weight: 700;
          color: var(--navy);
          cursor: pointer;
          outline: none;
          font-size: 13px;
        }
        .chart-container-sim {
          height: 200px;
          display: flex;
          align-items: flex-end;
          padding-top: 20px;
        }
        .bar-chart-flex {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          width: 100%;
          height: 100%;
          gap: 12px;
        }
        .bar-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
          gap: 8px;
        }
        .bar-fill {
          width: 100%;
          border-radius: 6px 6px 0 0;
          position: relative;
          transition: all 0.3s ease;
          min-height: 4px;
        }
        .bar-fill:hover {
          filter: brightness(1.1);
          transform: scaleX(1.05);
        }
        .bar-tooltip {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          font-weight: 800;
          color: var(--navy);
        }
        .bar-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--muted);
        }
        .operator-dist-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-top: 10px;
        }
        .op-dist-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .export-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 20px;
        }
        .export-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 20px;
          background: #fafafa;
          border: 1px solid var(--line);
          border-radius: 16px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
        }
        .export-card:hover:not(:disabled) {
          border-color: var(--orange);
          background: #fff;
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .export-icon-box {
          width: 40px;
          height: 40px;
          background: #fff;
          border-radius: 10px;
          display: grid;
          place-items: center;
          margin-bottom: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .export-type {
          display: block;
          font-weight: 800;
          font-size: 14px;
          color: var(--navy);
        }
        .export-desc {
          display: block;
          font-size: 11px;
          color: var(--muted);
          margin-bottom: 16px;
        }
        .export-action-btn {
          margin-top: auto;
          font-size: 12px;
          font-weight: 700;
          color: var(--orange);
        }
        .loading {
          opacity: 0.7;
          cursor: wait;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
