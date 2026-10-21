'use client'

import { Icon } from '@/components/Icon'
import { OperatorLogo, getOperatorFromChannel } from '@/components/OperatorLogo'
import { useState } from 'react'

interface PayoutHistory {
  id: string
  ref: string
  amount: number
  destination: string
  accountNumber: string
  fee: number
  netAmount: number
  status: 'completed' | 'processing' | 'failed'
  date: string
}

const PAYOUT_FREQUENCIES = [
  { id: 'daily', label: 'Quotidien', desc: 'Chaque matin à 09:00', icon: '⚡' },
  { id: 'weekly', label: 'Hebdo', desc: 'Tous les lundis matin', icon: '📅' },
  { id: 'monthly', label: 'Mensuel', desc: 'Le 1er de chaque mois', icon: '🗓️' },
]

const INITIAL_PAYOUTS: PayoutHistory[] = [
  {
    id: 'po_9872',
    ref: '#REV-2026-104',
    amount: 1250000,
    destination: 'Moov Money Marchand',
    accountNumber: '+229 01 95 00 22 33',
    fee: 12500,
    netAmount: 1237500,
    status: 'completed',
    date: '19 Oct 2026 à 14:20',
  },
  {
    id: 'po_9871',
    ref: '#REV-2026-103',
    amount: 3500000,
    destination: 'Virement Bancaire (BOA Bénin)',
    accountNumber: 'BJ061 01001 002345678901 22',
    fee: 500,
    netAmount: 3499500,
    status: 'completed',
    date: '17 Oct 2026 à 09:30',
  },
  {
    id: 'po_9870',
    ref: '#REV-2026-102',
    amount: 1850000,
    destination: 'MTN Mobile Money Marchand',
    accountNumber: '+229 01 97 00 11 22',
    fee: 18500,
    netAmount: 1831500,
    status: 'failed',
    date: '10 Oct 2026 à 10:15',
  },
]

export default function DashboardReversementsPage() {
  const [balance, setBalance] = useState(2144000)
  const [payouts, setPayouts] = useState<PayoutHistory[]>(INITIAL_PAYOUTS)
  const [showModal, setShowModal] = useState(false)
  const [payoutAmount, setPayoutAmount] = useState('')
  const [destination, setDestination] = useState('bank')
  const [frequency, setFrequency] = useState('daily')
  const [requestSuccess, setRequestSuccess] = useState(false)

  const calculateFees = (amt: number, dest: string) => {
    if (dest === 'bank') return 500
    return Math.round(amt * 0.01) // 1% for Mobile Money
  }

  const currentFee = payoutAmount ? calculateFees(parseInt(payoutAmount, 10), destination) : 0
  const netToReceive = payoutAmount ? parseInt(payoutAmount, 10) - currentFee : 0

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseInt(payoutAmount, 10)
    if (!amt || amt > balance) return

    const destinationMap: Record<string, { label: string; acc: string }> = {
      bank: { label: 'Virement Bancaire (BOA Bénin)', acc: 'BJ061 01001 002345678901 22' },
      mtn: { label: 'MTN Mobile Money Marchand', acc: '+229 01 97 00 11 22' },
      moov: { label: 'Moov Money Marchand', acc: '+229 01 95 00 22 33' },
      celtiis: { label: 'Celtiis Cash Marchand', acc: '+229 01 40 00 33 44' },
    }
    const chosen = destinationMap[destination] || destinationMap.bank
    const fees = calculateFees(amt, destination)

    const newPayout: PayoutHistory = {
      id: `po_${Date.now()}`,
      ref: `#REV-2026-${Math.floor(104 + Math.random() * 90)}`,
      amount: amt,
      destination: chosen.label,
      accountNumber: chosen.acc,
      fee: fees,
      netAmount: amt - fees,
      status: 'processing',
      date: 'À l’instant',
    }

    setBalance(balance - amt)
    setPayouts([newPayout, ...payouts])
    setRequestSuccess(true)
    setTimeout(() => {
      setRequestSuccess(false)
      setShowModal(false)
      setPayoutAmount('')
    }, 1800)
  }

  return (
    <div>
      <div className="dash-title-row">
        <div>
          <h1>Reversements & Trésorerie</h1>
          <p>Consultez vos fonds disponibles et suivez les versements automatiques sur votre compte bancaire.</p>
        </div>
        <button
          className="button button-primary"
          style={{ minHeight: '38px', fontSize: '12px' }}
          onClick={() => setShowModal(true)}
        >
          ⚡ Demander un virement express
        </button>
      </div>

      {/* Balance Summary Cards */}
      <div className="kpi-grid">
        <div className="kpi-card" style={{ borderLeft: '4px solid var(--green)' }}>
          <small>Solde Disponible</small>
          <strong>{balance.toLocaleString('fr-FR')} <em>F CFA</em></strong>
          <span className="kpi-trend trend-up">
            <Icon name="check" size={14} /> Prêt au transfert
          </span>
        </div>

        <div className="kpi-card">
          <small>En cours de compensation</small>
          <strong>348 200 <em>F CFA</em></strong>
          <span className="kpi-trend trend-neutral">
            Transactions des 2 dernières heures
          </span>
        </div>

        <div className="kpi-card">
          <small>Total reversé à ce jour</small>
          <strong>7 450 000 <em>F CFA</em></strong>
          <span className="kpi-trend trend-up">
            3 versements effectués
          </span>
        </div>

        <div className="kpi-card" style={{ borderLeft: '4px solid var(--orange)' }}>
          <small>Planification de virement</small>
          <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
            {PAYOUT_FREQUENCIES.map(f => (
              <button
                key={f.id}
                onClick={() => setFrequency(f.id)}
                style={{
                  flex: 1,
                  padding: '6px 4px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid var(--line)',
                  background: frequency === f.id ? 'var(--blue)' : 'white',
                  color: frequency === f.id ? 'white' : 'var(--text)',
                  transition: 'all 0.2s'
                }}
              >
                {f.icon} {f.label}
              </button>
            ))}
          </div>
          <span className="kpi-trend trend-neutral" style={{ marginTop: '10px' }}>
            {PAYOUT_FREQUENCIES.find(f => f.id === frequency)?.desc}
          </span>
        </div>
      </div>

      {/* History Table */}
      <div className="dash-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line)' }}>
          <h3 style={{ margin: 0, fontSize: '16px' }}>Historique des reversements</h3>
        </div>

        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>RÉFÉRENCE</th>
                <th>DESTINATION</th>
                <th>COMPTE CIBLE</th>
                <th>MONTANT BRUT</th>
                <th>FRAIS BANCAIRES</th>
                <th>NET REÇU</th>
                <th>STATUT</th>
                <th>DATE D’EXÉCUTION</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <b style={{ fontFamily: 'var(--font-dm-mono)' }}>{p.ref}</b>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                      {p.destination.toLowerCase().includes('bancaire') ? (
                        <span style={{ width: '22px', height: '18px', background: '#eef1ef', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0 }}>🏦</span>
                      ) : (
                        <OperatorLogo operator={getOperatorFromChannel(p.destination)} size={20} />
                      )}
                      <span>{p.destination}</span>
                    </span>
                  </td>
                  <td>
                    <code style={{ fontSize: '11px', fontFamily: 'var(--font-dm-mono)', color: 'var(--muted)' }}>
                      {p.accountNumber}
                    </code>
                  </td>
                  <td>
                    <b>{p.amount.toLocaleString('fr-FR')} F CFA</b>
                  </td>
                  <td style={{ color: 'var(--muted)' }}>-{p.fee.toLocaleString('fr-FR')} F</td>
                  <td>
                    <span style={{ color: 'var(--green)', fontWeight: 700 }}>
                      {p.netAmount.toLocaleString('fr-FR')} F CFA
                    </span>
                  </td>
                  <td>
                    {p.status === 'completed' && (
                      <span className="status success">
                        <Icon name="check" size={12} /> Viré
                      </span>
                    )}
                    {p.status === 'processing' && (
                      <span className="status pending" style={{ animation: 'pulse 2s infinite' }}>
                        <Icon name="clock" size={12} /> Traitement
                      </span>
                    )}
                    {p.status === 'failed' && (
                      <span className="status error" style={{ background: '#fee2e2', color: '#dc2626' }}>
                        <Icon name="x" size={12} /> Échoué
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{p.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Demande de Virement */}
      {showModal && (
        <div className="dash-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="dash-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h2 style={{ fontSize: '20px', margin: 0, fontWeight: 800 }}>Demander un reversement</h2>
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                onClick={() => setShowModal(false)}
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            {requestSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--green-soft)', color: 'var(--green)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
                  <Icon name="check" size={24} />
                </div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Virement initié avec succès !</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
                  Les fonds ont été débités de votre solde et sont en cours de transfert vers votre compte.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestPayout}>
                <div style={{ background: '#f8faf9', padding: '14px', borderRadius: '8px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Solde disponible :</span>
                  <b style={{ color: 'var(--green)' }}>{balance.toLocaleString('fr-FR')} F CFA</b>
                </div>

                <div className="form-group">
                  <label htmlFor="payout-amount">Montant à reverser (F CFA) *</label>
                  <input
                    className="form-control"
                    id="payout-amount"
                    type="number"
                    min="1000"
                    max={balance}
                    required
                    placeholder="Ex: 1000000"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="payout-dest">Compte récepteur</label>
                  <select
                    className="form-control"
                    id="payout-dest"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    <option value="bank">🏦 Compte Bancaire : BOA Bénin (BJ061...22)</option>
                    <option value="mtn">🟡 MTN MoMo Marchand (+229 01 97 00 11 22)</option>
                    <option value="moov">🔵 Moov Money Marchand (+229 01 95 00 22 33)</option>
                    <option value="celtiis">🟣 Celtiis Cash Marchand (+229 01 40 00 33 44)</option>
                  </select>
                </div>

                {/* Simulateur de frais */}
                {payoutAmount && parseInt(payoutAmount) > 0 && (
                  <div style={{
                    background: 'var(--blue-soft)',
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(14, 56, 100, 0.1)',
                    marginTop: '20px',
                    fontSize: '13px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--blue)' }}>
                      <span>Montant brut</span>
                      <span style={{ fontFamily: 'var(--font-dm-mono)' }}>{parseInt(payoutAmount).toLocaleString('fr-FR')} F</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px dashed rgba(14, 56, 100, 0.2)', color: '#dc2626' }}>
                      <span>Frais de service ({destination === 'bank' ? 'Fixes' : '1.0%'})</span>
                      <span style={{ fontFamily: 'var(--font-dm-mono)' }}>-{currentFee.toLocaleString('fr-FR')} F</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '15px', color: 'var(--blue)' }}>
                      <span>Net à recevoir</span>
                      <span style={{ fontFamily: 'var(--font-dm-mono)' }}>{netToReceive.toLocaleString('fr-FR')} F CFA</span>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                  <button
                    type="button"
                    className="button button-secondary"
                    style={{ flex: 1, minHeight: '44px' }}
                    onClick={() => setShowModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="button button-primary"
                    style={{ flex: 1, minHeight: '44px' }}
                    disabled={!payoutAmount || parseInt(payoutAmount, 10) > balance}
                  >
                    Confirmer le virement
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
