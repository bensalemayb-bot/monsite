# Binacore — Site officiel (v1.0)

Site marque Binacore : atelier de build IA indépendant basé à Genève.
Builder · Automatisations · Agents IA · SaaS sur-mesure.

**Stack technique**
- React 18 (UMD via CDN) + Babel Standalone pour JSX inline
- CSS en variables (pas de Tailwind, pas de bundler)
- Routing hash-based (`#/home`, `#/services`, …)
- Fonts : Inter (sans), Instrument Serif (italique accents), JetBrains Mono (tags, stats)
- Déploiement : simple copie statique (Hetzner + Caddy, Vercel, GitHub Pages, etc.)

---

## 1. Structure

```
site/
├── src/
│   ├── index.html            # Entrypoint (CDN, meta, schema.org)
│   ├── site.css              # Design system complet (~1100 lignes)
│   ├── router.js             # window.__nav + redirection legacy
│   ├── components.jsx        # Nav, Footer, AuditModal, CursorFollower, etc.
│   ├── pages.jsx             # 9 pages (Home, Services, Agents, …)
│   ├── demos.jsx             # DemoModal + 4 démos (mode fallback v1)
│   ├── demo-fallbacks.json   # Données mockées des démos
│   └── app.jsx               # Montage React
├── public/
│   ├── favicon.svg
│   ├── logo-binacore.svg
│   ├── logo-binacore-lime.svg
│   ├── og-image.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── llms.txt
├── backend/                  # (réservé à la v2, démos live)
│   └── api/
├── README.md
├── CHANGELOG.md
└── QUESTIONS_BOUALEM.md
```

---

## 2. Lancer en local

Option la plus simple — serveur HTTP statique (Python) :

```bash
# Depuis la racine du repo
python -m http.server 8000 --bind 0.0.0.0 --directory src
```

Puis ouvrir **http://localhost:8000** dans le navigateur.

> Note : les fichiers `public/` (favicon, sitemap, llms.txt) sont servis depuis la racine du site en prod. Pour le dev local, ils sont également accessibles via `/public/...` si besoin — ajuster selon votre serveur.

**Alternative Node** :
```bash
npx serve src -l 8000
```

**Alternative PHP** :
```bash
php -S localhost:8000 -t src
```

---

## 3. Pages disponibles

| Route | Description |
|-------|-------------|
| `#/home` | Accueil (12 sections : hero parallax, preuves, narrative, services, bénéfices, démos, proof, processus, manifesto) |
| `#/services` | 3 piliers (ancres `#automatisations`, `#agents-ia`, `#saas-sur-mesure`) + pricing transparent |
| `#/agents` | 4 archétypes (Support, Inbox, Extract, Ops) avec stats + terminal + cas d'usage |
| `#/projets` | 5 projets réels filtrables (iafactory.ch, RateBoost, KhutbaBox, change.iafactory, iafactoryalgeria) |
| `#/processus` | Timeline 4 phases (Audit 48h → Itération continue) + délais réalistes |
| `#/a-propos` | Équipe (Boualem + Ayoub), histoire, conviction + **chatbot audit 11 étapes** |
| `#/contact` | Formulaire + infos directes + infrastructure CH |
| `#/mentions-legales` | Mentions légales |
| `#/confidentialite` | Politique de confidentialité (nLPD + RGPD) |
| `#/cas-usage` | Redirect automatique → `#/projets` |

---

## 4. Déploiement (Hetzner + Caddy)

```bash
# Upload du dossier src/ et public/ sur le serveur
scp -r src/* root@binacore.ch:/var/www/binacore/
scp -r public/* root@binacore.ch:/var/www/binacore/
```

Config Caddy minimale (`/etc/caddy/Caddyfile`) :

```
binacore.ch {
    root * /var/www/binacore
    file_server
    encode gzip zstd
    try_files {path} /index.html
    header /* {
        X-Frame-Options DENY
        X-Content-Type-Options nosniff
        Referrer-Policy strict-origin-when-cross-origin
        Permissions-Policy "camera=(), microphone=(self), geolocation=()"
    }
    header /index.html Cache-Control "no-cache, must-revalidate"
    header /*.css Cache-Control "public, max-age=31536000, immutable"
    header /*.js Cache-Control "public, max-age=31536000, immutable"
    header /*.svg Cache-Control "public, max-age=31536000"
}
```

Puis `systemctl reload caddy`.

---

## 5. Activer les démos live (v2, optionnel)

Les 4 démos IA tournent actuellement en **mode fallback** (données figées depuis `demo-fallbacks.json`). Pour activer les démos backend live :

1. Déployer le backend FastAPI (`backend/api/demo/*.py` — à écrire en v2)
2. Provisionner Qdrant (RAG), Redis (rate limit), clé Claude API dédiée
3. Configurer les variables d'environnement :
   - `CLAUDE_API_KEY` (plafond CHF 50/mois)
   - `QDRANT_URL` + `QDRANT_API_KEY`
   - `REDIS_URL`
   - `DEMO_MAX_PER_HOUR=10` (par IP)
   - `DEMO_MAX_PER_DAY=500` (quota global)
4. Basculer `demos.jsx` du mode `DemoComingSoon` vers un appel réel à `/api/demo/{rag,ocr,email,audio}`.

Ces étapes sont détaillées dans le brief original **PART 14**.

---

## 6. Roadmap v2.x

- [ ] Backend FastAPI pour les 4 démos (RAG + OCR + Email + Audio)
- [ ] Photos pro de l'équipe (remplacer les placeholders)
- [ ] Screenshots projets (remplacer les placeholders SVG)
- [ ] Traduction AR (pour les clients algériens)
- [ ] Ajouter page `/blog` ou `/notes` (carnet technique)
- [ ] Intégration formulaire → email (SMTP ou service transactionnel)

---

## 7. Contribuer / modifier

Les composants sont dans `components.jsx` et `pages.jsx`. Toutes les valeurs de design sont dans les **CSS variables** en tête de `site.css`.

- Changer la couleur d'accent : `--ac: #d4fb50;` dans `site.css`
- Changer les fonts : `--font-sans`, `--font-serif`, `--font-mono`
- Changer les CTAs / textes : édition directe dans `pages.jsx`

---

## 8. Auteur

- **Boualem Bensalem** — fondateur & lead builder, Binacore
- contact@binacore.ch
- Genève, Suisse

---

**Version** : 1.0 · Avril 2026
**Licence** : propriétaire — tous droits réservés.
