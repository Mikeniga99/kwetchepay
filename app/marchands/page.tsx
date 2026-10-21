import { Button } from '@/components/Button'
import { DashboardPreview } from '@/components/DashboardPreview'
import { FintechLiveBackground } from '@/components/FintechLiveBackground'
import { Icon } from '@/components/Icon'
import { KineticLiveTicker } from '@/components/KineticLiveTicker'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Espace Marchands — KwêTché Pay',
  description:
    'Pilotez votre activité commerciale avec KwêTché Pay : tableau de bord analytique, gestion des collaborateurs et réconciliation comptable.',
}

export default function MarchandsPage() {
  return (
    <main>
      <section className="subpage-hero">
        <FintechLiveBackground />
        <div className="container subpage-hero-inner">
          <h1>Pilotez votre chiffre d’affaires en temps réel</h1>
          <p>
            Une console conçue pour les fondateurs, directeurs financiers et équipes opérationnelles. Gardez une visibilité absolue sur vos encaissements et vos reversements.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Button href="/contact">Ouvrir un compte marchand</Button>
            <Button variant="secondary" href="/tarifs">Voir la tarification</Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-layout">
          <div className="split-copy">
            <span className="kicker">TABLEAU DE BORD INTUITIF</span>
            <h2>Toute votre trésorerie à portée de clic.</h2>
            <p className="large-copy">
              Suivez l’évolution de vos ventes minute par minute, identifiez les heures de pointe et anticipez vos flux financiers avec précision.
            </p>
            <div className="benefit-list">
              <div>
                <span><Icon name="trend" /></span>
                <p>
                  <b>Statistiques et reporting automatisé</b>
                  <small>Consultez vos taux de succès par opérateur (MTN, Moov, Celtiis) et identifiez les tendances de vos clients.</small>
                </p>
              </div>
              <div>
                <span><Icon name="bars" /></span>
                <p>
                  <b>Exports comptables en un clic</b>
                  <small>Générez vos relevés au format CSV ou Excel pour faciliter la clôture mensuelle de votre comptabilité.</small>
                </p>
              </div>
              <div>
                <span><Icon name="shield" /></span>
                <p>
                  <b>Gestion des contestations & remboursements</b>
                  <small>Gérez les litiges rapidement et déclenchez des remboursements directement depuis l’interface.</small>
                </p>
              </div>
            </div>
            <Button href="/contact">Créer mon espace marchand</Button>
          </div>
          <DashboardPreview />
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-heading">
            <span className="kicker">ORGANISATION & CONFIANCE</span>
            <h2>Travaillez en équipe en toute sécurité.</h2>
            <p>Invitez vos collaborateurs avec des droits d’accès sur-mesure pour protéger vos données financières.</p>
          </div>

          <div className="card-grid-3">
            <div className="info-card">
              <div className="info-card-icon"><Icon name="users" size={24} /></div>
              <h3>Rôles & Permissions granulaires</h3>
              <p>
                Attribuez des rôles distincts (Administrateur, Comptable, Opérateur de caisse, Développeur) selon les besoins de chaque collaborateur.
              </p>
            </div>

            <div className="info-card">
              <div className="info-card-icon"><Icon name="lock" size={24} /></div>
              <h3>Double Authentification (2FA)</h3>
              <p>
                Sécurisez les connexions à votre compte et protégez vos demandes de reversements sensibles par validation OTP.
              </p>
            </div>

            <div className="info-card">
              <div className="info-card-icon"><Icon name="clock" size={24} /></div>
              <h3>Support réactif & dédié</h3>
              <p>
                Une équipe locale basée à Cotonou, joignable par WhatsApp, téléphone ou email pour répondre à toutes vos questions sans délai.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#f8faf9', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <KineticLiveTicker />
      </section>

      <section className="cta-section">
        <div className="cta-pattern" />
        <div className="container cta-content">
          <span className="kicker kicker-light">REJOIGNEZ NOS MARCHANDS</span>
          <h2>Donnez un coup d’accélérateur à votre activité.</h2>
          <p>Ouvrez votre compte marchand KwêTché Pay dès aujourd’hui et commencez à encaisser vos clients.</p>
          <div className="cta-actions">
            <Button variant="light" href="/contact">Créer un compte marchand</Button>
            <Button variant="secondary" href="/securite">En savoir plus sur la sécurité</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
