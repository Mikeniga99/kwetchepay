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

const MONTHLY_BARS = [
  { month: 'Mai', value: 4.2, raw: 4200000 },
  { month: 'Juin', value: 5.1, raw: 5100000 },
  { month: 'Juil', value: 6.8, raw: 6800000 },
  { month: 'Août', value: 7.2, raw: 7200000 },
  { month: 'Sep', value: 7.9, raw: 7900000 },
  { month: 'Oct', value: 8.4, raw: 8400000 },
]

const MAX_BAR = 8.4

const OPERATORS = [
  {
    key: 'mtn' as const,
    name: 'MTN MoMo',
    pct: 62,
    amount: 5252750,
    txCount: 796,
    color: '#ffca05',
    textColor: '#111',
  },
  {
    key: 'moov' as const,
    name: 'Moov Money',
    pct: 26,
    amount: 2202850,
    txCount: 334,
    color: '#005baa',
    textColor: '#fff',
  },
  {
    key: 'celtiis' as const,
    name: 'Celtiis Cash',
    pct: 12,
    amount: 1016900,
    txCount: 154,
    color: '#1d377b',
    textColor: '#fff',
  },
]

export default function RapportsPage() {
  const [period, setPeriod] = useState<Period>('oct2026')

  const data = PERIOD_DATA[period]

  const handleExportCSV = () => {
    const headers = 'Reference,Client,Operateur,Montant,Date,Statut\n'
    const rows = [
      '#KP-20261021-001,Chantal Hounhouedo,Moov Money,250000,21/10/2026,success',
      '#KP-20261020-002,Diane Mensah,Celtiis Cash,120000,20/10/2026,success',
      '#KP-20261019-005,Rodrigue Dossou,MTN MoMo,75000,19/10/2026,success',
      '#KP-20261018-001,Afi Koudjo,MTN MoMo,50000,18/10/2026,success',
      '#KP-20261017-007,Fatou Diallo,Celtiis Cash,60000,17/10/2026,success',
    ].join('\n')

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `kwetchepay-transactions-${PERIODS.find(p => p.value === period)?.label.replace(/\s/g, '-')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      {/* Page Header */}
      <div className="dash-title-row">
        <div>
          <h1>Rapports &amp; Exports</h1>
          <p>Analysez vos performances et exportez vos données comptables.</p>
        </div>
        <select
          className="form-control"
          style={{ height: '40px', width: 'auto', minWidth: '200px', fontSize: '13px', fontWeight: 600 }}
          value={period}
          onChange={(e) => setPeriod(e.target.value as Period)}
        >
          {PERIODS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>

      {/* KPI Summary */}
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <div className="kpi-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff8f0', display: 'grid', placeItems: 'center', color: '#FD6D00' }}>
              <Icon name="bars" size={18} />
            </span>
            <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Volume total</span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800 }}>
            {data.volume.toLocaleString('fr-FR')} <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--muted)' }}>F CFA</span>
          </div>
        </div>

        <div className="kpi-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f0fdf4', display: 'grid', placeItems: 'center', color: 'var(--green)' }}>
              <Icon name="check" size={18} />
            </span>
            <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nb transactions</span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800 }}>
            {data.transactions.toLocaleString('fr-FR')}
          </div>
        </div>

        <div className="kpi-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eef2ff', display: 'grid', placeItems: 'center', color: '#0E3864' }}>
              <Icon name="trend" size={18} />
            </span>
            <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Taux de succès</span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--green)' }}>
            {data.successRate}%
          </div>
        </div>
      </div>

      {/* Operator Breakdown */}
      <div className="dash-panel" style={{ marginBottom: '24px' }}>
        <div className="dash-panel-header">
          <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
            <Icon name="phone" size={16} />
            {' '}Répartition par opérateur
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
            {PERIODS.find(p => p.value === period)?.label}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', padding: '16px 0' }}>
          {OPERATORS.map((op) => (
            <div
              key={op.key}
              style={{
                borderRadius: '14px',
                border: '1px solid var(--line)',
                padding: '20px',
                background: '#fafcfb',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${op.pct}%`,
                  height: '4px',
                  background: op.color,
                  borderRadius: '14px 0 0 0',
                }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', marginTop: '6px' }}>
                <OperatorLogo operator={op.key} size={32} />
                <span
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: 'var(--ink)',
                  }}
                >
                  {op.pct}%
                </span>
              </div>

              <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{op.name}</div>
              <div style={{ fontSize: '13px', color: 'var(--green)', fontWeight: 700, marginBottom: '2px' }}>
                {op.amount.toLocaleString('fr-FR')} F CFA
              </div>
              <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                {op.txCount.toLocaleString('fr-FR')} transactions
              </div>

              {/* Progress bar */}
              <div style={{ marginTop: '12px', height: '6px', background: 'var(--line)', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${op.pct}%`,
                    background: op.color,
                    borderRadius: '3px',
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trends Bar Chart */}
      <div className="dash-panel" style={{ marginBottom: '24px' }}>
        <div className="dash-panel-header">
          <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
            <Icon name="trend" size={16} />
            {' '}Tendances mensuelles
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>6 derniers mois · volumes en millions F CFA</span>
        </div>

        <div style={{ padding: '20px 0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '160px', paddingBottom: '0' }}>
            {MONTHLY_BARS.map((bar) => {
              const heightPct = (bar.value / MAX_BAR) * 100
              const isLast = bar.month === 'Oct'
              return (
                <div
                  key={bar.month}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}
                >
                  <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>
                    {bar.value}M
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: `${heightPct}%`,
                      background: isLast
                        ? 'linear-gradient(to top, #FD6D00, #ff9a3c)'
                        : 'linear-gradient(to top, #0E3864, #1a5498)',
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.4s ease',
                      position: 'relative',
                      minHeight: '16px',
                    }}
                    title={`${bar.raw.toLocaleString('fr-FR')} F CFA`}
                  />
                </div>
              )
            })}
          </div>

          {/* X-axis labels */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px', borderTop: '2px solid var(--line)', paddingTop: '8px' }}>
            {MONTHLY_BARS.map((bar) => {
              const isLast = bar.month === 'Oct'
              return (
                <div
                  key={bar.month}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: isLast ? 800 : 500,
                    color: isLast ? '#FD6D00' : 'var(--muted)',
                  }}
                >
                  {bar.month}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Exports */}
      <div className="dash-panel">
        <div className="dash-panel-header">
          <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>
            <Icon name="arrow" size={16} />
            {' '}Exports
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Téléchargez vos données pour votre comptable</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', padding: '16px 0' }}>
          {/* CSV Export */}
          <div
            style={{
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '20px',
              background: '#fafcfb',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#f0fdf4', display: 'grid', placeItems: 'center', color: 'var(--green)' }}>
              <Icon name="card" size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>CSV Transactions</div>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '4px 0 0' }}>
                Toutes les transactions de la période au format tableur.
              </p>
            </div>
            <button
              className="button button-primary"
              style={{ minHeight: '38px', fontSize: '13px', marginTop: 'auto' }}
              onClick={handleExportCSV}
            >
              📥 Télécharger CSV
            </button>
          </div>

          {/* Excel Export */}
          <div
            style={{
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '20px',
              background: '#fafcfb',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#eef2ff', display: 'grid', placeItems: 'center', color: '#0E3864' }}>
              <Icon name="bars" size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>Excel Réconciliation</div>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '4px 0 0' }}>
                Fichier de réconciliation bancaire prêt pour votre comptable.
              </p>
            </div>
            <button
              className="button button-secondary"
              style={{ minHeight: '38px', fontSize: '13px', marginTop: 'auto' }}
              onClick={() => alert(`Export Excel Réconciliation — ${PERIODS.find(p => p.value === period)?.label}\n\nCette fonctionnalité sera disponible dans la version finale de KwêTché Pay.`)}
            >
              📊 Exporter Excel
            </button>
          </div>

          {/* PDF Report */}
          <div
            style={{
              border: '1px solid var(--line)',
              borderRadius: '12px',
              padding: '20px',
              background: '#fafcfb',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fff8f0', display: 'grid', placeItems: 'center', color: '#FD6D00' }}>
              <Icon name="shield" size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>PDF Rapport mensuel</div>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '4px 0 0' }}>
                Rapport de synthèse officiel avec KPIs et graphiques.
              </p>
            </div>
            <button
              className="button button-secondary"
              style={{ minHeight: '38px', fontSize: '13px', marginTop: 'auto', border: '1px solid #fbd38d', background: '#fffaf0', color: 'var(--orange-dark)' }}
              onClick={() => alert(`Génération du PDF Rapport mensuel — ${PERIODS.find(p => p.value === period)?.label}\n\nCette fonctionnalité sera disponible dans la version finale de KwêTché Pay.`)}
            >
              📄 Générer PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
