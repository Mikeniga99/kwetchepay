'use client'

import { Icon } from '@/components/Icon'
import { MobileMoneyPushModal } from '@/components/MobileMoneyPushModal'
import { OperatorLogo, getOperatorFromChannel } from '@/components/OperatorLogo'
import { ButtonSpinner } from '@/components/ui/ButtonSpinner'
import { SkeletonKpiCards, SkeletonTable } from '@/components/ui/Skeleton'
import { INITIAL_TRANSACTIONS, type Transaction } from '@/lib/dashboard-data'
import Link from 'next/link'
import { useState } from 'react'
import { useDashboard } from './dashboard-context'

// ─── Données par période ────────────────────────────────────────────────────

type Period = 'jour' | 'semaine' | 'mois'

const PERIOD_KPI: Record<Period, { volume: string; transactions: string; solde: string; panier: string; trendVolume: string; trendPanier: string }> = {
  jour: {
    volume: '312 500',
    transactions: '48',
    solde: '2 144 000',
    panier: '6 510',
    trendVolume: '+4,2% vs hier',
    trendPanier: '+1,1% cette semaine',
  },
  semaine: {
    volume: '2 180 000',
    transactions: '327',
    solde: '2 144 000',
    panier: '6 668',
    trendVolume: '+8,5% vs sem. dernière',
    trendPanier: '+2,7% ce mois',
  },
  mois: {
    volume: '8 472 500',
    transactions: '1 284',
    solde: '2 144 000',
    panier: '6 598',
    trendVolume: '+12,8% vs mois dernier',
    trendPanier: '+3,4% ce trimestre',
  },
}

const CHART_DATA: Record<Period, Array<{ label: string; amount: string; height: string; mtn: number; moov: number; celtiis: number }>> = {
  jour: [
    { label: '06h', amount: '28 000 F',   height: '18%', mtn: 60, moov: 28, celtiis: 12 },
    { label: '08h', amount: '75 000 F',   height: '35%', mtn: 55, moov: 30, celtiis: 15 },
    { label: '10h', amount: '112 000 F',  height: '58%', mtn: 65, moov: 22, celtiis: 13 },
    { label: '12h', amount: '145 000 F',  height: '72%', mtn: 58, moov: 27, celtiis: 15 },
    { label: '14h', amount: '98 000 F',   height: '48%', mtn: 62, moov: 25, celtiis: 13 },
    { label: '16h', amount: '162 000 F',  height: '82%', mtn: 70, moov: 20, celtiis: 10 },
    { label: '18h', amount: '188 000 F',  height: '100%', mtn: 64, moov: 23, celtiis: 13 },
    { label: '20h', amount: '132 000 F',  height: '65%', mtn: 61, moov: 26, celtiis: 13 },
  ],
  semaine: [
    { label: 'Lun', amount: '1 250 000 F', height: '55%', mtn: 60, moov: 28, celtiis: 12 },
    { label: 'Mar', amount: '980 000 F',   height: '42%', mtn: 58, moov: 30, celtiis: 12 },
    { label: 'Mer', amount: '1 540 000 F', height: '68%', mtn: 62, moov: 25, celtiis: 13 },
    { label: 'Jeu', amount: '1 120 000 F', height: '49%', mtn: 64, moov: 22, celtiis: 14 },
    { label: 'Ven', amount: '1 890 000 F', height: '82%', mtn: 65, moov: 23, celtiis: 12 },
    { label: 'Sam', amount: '2 350 000 F', height: '100%', mtn: 63, moov: 24, celtiis: 13 },
    { label: 'Dim', amount: '1 420 000 F', height: '62%', mtn: 60, moov: 27, celtiis: 13 },
  ],
  mois: [
    { label: 'S1',  amount: '7 100 000 F', height: '72%',  mtn: 62, moov: 26, celtiis: 12 },
    { label: 'S2',  amount: '6 850 000 F', height: '68%',  mtn: 60, moov: 28, celtiis: 12 },
    { label: 'S3',  amount: '9 800 000 F', height: '100%', mtn: 65, moov: 23, celtiis: 12 },
    { label: 'S4',  amount: '8 472 500 F', height: '86%',  mtn: 63, moov: 25, celtiis: 12 },
  ],
}

const PERIOD_CHART_SUBTITLE: Record<Period, string> = {
  jour: "Aujourd'hui par tranche horaire (F CFA)",
  semaine: '7 derniers jours (F CFA)',
  mois: '4 semaines du mois (F CFA)',
}

// ─── Composant principal ────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  const { isLive } = useDashboard()
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [activeBar, setActiveBar] = useState<string | null>('Sam')
  const [isLoading, setIsLoading] = useState(false)
  const [showPushModal, setShowPushModal] = useState(false)
  const [period, setPeriod] = useState<Period>('semaine')

  const kpi = PERIOD_KPI[period]
  const chartData = CHART_DATA[period]

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1100)
  }

  // Quand on change de période, reset la barre active sur la dernière colonne
  const handlePeriodChange = (p: Period) => {
    setPeriod(p)
    const data = CHART_DATA[p]
    setActiveBar(data[data.length - 1].label)
  }

  const activeChartCol = chartData.find((d) => d.label === activeBar)

  return (
    <div>
      {/* Title & Mode Indicator */}
      <div className="dash-title-row">
        <div>
          <h1>Vue d&apos;ensemble</h1>
          <p>
            {isLive ? 'Données réelles de production' : 'Environnement de simulation (Sandbox)'} — Activité de GoMarket Bénin
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Sélecteur de période */}
          <div
            style={{
              display: 'flex',
              background: '#f4f5f7',
              borderRadius: '8px',
              padding: '3px',
              gap: '2px',
            }}
          >
            {(['jour', 'semaine', 'mois'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => handlePeriodChange(p)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: period === p ? 700 : 500,
                  background: period === p ? '#fff' : 'transparent',
                  color: period === p ? '#FD6D00' : 'var(--muted)',
                  boxShadow: period === p ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                  transition: 'all 0.15s',
                  textTransform: 'capitalize',
                }}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="button button-secondary"
            style={{ minHeight: '38px', fontSize: '12px' }}
            title="Tester l'animation de chargement"
          >
            {isLoading ? <ButtonSpinner label="Actualisation..." /> : '⟳ Actualiser'}
          </button>
          <button
            onClick={() => setShowPushModal(true)}
            className="button button-secondary"
            style={{ minHeight: '38px', fontSize: '12px', border: '1px solid #fbd38d', background: '#fffaf0', color: 'var(--orange-dark)' }}
          >
            ⚡ Simuler Push USSD
          </button>
          <Link href="/dashboard/liens" className="button button-primary" style={{ minHeight: '38px', fontSize: '12px' }}>
            + Nouveau lien
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      {isLoading ? (
        <div style={{ marginBottom: '24px' }}>
          <SkeletonKpiCards />
        </div>
      ) : (
        <div className="kpi-grid">
          {/* Volume Encaissé — bordure orange */}
          <div className="kpi-card" style={{ borderLeft: '4px solid #FD6D00' }}>
            <small>Volume Encaissé ({period === 'jour' ? 'Jour' : period === 'semaine' ? 'Semaine' : 'Mois'})</small>
            <strong>{kpi.volume} <em>F CFA</em></strong>
            <span className="kpi-trend trend-up">
              <Icon name="trend" size={14} /> {kpi.trendVolume}
            </span>
          </div>

          {/* Transactions Réussies — bordure verte */}
          <div className="kpi-card" style={{ borderLeft: '4px solid var(--green)' }}>
            <small>Transactions Réussies</small>
            <strong>{kpi.transactions}</strong>
            <span className="kpi-trend trend-up">
              <Icon name="check" size={14} /> 98,2% de taux de succès
            </span>
          </div>

          {/* Solde Prêt au Virement — bordure bleue nuit + bouton reversement */}
          <div className="kpi-card" style={{ borderLeft: '4px solid #0E3864' }}>
            <small>Solde Prêt au Virement</small>
            <strong>{kpi.solde} <em>F CFA</em></strong>
            <span className="kpi-trend trend-neutral">
              Prochain reversement : Demain 09h
            </span>
            <Link
              href="/dashboard/reversements"
              className="button button-primary"
              style={{
                marginTop: '10px',
                display: 'inline-block',
                fontSize: '11px',
                minHeight: '28px',
                padding: '4px 12px',
                background: '#0E3864',
                borderColor: '#0E3864',
                lineHeight: '20px',
              }}
            >
              Reverser maintenant →
            </Link>
          </div>

          {/* Panier Moyen — bordure grise */}
          <div className="kpi-card" style={{ borderLeft: '4px solid #9ca3af' }}>
            <small>Panier Moyen Client</small>
            <strong>{kpi.panier} <em>F CFA</em></strong>
            <span className="kpi-trend trend-up">
              <Icon name="trend" size={14} /> {kpi.trendPanier}
            </span>
          </div>
        </div>
      )}

      {/* ── Widget Solde Disponible (fond bleu nuit, avant le graphique) ──── */}
      <div
        style={{
          background: '#0E3864',
          borderRadius: '14px',
          padding: '22px 28px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: '12px', fontWeight: 500, opacity: 0.7, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Solde disponible
          </p>
          <div style={{ fontSize: '32px', fontWeight: 800, margin: '4px 0 6px', letterSpacing: '-0.02em' }}>
            2 144 000{' '}
            <em style={{ fontSize: '16px', fontStyle: 'normal', fontWeight: 500, opacity: 0.75 }}>F CFA</em>
          </div>
          <p style={{ margin: 0, fontSize: '13px', opacity: 0.65 }}>
            🕘 Prochain reversement automatique :{' '}
            <strong style={{ color: '#FD6D00' }}>Demain 09h</strong>
          </p>
        </div>
        <Link
          href="/dashboard/reversements"
          style={{
            background: '#FD6D00',
            color: '#fff',
            borderRadius: '8px',
            padding: '10px 22px',
            fontWeight: 700,
            fontSize: '13px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(253,109,0,0.35)',
          }}
        >
          ⚡ Reverser maintenant
        </Link>
      </div>

      {/* Charts & Channels Section */}
      <div className="dash-grid-2-1">
        {/* Bar Chart */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <div>
              <h3>Volume d&apos;encaissement</h3>
              <small style={{ color: 'var(--muted)', fontSize: '11px' }}>{PERIOD_CHART_SUBTITLE[period]}</small>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#FD6D00' }}>
              {activeChartCol
                ? `${activeChartCol.amount} (${activeBar})`
                : 'Survolez une barre'}
            </span>
          </div>

          <div className="chart-bars-wrap">
            {chartData.map((col) => (
              <div
                key={col.label}
                className="chart-col"
                onMouseEnter={() => setActiveBar(col.label)}
              >
                <div
                  className={`chart-bar ${col.label === activeBar ? 'current' : ''}`}
                  style={{
                    height: col.height,
                    background: col.label === activeBar ? '#FD6D00' : undefined,
                    transition: 'background 0.2s',
                  }}
                  title={`${col.label}: ${col.amount}`}
                />
                {/* Tooltip décomposition MTN / Moov / Celtiis sur la barre active */}
                {col.label === activeBar && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '22px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                      padding: '6px 8px',
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                      fontSize: '10px',
                      lineHeight: '1.3',
                      minWidth: '80px',
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ color: '#c9a800', fontWeight: 700 }}>MTN</span>
                      <span style={{ fontWeight: 600 }}>{col.mtn}%</span>
                    </span>
                    <span style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ color: '#005baa', fontWeight: 700 }}>Moov</span>
                      <span style={{ fontWeight: 600 }}>{col.moov}%</span>
                    </span>
                    <span style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ color: '#0e2b5c', fontWeight: 700 }}>Celtiis</span>
                      <span style={{ fontWeight: 600 }}>{col.celtiis}%</span>
                    </span>
                  </div>
                )}
                <span className="chart-label">{col.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown by Operator */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <h3>Moyens de paiement</h3>
            <small style={{ color: 'var(--muted)', fontSize: '11px' }}>Répartition</small>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="channel-stat-item">
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="channel-badge">
                    <OperatorLogo operator="mtn" size={20} /> MTN MoMo
                  </span>
                  <b>62% <small style={{ color: 'var(--muted)', fontWeight: 500 }}>(5,25M)</small></b>
                </div>
                <div className="channel-progress">
                  <div className="channel-progress-fill" style={{ width: '62%', background: '#ffca05' }} />
                </div>
              </div>
            </div>

            <div className="channel-stat-item">
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="channel-badge">
                    <OperatorLogo operator="moov" size={20} /> Moov Money
                  </span>
                  <b>26% <small style={{ color: 'var(--muted)', fontWeight: 500 }}>(2,20M)</small></b>
                </div>
                <div className="channel-progress">
                  <div className="channel-progress-fill" style={{ width: '26%', background: '#005baa' }} />
                </div>
              </div>
            </div>

            <div className="channel-stat-item">
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="channel-badge">
                    <OperatorLogo operator="celtiis" size={20} /> Celtiis Cash
                  </span>
                  <b>12% <small style={{ color: 'var(--muted)', fontWeight: 500 }}>(1,01M)</small></b>
                </div>
                <div className="channel-progress">
                  <div className="channel-progress-fill" style={{ width: '12%', background: '#0e2b5c' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="dash-panel">
        <div className="dash-panel-header">
          <div>
            <h3>Transactions récentes</h3>
            <small style={{ color: 'var(--muted)', fontSize: '11px' }}>Flux en temps réel de votre compte</small>
          </div>
          <Link
            href="/dashboard/transactions"
            style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            Voir tout le registre <Icon name="arrow" size={14} />
          </Link>
        </div>

        {isLoading ? (
          <SkeletonTable rows={5} cols={8} />
        ) : (
          <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>RÉFÉRENCE</th>
                <th>CLIENT</th>
                <th>OPÉRATEUR</th>
                <th>MONTANT BRUT</th>
                <th>NET REÇU</th>
                <th>STATUT</th>
                <th>DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {INITIAL_TRANSACTIONS.slice(0, 5).map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <b style={{ fontFamily: 'var(--font-dm-mono), monospace', fontSize: '12px' }}>
                      {tx.ref}
                    </b>
                  </td>
                  <td>
                    <div>
                      <div style={{ fontWeight: 600 }}>{tx.customerName}</div>
                      <small style={{ color: 'var(--muted)', fontSize: '11px' }}>{tx.customerPhone}</small>
                    </div>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                      <OperatorLogo operator={getOperatorFromChannel(tx.channel)} size={22} />
                      <span style={{ fontWeight: 500 }}>{tx.channel}</span>
                    </span>
                  </td>
                  <td>
                    <b>{tx.amount.toLocaleString('fr-FR')} F CFA</b>
                  </td>
                  <td>
                    <span style={{ color: 'var(--green)', fontWeight: 600 }}>
                      {tx.netAmount.toLocaleString('fr-FR')} F
                    </span>
                  </td>
                  <td>
                    <span className={`status ${tx.status === 'success' ? 'success' : tx.status === 'pending' ? 'pending' : ''}`} style={tx.status === 'failed' ? { background: '#fde8e8', color: '#c81e1e' } : {}}>
                      <i style={tx.status === 'failed' ? { background: '#c81e1e' } : {}} />
                      {tx.status === 'success' ? 'Payé' : tx.status === 'pending' ? 'En attente' : 'Échoué'}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--muted)', fontSize: '12px' }}>
                      {tx.date} à {tx.time}
                    </span>
                  </td>
                  <td>
                    <button
                      className="button button-secondary"
                      style={{ minHeight: '30px', padding: '0 10px', fontSize: '11px' }}
                      onClick={() => setSelectedTx(tx)}
                    >
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {/* Modal: Transaction Details */}
      {selectedTx && (
        <div className="dash-modal-backdrop" onClick={() => setSelectedTx(null)}>
          <div className="dash-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '14px', marginBottom: '18px' }}>
              <div>
                <span className="pill-badge" style={{ marginBottom: '4px' }}>Reçu de Paiement</span>
                <h3 style={{ margin: 0, fontSize: '18px' }}>Transaction {selectedTx.ref}</h3>
              </div>
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                onClick={() => setSelectedTx(null)}
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <div style={{ textAlign: 'center', padding: '10px 0 20px', borderBottom: '1px solid var(--line)' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--ink)' }}>
                {selectedTx.amount.toLocaleString('fr-FR')} <em style={{ fontSize: '16px', fontStyle: 'normal', color: 'var(--muted)' }}>F CFA</em>
              </div>
              <span className={`status ${selectedTx.status === 'success' ? 'success' : selectedTx.status === 'pending' ? 'pending' : ''}`} style={{ marginTop: '8px' }}>
                <i />
                {selectedTx.status === 'success' ? 'Paiement confirmé' : selectedTx.status === 'pending' ? 'Validation USSD en cours' : 'Transaction annulée'}
              </span>
            </div>

            <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>ID KwêTché Pay</span>
                <code style={{ fontFamily: 'var(--font-dm-mono)' }}>{selectedTx.id}</code>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Client</span>
                <b>{selectedTx.customerName}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Téléphone débiteur</span>
                <span>{selectedTx.customerPhone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--muted)' }}>Moyen de paiement</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontWeight: 600 }}>
                  <OperatorLogo operator={getOperatorFromChannel(selectedTx.channel)} size={20} />
                  <span>{selectedTx.channel}</span>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Frais KwêTché Pay (2%)</span>
                <span>- {selectedTx.fee.toLocaleString('fr-FR')} F CFA</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--line)', paddingTop: '10px' }}>
                <span style={{ fontWeight: 700 }}>Montant net crédité</span>
                <b style={{ color: 'var(--green)', fontSize: '15px' }}>{selectedTx.netAmount.toLocaleString('fr-FR')} F CFA</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Motif / Commande</span>
                <span>{selectedTx.description}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Date & Heure</span>
                <span>{selectedTx.date} à {selectedTx.time}</span>
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
              <button
                className="button button-secondary"
                style={{ flex: 1, minHeight: '40px', fontSize: '12px' }}
                onClick={() => alert(`Reçu ${selectedTx.ref} téléchargé (simulation front-end)`)}
              >
                Télécharger le reçu
              </button>
              <button
                className="button button-light"
                style={{ minHeight: '40px', fontSize: '12px' }}
                onClick={() => setSelectedTx(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulator Modal for USSD Push & Radar loading state */}
      <MobileMoneyPushModal
        isOpen={showPushModal}
        onClose={() => setShowPushModal(false)}
      />
    </div>
  )
}
