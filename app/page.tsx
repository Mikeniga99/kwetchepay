import { Button } from '@/components/Button'
import { CodeWindow } from '@/components/CodeWindow'
import { DashboardPreview } from '@/components/DashboardPreview'
import { FintechLiveBackground } from '@/components/FintechLiveBackground'
import { Icon, type IconName } from '@/components/Icon'
import { Logo } from '@/components/Logo'
import { OperatorLogo } from '@/components/OperatorLogo'
import Link from 'next/link'

const features = [
  { icon: 'phone' as IconName, number: '01', title: 'Mobile Money, simplement', text: 'Acceptez MTN MoMo, Moov Money et Celtiis Cash depuis une interface unique, selon la disponibilité de nos partenaires.' },
  { icon: 'code' as IconName, number: '02', title: 'Une API pensée pour bâtir', text: 'Une intégration claire, documentée et testable. Passez du bac à sable à la production sans réécrire votre parcours.' },
  { icon: 'bars' as IconName, number: '03', title: 'Pilotez votre activité', text: 'Transactions, commissions, reversements et incidents réunis dans un tableau de bord lisible et actionnable.' },
]

const steps = [
  { number: '01', title: 'Créez votre espace', text: 'Renseignez les informations de votre entreprise et invitez votre équipe.' },
  { number: '02', title: 'Finalisez la vérification', text: 'Votre dossier est transmis et suivi selon le processus du partenaire agréé.' },
  { number: '03', title: 'Intégrez KwêTché Pay', text: 'Utilisez notre page hébergée ou connectez directement votre produit à l’API.' },
  { number: '04', title: 'Encaissez et suivez', text: 'Recevez les statuts en temps réel et rapprochez chaque transaction.' },
]

export default function Home() {
  return (
    <main>
      <section className="hero" id="accueil">
          <FintechLiveBackground />
          <div className="container hero-content">
            <div className="hero-copy">
              <h1 className="reveal">Tous vos paiements.<br /><em>Une seule plateforme.</em></h1>
              <p className="hero-lead reveal delay-2">Acceptez le Mobile Money, automatisez vos encaissements et pilotez votre activité avec une infrastructure fiable, conçue pour les entreprises d’Afrique de l’Ouest.</p>
              <div className="hero-actions reveal delay-3">
                <Button href="/contact">Commencer avec KwêTché Pay</Button>
                <Button variant="secondary" href="/developpeurs">Explorer la documentation</Button>
              </div>
              <div className="hero-trust reveal delay-3">
                <span><Icon name="check" size={16} /> Environnement de test gratuit</span>
                <span><Icon name="check" size={16} /> Sans engagement</span>
              </div>
            </div>
            <DashboardPreview />
          </div>
          <div className="trust-strip">
            <div className="container trust-inner">
              <span className="trust-label">Pensé pour les paiements locaux</span>
              <div className="operator"><OperatorLogo operator="mtn" size={28} /><b>MTN MoMo</b></div>
              <div className="operator"><OperatorLogo operator="moov" size={28} /><b>Moov Money</b></div>
              <div className="operator"><OperatorLogo operator="celtiis" size={28} /><b>Celtiis Cash</b></div>
              <div className="operator"><OperatorLogo operator="xof" size={28} /><b>Franc CFA</b></div>
            </div>
          </div>
        </section>

        <section className="section solutions" id="solutions">
          <div className="container">
            <div className="section-heading observe">
              <span className="kicker">UNE INFRASTRUCTURE, PLUSIEURS POSSIBILITÉS</span>
              <h2>Le paiement ne devrait jamais<br />ralentir votre croissance.</h2>
              <p>KwêTché Pay simplifie les complexités techniques pour vous laisser vous concentrer sur ce qui compte : votre entreprise.</p>
            </div>
            <div className="feature-grid">
              {features.map((feature, index) => (
                <article className="feature-card observe" style={{ transitionDelay: `${index * 100}ms` }} key={feature.title}>
                  <div className="feature-top"><span className="feature-icon"><Icon name={feature.icon} size={24} /></span><span className="feature-number">{feature.number}</span></div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                  <Link href="/solutions">En savoir plus <Icon name="arrow" size={16} /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section merchants" id="marchands">
          <div className="container split-layout">
            <div className="payment-visual observe">
              <div className="phone-shell">
                <div className="phone-top"><span /><i /></div>
                <Logo />
                <div className="pay-merchant"><span className="merchant-mark">G</span><span><small>Paiement à</small><b>GoMarket Bénin</b></span></div>
                <div className="pay-amount"><small>Montant à payer</small><strong>25 000 <em>F CFA</em></strong></div>
                <span className="method-label">Choisir un moyen de paiement</span>
                <div className="pay-method selected"><OperatorLogo operator="mtn" size={24} /><b>MTN MoMo</b><i><Icon name="check" size={13} /></i></div>
                <div className="pay-method"><OperatorLogo operator="moov" size={24} /><b>Moov Money</b><i /></div>
                <div className="pay-method"><OperatorLogo operator="celtiis" size={24} /><b>Celtiis Cash</b><i /></div>
                <button className="pay-button">Payer 25 000 F</button>
                <span className="secured"><Icon name="lock" size={13} /> Paiement sécurisé par KwêTché Pay</span>
              </div>
              <div className="visual-pattern" />
            </div>
            <div className="split-copy observe">
              <span className="kicker">POUR LES MARCHANDS</span>
              <h2>Encaissez partout.<br />Gardez le contrôle.</h2>
              <p className="large-copy">Du premier paiement au rapprochement quotidien, KwêTché Pay vous donne une vision claire de chaque franc encaissé.</p>
              <div className="benefit-list">
                <div><span><Icon name="trend" /></span><p><b>Suivi en temps réel</b><small>Consultez les paiements, statuts et commissions sans attendre.</small></p></div>
                <div><span><Icon name="users" /></span><p><b>Une équipe bien organisée</b><small>Invitez vos collaborateurs et gérez leurs permissions précisément.</small></p></div>
                <div><span><Icon name="webhook" /></span><p><b>Des notifications fiables</b><small>Vos systèmes restent synchronisés grâce aux webhooks authentifiés.</small></p></div>
              </div>
              <Button href="/marchands">Découvrir l’espace marchand</Button>
            </div>
          </div>
        </section>

        <section className="section developer" id="developpeurs">
          <div className="container split-layout dev-layout">
            <div className="split-copy light-copy observe">
              <span className="kicker kicker-light">CONÇU POUR LES DÉVELOPPEURS</span>
              <h2>Quelques lignes de code.<br />Des paiements qui circulent.</h2>
              <p className="large-copy">Une API prévisible, des réponses claires et un environnement de test complet pour intégrer sans friction.</p>
              <div className="dev-points">
                <span><Icon name="check" size={16} /> API REST documentée</span>
                <span><Icon name="check" size={16} /> SDK et exemples pratiques</span>
                <span><Icon name="check" size={16} /> Idempotence native</span>
                <span><Icon name="check" size={16} /> Webhooks signés</span>
              </div>
              <Button variant="light" href="/developpeurs">Lire la documentation</Button>
            </div>
            <CodeWindow />
          </div>
        </section>

        <section className="section process">
          <div className="container">
            <div className="section-heading left observe">
              <span className="kicker">DU PROJET AU PREMIER PAIEMENT</span>
              <h2>Opérationnel, étape par étape.</h2>
            </div>
            <div className="steps">
              {steps.map((step, index) => (
                <div className="step observe" style={{ transitionDelay: `${index * 90}ms` }} key={step.number}>
                  <div className="step-number"><span>{step.number}</span>{index < steps.length - 1 && <i />}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section security" id="securite">
          <div className="container security-shell observe">
            <div className="security-copy">
              <span className="kicker">SÉCURITÉ & CONFORMITÉ</span>
              <h2>La confiance n’est pas une option.</h2>
              <p>KwêTché Pay conçoit sa technologie autour d’un principe simple : chaque transaction doit être traçable, protégée et opérée dans un cadre clair.</p>
              <Link href="/securite">Découvrir notre approche sécurité <Icon name="arrow" size={17} /></Link>
            </div>
            <div className="security-grid">
              <div><span><Icon name="shield" /></span><b>Partenaire agréé</b><small>Les opérations réglementées et les fonds sont gérés par un prestataire habilité.</small></div>
              <div><span><Icon name="lock" /></span><b>Données protégées</b><small>Chiffrement, contrôles d’accès et journalisation des actions sensibles.</small></div>
              <div><span><Icon name="clock" /></span><b>Surveillance continue</b><small>Suivi des statuts, alertes opérationnelles et reprise contrôlée.</small></div>
              <div><span><Icon name="globe" /></span><b>Ancrage UEMOA</b><small>Un modèle construit pour respecter les exigences locales applicables.</small></div>
            </div>
          </div>
        </section>

        <section className="section pricing" id="tarifs">
          <div className="container pricing-shell">
            <div className="pricing-copy observe">
              <span className="kicker">UNE TARIFICATION LISIBLE</span>
              <h2>Vous développez.<br />Nous nous adaptons.</h2>
              <p>Des frais transparents, alignés sur votre activité et les conditions de nos partenaires. Aucun coût caché.</p>
              <span className="pricing-note"><Icon name="check" size={16} /> Les frais définitifs seront communiqués avant activation.</span>
            </div>
            <div className="price-card observe">
              <span className="price-label">OFFRE LANCEMENT</span>
              <h3>Paiement à l’usage</h3>
              <div className="price"><strong>Sur mesure</strong><small>selon volume et moyens de paiement</small></div>
              <ul>
                <li><Icon name="check" size={16} /> Aucun abonnement mensuel</li>
                <li><Icon name="check" size={16} /> Tableau de bord complet</li>
                <li><Icon name="check" size={16} /> API et page de paiement</li>
                <li><Icon name="check" size={16} /> Support à l’intégration</li>
              </ul>
              <Button href="/tarifs">Consulter notre offre</Button>
            </div>
          </div>
        </section>

        <section className="cta-section" id="contact">
          <div className="cta-pattern" />
          <div className="container cta-content observe">
            <span className="kicker kicker-light">PRÊT À DÉMARRER ?</span>
            <h2>Faites circuler votre activité.</h2>
            <p>Rejoignez les entreprises qui préparent la prochaine génération des paiements au Bénin.</p>
            <div className="cta-actions">
              <Button variant="light" href="/contact">Demander un accès anticipé</Button>
              <Link className="text-link-light" href="/contact">Nous contacter <Icon name="arrow" size={17} /></Link>
            </div>
          </div>
        </section>
      </main>
  )
}
