# KwêTché Pay 🚀💳

> **L’infrastructure de paiement souveraine pour les entreprises qui font avancer le Bénin et l’Afrique de l’Ouest.**

KwêTché Pay est une plateforme fintech unifiée permettant aux entreprises, marchands et développeurs d'encaisser les paiements **Mobile Money (MTN MoMo, Moov Money, Celtiis Cash)** et cartes bancaires via une console unique, sécurisée et conforme aux normes UEMOA.

---

## 🎨 Identité Visuelle & Charte Graphique
- **Bleu Nuit** : `#0E3864` (RVB : 14, 56, 100) — Confiance institutionnelle & sécurité bancaire
- **Orange Vif** : `#FD6D00` (RVB : 253, 109, 0) — Énergie, vitalité & inclusion financière
- **Noir Neutre** : `#000000` (RVB : 0, 0, 0) — Rigueur typographique & lisibilité
- **Emblème** : Fusion du portefeuille numérique (*wallet*) avec le « K » central et les gravures traditionnelles béninoises.

---

## ⚡ Fonctionnalités Clés
- **Portail d'Authentification Glossy Liquid Glass** : Carte glassmorphism ultra-moderne avec commutateur d'onglets instantané (*Connexion* ↔ *Inscription*) et adaptation responsive parfaite sur mobile.
- **Arrière-plan Vivant FinTech (Scène Ganvié Neo-Pirogue)** : Moteur d'animation 120 FPS ultra-léger en Canvas/CSS avec pirogue à réacteurs vers la lune KwêTché, poissons dorés et pluie de billets FCFA (10 000, 5 000, 2 000 F) et pièces de monnaie 500 F.
- **Tableau de Bord Marchand** : Vue synthétique des volumes encaissés, reversements bancaires/Mobile Money et gestion des clés API Sandbox / Production.
- **Support Télécom Bénin & UEMOA** : Gestion stricte des numéros à 10 chiffres (`+229 01 XX XX XX XX`).

---

## 🛠️ Stack Technique
- **Framework** : [Next.js 15](https://nextjs.org/) (App Router)
- **Bibliothèque UI** : [React 19](https://react.dev/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Styles** : [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla Modern CSS
- **Typographie** : Manrope & DM Mono via `next/font`

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ ou 20+
- npm ou pnpm

### Installation & Lancement
```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

### Compilation pour la production
```bash
npm run build
npm start
```

---

## ✅ Étapes réalisées

### Étape 1 à 3 — Fondations & Dashboard
- Mise en place de l'identité visuelle (Bleu Nuit & Orange KwêTché).
- Dashboard complet avec KPIs en temps réel et graphiques de performance.
- Intégration des logos opérateurs (MTN, Moov, Celtiis) et validation des numéros béninois.

### Étape 4 — Optimisation des Flux Financiers
- **Simulateur de frais interactif** : Calcul immédiat des frais bancaires (fixes) et Mobile Money (1%).
- **Planification automatique** : Gestion des fréquences de reversement (Quotidien, Hebdomadaire, Mensuel).
- **Historique enrichi** : Suivi précis des transactions avec statuts visuels animés (Succès, Traitement, Échec).

### Améliorations Design & UX
- **Navigation corrigée** : Correction des problèmes d'encodage et typographie.
- **Interface Adaptive** : Alignement du sélecteur d'environnement (Test/Prod) en mode "Glassmorphism".
- **Logo Dynamique** : Visibilité optimisée du logo sur fonds sombres (mode *light*).
- **Épuration UI** : Simplification du portail d'authentification pour une conversion maximale.
- **Layout Persistant** : Barre latérale fixée au défilement pour un accès permanent aux outils.

### Finalisation & Conformité Régionale (Dernière étape)
- **Validation USSD Stricte** : Mise en conformité des numéros béninois (préfixe `01` obligatoire).
- **Documentation Technique** : Intégration des snippets de vérification de signature HMAC pour les webhooks.
- **Accessibilité Mobile** : Optimisation des tables à colonnes multiples pour les écrans ultra-compacts.

### Étape 5 — Branding & Expérience Client
- **Studio de Personnalisation** : Interface de branding avec couleur dynamique et **Live Receipt Preview** sur châssis mobile simulé.
- **Console Développeur** : Gestion des clés API (Test/Live) et simulateur de Webhooks avec inspecteur JSON thémé.
- **Carnet de Payeurs** : Système d'avatars, historique client et relances multicanales (WhatsApp/SMS).

---

## 📄 Licence
Tous droits réservés © 2026 KwêTché Pay — République du Bénin.
