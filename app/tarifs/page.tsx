import { Button } from '@/components/Button'
import { FintechLiveBackground } from '@/components/FintechLiveBackground'
import { Icon } from '@/components/Icon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarification — KwêTché Pay',
  description:
    'Tarification claire, transparente et sans abonnement pour accepter les paiements Mobile Money avec KwêTché Pay.',
}

const includedFeatures = [
  'Aucun abonnement mensuel obligatoire',
  'Environnement de test (Sandbox) 100% gratuit',
  'Accès immédiat à l’API et aux SDKs',
  'Tableau de bord de suivi en temps réel',
  'Exports comptables illimités (CSV, Excel)',
  'Webhooks sécurisés et notifications instantanées',
  'Gestion multi-collaborateurs avec permissions',
  'Support technique local à Cotonou',
]

const faqs = [
  {
    q: 'Y a-t-il des frais d’ouverture de compte ou d’abonnement ?',
    a: 'Non. L’inscription, l’accès au bac à sable de test et l’utilisation de la plateforme KwêTché Pay sont totalement sans abonnement mensuel. Vous ne réglez que les commissions sur les encaissements réussis.',
  },
  {
    q: 'Que se passe-t-il si un paiement échoue ou est annulé par le client ?',
    a: 'Aucuns frais ne sont prélevés sur les transactions échouées ou refusées par l’opérateur Mobile Money. Vous n’êtes facturé que sur les encaissements réellement crédités.',
  },
  {
    q: 'À quelle fréquence les fonds sont-ils reversés ?',
    a: 'Selon votre volume et votre secteur d’activité, les reversements vers votre compte bancaire ou votre portefeuille marchand sont effectués à J+1 ouvré ou de façon hebdomadaire automatique.',
  },
  {
    q: 'Proposez-vous des tarifs dégressifs pour les gros volumes ?',
    a: 'Absolument. Dès que votre volume mensuel dépasse 10 millions de FCFA, notre équipe commerciale met en place une grille de commissions sur-mesure adaptée à vos marges.',
  },
]

export default function TarifsPage() {
  return (
    <main>
      <section className="subpage-hero">
        <FintechLiveBackground />
        <div className="container subpage-hero-inner">
          <h1>Payez uniquement quand vous encaissez</h1>
          <p>
            Une tarification claire, alignée sur votre croissance. Aucun coût caché, aucun engagement de durée.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Button href="/contact">Demander une offre personnalisée</Button>
            <Button variant="secondary" href="/developpeurs">Tester gratuitement en Sandbox</Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card-grid-3">
            <div className="price-card">
              <span className="price-label">STARTER</span>
              <h3>Lancement & Test</h3>
              <div className="price">
                <strong>0 F CFA</strong>
                <small>par mois / sans engagement</small>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><Icon name="check" size={16} /> <b>À l’usage</b> par transaction réussie</li>
                <li><Icon name="check" size={16} /> MTN, Moov & Celtiis Cash</li>
                <li><Icon name="check" size={16} /> Liens de paiement & API</li>
                <li><Icon name="check" size={16} /> Dashboard & exports CSV</li>
                <li><Icon name="check" size={16} /> Support standard par email</li>
              </ul>
              <Button href="/contact">Démarrer en Starter</Button>
            </div>

            <div className="price-card" style={{ borderColor: 'var(--orange)', transform: 'translateY(-6px)', boxShadow: '0 24px 60px rgba(244,93,34,.12)' }}>
              <span className="price-label" style={{ color: 'var(--orange)' }}>LE PLUS POPULAIRE</span>
              <h3>Croissance & PME</h3>
              <div className="price">
                <strong>Taux Dégressif</strong>
                <small>dès 5M F CFA encaissés / mois</small>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><Icon name="check" size={16} /> <b>Commission optimisée</b> par volume</li>
                <li><Icon name="check" size={16} /> Reversements automatiques accélérés</li>
                <li><Icon name="check" size={16} /> Gestion multi-comptes d’équipe</li>
                <li><Icon name="check" size={16} /> Webhooks prioritaires</li>
                <li><Icon name="check" size={16} /> Support dédié WhatsApp & téléphone</li>
              </ul>
              <Button href="/contact">Contacter notre équipe</Button>
            </div>

            <div className="price-card">
              <span className="price-label">ENTREPRISE</span>
              <h3>Grands Comptes</h3>
              <div className="price">
                <strong>Sur Mesure</strong>
                <small>pour les volumes &gt; 25M F CFA / mois</small>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><Icon name="check" size={16} /> Taux négocié direct partenaires</li>
                <li><Icon name="check" size={16} /> SLA de disponibilité garanti 99,9%</li>
                <li><Icon name="check" size={16} /> Reversements à la demande (T+0)</li>
                <li><Icon name="check" size={16} /> Chargé de compte fintech dédié</li>
                <li><Icon name="check" size={16} /> Accompagnement technique sur site</li>
              </ul>
              <Button variant="secondary" href="/contact">Parler à un expert</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-heading">
            <span className="kicker">TOUT EST COMPRIS</span>
            <h2>Inclus dans chaque compte KwêTché Pay.</h2>
            <p>Nous fournissons tous les outils nécessaires à votre activité sans frais additionnels.</p>
          </div>

          <div className="card-grid-2">
            {includedFeatures.map((feat) => (
              <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', padding: '18px 22px', borderRadius: '10px', border: '1px solid var(--line)' }}>
                <span style={{ color: 'var(--green)', display: 'grid', placeItems: 'center' }}><Icon name="check" size={18} /></span>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="kicker">QUESTIONS FRÉQUENTES</span>
            <h2>Tout ce que vous devez savoir sur la facturation.</h2>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {faqs.map((faq) => (
              <div key={faq.q} className="info-card" style={{ padding: '24px 28px' }}>
                <h3 style={{ fontSize: '17px', marginBottom: '10px' }}>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-pattern" />
        <div className="container cta-content">
          <span className="kicker kicker-light">DÉMARREZ SANS RISQUE</span>
          <h2>Une question sur nos tarifs ou votre éligibilité ?</h2>
          <p>Discutez directement avec nos conseillers financiers pour obtenir une simulation exacte adaptée à vos transactions.</p>
          <div className="cta-actions">
            <Button variant="light" href="/contact">Demander une simulation</Button>
            <Button variant="secondary" href="mailto:contact@kwetchepay.bj">Écrire à contact@kwetchepay.bj</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
