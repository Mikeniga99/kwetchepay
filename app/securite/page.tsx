import { Button } from '@/components/Button'
import { HeroWeatherBackground } from '@/components/HeroWeatherBackground'
import { Icon } from '@/components/Icon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sécurité & Conformité — KwêTché Pay',
  description:
    'Découvrez les standards de sécurité, le chiffrement et la conformité réglementaire UEMOA / BCEAO de KwêTché Pay.',
}

export default function SecuritePage() {
  return (
    <main>
      <section className="subpage-hero">
        <HeroWeatherBackground />
        <div className="container subpage-hero-inner">
          <h1>Une infrastructure conçue selon les plus hauts standards</h1>
          <p>
            Chaque transaction opérée via KwêTché Pay est protégée, tracée et exécutée dans le respect strict des réglementations financières de la zone UEMOA.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Button href="/contact">Échanger avec notre responsable conformité</Button>
            <Button variant="secondary" href="/developpeurs">Consulter l’architecture technique</Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="kicker">NOS 4 PILIERS DE PROTECTION</span>
            <h2>La sécurité intégrée à chaque couche de notre code.</h2>
            <p>Nous protégeons vos fonds et les données de vos clients avec la rigueur d’une institution financière.</p>
          </div>

          <div className="card-grid-2">
            <div className="info-card">
              <div className="info-card-icon"><Icon name="shield" size={24} /></div>
              <span className="pill-badge">Cadre Légal & Réglementaire</span>
              <h3>Établissement Agréé UEMOA</h3>
              <p>
                Toutes les opérations de collecte et de cantonnement de fonds sont traitées en étroite collaboration avec des partenaires bancaires et des établissements de monnaie électronique formellement agréés par la Banque Centrale des États de l’Afrique de l’Ouest (BCEAO).
              </p>
            </div>

            <div className="info-card">
              <div className="info-card-icon"><Icon name="lock" size={24} /></div>
              <span className="pill-badge">Cryptographie Avancée</span>
              <h3>Chiffrement de bout en bout</h3>
              <p>
                Toutes les communications transitent via des canaux chiffrés en TLS 1.3 avec Forward Secrecy. Les données sensibles et les identifiants marchands sont chiffrés au repos à l’aide de l’algorithme AES-256 et isolés dans des coffres-forts numériques sécurisés.
              </p>
            </div>

            <div className="info-card">
              <div className="info-card-icon"><Icon name="clock" size={24} /></div>
              <span className="pill-badge">Supervision Opérationnelle</span>
              <h3>Monitoring & Prévention Fraude 24/7</h3>
              <p>
                Nos moteurs analysent en temps réel les flux de transactions pour détecter les anomalies de vélocité, les tentatives de force brute et les transactions suspectes. Des mécanismes de blocage automatique protègent votre solde.
              </p>
            </div>

            <div className="info-card">
              <div className="info-card-icon"><Icon name="globe" size={24} /></div>
              <span className="pill-badge">Données Personnelles</span>
              <h3>Conformité APDP Bénin</h3>
              <p>
                KwêTché Pay respecte les exigences de l’Autorité de Protection des Données Personnelles (APDP) de la République du Bénin. Aucune donnée confidentielle relative aux codes secrets de paiement (PIN) n’est jamais enregistrée sur nos serveurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="section-heading">
            <span className="kicker">PROCESSUS DE CONTRÔLE</span>
            <h2>Une traçabilité totale pour chaque mouvement.</h2>
            <p>Notre engagement de transparence envers nos entreprises clientes.</p>
          </div>

          <div className="card-grid-3">
            <div className="info-card">
              <h3>Journalisation Immuable</h3>
              <p>
                Chaque événement (appel API, changement de statut, demande de virement) est inscrit dans un journal d’audit non modifiable avec horodatage précis.
              </p>
            </div>

            <div className="info-card">
              <h3>Ségrégation des Comptes</h3>
              <p>
                Les fonds des marchands sont strictement séparés des fonds d’exploitation de l’entreprise et cantonnés auprès de banques partenaires de premier rang.
              </p>
            </div>

            <div className="info-card">
              <h3>Tests d’Intrusion Réguliers</h3>
              <p>
                Notre infrastructure fait l’objet d’audits de vulnérabilités et de revues de code systématiques avant tout déploiement en production.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-pattern" />
        <div className="container cta-content">
          <span className="kicker kicker-light">DES QUESTIONS SUR LA SÉCURITÉ ?</span>
          <h2>Bâtissez sur une fondation sûre et éprouvée.</h2>
          <p>Nos experts en conformité répondent à toutes vos exigences de conformité et de due-diligence.</p>
          <div className="cta-actions">
            <Button variant="light" href="/contact">Contacter notre équipe conformité</Button>
            <Button variant="secondary" href="/marchands">Découvrir l’espace marchand</Button>
          </div>
        </div>
      </section>
    </main>
  )
}
