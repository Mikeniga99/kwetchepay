# KwêTché Pay — Front-end

Interface web de KwêTché Pay, construite avec Next.js App Router, React et TypeScript. Le dépôt contient le site public, des interfaces de démonstration pour les espaces marchand et super administrateur, ainsi que les éléments visuels partagés.

> **État du projet :** le front-end est une maquette interactive. Les données affichées sont locales ou simulées. Les connexions, paiements, reversements, demandes de compte, alertes et réglages ne sont pas reliés à un service de production.

## Prérequis

- Node.js 20 ou une version LTS plus récente
- npm

Le dépôt contient `package-lock.json`. Utiliser `npm ci` pour installer les versions verrouillées.

## Installation et commandes

```bash
npm ci
npm run dev
```

Le serveur de développement est accessible sur <http://localhost:3000>.

| Commande | Utilité |
| --- | --- |
| `npm run dev` | Lance le serveur de développement Next.js. |
| `npm run lint` | Vérifie les types TypeScript avec `tsc --noEmit`. Ce script ne lance pas ESLint. |
| `npm run build` | Compile et pré-rend le site pour la production. |
| `npm start` | Sert le build de production après `npm run build`. |

Aucun script `test` ni suite de tests automatisés n’est actuellement défini dans `package.json`.

## Routes front-end

### Site public

| Route | Contenu |
| --- | --- |
| `/` | Accueil, présentation et aperçu du tableau de bord. |
| `/solutions` | Présentation des solutions. |
| `/marchands` | Présentation de l’espace marchand. |
| `/developpeurs` | Présentation technique et documentation front-end. |
| `/securite` | Présentation de l’approche sécurité. |
| `/tarifs` | Présentation des offres. |
| `/contact` | Portail de demande de compte. |
| `/connexion` | Portail de connexion de démonstration. |

### Espace marchand de démonstration

| Route | Contenu |
| --- | --- |
| `/dashboard` | Vue d’ensemble et indicateurs. |
| `/dashboard/transactions` | Liste et détails des transactions simulées. |
| `/dashboard/liens` | Gestion locale de liens de paiement de démonstration. |
| `/dashboard/reversements` | Historique et formulaire de reversement de démonstration. |
| `/dashboard/clients` | Contacts, historique exemple, export CSV local et ajout temporaire de contact. |
| `/dashboard/rapports` | Indicateurs et exports de démonstration. |
| `/dashboard/developpeurs` | Clés et outils d’intégration de démonstration. |
| `/dashboard/parametres` | Paramètres marchands de démonstration. |

### Console super administrateur

`/super-admin` présente une interface de supervision en lecture seule avec des données d’exemple. Ce parcours est uniquement visuel : il n’applique aucune décision ni modification de compte.

## Organisation du code

```text
app/
  layout.tsx                 Layout racine, polices, métadonnées et styles globaux
  page.tsx                   Accueil
  globals.css                Styles globaux, composants et responsive
  dashboard/                 Layout et pages de l’espace marchand
  super-admin/               Console de démonstration en lecture seule
  connexion/ contact/        Portails d’authentification et d’inscription
  solutions/ marchands/      Pages publiques
  developpeurs/ securite/ tarifs/
components/
  Header.tsx, Footer.tsx     Navigation publique
  SiteShell.tsx              Composition des layouts selon la route
  AuthGlassPortal.tsx        Portail connexion/inscription
  HeroWeatherBackground.tsx  Arrière-plan animé partagé
  FintechLiveBackground.tsx  Scène visuelle du fleuve et de la pirogue
  DashboardPreview.tsx       Aperçu du tableau de bord sur le site public
  OperatorLogo.tsx           Logos des opérateurs
lib/
  dashboard-data.ts          Données d’exemple du tableau de bord
public/                       Logos, icônes et images statiques
```

Les pages publiques et les interfaces du tableau de bord réutilisent des composants de `components/`. `SiteShell` affiche l’en-tête et le pied de page publics, et laisse les espaces dashboard et super admin gérer leur propre cadre d’interface.

## Système visuel et animations

- Couleurs principales : bleu nuit `#0E3864` et orange `#FD6D00`.
- Polices : Manrope pour l’interface et DM Mono pour les références et données techniques, chargées avec `next/font`.
- Les styles sont principalement écrits en CSS dans `app/globals.css`, avec quelques styles locaux dans les composants.
- L’arrière-plan météo alterne pluie, soleil et nuit sur les héros et les pages connexion/inscription. La scène conserve le fleuve et la pirogue. Les éléments de décor sont réalisés côté navigateur ; l’animation respecte la préférence système de réduction des mouvements.
- Les images et logos servis localement se trouvent dans `public/`.

## Données et comportements de démonstration

Les interactions locales servent à présenter les parcours et ne doivent pas être interprétées comme des opérations réelles :

- La connexion ne vérifie pas d’identifiants et mène au dashboard de démonstration.
- L’inscription affiche une confirmation locale, sans transmettre la demande.
- Les chiffres, transactions, clients, statuts opérateurs et éléments super admin sont des exemples codés dans le front.
- Les sélecteurs Sandbox/Production et les clés API affichées ne pilotent pas de vrais environnements.
- Certaines actions (paiement Mobile Money, remboursement, reversement, webhooks et exports PDF/Excel) sont simulées. L’export de la liste Clients produit un CSV à partir des données visibles ; un contact ajouté n’existe qu’en mémoire jusqu’au rechargement de la page.
- Les liens d’aide, de partenariat, de statut et de demande de documents légaux ouvrent un message e-mail prérempli. Les pages et contenus juridiques officiels restent à fournir.

Ne pas utiliser les données ou les formulaires de démonstration pour traiter de vrais paiements, gérer des comptes ou prendre des décisions opérationnelles.

## Déploiement sur Vercel

Le projet utilise Next.js et un `package-lock.json`, sans configuration Vercel personnalisée. Vercel peut détecter le framework et utiliser la configuration de build standard :

- Framework : Next.js
- Installation : `npm ci` (déduite de `package-lock.json`)
- Build : `npm run build`
- Répertoire de sortie : valeur par défaut de Next.js/Vercel

Aucune variable d’environnement n’est requise par le front-end actuel. Configurer dans les paramètres Vercel tout secret ou toute URL de service ajoutés ultérieurement ; ne jamais exposer de secret dans une variable `NEXT_PUBLIC_*`.

Avant une mise en ligne, vérifier le déploiement Preview sur Vercel, les routes publiques et les parcours responsive sur mobile. Un build local réussi valide la compilation, mais ne remplace pas une vérification sur le projet Vercel et son domaine.

## Licence

Tous droits réservés © 2026 KwêTché Pay — République du Bénin.
