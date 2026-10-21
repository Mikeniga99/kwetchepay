'use client'

import { Icon } from '@/components/Icon'
import { MobileMoneyPushModal } from '@/components/MobileMoneyPushModal'
import { OperatorLogo, getOperatorFromChannel } from '@/components/OperatorLogo'
import { ButtonSpinner } from '@/components/ui/ButtonSpinner'
import { SkeletonTable } from '@/components/ui/Skeleton'
import { INITIAL_TRANSACTIONS, type PaymentChannel, type Transaction, type TransactionStatus } from '@/lib/dashboard-data'
import { useMemo, useState } from 'react'

export default function DashboardTransactionsPage() {
  const [transactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [channelFilter, setChannelFilter] = useState<string>('all')
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPushModal, setShowPushModal] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 900)
  }

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        tx.customerName.toLowerCase().includes(search.toLowerCase()) ||
        tx.ref.toLowerCase().includes(search.toLowerCase()) ||
        tx.customerPhone.includes(search) ||
        tx.description.toLowerCase().includes(search.toLowerCase())

      const matchStatus =
        statusFilter === 'all' || tx.status === (statusFilter as TransactionStatus)

      const matchChannel =
        channelFilter === 'all' || tx.channel === (channelFilter as PaymentChannel)

      return matchSearch && matchStatus && matchChannel
    })
  }, [transactions, search, statusFilter, channelFilter])

  const handleExportCSV = () => {
    const headers = ['Reference,Client,Telephone,Operateur,Montant_Brut,Frais,Montant_Net,Statut,Date,Heure\n']
    const rows = filteredTransactions.map((tx) =>
      `"${tx.ref}","${tx.customerName}","${tx.customerPhone}","${tx.channel}",${tx.amount},${tx.fee},${tx.netAmount},"${tx.status}","${tx.date}","${tx.time}"\n`
    )
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `kwetchepay-transactions-${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <div className="dash-title-row">
        <div>
          <h1>Registre des Transactions</h1>
          <p>Historique détaillé de tous vos encaissements et tentatives de paiement.</p>
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
          <button
            className="button button-secondary"
            style={{ minHeight: '38px', fontSize: '12px' }}
            onClick={handleExportCSV}
          >
            📥 Exporter ({filteredTransactions.length})
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="dash-panel" style={{ padding: '16px 20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 240px' }}>
            <input
              className="form-control"
              style={{ height: '40px', fontSize: '13px' }}
              placeholder="Rechercher par client, référence #KP..., tél (+229 01...)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <select
              className="form-control"
              style={{ height: '40px', width: 'auto', minWidth: '140px', fontSize: '13px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="success">Payé (Succès)</option>
              <option value="pending">En attente USSD</option>
              <option value="failed">Échoué / Annulé</option>
            </select>

            <select
              className="form-control"
              style={{ height: '40px', width: 'auto', minWidth: '150px', fontSize: '13px' }}
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
            >
              <option value="all">Tous les opérateurs</option>
              <option value="MTN MoMo">MTN MoMo</option>
              <option value="Moov Money">Moov Money</option>
              <option value="Celtiis Cash">Celtiis Cash</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="dash-panel" style={{ padding: 0, overflow: 'hidden' }}>
        {isLoading ? (
          <SkeletonTable rows={7} cols={9} />
        ) : (
          <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>RÉFÉRENCE</th>
                <th>CLIENT</th>
                <th>OPÉRATEUR</th>
                <th>MONTANT BRUT</th>
                <th>COMMISSION</th>
                <th>NET MARCHAND</th>
                <th>STATUT</th>
                <th>DATE & HEURE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
                    Aucune transaction ne correspond à vos critères de recherche.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
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
                      <b>{tx.amount.toLocaleString('fr-FR')} F</b>
                    </td>
                    <td style={{ color: 'var(--muted)', fontSize: '12px' }}>
                      -{tx.fee.toLocaleString('fr-FR')} F
                    </td>
                    <td>
                      <span style={{ color: 'var(--green)', fontWeight: 700 }}>
                        {tx.netAmount.toLocaleString('fr-FR')} F CFA
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
                        Reçu
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
                <span className="pill-badge" style={{ marginBottom: '4px' }}>Détail de Paiement</span>
                <h3 style={{ margin: 0, fontSize: '18px' }}>{selectedTx.ref}</h3>
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
                {selectedTx.status === 'success' ? 'Confirmé par l’opérateur' : selectedTx.status === 'pending' ? 'En attente de saisie du code secret' : 'Transaction annulée'}
              </span>
            </div>

            <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>ID Transaction</span>
                <code style={{ fontFamily: 'var(--font-dm-mono)' }}>{selectedTx.id}</code>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Nom du client</span>
                <b>{selectedTx.customerName}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Numéro débiteur</span>
                <span>{selectedTx.customerPhone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--muted)' }}>Opérateur télécom</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontWeight: 600 }}>
                  <OperatorLogo operator={getOperatorFromChannel(selectedTx.channel)} size={20} />
                  <span>{selectedTx.channel}</span>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Frais KwêTché Pay</span>
                <span>- {selectedTx.fee.toLocaleString('fr-FR')} F CFA</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--line)', paddingTop: '10px' }}>
                <span style={{ fontWeight: 700 }}>Montant Net Crédité</span>
                <b style={{ color: 'var(--green)', fontSize: '15px' }}>{selectedTx.netAmount.toLocaleString('fr-FR')} F CFA</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Description</span>
                <span>{selectedTx.description}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)' }}>Horodatage</span>
                <span>{selectedTx.date} à {selectedTx.time}</span>
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
              <button
                className="button button-primary"
                style={{ flex: 1, minHeight: '40px', fontSize: '12px' }}
                onClick={() => alert(`Téléchargement du reçu ${selectedTx.ref} (Simulation front-end)`)}
              >
                Imprimer le reçu
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
