'use client'

import { Icon } from '@/components/Icon'
import { OperatorLogo, getOperatorFromChannel } from '@/components/OperatorLogo'
import { useState } from 'react'

type Operator = 'MTN MoMo' | 'Moov Money' | 'Celtiis Cash'

interface ClientTransaction {
  ref: string
  amount: number
  date: string
  status: 'success' | 'pending' | 'failed'
}

interface Client {
  id: string
  initials: string
  name: string
  phone: string
  email: string
  transactions: number
  totalPaid: number
  operator: Operator
  lastPayment: string
  history: ClientTransaction[]
}

const CLIENTS: Client[] = [
  {
    id: 'c1',
    initials: 'AK',
    name: 'Afi Koudjo',
    phone: '+229 01 97 12 34 56',
    email: 'afi.koudjo@gmail.com',
    transactions: 12,
    totalPaid: 485000,
    operator: 'MTN MoMo',
    lastPayment: '18 oct. 2026',
    history: [
      { ref: '#KP-20261018-001', amount: 50000, date: '18 oct. 2026', status: 'success' },
      { ref: '#KP-20261005-009', amount: 35000, date: '05 oct. 2026', status: 'success' },
      { ref: '#KP-20260921-004', amount: 40000, date: '21 sep. 2026', status: 'failed' },
    ],
  },
  {
    id: 'c2',
    initials: 'SE',
    name: 'Serge Ehouzou',
    phone: '+229 01 94 56 78 90',
    email: 's.ehouzou@yahoo.fr',
    transactions: 8,
    totalPaid: 256000,
    operator: 'Moov Money',
    lastPayment: '15 oct. 2026',
    history: [
      { ref: '#KP-20261015-003', amount: 30000, date: '15 oct. 2026', status: 'success' },
      { ref: '#KP-20261002-011', amount: 45000, date: '02 oct. 2026', status: 'success' },
      { ref: '#KP-20260910-007', amount: 25000, date: '10 sep. 2026', status: 'success' },
    ],
  },
  {
    id: 'c3',
    initials: 'DM',
    name: 'Diane Mensah',
    phone: '+229 01 96 23 45 67',
    email: 'diane.mensah@outlook.com',
    transactions: 15,
    totalPaid: 1112000,
    operator: 'Celtiis Cash',
    lastPayment: '20 oct. 2026',
    history: [
      { ref: '#KP-20261020-002', amount: 120000, date: '20 oct. 2026', status: 'success' },
      { ref: '#KP-20261011-015', amount: 95000, date: '11 oct. 2026', status: 'success' },
      { ref: '#KP-20261001-008', amount: 80000, date: '01 oct. 2026', status: 'pending' },
    ],
  },
  {
    id: 'c4',
    initials: 'BA',
    name: 'Benoît Agbodjan',
    phone: '+229 01 91 78 90 12',
    email: 'benoit.agbodjan@gmail.com',
    transactions: 3,
    totalPaid: 45000,
    operator: 'MTN MoMo',
    lastPayment: '08 oct. 2026',
    history: [
      { ref: '#KP-20261008-006', amount: 20000, date: '08 oct. 2026', status: 'success' },
      { ref: '#KP-20260925-003', amount: 15000, date: '25 sep. 2026', status: 'success' },
      { ref: '#KP-20260901-001', amount: 10000, date: '01 sep. 2026', status: 'success' },
    ],
  },
  {
    id: 'c5',
    initials: 'CH',
    name: 'Chantal Hounhouedo',
    phone: '+229 01 95 34 56 78',
    email: 'chantal.hounhouedo@gmail.com',
    transactions: 22,
    totalPaid: 2750000,
    operator: 'Moov Money',
    lastPayment: '21 oct. 2026',
    history: [
      { ref: '#KP-20261021-001', amount: 250000, date: '21 oct. 2026', status: 'success' },
      { ref: '#KP-20261014-010', amount: 175000, date: '14 oct. 2026', status: 'success' },
      { ref: '#KP-20261003-005', amount: 200000, date: '03 oct. 2026', status: 'success' },
    ],
  },
  {
    id: 'c6',
    initials: 'KM',
    name: 'Kokou Mensah',
    phone: '+229 01 93 67 89 01',
    email: 'kokou.mensah@hotmail.com',
    transactions: 5,
    totalPaid: 125000,
    operator: 'MTN MoMo',
    lastPayment: '12 oct. 2026',
    history: [
      { ref: '#KP-20261012-004', amount: 30000, date: '12 oct. 2026', status: 'success' },
      { ref: '#KP-20260928-002', amount: 25000, date: '28 sep. 2026', status: 'failed' },
      { ref: '#KP-20260915-009', amount: 40000, date: '15 sep. 2026', status: 'success' },
    ],
  },
  {
    id: 'c7',
    initials: 'FD',
    name: 'Fatou Diallo',
    phone: '+229 01 90 45 67 89',
    email: 'fatou.diallo@gmail.com',
    transactions: 9,
    totalPaid: 450000,
    operator: 'Celtiis Cash',
    lastPayment: '17 oct. 2026',
    history: [
      { ref: '#KP-20261017-007', amount: 60000, date: '17 oct. 2026', status: 'success' },
      { ref: '#KP-20261006-013', amount: 55000, date: '06 oct. 2026', status: 'success' },
      { ref: '#KP-20260918-002', amount: 45000, date: '18 sep. 2026', status: 'pending' },
    ],
  },
  {
    id: 'c8',
    initials: 'RD',
    name: 'Rodrigue Dossou',
    phone: '+229 01 98 90 12 34',
    email: 'rodrigue.dossou@gmail.com',
    transactions: 18,
    totalPaid: 890000,
    operator: 'MTN MoMo',
    lastPayment: '19 oct. 2026',
    history: [
      { ref: '#KP-20261019-005', amount: 75000, date: '19 oct. 2026', status: 'success' },
      { ref: '#KP-20261009-018', amount: 90000, date: '09 oct. 2026', status: 'success' },
      { ref: '#KP-20260927-011', amount: 60000, date: '27 sep. 2026', status: 'success' },
    ],
  },
]

const AVATAR_COLORS = [
  { bg: '#FD6D00', color: '#fff' },
  { bg: '#0E3864', color: '#fff' },
]

export default function ClientsPage() {
  const [search, setSearch] = useState('')
  const [clients, setClients] = useState(CLIENTS)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [showNewContact, setShowNewContact] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [feedback, setFeedback] = useState('')

  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleExport = () => {
    const columns = ['Nom', 'Téléphone', 'Email', 'Opérateur', 'Transactions', 'Total payé', 'Dernier paiement']
    const rows = filtered.map((client) => [
      client.name,
      client.phone,
      client.email,
      client.operator,
      String(client.transactions),
      String(client.totalPaid),
      client.lastPayment,
    ])
    const csv = [columns, ...rows]
      .map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(';'))
      .join('\r\n')
    const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'kwetchepay-clients.csv'
    anchor.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setFeedback(`${filtered.length} contact${filtered.length > 1 ? 's' : ''} exporté${filtered.length > 1 ? 's' : ''}.`)
  }

  const handleCreateContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = contactName.trim()
    if (!name) return
    const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '').join('')
    const newContact: Client = {
      id: `local-${Date.now()}`,
      initials,
      name,
      phone: contactPhone.trim(),
      email: contactEmail.trim(),
      transactions: 0,
      totalPaid: 0,
      operator: 'MTN MoMo',
      lastPayment: 'Aucun paiement',
      history: [],
    }
    setClients((current) => [newContact, ...current])
    setShowNewContact(false)
    setContactName('')
    setContactPhone('')
    setContactEmail('')
    setFeedback('Contact ajouté à cette démonstration. Les données ne sont pas synchronisées.')
  }

  const handlePaymentRequest = (client: Client, e: React.MouseEvent) => {
    e.stopPropagation()
    const msg = encodeURIComponent(
      `Bonjour ${client.name.split(' ')[0]} 👋, GoMarket Bénin vous envoie une demande de paiement via KwêTché Pay. Cliquez ici pour payer en toute sécurité : https://pay.kwetchepay.bj/l/gomarket-${Math.floor(1000 + Math.random() * 9000)}`
    )
    window.open(`https://wa.me/${client.phone.replace(/\s+/g, '').replace('+', '')}?text=${msg}`, '_blank')
  }

  const handleSMSRequest = (client: Client, e: React.MouseEvent) => {
    e.stopPropagation()
    const msg = `Bonjour ${client.name.split(' ')[0]}, reglez votre facture GoMarket ici: https://pay.kwetchepay.bj/l/sms-${Math.floor(1000 + Math.random() * 9000)}`
    window.open(`sms:${client.phone.replace(/\s+/g, '')}?body=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div>
      {/* Page Header */}
      <div className="dash-title-row">
        <div>
          <h1>Clients &amp; Contacts</h1>
          <p>Gérez vos clients fidèles et envoyez des demandes de paiement en un clic.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
           <button type="button" className="button button-secondary" style={{ minHeight: '38px', fontSize: '13px' }} onClick={handleExport}>
            <Icon name="trend" size={14} /> Exporter (.csv)
          </button>
          <button type="button" className="button button-primary" style={{ minHeight: '38px', fontSize: '13px' }} onClick={() => setShowNewContact(true)}>
            + Nouveau contact
          </button>
        </div>
      </div>

      {feedback && <p role="status" style={{ margin: '-8px 0 14px', color: 'var(--green)', fontSize: '12px' }}>{feedback}</p>}

      {/* Search */}
      <div className="dash-panel" style={{ padding: '16px 20px', marginBottom: '20px' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }}>
            <Icon name="users" size={16} />
          </span>
          <input
            className="form-control"
            style={{ height: '42px', paddingLeft: '38px', fontSize: '13px' }}
            placeholder="Rechercher un client par nom, téléphone ou email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Clients Table */}
      <div className="dash-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>CLIENT</th>
                <th>OPÉRATEUR</th>
                <th>TRANSACTIONS</th>
                <th>TOTAL PAYÉ</th>
                <th>DERNIER PAIEMENT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
                    <p style={{ margin: '0 0 10px' }}>Aucun client ne correspond à votre recherche.</p>
                    {search && <button type="button" className="button button-secondary" onClick={() => setSearch('')}>Effacer la recherche</button>}
                  </td>
                </tr>
              ) : (
                filtered.map((client, i) => {
                  const colors = AVATAR_COLORS[i % 2]
                  return (
                    <tr
                      key={client.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedClient(client)}
                    >
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span
                            style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              background: colors.bg,
                              color: colors.color,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: '13px',
                              flexShrink: 0,
                              letterSpacing: '-0.5px',
                            }}
                          >
                            {client.initials}
                          </span>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '14px' }}>{client.name}</div>
                            <small style={{ color: 'var(--muted)', fontSize: '11px', display: 'block' }}>{client.phone}</small>
                            <small style={{ color: 'var(--muted)', fontSize: '11px' }}>{client.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '12px' }}>
                          <OperatorLogo operator={getOperatorFromChannel(client.operator)} size={22} />
                          <span style={{ fontWeight: 500 }}>{client.operator}</span>
                        </span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, fontSize: '15px' }}>{client.transactions}</span>
                        <small style={{ color: 'var(--muted)', fontSize: '11px', display: 'block' }}>paiements</small>
                      </td>
                      <td>
                        <b style={{ color: 'var(--green)', fontSize: '14px' }}>
                          {client.totalPaid.toLocaleString('fr-FR')} F CFA
                        </b>
                      </td>
                      <td>
                        <span style={{ color: 'var(--muted)', fontSize: '12px' }}>
                          <Icon name="clock" size={12} />
                          {' '}{client.lastPayment}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            className="button button-secondary"
                            style={{
                              minHeight: '32px',
                              padding: '0 10px',
                              fontSize: '11px',
                              border: '1px solid #d4f0e0',
                              background: '#f0fdf4',
                              color: '#166534',
                              whiteSpace: 'nowrap',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            onClick={(e) => handlePaymentRequest(client, e)}
                            title={`WhatsApp à ${client.name}`}
                          >
                            <span style={{ fontSize: '14px' }}>💬</span> WhatsApp
                          </button>
                          <button
                            className="button button-light"
                            style={{
                              minHeight: '32px',
                              padding: '0 10px',
                              fontSize: '11px',
                              whiteSpace: 'nowrap',
                            }}
                            onClick={(e) => handleSMSRequest(client, e)}
                            title={`SMS à ${client.name}`}
                          >
                            <Icon name="phone" size={12} /> SMS
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel / Modal */}
      {selectedClient && (
        <div className="dash-modal-backdrop" onClick={() => setSelectedClient(null)}>
          <div className="dash-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--line)', paddingBottom: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: AVATAR_COLORS[Math.max(0, clients.findIndex((client) => client.id === selectedClient.id)) % 2].bg,
                    color: '#fff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '16px',
                    flexShrink: 0,
                  }}
                >
                  {selectedClient.initials}
                </span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>{selectedClient.name}</h3>
                  <small style={{ color: 'var(--muted)', fontSize: '12px' }}>{selectedClient.phone} · {selectedClient.email}</small>
                </div>
              </div>
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '4px' }}
                onClick={() => setSelectedClient(null)}
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {[
                { label: 'Transactions', value: selectedClient.transactions },
                { label: 'Total payé', value: `${selectedClient.totalPaid.toLocaleString('fr-FR')} F` },
                { label: 'Opérateur habituel', value: selectedClient.operator.split(' ')[0] },
              ].map((stat) => (
                <div key={stat.label} style={{ background: '#f8faf9', borderRadius: '10px', padding: '12px 10px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--ink)' }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '3px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Transaction History */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                3 dernières transactions
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedClient.history.length === 0 ? (
                  <p style={{ margin: 0, padding: '14px', color: 'var(--muted)', background: '#f8faf9', borderRadius: '8px', fontSize: '12px' }}>
                    Aucune transaction pour ce contact.
                  </p>
                ) : selectedClient.history.map((tx) => (
                  <div
                    key={tx.ref}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: '#f8faf9',
                      borderRadius: '8px',
                      border: '1px solid var(--line)',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: 'var(--font-dm-mono), monospace', fontSize: '11px', fontWeight: 600, color: 'var(--ink)' }}>
                        {tx.ref}
                      </div>
                      <small style={{ color: 'var(--muted)', fontSize: '11px' }}>{tx.date}</small>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, fontSize: '13px' }}>
                        {tx.amount.toLocaleString('fr-FR')} F
                      </div>
                      <span
                        className={`status ${tx.status === 'success' ? 'success' : tx.status === 'pending' ? 'pending' : ''}`}
                        style={tx.status === 'failed' ? { background: '#fde8e8', color: '#c81e1e', fontSize: '10px' } : { fontSize: '10px' }}
                      >
                        <i style={tx.status === 'failed' ? { background: '#c81e1e' } : {}} />
                        {tx.status === 'success' ? 'Payé' : tx.status === 'pending' ? 'En attente' : 'Échoué'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="button button-primary"
                style={{ flex: 1, minHeight: '42px', fontSize: '13px' }}
                onClick={(e) => handlePaymentRequest(selectedClient, e)}
              >
                💬 Envoyer demande de paiement
              </button>
              <button
                className="button button-secondary"
                style={{ minHeight: '42px', fontSize: '13px' }}
                onClick={() => setSelectedClient(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewContact && (
        <div className="dash-modal-backdrop" onClick={() => setShowNewContact(false)}>
          <div className="dash-modal-card" role="dialog" aria-modal="true" aria-labelledby="new-contact-title" onClick={(event) => event.stopPropagation()} style={{ maxWidth: '460px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h2 id="new-contact-title" style={{ margin: 0, fontSize: '18px' }}>Nouveau contact</h2>
              <button type="button" aria-label="Fermer" onClick={() => setShowNewContact(false)} style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--muted)' }}><Icon name="x" size={20} /></button>
            </div>
            <p style={{ margin: '0 0 16px', color: 'var(--muted)', fontSize: '12px' }}>Ajout local à cette démonstration ; le contact ne sera pas conservé après actualisation.</p>
            <form onSubmit={handleCreateContact}>
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label htmlFor="client-name">Nom complet *</label>
                <input id="client-name" className="form-control" value={contactName} onChange={(event) => setContactName(event.target.value)} required autoFocus />
              </div>
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label htmlFor="client-phone">Téléphone</label>
                <input id="client-phone" className="form-control" type="tel" value={contactPhone} onChange={(event) => setContactPhone(event.target.value)} />
              </div>
              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label htmlFor="client-email">Adresse e-mail</label>
                <input id="client-email" className="form-control" type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="button button-secondary" onClick={() => setShowNewContact(false)}>Annuler</button>
                <button type="submit" className="button button-primary">Ajouter le contact</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
