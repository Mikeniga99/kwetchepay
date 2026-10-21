import { Button } from '@/components/Button'
import { CodeWindow } from '@/components/CodeWindow'
import { FintechLiveBackground } from '@/components/FintechLiveBackground'
import { Icon } from '@/components/Icon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Espace Développeurs & API — KwêTché Pay',
  description:
    'Documentation technique, SDKs et API REST KwêTché Pay. Intégrez les paiements Mobile Money en quelques lignes de code.',
}

export default function DeveloppeursPage() {
  return (
    <main>
      <section className="subpage-hero">
        <FintechLiveBackground />
        <div className="container subpage-hero-inner">
          <h1>Une API REST pensée pour les développeurs modernes</h1>
          <p>
            Documentation claire, environnement de test complet et webhooks en temps réel. Intégrez KwêTché Pay dans votre stack technique en quelques heures, pas en plusieurs semaines.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Button href="/contact">Obtenir des clés API de test</Button>
            <Button variant="secondary" href="#endpoints">Voir les endpoints</Button>
          </div>
        </div>
      </section>

      <section className="section developer" id="endpoints">
        <div className="container split-layout dev-layout">
          <div className="split-copy light-copy">
            <span className="kicker kicker-light">INTEGRATION RAPIDE</span>
            <h2>Initiez un paiement en une seule requête HTTP.</h2>
            <p className="large-copy">
              Transmettez simplement le montant, la devise et le numéro de téléphone de l’utilisateur pour déclencher le paiement directement sur son mobile.
            </p>
            <div className="dev-points">
              <span><Icon name="check" size={16} /> Clés Sandbox immédiates</span>
              <span><Icon name="check" size={16} /> Idempotence native (Idempotency-Key)</span>
              <span><Icon name="check" size={16} /> Webhooks signés par clé secrète</span>
              <span><Icon name="check" size={16} /> Taux de disponibilité 99,9%</span>
            </div>
            <Button variant="light" href="/contact">Demander l’accès Sandbox</Button>
          </div>
          <CodeWindow />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="kicker">ARCHITECTURE TECHNIQUE</span>
            <h2>Les standards d’ingénierie que vous attendez.</h2>
            <p>Construit selon les meilleures pratiques internationales pour garantir fiabilité et sécurité.</p>
          </div>

          <div className="card-grid-3">
            <div className="info-card">
              <div className="info-card-icon"><Icon name="code" size={24} /></div>
              <h3>Gestion de l’Idempotence</h3>
              <p>
                Fournissez un header <code>Idempotency-Key</code> unique par commande pour garantir qu’aucune requête répétée (perte de connexion, retry) ne débite le client deux fois.
              </p>
            </div>

            <div className="info-card">
              <div className="info-card-icon"><Icon name="webhook" size={24} /></div>
              <h3>Webhooks Signés (HMAC)</h3>
              <p>
                Recevez les notifications d’encaissement ou d’échec en direct. Chaque payload est signé cryptographiquement via <code>X-KwêTché-Signature</code> pour attester de son authenticité.
              </p>
            </div>

            <div className="info-card">
              <div className="info-card-icon"><Icon name="shield" size={24} /></div>
              <h3>Environnement Bac à sable</h3>
              <p>
                Simulez des succès, des refus de solde ou des délais d’attente opérateur grâce à nos numéros de téléphone et scénarios de test pré-configurés.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-heading">
            <span className="kicker">ÉCOSYSTÈME ET LIBRAIRIES</span>
            <h2>Vos langages et frameworks favoris.</h2>
            <p>Démarrez rapidement avec nos exemples d’implémentation et SDKs officiels.</p>
          </div>

          <div className="card-grid-2">
            <div className="info-card">
              <span className="pill-badge">npm i @kwetchepay/sdk</span>
              <h3>Node.js / TypeScript</h3>
              <p>
                Support complet des promesses, typage TypeScript strict pour toutes les réponses de l’API, et validation intégrée des signatures de webhooks.
              </p>
            </div>

            <div className="info-card">
              <span className="pill-badge">composer require kwetchepay/php</span>
              <h3>PHP / Laravel / Symfony</h3>
              <p>
                Client PHP léger et compatible PHP 8.x, avec providers Laravel pour injecter le client de paiement directement dans vos services.
              </p>
            </div>

            <div className="info-card">
              <span className="pill-badge">pip install kwetchepay</span>
              <h3>Python / Django / FastAPI</h3>
              <p>
                Client synchrone et asynchrone (asyncio) pour les applications Python à haut débit et les microservices financiers.
              </p>
            </div>

            <div className="info-card">
              <span className="pill-badge">Plugin officiel</span>
              <h3>CMS & E-commerce (WooCommerce, PrestaShop)</h3>
              <p>
                Modules prêts à installer pour accepter le paiement MTN MoMo, Moov Money et Celtiis Cash sur votre boutique en moins de 10 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-pattern" />
        <div className="container cta-content">
          <span className="kicker kicker-light">COMMENCEZ À DÉVELOPPER</span>
          <h2>Prêt à intégrer KwêTché Pay ?</h2>
          <p>Obtenez vos identifiants d’environnement de test et recevez votre premier paiement simulé en 5 minutes.</p>
          <div className="cta-actions">
            <Button variant="light" href="/contact">Créer un compte développeur</Button>
            <Button variant="secondary" href="mailto:contact@kwetchepay.bj">Contacter l’équipe technique</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
