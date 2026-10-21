'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Icon } from './Icon'
import { Logo } from './Logo'
import { OperatorLogo } from './OperatorLogo'
import { ButtonSpinner } from './ui/ButtonSpinner'
import { FintechLiveBackground } from './FintechLiveBackground'

interface AuthGlassPortalProps {
  initialTab?: 'login' | 'signup'
}

export function AuthGlassPortal({ initialTab = 'login' }: AuthGlassPortalProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab)

  // Login form state
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginEmail, setLoginEmail] = useState('yniga73@gmail.com')
  const [loginPassword, setLoginPassword] = useState('••••••••••••')

  // Signup form state
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupSubmitted, setSignupSubmitted] = useState(false)
  const [phone, setPhone] = useState('+229 01 ')

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 900)
  }

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSignupLoading(true)
    setTimeout(() => {
      setSignupLoading(false)
      setSignupSubmitted(true)
    }, 800)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (!val.startsWith('+229 01')) {
      setPhone('+229 01 ')
    } else {
      setPhone(val)
    }
  }

  return (
    <main className="auth-page-main">
      {/* Background Animated Atmosphere (Ganvié Neo-Pirogue, Money Rain & Gold River) */}
      <FintechLiveBackground />

      {/* Main Liquid Glass Shell */}
      <div
        className="glossy-liquid-glass"
        style={{
          width: '100%',
          maxWidth: '1040px',
          position: 'relative',
          zIndex: 2,
          margin: '0 auto',
        }}
      >
        <div className="auth-columns">
          {/* ========================================================= */}
          {/* COLUMN 1: BRAND SHOWCASE & VALUE PILLARS (DESKTOP ONLY)    */}
          {/* ========================================================= */}
          <div className="auth-brand-col">
            <div style={{ marginBottom: '24px' }}>
              <Logo />
            </div>

            <h2
              style={{
                fontSize: 'clamp(24px, 3vw, 30px)',
                fontWeight: 800,
                letterSpacing: '-1.2px',
                lineHeight: 1.15,
                color: 'var(--ink)',
                marginBottom: '14px',
              }}
            >
              L’infrastructure de paiement souveraine pour vos affaires.
            </h2>

            <p style={{ color: 'var(--muted)', fontSize: '13.5px', lineHeight: 1.6, marginBottom: '24px' }}>
              Encaissez MTN MoMo, Moov Money et Celtiis Cash depuis une console unifiée, avec réconciliation automatique et sécurité bancaire certifiée.
            </p>

            {/* Operator Badges in Liquid Glass */}
            <div className="operator-pill-row">
              <div className="operator-pill">
                <OperatorLogo operator="mtn" size={20} />
                <span>MTN MoMo</span>
              </div>
              <div className="operator-pill">
                <OperatorLogo operator="moov" size={20} />
                <span>Moov Money</span>
              </div>
              <div className="operator-pill">
                <OperatorLogo operator="celtiis" size={20} />
                <span>Celtiis Cash</span>
              </div>
              <div className="operator-pill">
                <OperatorLogo operator="xof" size={20} />
                <span>Franc CFA</span>
              </div>
            </div>

            {/* Key Value Points */}
            <div className="auth-benefits">
              <div className="auth-benefit-item">
                <span className="benefit-check"><Icon name="check" size={15} /></span>
                <div>
                  <b>Disponibilité 99,9%</b>
                  <small>Routage intelligent des passerelles télécoms</small>
                </div>
              </div>
              <div className="auth-benefit-item">
                <span className="benefit-check"><Icon name="check" size={15} /></span>
                <div>
                  <b>Reversements automatisés</b>
                  <small>Fonds crédités vers votre compte bancaire ou Mobile Money</small>
                </div>
              </div>
              <div className="auth-benefit-item">
                <span className="benefit-check"><Icon name="check" size={15} /></span>
                <div>
                  <b>Bac à sable gratuit</b>
                  <small>Clés API de test immédiates sans engagement</small>
                </div>
              </div>
            </div>

            {/* Live Status indicator */}
            <div className="live-status-pill">
              <span className="live-dot" />
              <span>Systèmes opérationnels & conforme UEMOA</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMN 2: INTERACTIVE FORM WITH GLOSSY LIQUID SWITCHER    */}
          {/* ========================================================= */}
          <div className="auth-form-col">
            {/* Mobile-only brand logo header */}
            <div className="auth-mobile-header">
              <Logo />
            </div>

            {/* Glossy Liquid Glass Switcher (Tab toggle) */}
            <div className="glossy-tab-switcher">
              <button
                type="button"
                className={`glossy-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                <Icon name="lock" size={15} />
                <span>Connexion</span>
              </button>
              <button
                type="button"
                className={`glossy-tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={() => setActiveTab('signup')}
              >
                <Icon name="trend" size={15} />
                <span>Inscription</span>
              </button>
            </div>

            {/* TAB 1: CONNEXION */}
            {activeTab === 'login' && (
              <div className="auth-tab-content">
                <div style={{ marginBottom: '18px' }}>
                  <h3 style={{ fontSize: '21px', fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.8px' }}>
                    Bon retour parmi nous
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>
                    Saisissez vos identifiants marchands pour accéder à votre espace.
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit}>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label htmlFor="login-email">Adresse email professionnelle</label>
                    <input
                      className="form-control"
                      id="login-email"
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="nom@entreprise.bj"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label htmlFor="login-password">Mot de passe</label>
                      <a href="#" style={{ fontSize: '12px', color: 'var(--orange)', fontWeight: 600 }}>
                        Mot de passe oublié ?
                      </a>
                    </div>
                    <input
                      className="form-control"
                      id="login-password"
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`button button-primary auth-submit-btn ${loginLoading ? 'is-loading' : ''}`}
                    disabled={loginLoading}
                  >
                    {loginLoading ? <ButtonSpinner label="Connexion..." /> : 'Se connecter'}
                  </button>

                  <div className="auth-switch-prompt">
                    <span>Pas encore de compte ? </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('signup')}
                      className="auth-link-btn"
                    >
                      S’inscrire →
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: INSCRIPTION / DEMANDE D'ACCÈS */}
            {activeTab === 'signup' && (
              <div className="auth-tab-content">
                {signupSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '24px 10px' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: 'var(--green-soft)',
                        color: 'var(--green)',
                        display: 'grid',
                        placeItems: 'center',
                        margin: '0 auto 14px',
                      }}
                    >
                      <Icon name="check" size={24} />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>Demande reçue avec succès !</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '13.5px', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 18px' }}>
                      Merci de votre intérêt. Notre équipe technique et conformité vous contactera sous 24h ouvrées avec vos identifiants Sandbox.
                    </p>
                    <button
                      type="button"
                      className="button button-secondary auth-submit-btn"
                      onClick={() => setSignupSubmitted(false)}
                      style={{ maxWidth: '240px', margin: '0 auto' }}
                    >
                      Nouvelle demande
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '21px', fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.8px' }}>
                        Créer votre compte marchand
                      </h3>
                      <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>
                        Rejoignez les entreprises qui simplifient leurs paiements au Bénin.
                      </p>
                    </div>

                    <form onSubmit={handleSignupSubmit}>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="reg-firstname">Prénom *</label>
                          <input className="form-control" id="reg-firstname" required placeholder="Ex: Marc" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="reg-lastname">Nom *</label>
                          <input className="form-control" id="reg-lastname" required placeholder="Ex: Dossou" />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="reg-email">Email professionnel *</label>
                          <input className="form-control" id="reg-email" type="email" required placeholder="m.dossou@entreprise.bj" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="reg-phone">Téléphone (+229 01) *</label>
                          <input
                            className="form-control"
                            id="reg-phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="+229 01 XX XX XX XX"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="reg-company">Entreprise ou Projet *</label>
                          <input className="form-control" id="reg-company" required placeholder="Ex: GoMarket Bénin" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="reg-volume">Volume mensuel</label>
                          <select className="form-control" id="reg-volume">
                            <option value="test">&lt; 1M FCFA (Lancement)</option>
                            <option value="1-5m">1 à 5 millions FCFA</option>
                            <option value="5-25m">5 à 25 millions FCFA</option>
                            <option value="25m+">Plus de 25 millions FCFA</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group" style={{ marginBottom: '18px' }}>
                        <label htmlFor="reg-need">Besoin principal</label>
                        <select className="form-control" id="reg-need">
                          <option value="sandbox">Clés API Sandbox (Développeur)</option>
                          <option value="merchant">Compte marchand de production</option>
                          <option value="plugin">Module e-commerce (WooCommerce, Shopify)</option>
                          <option value="custom">Partenariat & Volume sur-mesure</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className={`button button-primary auth-submit-btn ${signupLoading ? 'is-loading' : ''}`}
                        disabled={signupLoading}
                      >
                        {signupLoading ? <ButtonSpinner label="Création..." /> : 'Créer un compte'}
                      </button>

                      <div className="auth-switch-prompt">
                        <span>Déjà un compte ? </span>
                        <button
                          type="button"
                          onClick={() => setActiveTab('login')}
                          className="auth-link-btn"
                        >
                          Se connecter →
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
