# Questions ouvertes pour Boualem

Points à valider / assets à fournir avant mise en production.

---

## 1. Assets manquants (placeholders en place dans le code)

- [ ] **Photos pro** Boualem Bensalem (800×800 min, carré)
- [ ] **Photos pro** Ayoub Bensalem (800×800 min, carré)
  - *Actuellement* : placeholders gris avec initiales "BB" et "AB"
  - *Emplacement* : `src/pages.jsx` → composant `AboutPage` → blocs `person`
- [ ] **Screenshots projets** en 16:9 (1920×1080 recommandé) pour :
  - iafactory.ch
  - RateBoost
  - KhutbaBox
  - change.iafactory.ch
  - iafactoryalgeria.com
  - *Actuellement* : placeholders SVG avec grille + nom du projet
  - *Emplacement* : classe CSS `.project-ph` dans `site.css` — à remplacer par `<img>` avec src des vrais screenshots (à déposer dans `public/projects/`)
- [ ] **Image OG définitive** (1200×630, format PNG)
  - *Actuellement* : `public/og-image.svg` généré en code, à remplacer par un export PNG soigné

---

## 2. Valeurs à confirmer

- [ ] **Tarifs** affichés partout :
  - Automatisations dès CHF 1'800
  - Agents IA dès CHF 6'500
  - SaaS sur-mesure dès CHF 18'000
  - *À valider* : ces montants sont-ils bien les tarifs de départ 2026 ?
- [ ] **URL KhutbaBox** : actuellement marquée "Demo interne uniquement" dans `getProjectsData()` (pages.jsx) car URL publique non fournie. Si disponible, me la communiquer pour la câbler.
- [ ] **URL change.iafactory.ch** : utilisée dans le code, à confirmer qu'elle est bien en prod.

---

## 3. Backend démos live (v2)

Les 4 démos IA (RAG, OCR, Email, Audio) tournent actuellement en **mode fallback statique** (affichage des données figées depuis `demo-fallbacks.json`).

Pour activer les démos live :
- [ ] Clé API Claude dédiée démos (séparée de la prod)
- [ ] Provisionnement Qdrant (KB RAG fiduciaire fictive)
- [ ] Instance Redis (rate limiting 10 req/IP/h)
- [ ] Budget API mensuel plafonné à CHF 50
- [ ] Corpus RAG : rédiger les 20 documents fictifs du "Cabinet Comptable Lac Léman"
- [ ] 3 PDFs factures exemples pour démo OCR
- [ ] 5 emails exemples pour démo Tri Email
- [ ] 2 audios pré-enregistrés pour démo Traducteur

---

## 4. Formulaire contact

Le formulaire `/contact` envoie actuellement en `POST /api/contact`. En cas d'échec, fallback sur `mailto:contact@binacore.ch`.

- [ ] Backend à implémenter pour recevoir les soumissions (FastAPI ou service type Formspree)
- [ ] OU validation avec Boualem : on garde juste le fallback mailto en v1 ?

---

## 5. Domaine et SSL

- [ ] binacore.ch pointé vers le serveur Hetzner
- [ ] Certificat SSL (Caddy s'en occupe automatiquement une fois le DNS en place)
- [ ] Redirect HTTP → HTTPS
- [ ] Redirect www.binacore.ch → binacore.ch

---

## 6. Contenus à relire

- [ ] **Mentions légales** (`#/mentions-legales`) — vérifier RC Genève, raison sociale exacte, adresse postale (actuellement "sur demande")
- [ ] **Politique de confidentialité** (`#/confidentialite`) — vérifier la durée de conservation (actuellement 2 ans)
- [ ] **Manifesto home** — citation "Une PME suisse ne devrait pas dépendre…" — validation du ton
- [ ] **Chatbot audit** — messages bot en 11 étapes (page `/a-propos`) : relire le ton et la formulation

---

## 7. Points techniques à valider avant prod

- [ ] Test Lighthouse (cible Performance ≥ 85, Accessibility ≥ 90, SEO ≥ 95)
- [ ] Test responsive 375 / 768 / 1024 / 1440 / 1920 px
- [ ] Test cross-browser Chrome / Firefox / Safari (attention `mix-blend-mode: difference` sur la nav)
- [ ] Vérifier que Babel Standalone est acceptable en prod (alternative : bundler Vite en v2 si perf insuffisante)

---

## 8. Suggestions v2 (non bloquantes)

- Carnet / blog technique sur `/notes` (retours d'expérience RAG, Claude, etc.)
- Traduction arabe pour pages clés (cible PME algériennes)
- Newsletter mensuelle (si volume de trafic suffisant)
- Page carrière (quand l'équipe s'agrandit)

---

**Répondre par email à contact@binacore.ch ou directement en éditant ce fichier.**
