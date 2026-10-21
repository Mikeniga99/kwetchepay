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

const weeklyData = [
  { day: 'Lun', amount: '1 250 000 F', height: '55%' },
  { day: 'Mar', amount: '980 000 F', height: '42%' },
  { day: 'Mer', amount: '1 540 000 F', height: '68%' },
  { day: 'Jeu', amount: '1 120 000 F', height: '49%' },
  { day: 'Ven', amount: '1 890 000 F', height: '82%' },
  { day: 'Sam', amount: '2 350 000 F', height: '100%', isMax: true },
  { day: 'Dim', amount: '1 420 000 F', height: '62%' },
]

export default function DashboardOverviewPage() {
  const { isLive } = useDashboard()
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [activeBar, setActiveBar] = useState<string | null>('Sam')
  const [isLoading, setIsLoading] = useState(false)
  const [showPushModal, setShowPushModal] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1100)
  }

  return (
    <div>
      {/* Title & Mode Indicator */}
      <div className="dash-title-row">
        <div>
          <h1>Vue d’ensemble</h1>
          <p>
            {isLive ? 'Données réelles de production' : 'Environnement de simulation (Sandbox)'} — Activité de GoMarket Bénin
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
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
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--orange)' }}>
          <small>Volume Encaissé (Mois)</small>
          <strong>8 472 500 <em>F CFA</em></strong>
          <span className="kpi-trend trend-up">
            <Icon name="trend" size={14} /> +12,8% vs mois dernier
          </span>
        </div>

        <div className="kpi-card">
          <small>Transactions Réussies</small>
          <strong>1 284</strong>
          <span className="kpi-trend trend-up">
            <Icon name="check" size={14} /> 98,2% de taux de succès
          </span>
        </div>

        <div className="kpi-card">
          <small>Solde Prêt au Virement</small>
          <strong>2 144 000 <em>F CFA</em></strong>
          <span className="kpi-trend trend-neutral">
            Prochain reversement : Demain 09h
          </span>
        </div>

        <div className="kpi-card">
          <small>Panier Moyen Client</small>
          <strong>6 598 <em>F CFA</em></strong>
          <span className="kpi-trend trend-up">
            <Icon name="trend" size={14} /> +3,4% ce trimestre
          </span>
        </div>
      </div>
      )}

      {/* Charts & Channels Section */}
      <div className="dash-grid-2-1">
        {/* Weekly Chart */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <div>
              <h3>Volume d’encaissement journalier</h3>
              <small style={{ color: 'var(--muted)', fontSize: '11px' }}>7 derniers jours (F CFA)</small>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--orange)' }}>
              {activeBar ? `${weeklyData.find(d => d.day === activeBar)?.amount} (${activeBar})` : 'Survolez une barre'}
            </span>
          </div>

          <div className="chart-bars-wrap">
            {weeklyData.map((col) => (
              <div
                key={col.day}
                className="chart-col"
                onMouseEnter={() => setActiveBar(col.day)}
              >
                <div
                  className={`chart-bar ${col.day === activeBar ? 'current' : ''}`}
                  style={{ height: col.height }}
                  title={`${col.day}: ${col.amount}`}
                />
                <span className="chart-label">{col.day}</span>
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
