import Link from 'next/link'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer>
      <div className="container footer-main">
        <div className="footer-brand">
          <Logo light />
          <p>L’infrastructure de paiement conçue pour les entreprises qui font avancer l’Afrique de l’Ouest.</p>
          <span>Cotonou, République du Bénin</span>
        </div>
        <div className="footer-column">
          <b>Produit</b>
          <Link href="/solutions">Solutions</Link>
          <Link href="/marchands">Marchands</Link>
          <Link href="/developpeurs">Développeurs</Link>
          <Link href="/tarifs">Tarification</Link>
        </div>
        <div className="footer-column">
          <b>Entreprise</b>
          <Link href="/">À propos</Link>
          <Link href="/contact">Contact</Link>
          <a href="mailto:contact@kwetchepay.bj?subject=Partenariat%20Kw%C3%AATch%C3%A9%20Pay">Partenaires</a>
          <a href="mailto:contact@kwetchepay.bj?subject=Candidature%20Kw%C3%AATch%C3%A9%20Pay">Carrières</a>
        </div>
        <div className="footer-column">
          <b>Ressources</b>
          <Link href="/developpeurs">Documentation API</Link>
          <Link href="/securite">Sécurité & Conformité</Link>
          <a href="mailto:contact@kwetchepay.bj?subject=Statut%20des%20services">Statut des services</a>
          <a href="mailto:contact@kwetchepay.bj?subject=Demande%20d%E2%80%99aide">Centre d’aide</a>
        </div>
        <div className="footer-column">
          <b>Légal</b>
          <a href="mailto:contact@kwetchepay.bj?subject=Politique%20de%20confidentialit%C3%A9">Confidentialité</a>
          <a href="mailto:contact@kwetchepay.bj?subject=Conditions%20d%E2%80%99utilisation">Conditions d&apos;utilisation</a>
          <a href="mailto:contact@kwetchepay.bj?subject=Mentions%20l%C3%A9gales">Mentions légales</a>
          <a href="mailto:contact@kwetchepay.bj?subject=Politique%20relative%20aux%20cookies">Cookies</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 KwêTché Pay. Tous droits réservés.</span>
        <span className="footer-status"><i /> Tous les systèmes sont opérationnels</span>
        <span>Une société associée à GoRéparr</span>
      </div>
    </footer>
  )
}
