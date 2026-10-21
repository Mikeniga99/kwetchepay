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
          <Link href="/contact">Partenaires</Link>
          <Link href="/contact">Carrières</Link>
        </div>
        <div className="footer-column">
          <b>Ressources</b>
          <Link href="/developpeurs">Documentation API</Link>
          <Link href="/securite">Sécurité & Conformité</Link>
          <Link href="/contact">Statut des services</Link>
          <Link href="/contact">Centre d’aide</Link>
        </div>
        <div className="footer-column">
          <b>Légal</b>
          <Link href="/contact">Confidentialité</Link>
          <Link href="/contact">Conditions d&apos;utilisation</Link>
          <Link href="/contact">Mentions légales</Link>
          <Link href="/contact">Cookies</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2025 KwêTché Pay. Tous droits réservés.</span>
        <span className="footer-status"><i /> Tous les systèmes sont opérationnels</span>
        <span>Une société associée à GoRepa</span>
      </div>
    </footer>
  )
}
