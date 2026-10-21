'use client'

import { Icon } from '@/components/Icon'
import { useState } from 'react'

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'Administrateur' | 'Comptable' | 'Développeur'
  status: 'Actif' | 'Invitation en attente'
}

const INITIAL_TEAM: TeamMember[] = [
  { id: 'usr_1', name: 'Marc Dossou', email: 'm.dossou@gomarket.bj', role: 'Administrateur', status: 'Actif' },
  { id: 'usr_2', name: 'Aïcha Bello', email: 'a.bello@gomarket.bj', role: 'Comptable', status: 'Actif' },
  { id: 'usr_3', name: 'Fabrice K.', email: 'dev@gomarket.bj', role: 'Développeur', status: 'Invitation en attente' },
]

export default function DashboardSettingsPage() {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteName, setInviteName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'Administrateur' | 'Comptable' | 'Développeur'>('Comptable')

  // Settings states
  const [twoFactor, setTwoFactor] = useState(true)
  const [notifySms, setNotifySms] = useState(true)
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Branding states
  const [brandColor, setBrandColor] = useState('#0E3864')
  const [showLogo, setShowLogo] = useState(true)

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    const newMember: TeamMember = {
      id: `usr_${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      status: 'Invitation en attente',
    }
    setTeam([...team, newMember])
    setInviteName('')
    setInviteEmail('')
    setShowInviteModal(false)
  }

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2000)
  }

  return (
    <div>
      <div className="dash-title-row">
        <div>
          <h1>Paramètres du Compte</h1>
          <p>Gérez les informations de votre entreprise, vos accès collaborateurs et la sécurité.</p>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Company Profile & Branding Panel */}
          <div className="dash-panel">
            <div className="dash-panel-header">
              <div>
                <h3 style={{ margin: 0 }}>Identité Visuelle & Reçus</h3>
                <small style={{ color: 'var(--muted)', fontSize: '11px' }}>Personnalisez l'apparence des documents envoyés à vos clients</small>
              </div>
            </div>

            <form onSubmit={handleSaveSettings}>
              <div className="form-row">
                <div className="form-group">
                  <label>Couleur de marque</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      style={{ width: '44px', height: '44px', padding: '2px', borderRadius: '8px', border: '1px solid var(--line)', cursor: 'pointer' }}
                    />
                    <input
                      className="form-control"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '13px' }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Logo sur le reçu</label>
                  <div style={{ display: 'flex', alignItems: 'center', height: '44px', gap: '12px' }}>
                    <button
                      type="button"
                      className={`button ${showLogo ? 'button-primary' : 'button-secondary'}`}
                      style={{ minHeight: '34px', fontSize: '11px', flex: 1 }}
                      onClick={() => setShowLogo(true)}
                    >
                      Afficher
                    </button>
                    <button
                      type="button"
                      className={`button ${!showLogo ? 'button-primary' : 'button-secondary'}`}
                      style={{ minHeight: '34px', fontSize: '11px', flex: 1 }}
                      onClick={() => setShowLogo(false)}
                    >
                      Masquer
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Raison Sociale</label>
                  <input className="form-control" defaultValue="GoMarket Bénin SARL" />
                </div>
                <div className="form-group">
                  <label>Email Support</label>
                  <input className="form-control" type="email" defaultValue="aide@gomarket.bj" />
                </div>
              </div>

              <button
                type="submit"
                className="button button-primary"
                style={{ minHeight: '38px', fontSize: '12px', marginTop: '6px' }}
              >
                {savedSuccess ? '✓ Enregistré !' : 'Enregistrer le branding'}
              </button>
            </form>
          </div>

          {/* Team Members Panel */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <div>
              <h3 style={{ margin: 0 }}>Collaborateurs & Permissions</h3>
              <small style={{ color: 'var(--muted)', fontSize: '11px' }}>Personnes habilitées à accéder à votre console</small>
            </div>
            <button
              className="button button-secondary"
              style={{ minHeight: '34px', fontSize: '11px' }}
              onClick={() => setShowInviteModal(true)}
            >
              + Inviter un collaborateur
            </button>
          </div>

          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>NOM</th>
                  <th>EMAIL</th>
                  <th>RÔLE</th>
                  <th>STATUT</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {team.map((user) => (
                  <tr key={user.id}>
                    <td><b>{user.name}</b></td>
                    <td>{user.email}</td>
                    <td>
                      <span className="pill-badge" style={{ margin: 0 }}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`status ${user.status === 'Actif' ? 'success' : 'pending'}`}>
                        <i /> {user.status}
                      </span>
                    </td>
                    <td>
                      {user.id !== 'usr_1' && (
                        <button
                          style={{ background: 'none', border: 'none', color: '#c81e1e', cursor: 'pointer', fontSize: '11px' }}
                          onClick={() => setTeam(team.filter((u) => u.id !== user.id))}
                        >
                          Retirer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security & Notifications Panel */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <h3 style={{ margin: 0 }}>Sécurité & Préférences</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
              <div>
                <b style={{ fontSize: '13px', display: 'block' }}>Double Authentification (2FA par OTP)</b>
                <small style={{ color: 'var(--muted)', fontSize: '11px' }}>Exiger un code SMS lors de chaque connexion sensible</small>
              </div>
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={() => setTwoFactor(!twoFactor)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
              <div>
                <b style={{ fontSize: '13px', display: 'block' }}>Notifications SMS pour les gros paiements (&gt; 100 000 F)</b>
                <small style={{ color: 'var(--muted)', fontSize: '11px' }}>Recevoir une alerte instantanée sur votre téléphone</small>
              </div>
              <input
                type="checkbox"
                checked={notifySms}
                onChange={() => setNotifySms(!notifySms)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <div>
                <b style={{ fontSize: '13px', display: 'block' }}>Rapport financier récapitulatif par email</b>
                <small style={{ color: 'var(--muted)', fontSize: '11px' }}>Envoi quotidien des totaux encaissés et des commissions</small>
              </div>
              <input
                type="checkbox"
                checked={notifyEmail}
                onChange={() => setNotifyEmail(!notifyEmail)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        </div>

        {/* Column 2: Live Preview */}
        <aside style={{ position: 'sticky', top: '24px' }}>
          <div style={{ marginBottom: '12px', fontWeight: 700, fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Aperçu en temps réel
          </div>

          <div className="receipt-preview-mobile" style={{
            background: '#fff',
            borderRadius: '30px',
            border: '8px solid #1a202c',
            height: '580px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            {/* Notch */}
            <div style={{ width: '120px', height: '20px', background: '#1a202c', margin: '0 auto', borderRadius: '0 0 15px 15px' }} />

            <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              {showLogo && (
                <div style={{ marginBottom: '24px', transform: 'scale(0.8)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: brandColor, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: '20px' }}>
                    GM
                  </div>
                </div>
              )}

              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dcfce7', color: '#15803d', display: 'grid', placeItems: 'center', marginBottom: '12px' }}>
                <Icon name="check" size={20} />
              </div>

              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Paiement Réussi</h4>
              <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Merci pour votre confiance !</p>

              <div style={{ margin: '24px 0', fontSize: '32px', fontWeight: 900, fontFamily: 'var(--font-dm-mono)' }}>
                15 000 <span style={{ fontSize: '14px', fontWeight: 500 }}>F CFA</span>
              </div>

              <div style={{ width: '100%', borderTop: '1px dashed var(--line)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: 'var(--muted)' }}>Marchand</span>
                  <span style={{ fontWeight: 600 }}>GoMarket Bénin</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: 'var(--muted)' }}>Référence</span>
                  <span style={{ fontWeight: 600, fontFamily: 'var(--font-dm-mono)' }}>#KP-20261019-001</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: 'var(--muted)' }}>Méthode</span>
                  <span style={{ fontWeight: 600 }}>MTN MoMo (+229 01...)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: 'var(--muted)' }}>Date</span>
                  <span style={{ fontWeight: 600 }}>19 Oct 2026, 18:42</span>
                </div>
              </div>

              <div style={{ marginTop: 'auto', width: '100%' }}>
                <button
                  className="button"
                  disabled
                  style={{ width: '100%', background: brandColor, color: '#fff', border: 'none', borderRadius: '10px', minHeight: '44px', fontWeight: 700, opacity: 0.9 }}
                >
                  Télécharger le reçu
                </button>
                <p style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '16px' }}>
                  Sécurisé par <b>KwêTché Pay</b>
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Modal Inviter Collaborateur */}
      {showInviteModal && (
        <div className="dash-modal-backdrop" onClick={() => setShowInviteModal(false)}>
          <div className="dash-modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h2 style={{ fontSize: '20px', margin: 0, fontWeight: 800 }}>Inviter un collaborateur</h2>
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
                onClick={() => setShowInviteModal(false)}
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <form onSubmit={handleInvite}>
              <div className="form-group">
                <label>Nom complet *</label>
                <input
                  className="form-control"
                  required
                  placeholder="Ex: Christian Soglo"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email professionnel *</label>
                <input
                  className="form-control"
                  type="email"
                  required
                  placeholder="c.soglo@gomarket.bj"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Rôle attribué</label>
                <select
                  className="form-control"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                >
                  <option value="Comptable">Comptable (Accès aux transactions et exports)</option>
                  <option value="Développeur">Développeur (Accès aux clés API et Webhooks)</option>
                  <option value="Administrateur">Administrateur (Accès complet)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                <button
                  type="button"
                  className="button button-secondary"
                  style={{ flex: 1, minHeight: '44px' }}
                  onClick={() => setShowInviteModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="button button-primary"
                  style={{ flex: 1, minHeight: '44px' }}
                >
                  Envoyer l’invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
