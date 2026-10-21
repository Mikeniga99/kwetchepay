import { Button } from '@/components/Button'
import { FintechLiveBackground } from '@/components/FintechLiveBackground'
import { Icon } from '@/components/Icon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solutions de Paiement — KwêTché Pay',
  description:
    'Découvrez les solutions KwêTché Pay : Mobile Money unifié, liens de paiement, reversements automatisés et intégrations sur-mesure.',
}

export default function SolutionsPage() {
  return (
    <main>
      <section className="subpage-hero">
        <FintechLiveBackground />
        <div className="container subpage-hero-inner">
          <h1>Une suite complète pour vos paiements en Afrique de l’Ouest</h1>
          <p>
            Que vous vendiez en ligne, sur les réseaux sociaux ou via une application mobile, KwêTché Pay vous fournit les outils nécessaires pour encaisser et reverser vos fonds sans friction.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Button href="/contact">Démarrer maintenant</Button>
            <Button variant="secondary" href="/developpeurs">Explorer l’API</Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="kicker">NOS PRODUITS PHARES</span>
            <h2>Une infrastructure unifiée pour chaque étape de votre encaissement.</h2>
            <p>Fini de gérer 3 contrats télécoms différents et des intégrations techniques disjointes.</p>
          </div>

          <div className="card-grid-3">
            <div className="info-card">
              <div className="info-card-icon"><Icon name="phone" size={24} /></div>
              <span className="pill-badge">Encaissement Mobile</span>
              <h3>Mobile Money Unifié</h3>
              <p>
                Connectez en une seule fois MTN Mobile Money, Moov Money et Celtiis Cash. Offrez à vos clients leur moyen de paiement favori en toute transparence.
              </p>
            </div>

            <div className="info-card">
              <div className="info-card-icon"><Icon name="card" size={24} /></div>
              <span className="pill-badge">Sans code</span>
              <h3>Liens de Paiement</h3>
              <p>
                Créez des liens de paiement sécurisés en 30 secondes depuis votre tableau de bord. Partagez-les sur WhatsApp, par SMS, email ou sur vos réseaux sociaux.
              </p>
            </div>

            <div className="info-card">
              <div className="info-card-icon"><Icon name="trend" size={24} /></div>
              <span className="pill-badge">Décaissement</span>
              <h3>Reversements & Payouts</h3>
              <p>
                Automatisez l’envoi d’argent vers les portefeuilles mobiles de vos livreurs, prestataires, marchands partenaires ou collaborateurs via API ou import de fichier.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section merchants">
        <div className="container">
          <div className="section-heading">
            <span className="kicker">CAS D’USAGE</span>
            <h2>Adapté à tous les modèles économiques d’aujourd’hui.</h2>
            <p>Découvrez comment les entreprises béninoises et ouest-africaines exploitent KwêTché Pay.</p>
          </div>

          <div className="card-grid-2">
            <div className="info-card">
              <span className="pill-badge">E-Commerce & Retail</span>
              <h3>Boutiques en ligne & Vente directe</h3>
              <p>
                Intégrez notre widget de paiement sécurisé à votre site ou boutique WooCommerce/Shopify. Diminuez les abandons de panier grâce à la confirmation push USSD instantanée sur le téléphone de l’acheteur.
              </p>
            </div>

            <div className="info-card">
              <span className="pill-badge">Plateformes & Marketplaces</span>
              <h3>Marketplaces & Économie collaborative</h3>
              <p>
                Encaissez les commandes des clients finaux et répartissez automatiquement les commissions vers chaque vendeur partenaire en toute conformité.
              </p>
            </div>

            <div className="info-card">
              <span className="pill-badge">Abonnements & SaaS</span>
              <h3>Facturation récurrente & Services</h3>
              <p>
                Gérez le renouvellement automatique d’abonnements, les rappels de paiement et la validation des accès à vos services numériques.
              </p>
            </div>

            <div className="info-card">
              <span className="pill-badge">Établissements & Écoles</span>
              <h3>Frais de scolarité & Billetterie</h3>
              <p>
                Simplifiez le règlement des scolarités pour les parents d’élèves ou la vente de billets d’événements avec réconciliation comptable automatique en temps réel.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-pattern" />
        <div className="container cta-content">
          <span className="kicker kicker-light">TRANSFORMEZ VOS PAIEMENTS</span>
          <h2>Prêt à accélérer votre croissance ?</h2>
          <p>Nos conseillers vous accompagnent dans le choix de la solution la plus adaptée à votre activité.</p>
          <div className="cta-actions">
            <Button variant="light" href="/contact">Demander une démo</Button>
            <Button variant="secondary" href="/tarifs">Consulter les tarifs</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
