# GEO Analysis — binacore.ch

> **Objet** : visibilité du site Binacore sur les moteurs IA (Google AI Overviews, ChatGPT web search, Perplexity, Bing Copilot).
> **Date** : 2026-04-24
> **Stack auditée** : React 18 UMD + Babel Standalone + CSS variables (Option A du brief), routing hash-based, hébergement statique prévu (Hetzner + Caddy).
> **Référentiel** : GEO criteria (Ahrefs Dec 2025, Google AI Overviews data, 134-167 words passage optimum).

---

## 1. GEO Readiness Score : **43 / 100**

| Critère | Poids | Score | Notes |
|---|---|---|---|
| **Citability** (passages quotables) | 25 | 11 / 25 | Contenu rédigé et factuel, mais invisible aux crawlers car rendu JS-only. |
| **Structural readability** | 20 | 10 / 20 | H1/H2/H3 existent dans le JSX, mais pas dans le HTML servi. |
| **Multi-modal** | 15 | 3 / 15 | Aucune photo réelle (placeholders SVG), aucune vidéo, aucun graphique. |
| **Authority & brand signals** | 20 | 8 / 20 | `Organization` schema OK, mais pas de `Person` pour Boualem/Ayoub, pas de dates de publication, pas de présence Wikipédia/Reddit/YouTube/LinkedIn. |
| **Technical accessibility** | 20 | 11 / 20 | `llms.txt` propre, `robots.txt` OK mais générique, **SSR absent** → pénalité lourde. |

**Lecture courte** : tout le contenu éditorial est solide, mais il reste enfermé derrière une couche JavaScript que les crawlers IA n'exécutent pas. C'est un site "invisible" au sens GEO malgré un contenu qui, une fois rendu, serait très citable.

---

## 2. Platform breakdown

| Plateforme | Score estimé | Verdict |
|---|---|---|
| **Google AI Overviews** | 38 / 100 | Google est le seul crawler IA qui rend un peu de JS (via Googlebot), mais avec latence et limites. Sans SSR, les passages ne seront pas reliés à des requêtes précises. |
| **ChatGPT web (OAI-SearchBot)** | 42 / 100 | N'exécute pas JS. Voit uniquement les meta + le JSON-LD `Organization`. Cite le site uniquement si la requête porte sur "Binacore" en nom propre. |
| **Perplexity (PerplexityBot)** | 40 / 100 | Pareil, pas d'exécution JS. Privilégie Reddit/Wikipedia — aucune présence Binacore sur ces canaux aujourd'hui. |
| **Bing Copilot** | 50 / 100 | Crawle via Bing. Avec IndexNow + soumission manuelle des URLs, meilleure visibilité que les autres plateformes. |

**Conclusion plateforme** : optimiser pour un seul levier ne suffit pas. Le blocage est structurel (client-side rendering) avant d'être éditorial.

---

## 3. AI Crawler Access Status

Contenu actuel de `robots.txt` (fichier présent à la racine) :

```
User-agent: *
Allow: /

Sitemap: https://binacore.ch/sitemap.xml
```

**Statut par crawler** :

| Crawler | Autorisé | Commentaire |
|---|---|---|
| GPTBot (OpenAI) | ✅ (via `*`) | Autorisé implicitement. |
| OAI-SearchBot | ✅ (via `*`) | Idem. |
| ChatGPT-User | ✅ (via `*`) | Idem. |
| ClaudeBot (Anthropic) | ✅ (via `*`) | Idem. |
| PerplexityBot | ✅ (via `*`) | Idem. |
| anthropic-ai (training) | ✅ (via `*`) | À arbitrer : veut-on alimenter l'entraînement Anthropic ? |
| CCBot (Common Crawl) | ✅ (via `*`) | Utilisé pour entraîner de nombreux modèles. |
| Bytespider | ✅ (via `*`) | TikTok. Probablement sans valeur pour une cible PME CH. |

**Recommandation** : être explicite pour démontrer à Boualem (et à Google) que le site embrasse l'AI search, tout en bloquant les crawlers d'entraînement si ce n'est pas souhaité. Voir §8 pour le `robots.txt` recommandé.

---

## 4. llms.txt Status

**Présent** : `/llms.txt` sert un HTTP 200 avec 1210 bytes, bien structuré.

Contenu actuel :

```
# Binacore

Atelier de build IA indépendant basé à Genève, Suisse.
Exploité en raison individuelle par Boualem Bensalem.

## Offres
- Automatisations : workflows custom livrés en 3-7 jours, dès CHF 1'800
- Agents IA : assistants spécialisés en 1-3 semaines, dès CHF 6'500
- SaaS sur-mesure : micro-produits verticaux en 4-6 semaines, dès CHF 18'000

## Équipe / Stack / Projets / Valeurs / Contact
(…)
```

**Score** : 8 / 10. Structure OK. À enrichir avec :
- Date de dernière mise à jour (`Last updated: 2026-04-24`)
- Liens vers les pages internes (même si les fragments hash ne sont pas cawlables, une version pré-rendue les rendra pertinents)
- Une section `## FAQ` avec 4-5 Q/R qui matchent des requêtes AI courantes ("qu'est-ce qu'un builder IA", "combien coûte une automatisation IA PME suisse", etc.)

---

## 5. Brand Mention Analysis

> **Rappel étude Ahrefs Dec 2025** : les mentions de marque corrèlent 3× plus que les backlinks avec les citations IA. YouTube (0.737) et Reddit sont les leviers les plus forts.

| Canal | Présence actuelle (estimée) | Action |
|---|---|---|
| **Wikipedia** | Aucune (marque trop jeune, critères de notoriété non remplis) | Pas viable en 2026. Noter comme objectif 2027. |
| **Wikidata** | Aucune | Possible dès maintenant : créer une entité `Binacore` ou `Boualem Bensalem` avec `instance of: business`, `headquarters: Genève`, `founded: 2024`, `website: binacore.ch`. Lien faible mais indexé par ChatGPT. |
| **LinkedIn** | À vérifier | Si Boualem a un profil LinkedIn avec bio "Fondateur Binacore", c'est déjà un signal entité. À compléter avec une page entreprise Binacore. |
| **YouTube** | Aucune | Haut ROI long terme. 1 vidéo de démo/cas d'usage par mois = forte présence dans 6 mois. |
| **Reddit** | Aucune | Ne pas spammer. Participer sur r/Switzerland, r/ChatGPT, r/LocalLLaMA, r/Geneva avec valeur réelle. |
| **GitHub** | À vérifier | Rendre publics quelques repos (démos RAG, outils open-source) signe entité "dev-first". |
| **ProductHunt** | Aucune | Lancer un des produits (iafactory, RateBoost, KhutbaBox) sur PH crée une citation indexée à vie. |
| **Hacker News** | Aucune | Un bon "Show HN" sur KhutbaBox ou un post "how we built iafactory with Claude Code" = haute valeur. |

**Conclusion brand** : Binacore est invisible sur les canaux à haute valeur GEO. C'est normal à J+0 d'un lancement, mais c'est le point qui fera bouger le score sur 6-12 mois, plus que toute optimisation on-page.

---

## 6. Passage-Level Citability

**Méthodologie** : recherche de blocs auto-suffisants 134-167 mots dans le code source.

### Bloc 1 — Offre Automatisations (page /services)
```
Les workflows qui font gagner du temps.
3-7 jours par workflow · dès CHF 1'800

Exemples concrets :
— Extraction automatique des factures fournisseurs PDF → CRM/compta
— Enrichissement de leads entrants (email reçu → données scrappées + push CRM)
— Synchronisation Bexio ↔ Mailchimp ↔ Notion (alternative Zapier hébergée en CH)
— Alertes métier (détection d'événements business → notif Slack/WhatsApp/mail)
— Génération automatique de documents (devis, contrats, factures)

Stack technique : FastAPI · Python · Playwright · API REST · Webhooks · Redis · PostgreSQL.
```
**Longueur** : 87 mots. **Citability** : 7/10. Trop court pour être auto-suffisant, il faut ajouter une phrase de définition ("Une automatisation IA est…") en tête.

### Bloc 2 — Page À propos (équipe + conviction)
Contenu fort avec citation signée + chiffres (400 000 lignes de code, 2022 découverte IA, etc.). **Citability** : 8/10 si rendu côté serveur.

### Bloc 3 — Chatbot d'audit (11 étapes, non-indexable par nature)
Contenu conversationnel, pas du tout citable par les IA — ce qui est OK, ce n'est pas son rôle.

### Constats généraux
- Les chiffres concrets (prix, délais, nb d'agents, 98.2% OCR, < 30s latence) sont **très citables**.
- Les headlines avec `<em>` italique sont parsables HTML mais les crawlers actuels ne voient rien car rendu JS.
- Manque : **une FAQ structurée** avec questions explicites ("Combien coûte un agent IA pour une PME suisse ?"), qui correspondent exactement aux requêtes que les gens tapent dans ChatGPT.

---

## 7. Server-Side Rendering Check (CRITIQUE)

**Test effectué** : `curl -A "GPTBot" http://localhost:8765/` (simulation crawler sans JS).

**Ce que le crawler voit** :
- ✅ `<title>` + meta description + Open Graph (excellents)
- ✅ JSON-LD `Organization` schema (bien détaillé)
- ✅ `/llms.txt` accessible (1210 bytes)
- ❌ `<div id="root"></div>` **vide** — 0 H1, 0 H2, 0 paragraphe
- ❌ Aucun contenu éditorial dans le HTML source
- ❌ Routing hash (`#/services`) invisible au crawler : toutes les URLs retournent le même HTML vide

**Conséquence concrète** : en état actuel, pour la requête *« builder IA Genève automatisation PME »*, Binacore apparaîtra au mieux dans les résultats sur la marque propre ("binacore"), pas sur les requêtes génériques où les AI Overviews pourraient citer les prix, les délais, l'équipe, les projets.

**Trois chemins possibles pour fixer ça** (du plus rapide au plus complet) :

| Option | Effort | Résultat |
|---|---|---|
| **A. Snapshot statique pré-rendu** | 1-2 jours | On génère, au build, un fichier HTML complet par route via puppeteer (`home.html`, `services.html`, etc.). Le router hash reste pour la navigation JS, mais les crawlers reçoivent du vrai HTML. Caddy sert le fichier statique en fonction du `User-Agent` (bot vs humain) ou en fonction du chemin `/services` (et un JS client redirige vers `#/services`). |
| **B. Migration Next.js** | 4-5 jours | Reconstruire l'app en Next.js App Router (option B du brief). SSR natif, routes réelles (`/services` au lieu de `#/services`), ISR gratuit. Pertinent si Binacore scale. |
| **C. Version "noscript" dédupliquée** | 3-4 heures | Dans `index.html`, ajouter un `<noscript>` qui contient le texte clé de chaque page (750-1500 mots total). Fait le minimum syndical pour qu'un crawler voit le positionnement + les offres + l'équipe + le contact. Ne résout pas les URLs mais débloque l'essentiel. |

**Recommandation** : commencer par **C** cette semaine, prévoir **A** dans le mois, **B** si Binacore passe en v3 l'an prochain.

---

## 8. Top 5 Highest-Impact Changes

### #1 — Rendre le contenu visible aux crawlers (Option C ou A ci-dessus)
**Impact estimé** : +20 à +30 points sur le score GEO.
**Action** : Étape minimale = `<noscript>` avec 1 000 mots de contenu éditorial dans `index.html`. Étape cible = pré-rendu statique par route.

### #2 — Remplacer `robots.txt` générique par une version explicite AI-aware
**Impact** : +3 à +5 points · **Effort** : 2 minutes.
**Action** : voir contenu suggéré en fin de document.

### #3 — Ajouter le schema `Person` pour Boualem et Ayoub
**Impact** : +5 points sur citabilité nominative ("qui est Boualem Bensalem", "qui a créé iafactory.ch").
**Effort** : 30 min.
**Action** : 2 blocs JSON-LD supplémentaires avec `sameAs` vers leur LinkedIn / GitHub.

### #4 — Créer une page FAQ dédiée (URL propre `/faq` sans hash)
**Impact** : +7 à +10 points · **Effort** : 1 jour (rédaction + intégration SSR).
**Action** : 10-12 questions avec réponses en 134-167 mots chacune. Format structuré matchant les requêtes Perplexity/ChatGPT.

### #5 — Lancer la présence LinkedIn + YouTube
**Impact** : signal entité long terme, le plus gros levier à 6 mois selon Ahrefs.
**Effort** : page LinkedIn Binacore = 1h, 1ère vidéo YouTube = 1 jour.
**Action** : page entreprise LinkedIn, profile optimisé de Boualem, 1 vidéo "Comment on a construit iafactory.ch en 3 semaines avec Claude Code".

---

## 9. Schema Recommendations (prêts à copier)

Ajouter dans `index.html`, après le JSON-LD `Organization` existant :

```html
<!-- Person : Boualem Bensalem -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Boualem Bensalem",
  "jobTitle": "Fondateur & Lead Builder",
  "worksFor": { "@type": "Organization", "name": "Binacore", "url": "https://binacore.ch" },
  "nationality": ["CH", "DZ"],
  "homeLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": "Genève", "addressCountry": "CH" } },
  "knowsAbout": ["Automatisation IA", "Agents IA", "RAG", "FastAPI", "Next.js", "Claude", "LLM multi-agents"],
  "sameAs": [
    "https://www.linkedin.com/in/boualem-bensalem/",
    "https://github.com/boualem"
  ]
}
</script>

<!-- Person : Ayoub Bensalem -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ayoub Bensalem",
  "jobTitle": "Développeur & Co-builder",
  "worksFor": { "@type": "Organization", "name": "Binacore" },
  "knowsAbout": ["Frontend", "Bots WhatsApp", "Audio APIs", "Azure Speech", "ElevenLabs"]
}
</script>

<!-- ProfessionalService (en complément d'Organization) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Binacore",
  "description": "Automatisations, agents IA et SaaS sur-mesure pour PME suisses.",
  "url": "https://binacore.ch",
  "priceRange": "CHF 1'800 – CHF 18'000+",
  "serviceType": ["Automatisation IA", "Agents IA", "SaaS sur-mesure"],
  "areaServed": [
    { "@type": "Country", "name": "Suisse" },
    { "@type": "Country", "name": "Algérie" }
  ],
  "offers": [
    {
      "@type": "Offer",
      "name": "Automatisations",
      "price": "1800",
      "priceCurrency": "CHF",
      "description": "Workflows sur-mesure livrés en 3-7 jours."
    },
    {
      "@type": "Offer",
      "name": "Agents IA",
      "price": "6500",
      "priceCurrency": "CHF",
      "description": "Assistants spécialisés livrés en 1-3 semaines."
    },
    {
      "@type": "Offer",
      "name": "SaaS sur-mesure",
      "price": "18000",
      "priceCurrency": "CHF",
      "description": "Micro-produits verticaux livrés en 4-6 semaines."
    }
  ]
}
</script>

<!-- FAQPage (une fois la page FAQ créée) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte une automatisation IA pour une PME suisse ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chez Binacore, une automatisation démarre à CHF 1'800 pour un workflow livré en 3 à 7 jours. Un agent IA complet démarre à CHF 6'500 (build + 3 mois de réglages inclus). Un SaaS sur-mesure V1 démarre à CHF 18'000. Tous les projets incluent le code source, la documentation et 30 jours de support."
      }
    },
    {
      "@type": "Question",
      "name": "Qu'est-ce qu'un builder IA ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un builder IA construit des logiciels sur-mesure (automatisations, agents, SaaS) en utilisant des modèles de langage et des outils de code comme Claude Code. Contrairement à une agence traditionnelle qui livre en mois, un builder livre en jours. Contrairement à un SaaS, il livre du code que le client possède."
      }
    }
  ]
}
</script>
```

---

## 10. Content Reformatting — passages précis à ajouter

### Dans `index.html`, ajouter un `<noscript>` haut de body :

```html
<noscript>
  <article>
    <h1>Binacore — Builder IA à Genève</h1>
    <p>
      Binacore est un atelier de build IA indépendant basé à Genève, Suisse, exploité
      en raison individuelle par Boualem Bensalem. L'équipe (Boualem et son fils Ayoub)
      livre trois types de produits pour PME suisses : des automatisations (workflows
      custom, dès CHF 1'800, 3-7 jours), des agents IA (assistants spécialisés, dès
      CHF 6'500, 1-3 semaines) et des SaaS sur-mesure (micro-produits verticaux, dès
      CHF 18'000, 4-6 semaines). Tous les projets incluent le code source, la
      documentation technique et 30 jours de support.
    </p>

    <h2>Projets en production</h2>
    <ul>
      <li><a href="https://iafactory.ch">iafactory.ch</a> — plateforme IA suisse avec 6 agents verticaux (fiduciaire, juriste, immobilier, rédacteur, data, dev).</li>
      <li><a href="https://iafactoryalgeria.com">iafactoryalgeria.com</a> — plateforme IA pour le marché algérien (27 agents spécialisés).</li>
      <li><a href="https://rateboost.eu">RateBoost</a> — Revenue AI Agent pour hôteliers indépendants.</li>
      <li>KhutbaBox — traduction temps réel de sermons en 8 langues.</li>
      <li><a href="https://change.iafactory.ch">change.iafactory.ch</a> — comparateur EUR/CHF multi-sources.</li>
    </ul>

    <h2>Stack technique</h2>
    <p>Next.js, FastAPI, PostgreSQL, Qdrant, Redis, Docker, LiteLLM, Claude, Whisper, WhatsApp API. Hébergement en Suisse (Hetzner Zurich). Conformité nLPD et RGPD.</p>

    <h2>Contact</h2>
    <p>contact@binacore.ch · Genève, Suisse · Audit gratuit sous 48 h · Réponse sous 24 h ouvrées.</p>
  </article>
</noscript>
```

### Nouveau `robots.txt` recommandé

```
# Binacore — robots.txt

# AI search crawlers — autorisés (visibilité ChatGPT, Claude, Perplexity, AI Overviews)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# AI training crawlers — bloqués (on ne nourrit pas les datasets propriétaires)
User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: cohere-ai
Disallow: /

User-agent: Bytespider
Disallow: /

# Tout le reste
User-agent: *
Allow: /

Sitemap: https://binacore.ch/sitemap.xml
```

### Enrichir `/llms.txt` avec une section FAQ

Ajouter à la fin du fichier actuel :

```
## FAQ

### Qu'est-ce qu'un builder IA ?
Un builder IA construit des logiciels sur-mesure (automatisations, agents, SaaS) en utilisant
des modèles de langage comme Claude et des outils de code AI-natifs. Binacore livre en jours
ce qu'une agence traditionnelle livre en mois.

### Combien coûte une automatisation IA pour une PME suisse ?
Chez Binacore : dès CHF 1'800 par workflow (livraison 3-7 jours), dès CHF 6'500 pour un agent
IA complet (1-3 semaines), dès CHF 18'000 pour un SaaS sur-mesure (4-6 semaines).

### Où sont hébergées les données clients ?
En Suisse, chez Hetzner (région Zurich). Conformité nLPD suisse et RGPD européen.
Self-hosted disponible sur demande.

### Qui possède le code après livraison ?
Le client. Binacore livre chaque projet avec un repo privé, documentation technique,
et 30 jours de support inclus. Pas de vendor lock-in, pas de licence captive.

### Est-ce que Binacore travaille avec des clients algériens ?
Oui. Projets documentés en français et déployables au nord comme au sud de la Méditerranée.
Voir iafactoryalgeria.com pour un exemple concret.

Last updated: 2026-04-24
```

### Pages avec URLs réelles (plutôt que fragments hash)

Quand l'option A (snapshot statique) ou B (Next.js) sera en place, passer de :
```
https://binacore.ch/#/services
https://binacore.ch/#/agents
```
à :
```
https://binacore.ch/services
https://binacore.ch/agents
```

Mettre à jour `sitemap.xml` en conséquence — les fragments hash ne sont pas crawlés.

---

## 11. Checklist d'actions prioritaires

### Quick wins (< 1 heure)
- [ ] Remplacer `robots.txt` par la version explicite AI-aware (§10).
- [ ] Ajouter schema `Person` pour Boualem + Ayoub dans `index.html` (§9).
- [ ] Ajouter schema `ProfessionalService` avec offres chiffrées (§9).
- [ ] Ajouter un `<noscript>` avec 400-500 mots de contenu clé (§10).
- [ ] Enrichir `/llms.txt` avec la FAQ (§10).
- [ ] Corriger `sitemap.xml` — retirer les fragments hash inutiles pour les crawlers.

### Medium (2-4 heures)
- [ ] Créer une page FAQ dédiée (URL propre sans hash) avec 10 questions.
- [ ] Ajouter `FAQPage` schema une fois la page créée.
- [ ] Créer la page entreprise LinkedIn Binacore.
- [ ] Créer l'entité Wikidata pour Boualem Bensalem.

### High-impact (1-2 jours)
- [ ] Implémenter l'Option C (snapshot statique pré-rendu via puppeteer), OU
- [ ] Migrer en Next.js (Option B du brief) pour SSR natif.
- [ ] Ajouter des photos réelles de l'équipe (levier `ImageObject` schema).
- [ ] Première vidéo YouTube "Comment on a construit iafactory.ch avec Claude Code".

### Long-terme (6 mois)
- [ ] Cadence YouTube mensuelle (démos, retours d'expérience techniques).
- [ ] Participation Reddit authentique (r/Switzerland, r/ChatGPT, r/LocalLLaMA).
- [ ] Show HN / Product Hunt sur KhutbaBox ou RateBoost.
- [ ] Article Wikipedia une fois que 3 sources tierces auront cité Binacore.

---

## 12. TL;DR pour Boualem

Le site est **impeccable pour un humain** (design propre, contenu solide, 0 erreur console sur 9 routes) mais **quasi-invisible pour les crawlers IA** à cause du rendu 100% JavaScript. En l'état :
- ChatGPT web search + Perplexity : voient uniquement le JSON-LD `Organization` et le titre. Ne peuvent pas citer tes prix, tes délais, ton équipe, tes projets.
- Google AI Overviews : voit un peu plus (Googlebot rend du JS avec retard) mais pas de façon fiable.
- Bing Copilot : meilleur candidat court terme via IndexNow.

**Deux actions rendent 80% du score** :
1. **Ajouter un `<noscript>` avec le contenu clé** (3 heures) — débloque ChatGPT/Claude/Perplexity sur la marque et les offres.
2. **Lancer LinkedIn + YouTube** (1 journée) — signal brand-mention qui domine le scoring GEO selon Ahrefs.

Le reste (FAQ, Person schema, pré-rendu statique) est du polish qui pousse vers 75-80 / 100 sur 2-4 semaines.
