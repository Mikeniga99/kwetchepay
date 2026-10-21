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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Company Profile Panel */}
        <div className="dash-panel">
          <div className="dash-panel-header">
            <div>
              <h3 style={{ margin: 0 }}>Profil de l’Entreprise</h3>
              <small style={{ color: 'var(--muted)', fontSize: '11px' }}>Informations figurant sur les reçus de vos clients</small>
            </div>
            <span className="status success"><i /> Compte vérifié</span>
          </div>

          <form onSubmit={handleSaveSettings}>
            <div className="form-row">
              <div className="form-group">
                <label>Raison Sociale</label>
                <input className="form-control" defaultValue="GoMarket Bénin SARL" />
              </div>
              <div className="form-group">
                <label>Numéro IFU (Bénin)</label>
                <input className="form-control" defaultValue="3201910892415" readOnly style={{ background: '#f8faf9' }} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email de facturation</label>
                <input className="form-control" type="email" defaultValue="facturation@gomarket.bj" />
              </div>
              <div className="form-group">
                <label>Téléphone support client (Bénin)</label>
                <input className="form-control" type="tel" defaultValue="+229 01 97 10 20 30" />
                <small style={{ color: 'var(--muted)', fontSize: '11px', marginTop: '3px', display: 'block' }}>
                  Format obligatoire à 10 chiffres (+229 01 XX XX XX XX)
                </small>
              </div>
            </div>

            <button
              type="submit"
              className="button button-primary"
              style={{ minHeight: '38px', fontSize: '12px', marginTop: '6px' }}
            >
              {savedSuccess ? '✓ Enregistré !' : 'Mettre à jour les informations'}
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
