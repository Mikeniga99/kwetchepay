'use client'

import { Icon } from '@/components/Icon'
import { Logo } from '@/components/Logo'
import { MobileMoneyPushModal } from '@/components/MobileMoneyPushModal'
import { OperatorLogo } from '@/components/OperatorLogo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { DashboardProvider, useDashboard } from './dashboard-context'

const navLinks = [
  { href: '/dashboard', label: 'Vue d’ensemble', icon: 'bars' as const },
  { href: '/dashboard/transactions', label: 'Transactions', icon: 'card' as const },
  { href: '/dashboard/liens', label: 'Liens de paiement', icon: 'link' as const },
  { href: '/dashboard/reversements', label: 'Reversements', icon: 'trend' as const },
  { href: '/dashboard/developpeurs', label: 'Développeurs & API', icon: 'code' as const },
  { href: '/dashboard/parametres', label: 'Paramètres', icon: 'shield' as const },
]

function DashboardLayoutContent({ children }: { children: ReactNode }) {
  const { isLive, setIsLive, openQuickLinkModal, setOpenQuickLinkModal } = useDashboard()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [quickLinkTitle, setQuickLinkTitle] = useState('')
  const [quickLinkAmount, setQuickLinkAmount] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)
  const pathname = usePathname()

  const handleCreateQuickLink = (e: React.FormEvent) => {
    e.preventDefault()
    const slug = quickLinkTitle.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20) || 'pay'
    const linkUrl = `https://pay.kwetchepay.bj/l/${slug}-${Math.floor(1000 + Math.random() * 9000)}`
    setGeneratedLink(linkUrl)
  }

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard?.writeText(generatedLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
      <div className="dash-app">
        {/* Sidebar */}
        <aside className={`dash-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="dash-sidebar-header">
            <Logo />
            <button
              className="dash-menu-toggle"
              onClick={() => setSidebarOpen(false)}
              aria-label="Fermer le menu"
            >
              <Icon name="x" size={18} />
            </button>
          </div>

          {/* Sandbox / Production Mode Switcher */}
          <div
            className={`dash-mode-banner ${isLive ? 'mode-production' : 'mode-sandbox'}`}
            onClick={() => setIsLive(!isLive)}
            title="Cliquer pour changer d'environnement"
          >
            <span className="dash-mode-badge">
              <i />
              {isLive ? 'MODE PRODUCTION' : 'MODE TEST (SANDBOX)'}
            </span>
            <span style={{ fontSize: '10px', opacity: 0.8 }}>BASCULER ⇄</span>
          </div>

          {/* Navigation Links */}
          <nav className="dash-nav">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`dash-nav-link ${active ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon name={link.icon} size={17} />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Merchant Profile Footer */}
          <div className="dash-sidebar-footer">
            <span className="dash-merchant-avatar">GM</span>
            <div className="dash-merchant-info">
              <b>GoMarket Bénin</b>
              <small>ID: kw_mch_80492</small>
            </div>
            <Link
              href="/"
              title="Quitter le dashboard et revenir au site"
              style={{ color: '#8b9b97', padding: '6px', borderRadius: '4px' }}
            >
              <Icon name="x" size={16} />
            </Link>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.3)',
              zIndex: 45,
            }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="dash-main-area">
          <header className="dash-top-header">
            <div className="dash-header-left">
              <button
                className="dash-menu-toggle"
                onClick={() => setSidebarOpen(true)}
                aria-label="Ouvrir le menu"
              >
                <Icon name="bars" size={20} />
              </button>

              <div className="dash-networks-health">
                <span className="dash-net-item">
                  <span className="dash-net-dot" />
                  <OperatorLogo operator="mtn" size={16} />
                  <span>MTN MoMo</span>
                </span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span className="dash-net-item">
                  <span className="dash-net-dot" />
                  <OperatorLogo operator="moov" size={16} />
                  <span>Moov Money</span>
                </span>
                <span style={{ opacity: 0.4 }}>•</span>
                <span className="dash-net-item">
                  <span className="dash-net-dot" />
                  <OperatorLogo operator="celtiis" size={16} />
                  <span>Celtiis Cash</span>
                </span>
              </div>
            </div>

            <div className="dash-header-right">
              <button
                className="button button-secondary"
                style={{ minHeight: '38px', padding: '0 12px', fontSize: '12px', border: '1px solid #fbd38d', background: '#fffaf0', color: 'var(--orange-dark)' }}
                onClick={() => setShowDemoModal(true)}
                title="Tester l'animation radar push USSD"
              >
                ⚡ Démo USSD
              </button>

              <button
                className="button button-primary"
                style={{ minHeight: '38px', padding: '0 14px', fontSize: '12px' }}
                onClick={() => {
                  setGeneratedLink('')
                  setQuickLinkTitle('')
                  setQuickLinkAmount('')
                  setOpenQuickLinkModal(true)
                }}
              >
                + Créer un lien
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#f2f5f4',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                <span className="dash-merchant-avatar" style={{ width: '24px', height: '24px', fontSize: '9px', borderRadius: '6px' }}>
                  GM
                </span>
                <span>Marc D.</span>
              </div>
            </div>
          </header>

          <div className="dash-body">{children}</div>
        </div>

        {/* Modal: Création rapide d'un lien de paiement */}
      {openQuickLinkModal && (
        <div className="dash-modal-backdrop" onClick={() => setOpenQuickLinkModal(false)}>
          <div className="dash-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', margin: 0, fontWeight: 800 }}>Nouveau lien de paiement</h2>
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                onClick={() => setOpenQuickLinkModal(false)}
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            {generatedLink ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--green-soft)', color: 'var(--green)', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
                  <Icon name="check" size={24} />
                </div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Votre lien est prêt !</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '18px' }}>
                  Partagez ce lien avec votre client sur WhatsApp, par SMS ou sur vos réseaux sociaux.
                </p>

                <div style={{ display: 'flex', gap: '8px', background: '#f8faf9', border: '1px solid var(--line)', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px' }}>
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    style={{ flex: 1, border: 'none', background: 'transparent', font: 'inherit', fontSize: '13px', outline: 'none' }}
                  />
                  <button
                    className="button button-primary"
                    style={{ minHeight: '34px', padding: '0 12px', fontSize: '12px' }}
                    onClick={handleCopyLink}
                  >
                    {copied ? 'Copié !' : 'Copier'}
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent('Voici votre lien de paiement sécurisé KwêTché Pay : ' + generatedLink)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-secondary"
                    style={{ minHeight: '40px', fontSize: '12px' }}
                  >
                    Envoyer sur WhatsApp
                  </a>
                  <button
                    className="button button-light"
                    style={{ minHeight: '40px', fontSize: '12px' }}
                    onClick={() => {
                      setGeneratedLink('')
                      setQuickLinkTitle('')
                      setQuickLinkAmount('')
                    }}
                  >
                    Créer un autre
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateQuickLink}>
                <div className="form-group">
                  <label htmlFor="q-title">Motif ou produit *</label>
                  <input
                    className="form-control"
                    id="q-title"
                    required
                    placeholder="Ex: Facture prestation, Commande #82"
                    value={quickLinkTitle}
                    onChange={(e) => setQuickLinkTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="q-amount">Montant (F CFA)</label>
                  <input
                    className="form-control"
                    id="q-amount"
                    type="number"
                    min="100"
                    step="100"
                    placeholder="Laisser vide si montant libre"
                    value={quickLinkAmount}
                    onChange={(e) => setQuickLinkAmount(e.target.value)}
                  />
                  <small style={{ color: 'var(--muted)', fontSize: '11px' }}>
                    Si aucun montant n’est renseigné, le client choisit la somme à payer.
                  </small>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 12px', background: '#f8faf9', borderRadius: '6px', marginTop: '12px' }}>
                  <small style={{ color: 'var(--muted)', fontSize: '11px', flex: 1 }}>Règlement immédiat par le client via :</small>
                  <OperatorLogo operator="mtn" size={18} />
                  <OperatorLogo operator="moov" size={18} />
                  <OperatorLogo operator="celtiis" size={18} />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <button
                    type="button"
                    className="button button-secondary"
                    style={{ flex: 1, minHeight: '44px' }}
                    onClick={() => setOpenQuickLinkModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="button button-primary"
                    style={{ flex: 1, minHeight: '44px' }}
                  >
                    Générer le lien
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Global Simulator Modal for USSD Push & Radar */}
      <MobileMoneyPushModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
      />
    </div>
  )
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  )
}
