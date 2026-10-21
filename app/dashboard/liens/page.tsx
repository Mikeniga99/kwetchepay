'use client'

import { Icon } from '@/components/Icon'
import { OperatorLogo } from '@/components/OperatorLogo'
import { INITIAL_PAYMENT_LINKS, type PaymentLink } from '@/lib/dashboard-data'
import { useState } from 'react'

export default function DashboardLiensPage() {
  const [links, setLinks] = useState<PaymentLink[]>(INITIAL_PAYMENT_LINKS)
  const [showModal, setShowModal] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Form states
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const newLink: PaymentLink = {
      id: `link_${Date.now()}`,
      code: title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 24) || 'pay',
      title,
      amount: amount ? parseInt(amount, 10) : null,
      currency: 'XOF',
      active: true,
      createdAt: 'Aujourd’hui',
      paymentsCount: 0,
      totalCollected: 0,
    }
    setLinks([newLink, ...links])
    setTitle('')
    setAmount('')
    setShowModal(false)
  }

  const handleCopy = (link: PaymentLink) => {
    const fullUrl = `https://pay.kwetchepay.bj/l/${link.code}`
    navigator.clipboard?.writeText(fullUrl)
    setCopiedId(link.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const toggleStatus = (id: string) => {
    setLinks(links.map((l) => (l.id === id ? { ...l, active: !l.active } : l)))
  }

  return (
    <div>
      <div className="dash-title-row">
        <div>
          <h1>Liens de Paiement</h1>
          <p>Créez des pages de paiement sécurisées et partageables en un instant sans écrire une ligne de code.</p>
        </div>
        <button
          className="button button-primary"
          style={{ minHeight: '38px', fontSize: '12px' }}
          onClick={() => setShowModal(true)}
        >
          + Nouveau lien de paiement
        </button>
      </div>

      {/* Links Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {links.map((link) => {
          const fullUrl = `https://pay.kwetchepay.bj/l/${link.code}`
          return (
            <div
              key={link.id}
              className="dash-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                opacity: link.active ? 1 : 0.6,
                borderTop: link.active ? '4px solid var(--orange)' : '4px solid var(--line)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: link.active ? 'var(--green-soft)' : '#f0f3f2',
                    color: link.active ? 'var(--green)' : 'var(--muted)',
                  }}
                >
                  {link.active ? 'Actif' : 'Désactivé'}
                </span>
                <button
                  onClick={() => toggleStatus(link.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '11px', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {link.active ? 'Désactiver' : 'Activer'}
                </button>
              </div>

              <h3 style={{ fontSize: '17px', margin: '0 0 6px' }}>{link.title}</h3>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
                {link.amount ? `${link.amount.toLocaleString('fr-FR')} F CFA` : 'Montant libre'}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 600 }}>Règlement :</span>
                <OperatorLogo operator="mtn" size={16} />
                <OperatorLogo operator="moov" size={16} />
                <OperatorLogo operator="celtiis" size={16} />
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '16px', background: '#f8faf9', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', marginBottom: '16px' }}>
                <div>
                  <small style={{ color: 'var(--muted)', display: 'block' }}>Paiements reçus</small>
                  <b>{link.paymentsCount}</b>
                </div>
                <div style={{ borderLeft: '1px solid var(--line)', paddingLeft: '16px' }}>
                  <small style={{ color: 'var(--muted)', display: 'block' }}>Total collecté</small>
                  <b style={{ color: 'var(--green)' }}>{link.totalCollected.toLocaleString('fr-FR')} F</b>
                </div>
              </div>

              {/* Link URL & Actions */}
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: '#fafbfa', border: '1px solid var(--line)', borderRadius: '6px', padding: '6px 10px', fontSize: '11px' }}>
                  <span style={{ color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, fontFamily: 'var(--font-dm-mono)' }}>
                    {fullUrl}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="button button-secondary"
                    style={{ flex: 1, minHeight: '34px', fontSize: '11px' }}
                    onClick={() => handleCopy(link)}
                  >
                    {copiedId === link.id ? '✓ Copié !' : 'Copier'}
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Bonjour, voici le lien KwêTché Pay pour régler "${link.title}" : ` + fullUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-light"
                    style={{ minHeight: '34px', fontSize: '11px', padding: '0 10px' }}
                    title="Partager sur WhatsApp"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal Création Lien */}
      {showModal && (
        <div className="dash-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="dash-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h2 style={{ fontSize: '20px', margin: 0, fontWeight: 800 }}>Créer un nouveau lien</h2>
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                onClick={() => setShowModal(false)}
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label htmlFor="title">Titre ou description du paiement *</label>
                <input
                  className="form-control"
                  id="title"
                  required
                  placeholder="Ex: Acompte Réservation, Commande Électronique"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Montant fixe (F CFA)</label>
                <input
                  className="form-control"
                  id="amount"
                  type="number"
                  min="100"
                  step="100"
                  placeholder="Laisser vide pour montant libre"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
                  Si vous laissez vide, votre client renseignera lui-même la somme au moment de payer.
                </small>
              </div>

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
                >
                  Publier le lien
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
