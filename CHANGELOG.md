# CHANGELOG — Binacore

Toutes les versions notables de ce projet.
Format inspiré de [Keep a Changelog](https://keepachangelog.com).

## [1.0.0] — 2026-04-24

### Première version publique

#### Ajouté
- **Architecture** : React 18 UMD + Babel Standalone + CSS variables, sans bundler
- **Routing** hash-based avec `window.__nav(route, anchor?)` + redirection legacy `/cas-usage` → `/projets`
- **9 pages complètes** :
  - Home (12 sections : hero SVG parallax, preuves, ticker, narrative, services, bénéfices, démos, proof, processus condensé, manifesto, CTA final)
  - Services (3 piliers avec ancres + pricing transparent)
  - Agents (4 archétypes Support/Inbox/Extract/Ops avec stats, terminal live, usecases)
  - Projets (5 projets réels avec filtres par catégorie)
  - Processus (timeline 4 phases + délais réalistes)
  - À propos (équipe nominative + histoire + conviction + chatbot audit 11 étapes)
  - Contact (formulaire validé + POST `/api/contact` + fallback mailto)
  - Mentions légales
  - Confidentialité (nLPD + RGPD)
- **Composants globaux** : Nav, MobileMenu, Footer (wordmark + 5 colonnes), AuditModal (4 étapes), CursorFollower, ScrollProgress, Toast, Icon (SVG inline, pas d'emoji)
- **Chatbot d'audit** sur `/a-propos#audit-chatbot` avec scénario 11 étapes, `pickLivrables()` et `estimateHours()`, écran diagnostic final
- **Animations** : hero parallax (scroll-based), pulse ring SVG, dash-flow paths, travellers animateMotion, ticker marquee, reveal stagger, typing dots chatbot, route transition — toutes désactivées sous `prefers-reduced-motion`
- **SEO/GEO** : meta title/description par route, Open Graph, Twitter card, Schema.org Organization (JSON-LD), `robots.txt`, `sitemap.xml`, `llms.txt`
- **Assets** : favicon.svg, logo-binacore.svg (noir + lime), og-image.svg (1200×630)
- **Design system** : 4 variables de fonds, 4 de texte, 2 bordures, 3 accents ; 3 familles de fonts ; grille 8px ; boutons pill (primary + ghost) ; stats oversized ; tag mono
- **Démos IA (v1)** : 4 cartes avec modal + fallbacks JSON (pas de backend live en v1)
- **Responsive** : burger menu mobile, grilles dégradées 3→2→1 colonnes, tailles fluid via `clamp()`
- **Accessibilité** : skip link, focus-visible, aria-labels, aria-current, contraste WCAG AA, respect reduced-motion

#### À faire (v1.x / v2.0)
- Déploiement backend FastAPI pour démos live (voir README §5)
- Photos pro de l'équipe
- Screenshots projets réels
- Traduction AR pour clients algériens
