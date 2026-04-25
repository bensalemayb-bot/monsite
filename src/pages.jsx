// =========================================================================
// Binacore — Pages (Home, Services, Agents, Projets, Processus, About,
// Contact, MentionsLegales, Confidentialite)
// =========================================================================

const { useState, useEffect, useRef, useCallback, Fragment } = React;
const {
  Icon, Brand, SectionHeader, Beat, CtaBlock, StackStrip,
  useReveal, Magnetic, ScrambleStat
} = window.Binacore;

// =========================================================================
// HERO SCENE SVG (parallax + orchestrator + 8 nodes + paths + travellers)
// =========================================================================
function HeroScene() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      el.style.transform = `scale(${1 + progress * 0.35}) rotate(${progress * -4}deg) translateY(${progress * -120}px)`;
      el.style.opacity = String(Math.max(0, 0.85 - progress * 0.5));
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // 8 nœuds satellites (coord en viewBox 1200×800)
  const nodes = [
    { x: 200, y: 200, label: 'SUPPORT', live: true },
    { x: 1000, y: 250, label: 'INBOX', live: true },
    { x: 150, y: 500, label: 'EXTRACT', live: true },
    { x: 1050, y: 450, label: 'OPS', live: true },
    { x: 300, y: 650, label: 'SYNC', live: false },
    { x: 900, y: 600, label: 'MONITOR', live: true },
    { x: 400, y: 150, label: 'TRIAGE', live: true },
    { x: 700, y: 700, label: 'ARCHIVE', live: false },
  ];

  // 4 paths courbes (orchestrator -> node)
  const orch = { x: 600, y: 400 };
  const connNodes = [0, 1, 2, 3]; // connecte 4 nœuds via paths animés
  const paths = connNodes.map((i, k) => {
    const n = nodes[i];
    const mx = (orch.x + n.x) / 2;
    const my = (orch.y + n.y) / 2 + (k % 2 === 0 ? -80 : 80);
    return { id: `p${k}`, d: `M ${orch.x} ${orch.y} Q ${mx} ${my} ${n.x} ${n.y}` };
  });

  return (
    <svg
      ref={ref}
      className="hero__scene"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.08" />
          <stop offset="60%" stopColor="#2563eb" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Grille de fond (sombre fine sur fond clair) */}
      <g opacity="0.08">
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="800" stroke="#0f172a" strokeWidth="1" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 100} x2="1200" y2={i * 100} stroke="#0f172a" strokeWidth="1" />
        ))}
      </g>

      {/* Glow radial bleu */}
      <rect x="0" y="0" width="1200" height="800" fill="url(#heroGlow)" />

      {/* Paths avec dash-flow animé */}
      {paths.map((p) => (
        <g key={p.id}>
          <path id={p.id} d={p.d} stroke="#2563eb" strokeWidth="1.2" fill="none" strokeOpacity="0.45" strokeDasharray="6 6">
            <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="3.5s" repeatCount="indefinite" />
          </path>
          <circle r="4" fill="#2563eb">
            <animateMotion dur={`${3.6 + parseInt(p.id.slice(1)) * 0.4}s`} repeatCount="indefinite">
              <mpath href={`#${p.id}`} />
            </animateMotion>
          </circle>
        </g>
      ))}

      {/* Orchestrator central avec pulse-ring */}
      <g>
        <circle cx={orch.x} cy={orch.y} r="60" fill="none" stroke="#2563eb" strokeWidth="2" strokeOpacity="0.5">
          <animate attributeName="r" from="60" to="120" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.5" to="0" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx={orch.x} cy={orch.y} r="40" fill="rgba(37,99,235,0.08)" stroke="#2563eb" strokeWidth="1.5" />
        <circle cx={orch.x} cy={orch.y} r="8" fill="#2563eb" />
        <text x={orch.x} y={orch.y + 90} textAnchor="middle" fill="#2563eb" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="2">
          BINACORE / ORCHESTRATOR
        </text>
      </g>

      {/* 8 nodes (pills blanches avec texte sombre sur fond clair) */}
      {nodes.map((n, i) => (
        <g key={i} transform={`translate(${n.x - 52}, ${n.y - 20})`}>
          <rect width="104" height="40" rx="20" fill="rgba(255,255,255,0.95)" stroke={n.live ? '#2563eb' : 'rgba(15,23,42,0.2)'} strokeWidth="1" />
          <circle cx="14" cy="20" r="3" fill={n.live ? '#2563eb' : 'rgba(15,23,42,0.4)'}>
            {n.live && <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />}
          </circle>
          <text x="26" y="25" fill="#0f172a" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.5">
            {n.label}
          </text>
          <text x="88" y="25" textAnchor="end" fill={n.live ? '#2563eb' : 'rgba(15,23,42,0.4)'} fontFamily="JetBrains Mono, monospace" fontSize="9">
            {n.live ? 'LIVE' : 'IDLE'}
          </text>
        </g>
      ))}
    </svg>
  );
}

// =========================================================================
// PAGE HOME
// =========================================================================
function HomePage({ onOpenAudit, onOpenDemo }) {
  return (
    <div className="route-view" id="main-content">
      <HeroSection onOpenAudit={onOpenAudit} />
      <SocialProofSection />
      <TickerSection />
      <NarrativeSection />
      <CtaBlock tag="— Audit gratuit · 48h · Sans engagement" onOpenAudit={onOpenAudit}>
        Votre premier <em>diagnostic</em> commence par un appel.
      </CtaBlock>
      <ServicesSection />
      <BenefitsSection />
      <DemosSection onOpenDemo={onOpenDemo} />
      <ProofSection />
      <ProcessCondensedSection />
      <ManifestoSection />
      <FinalCtaSection onOpenAudit={onOpenAudit} />
    </div>
  );
}

// ---------- Spotlight (radial-gradient blob qui suit la souris) ----------
function Spotlight() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    if (window.matchMedia('(hover: none)').matches) { el.style.display = 'none'; return; }
    let raf = 0, x = 0, y = 0;
    const onMove = (e) => {
      const r = parent.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = 0;
    };
    const onEnter = () => el.classList.add('spotlight--on');
    const onLeave = () => el.classList.remove('spotlight--on');
    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseenter', onEnter);
    parent.addEventListener('mouseleave', onLeave);
    return () => {
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseenter', onEnter);
      parent.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={ref} className="spotlight" aria-hidden="true" />;
}

// ---------- Spline 3D Scene (web component <spline-viewer>) ----------
function SplineScene({ scene, className = '' }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onLoad = () => setReady(true);
    el.addEventListener('load', onLoad);
    // React 18 sérialise mal les props sur un custom element pas encore défini :
    // on attend que <spline-viewer> soit enregistré, puis on pose `url` comme
    // VRAI attribut HTML pour déclencher attributeChangedCallback de Spline.
    customElements.whenDefined('spline-viewer').then(() => {
      el.setAttribute('url', scene);
      // Filet de sécurité si l'event "load" a été émis avant le mount React
      // (cas du chargement depuis cache).
      if (el.shadowRoot && el.shadowRoot.querySelector('canvas')) setReady(true);
    });
    // Garde-fou : on dévoile la scène au bout de 6 s même si "load" ne fire pas.
    const fallback = setTimeout(() => setReady(true), 6000);
    return () => {
      el.removeEventListener('load', onLoad);
      clearTimeout(fallback);
    };
  }, [scene]);
  return (
    <div className={'spline-stage ' + className} aria-hidden="true">
      {!ready && (
        <div className="spline-loader">
          <span className="spline-loader__ring" />
        </div>
      )}
      {/* spline-viewer est un Web Component natif — `url` posé via setAttribute en useEffect */}
      <spline-viewer
        ref={ref}
        loading-anim=""
        events-target="global"
        style={{ width: '100%', height: '100%', opacity: ready ? 1 : 0, transition: 'opacity 0.6s ease' }}
      ></spline-viewer>
      {/* Cache discrète du watermark Spline (en bas à droite) */}
      <div className="spline-mask" aria-hidden="true" />
    </div>
  );
}

// ---------- Section 1 — HERO (split: texte gauche · scène 3D droite + spotlight + shiny CTA) ----------
function HeroSection({ onOpenAudit }) {
  return (
    <section className="hero hero--split">
      {/* Blobs décoratifs en fond */}
      <span className="blob blob--1" aria-hidden="true"></span>
      <span className="blob blob--2" aria-hidden="true"></span>
      <span className="blob blob--3" aria-hidden="true"></span>

      <div className="wrap hero__content">
        <div className="hero__labels">
          <span className="hero__label-left">
            <span className="brand-dot" aria-hidden="true"></span>
            Builder · Genève 2026
          </span>
          <span>2026 — Builder IA pour PME suisses</span>
        </div>

        <div className="hero__split">
          {/* --- Colonne gauche : texte + CTA --- */}
          <div className="hero__col-text">
            <h1 className="h1-hero">
              Builder IA à <em>Genève</em>.<br />
              On ship du soft<br />
              qui <em>tourne en prod</em>.
            </h1>

            <p className="lead hero__lead">
              Automatisations, agents IA et SaaS sur-mesure pour PME suisses et romandes avec ancrage Algérie. Livrés en jours, pas en mois — parce qu'on code avec Claude.
            </p>

            <div className="btn-row hero__cta">
              <button className="shiny-cta" onClick={onOpenAudit}>
                <span>Démarrer un audit</span>
                <Icon name="arrowRight" size={16} />
              </button>
              <button className="btn-ghost" onClick={() => window.__nav('/projets')}>
                Voir les projets
              </button>
            </div>

            <div className="hero__foot-left">— Binacore · Genève, CH</div>
          </div>

          {/* --- Colonne droite : scène 3D Spline (interactive) + spotlight --- */}
          <div className="hero__col-3d">
            <Spotlight />
            <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">Scroll</div>
    </section>
  );
}

// ---------- Section 2 — PREUVES SOCIALES ----------
function SocialProofSection() {
  const ref = useRef(null);
  useReveal(ref);
  const projects = [
    { domain: 'iafactory.ch', title: 'iafactory.ch', desc: 'Plateforme IA Suisse · 6 agents verticaux', url: 'https://iafactory.ch' },
    { domain: 'rateboost.eu', title: 'RateBoost', desc: 'Revenue AI pour hôteliers indépendants', url: 'https://rateboost.eu' },
    { domain: 'KhutbaBox', title: 'KhutbaBox', desc: 'Traduction sermons temps réel · 8 langues', url: null },
    { domain: 'change.iafactory.ch', title: 'change.iafactory.ch', desc: 'Comparateur EUR/CHF multi-sources', url: 'https://change.iafactory.ch' },
  ];
  return (
    <section className="section section--alt">
      <div className="wrap">
        <div className="section-header">
          <span className="tag">Ce qu'on a shippé en 2024-2026</span>
        </div>
        <div ref={ref} className="reveal-stagger grid-4">
          {projects.map((p, i) => (
            <a
              key={i}
              className="proj-card"
              href={p.url || '#'}
              target={p.url ? '_blank' : undefined}
              rel={p.url ? 'noopener noreferrer' : undefined}
              onClick={e => { if (!p.url) { e.preventDefault(); window.__nav('/projets'); } }}
              style={{ '--i': i }}
            >
              <div>
                <div className="proj-card__domain">{p.domain}</div>
                <h3 className="card__title" style={{ fontSize: 20, marginTop: 12 }}>{p.title}</h3>
                <p className="proj-card__desc">{p.desc}</p>
              </div>
              <div className="proj-card__cta">
                {p.url ? '→ Voir en prod' : '→ Demo interne'}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Section 3 — TICKER ----------
function TickerSection() {
  const text = "Builder IA · Genève — FastAPI · Next.js · Claude — Livraison 3-21 jours — Stack documentée — Code source livré — Bilingue FR/AR — Hébergement CH — ";
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        <span className="ticker__content">{text}</span>
        <span className="ticker__content">{text}</span>
      </div>
    </div>
  );
}

// ---------- Section 4 — NARRATIVE (3 beats animés) ----------
function NarrativeSection() {
  return (
    <section className="section">
      <div className="wrap">
        <RevealBeat num="01"><span>Vous avez </span><em>des outils</em><span>. Trop d'outils.</span></RevealBeat>
        <RevealBeat num="02"><span>La plupart </span><em>ne se parlent pas</em><span> entre eux.</span></RevealBeat>
        <RevealBeat num="03"><span>On construit </span><em>les ponts qui manquent</em><span>.</span></RevealBeat>
      </div>
    </section>
  );
}

// Beat avec révélation au scroll (chaque ligne s'anime séparément)
function RevealBeat({ num, children }) {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <div className="beat" ref={ref}>
      <div className="beat__num">— {num}</div>
      <p className="beat__text">{children}</p>
    </div>
  );
}

// ---------- Section 6 — SERVICES ----------
function ServicesSection() {
  const ref = useRef(null);
  useReveal(ref);
  const services = [
    {
      num: '001 / AUTOMATISATIONS',
      title: 'Workflows qui font gagner du temps.',
      items: ['OCR documents', 'Sync multi-outils', 'Alertes métier', 'Génération docs'],
      delay: '3-7 jours',
      anchor: 'automatisations'
    },
    {
      num: '002 / AGENTS IA',
      title: 'Assistants spécialisés connectés.',
      items: ['Support multilingue', 'RAG connaissance', 'Tri & réponse mail', 'Qualif leads'],
      delay: '1-3 semaines',
      anchor: 'agents-ia'
    },
    {
      num: '003 / SAAS SUR-MESURE',
      title: 'Micro-produits verticaux pour un métier.',
      items: ['Plateformes', 'Comparateurs', 'Outils internes', 'Dashboards'],
      delay: '4-6 semaines',
      anchor: 'saas-sur-mesure'
    },
  ];
  return (
    <section className="section section--alt">
      <div className="wrap">
        <SectionHeader tag="Ce qu'on construit · 03 offres">
          Trois piliers. Une obsession : <em>livrer vite</em>.
        </SectionHeader>
        <div ref={ref} className="reveal-stagger grid-3">
          {services.map((s, i) => (
            <div key={s.num} className="service-card" style={{ '--i': i }}>
              <div className="service-card__num">— {s.num}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <ul className="service-card__list">
                {s.items.map(it => <li key={it}>{it}</li>)}
              </ul>
              <div className="service-card__delay">{s.delay}</div>
              <button className="service-card__link" onClick={() => window.__nav('/services', s.anchor)}>
                En savoir plus <Icon name="arrowRight" size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Section 7 — BÉNÉFICES CLIENT (reveal stagger) ----------
function BenefitsSection() {
  const ref = useRef(null);
  useReveal(ref);
  const benefits = [
    { label: 'GAIN DE TEMPS', text: "Les tâches répétitives partent. Vos équipes repassent sur la réflexion, la négociation, le relationnel client." },
    { label: 'SCALABILITÉ', text: "Ce qui prend 8 h à vos équipes tient dans un workflow qui tourne sans intervention." },
    { label: 'COÛT MAÎTRISÉ', text: "Pas de licence SaaS récurrente par utilisateur. Pas de vendor lock-in. Le code vous appartient." },
    { label: 'SOUVERAINETÉ DONNÉES', text: "Hébergement CH ou self-hosted. Vos données ne partent pas aux USA. Conforme nLPD et RGPD." },
    { label: 'DÉLAIS COURTS', text: "On livre un MVP testable en 3-7 jours, puis on itère. Pas de tunnel de 6 mois." },
    { label: 'BILINGUE FR/AR', text: "Projets documentés en français, exploitables en Algérie. Utile aux PME avec activité maghrébine." },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <SectionHeader tag="Pourquoi ça change votre quotidien">
          Les 6 raisons pour lesquelles <em>vos équipes</em> vous diront merci.
        </SectionHeader>
        <div className="benefit-grid reveal-stagger" ref={ref}>
          {benefits.map((b, i) => (
            <div key={b.label} className="benefit-cell" style={{ '--i': i }}>
              <div className="benefit-cell__label">— {b.label}</div>
              <p className="benefit-cell__text">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Section 8 — DÉMOS IA ----------
function DemosSection({ onOpenDemo }) {
  const demos = [
    { key: 'rag', num: '01 · RAG Chatbot', title: 'Posez une question à notre démo fiduciaire suisse.', desc: 'Réponses en 3 secondes avec sources citées.' },
    { key: 'ocr', num: '02 · OCR Facture', title: 'Uploadez une facture, extrayez les champs en JSON.', desc: 'Précision 98 % sur factures standard.' },
    { key: 'email', num: '03 · Tri Email', title: 'Collez un email, voyez la classification et le draft.', desc: 'Catégorie, urgence et réponse suggérée.' },
    { key: 'audio', num: '04 · Traducteur Audio', title: 'Enregistrez 15 s, recevez la transcription FR/AR/EN.', desc: 'Whisper + traduction contextuelle.' },
  ];
  return (
    <section className="section section--alt">
      <div className="wrap">
        <SectionHeader
          tag="Testez avant d'acheter"
          lead="Pas de captcha, pas d'inscription. Quatre démos prêtes à l'emploi."
        >
          Essayez un agent. <em>Maintenant</em>, dans votre navigateur.
        </SectionHeader>
        <div className="grid-2" style={{ gap: 24 }}>
          {demos.map(d => (
            <div key={d.key} className="demo-card" onClick={() => onOpenDemo(d.key)} role="button" tabIndex={0}
                 onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onOpenDemo(d.key); }}>
              <span className="demo-card__badge">Bientôt</span>
              <div className="demo-card__num">— {d.num}</div>
              <h3 className="demo-card__title">{d.title}</h3>
              <p className="demo-card__text">{d.desc}</p>
              <div className="demo-card__cta">Tester →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Section 9 — PROOF (stack + projets) ----------
function ProofSection() {
  const stack = ['Next.js','FastAPI','PostgreSQL','Qdrant','Redis','Docker','LiteLLM','Claude','Whisper','WhatsApp API','OCR','Coolify'];
  const projects = getProjectsData();
  return (
    <section className="section">
      <div className="wrap">
        <SectionHeader tag="Sur quoi on code">
          La <em>stack qu'on utilise</em>, visible. Les projets qu'on a shippés, cliquables.
        </SectionHeader>
      </div>
      <StackStrip items={stack} />
      <div className="wrap" style={{ marginTop: 80 }}>
        <div className="grid-auto">
          {projects.map(p => (
            <ProjectCardCompact key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Section 10 — PROCESS CONDENSED ----------
function ProcessCondensedSection() {
  const steps = [
    { n: '01', t: 'AUDIT', text: 'On cartographie votre chaos.', delay: '48h' },
    { n: '02', t: 'DESIGN', text: 'On conçoit le livrable.', delay: '1 semaine' },
    { n: '03', t: 'DÉPLOIEMENT', text: 'On branche et on teste.', delay: '2 semaines' },
    { n: '04', t: 'ITÉRATION', text: "On fait grandir l'équipe.", delay: 'continu' },
  ];
  return (
    <section className="section section--alt">
      <div className="wrap">
        <SectionHeader tag="Notre processus">
          De l'audit à <em>l'itération</em>. En 3 semaines.
        </SectionHeader>
        <div className="process-row">
          {steps.map(s => (
            <div key={s.n} className="process-step">
              <div className="process-step__num">{s.n} · {s.t}</div>
              <p className="process-step__text">{s.text}</p>
              <div className="process-step__delay">{s.delay}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48 }}>
          <button className="btn-ghost" onClick={() => window.__nav('/processus')}>
            Voir le processus détaillé <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 11 — MANIFESTO ----------
function ManifestoSection() {
  return (
    <section className="manifesto">
      <div className="wrap">
        <p className="manifesto__quote">
          « <em>Une PME suisse</em> ne devrait pas dépendre d'un SaaS américain à 500€/mois/user pour faire tourner son métier. On construit <em>les alternatives</em>. »
        </p>
        <div className="manifesto__sig">— Boualem Bensalem · Binacore · Genève · 2026</div>
      </div>
    </section>
  );
}

// ---------- Section 12 — CTA FINAL ----------
function FinalCtaSection({ onOpenAudit }) {
  return (
    <section className="cta-block">
      <div className="wrap">
        <div className="cta-block__tag">— Audit gratuit · 48h · Sans engagement</div>
        <h2>Et si votre premier agent démarrait <em>cette semaine</em> ?</h2>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          <Magnetic className="btn-primary" onClick={onOpenAudit}>
            Démarrer l'audit <Icon name="arrowRight" size={16} />
          </Magnetic>
          <button className="btn-ghost" onClick={() => window.__nav('/contact')}>
            Nous contacter
          </button>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// DONNÉES PROJETS (partagée home + page projets)
// =========================================================================
function getProjectsData() {
  return [
    {
      id: 'iafactory',
      category: 'PLATEFORME SAAS',
      title: 'iafactory.ch',
      desc: "Plateforme 'tout IA' suisse regroupant 6 agents verticaux : Fiduciaire IA, Juriste CH, Immobilier Romand, Rédacteur Pro CH, Analyste Data, Dev & Technique.",
      take: "Ce savoir-faire se décline chez vous. Si vous êtes fiduciaire, avocat, régie immo — on part de l'agent existant et on l'adapte à votre cabinet.",
      stack: ['Next.js', 'FastAPI', 'Qdrant', 'Redis', 'MinIO'],
      status: 'En production',
      url: 'https://iafactory.ch',
      tag: 'Plateformes',
    },
    {
      id: 'rateboost',
      category: 'SAAS VERTICAL',
      title: 'RateBoost',
      desc: "Revenue AI Agent pour hôteliers indépendants. Moteur de raisonnement qui ajuste les tarifs à partir des signaux de demande. Intégration Mews Marketplace en cours.",
      take: "Architecture duplicable pour d'autres verticaux (pharmacies, restaurants, salles de sport — tout métier à yield management).",
      stack: ['FastAPI', 'PostgreSQL', 'Caddy', 'Hetzner'],
      status: 'v0.4.1 en dev',
      url: 'https://rateboost.eu',
      tag: 'Produits de niche',
    },
    {
      id: 'khutbabox',
      category: 'PRODUIT DE NICHE',
      title: 'KhutbaBox',
      desc: "Traduction temps réel de sermons de mosquée en 8 langues, latence < 2 secondes. Ciblage mosquées multiethniques.",
      take: "Capacité de build de produits voix/traduction temps réel pour événements, conférences, webinars.",
      stack: ['Azure Speech', 'Whisper', 'ElevenLabs'],
      status: 'MVP',
      url: null,
      tag: 'Produits de niche',
    },
    {
      id: 'change',
      category: 'COMPARATEUR',
      title: 'change.iafactory.ch',
      desc: "Comparateur de taux EUR/CHF multi-sources (banques, bureaux de change, services online). Mise à jour temps réel.",
      take: "Template duplicable pour tout comparateur vertical (assurances, énergies, carburants, frais bancaires).",
      stack: ['Next.js', 'FastAPI', 'Redis', 'Scraping'],
      status: 'MVP',
      url: 'https://change.iafactory.ch',
      tag: 'Comparateurs',
    },
    {
      id: 'iafactory-dz',
      category: 'PLATEFORME SAAS',
      title: 'iafactoryalgeria.com',
      desc: "Équivalent iafactory.ch pour le marché algérien. 27 agents spécialisés. Adaptation aux contraintes de paiement locales.",
      take: "Capacité de déployer des plateformes IA à l'international, notamment sur des marchés avec contraintes spécifiques.",
      stack: ['Monorepo PM2', 'Qdrant', 'PostgreSQL', 'Hetzner'],
      status: 'En production',
      url: 'https://iafactoryalgeria.com',
      tag: 'Plateformes',
    },
  ];
}

// Carte projet compacte pour la home (et la section proof)
function ProjectCardCompact({ project }) {
  return (
    <article className="project-card">
      <div className="project-ph"><span>{project.title}</span></div>
      <div className="project-card__body">
        <div className="project-card__category">{project.category}</div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.desc}</p>
        <div className="project-card__stack">{project.stack.join(' · ')}</div>
        <div className="project-card__status">● {project.status}</div>
        <div className="project-card__actions">
          {project.url ? (
            <a className="btn-ghost" href={project.url} target="_blank" rel="noopener noreferrer">
              Voir en prod <Icon name="arrowUpRight" size={14} />
            </a>
          ) : (
            <span className="mono" style={{ color: 'var(--ink-d-faint)' }}>Demo interne uniquement</span>
          )}
        </div>
      </div>
    </article>
  );
}

// =========================================================================
// PAGE SERVICES
// =========================================================================
function ServicesPage({ onOpenAudit }) {
  return (
    <div className="route-view" id="main-content">
      <section className="page-head">
        <div className="wrap">
          <div className="page-head__label">— 03 piliers</div>
          <h1 className="page-head__h1">Ce qu'on construit.<br /><em>Concrètement</em>.</h1>
          <p className="page-head__lead">
            Pas de mystère. Trois types de livrables, trois grilles de prix, trois délais. Vous choisissez ce qui colle à votre besoin.
          </p>
        </div>
      </section>

      <PillarSection
        id="automatisations"
        num="001 / Automatisations"
        title={<>Les workflows qui font <em>gagner du temps</em>.</>}
        subtitle="3-7 jours par workflow · dès CHF 1'800"
        examples={[
          "Extraction automatique des factures fournisseurs PDF → CRM/compta",
          "Enrichissement de leads entrants (email reçu → données scrappées + push CRM)",
          "Synchronisation Bexio ↔ Mailchimp ↔ Notion (alternative Zapier hébergée en CH)",
          "Alertes métier (détection d'événements business → notif Slack/WhatsApp/mail)",
          "Génération automatique de documents (devis, contrats, factures)",
        ]}
        stack={['FastAPI', 'Python', 'Playwright', 'API REST', 'Webhooks', 'Redis', 'PostgreSQL']}
        ctaLabel="Parler de votre automatisation"
        onCta={onOpenAudit}
      />

      <PillarSection
        id="agents-ia"
        num="002 / Agents IA"
        title={<>Les assistants <em>spécialisés</em> par métier.</>}
        subtitle="1-3 semaines par agent · dès CHF 6'500"
        alt
        examples={[
          "Assistant RAG sur documentation interne (FAQ, procédures, contrats)",
          "Bot WhatsApp service client multilingue",
          "Agent qualification leads entrants (conversation + scoring + dispatch)",
          "Agent voix/traduction temps réel (conférences, événements)",
          "Agent scraper métier (veille concurrentielle automatisée)",
        ]}
        stack={['Next.js', 'FastAPI', 'LiteLLM', 'Qdrant', 'PostgreSQL', 'Claude API', 'Whisper']}
        ctaLabel="Démarrer votre agent"
        onCta={onOpenAudit}
      />

      <PillarSection
        id="saas-sur-mesure"
        num="003 / SaaS sur-mesure"
        title={<>Les micro-produits <em>verticaux</em> pour votre métier.</>}
        subtitle="4-6 semaines (V1) · dès CHF 18'000"
        examples={[
          "Comparateur vertical (on a déjà fait un EUR/CHF, on peut le décliner)",
          "Plateforme métier clés en main (type RateBoost pour un autre vertical)",
          "Outil interne IA avec dashboard + agents + RAG, brandé à votre marque",
          "Extension SaaS existant avec couche IA",
        ]}
        stack={['Next.js', 'FastAPI', 'PostgreSQL', 'Qdrant', 'Redis', 'Docker', 'CI/CD', 'Coolify']}
        ctaLabel="Discuter de votre SaaS"
        onCta={onOpenAudit}
      />

      {/* Pricing transparent */}
      <section className="section">
        <div className="wrap">
          <div className="pricing-block">
            <h3>— Prix de départ · Tout inclus</h3>
            <div className="pricing-line">
              <span className="pricing-line__name">Automatisations</span>
              <span className="pricing-line__price">dès CHF 1'800 <span style={{ fontSize: 12, color: 'var(--ink-d-mute)', letterSpacing: '0.08em' }}>/ workflow</span></span>
            </div>
            <div className="pricing-line">
              <span className="pricing-line__name">Agents IA</span>
              <span className="pricing-line__price">dès CHF 6'500 <span style={{ fontSize: 12, color: 'var(--ink-d-mute)', letterSpacing: '0.08em' }}>build + 3 mois réglages</span></span>
            </div>
            <div className="pricing-line">
              <span className="pricing-line__name">SaaS sur-mesure</span>
              <span className="pricing-line__price">dès CHF 18'000 <span style={{ fontSize: 12, color: 'var(--ink-d-mute)', letterSpacing: '0.08em' }}>V1 + retainer optionnel</span></span>
            </div>
            <ul className="pricing-block__list">
              <li>Code source livré (repo privé à votre nom)</li>
              <li>Documentation technique</li>
              <li>Support post-livraison (30 jours inclus)</li>
              <li>Formation à votre équipe (1 session incluse)</li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBlock tag="— Audit gratuit · 48h · Sans engagement" onOpenAudit={onOpenAudit}>
        Parler de <em>votre besoin</em>.
      </CtaBlock>
    </div>
  );
}

function PillarSection({ id, num, title, subtitle, examples, stack, ctaLabel, onCta, alt }) {
  return (
    <section className={'section' + (alt ? ' section--alt' : '')} id={id}>
      <div className="wrap">
        <div className="section-header">
          <span className="tag">{num}</span>
          <h2 className="h2-section">{title}</h2>
          <p className="mono" style={{ marginTop: 16, color: 'var(--ink-d-mute)' }}>{subtitle}</p>
        </div>
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-d-faint)', margin: '0 0 20px' }}>
              — Exemples concrets
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {examples.map(e => (
                <li key={e} style={{ color: 'var(--ink-d)', lineHeight: 1.55, paddingLeft: 20, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'var(--ac)' }}>—</span>{e}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-d-faint)', margin: '0 0 20px' }}>
              — Stack technique
            </h4>
            <div className="mono" style={{ color: 'var(--ink-d)', fontSize: 14, lineHeight: 1.8 }}>
              {stack.join(' · ')}
            </div>
            <button className="btn-primary" onClick={onCta} style={{ marginTop: 32 }}>
              {ctaLabel} <Icon name="arrowRight" size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// PAGE AGENTS
// =========================================================================
function AgentsPage({ onOpenAudit }) {
  return (
    <div className="route-view" id="main-content">
      <section className="page-head">
        <div className="wrap">
          <div className="page-head__label">— Agents archétypes · 04 profils</div>
          <h1 className="page-head__h1">Quatre agents. Une <em>équipe</em> qui ne dort jamais.</h1>
          <p className="page-head__lead">
            Les 4 agents ci-dessous sont des architectures de référence que nous avons conçues. Chaque déploiement client est personnalisé selon votre métier, vos outils et vos données.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingBlock: 'clamp(40px, 6vw, 80px)' }}>
        <div className="wrap">
          <div style={{ background: 'var(--bg-d2)', border: '1px solid var(--line-d)', borderRadius: 12, padding: 32 }}>
            <div className="tag">— Ces agents sont des archétypes</div>
            <p style={{ color: 'var(--ink-d-mute)', fontSize: 15, lineHeight: 1.6, margin: '12px 0 24px' }}>
              Les 4 profils ci-dessous sont des patterns d'agents IA que nous savons déployer rapidement. Pour voir le fonctionnement général, essayez nos démos live. Pour votre cas précis, demandez un audit.
            </p>
            <div className="btn-row">
              <button className="btn-ghost" onClick={() => window.__nav('/home')}>Voir les démos</button>
              <button className="btn-primary" onClick={onOpenAudit}>Audit gratuit <Icon name="arrowRight" size={14} /></button>
            </div>
          </div>
        </div>
      </section>

      <AgentCard agent={agent001} alt={false} onOpenAudit={onOpenAudit} />
      <AgentCard agent={agent002} alt={true} onOpenAudit={onOpenAudit} />
      <AgentCard agent={agent003} alt={false} onOpenAudit={onOpenAudit} />
      <AgentCard agent={agent004} alt={true} onOpenAudit={onOpenAudit} />

      <CtaBlock tag="— Audit gratuit · 48h · Sans engagement" onOpenAudit={onOpenAudit}>
        Déployer <em>votre agent</em>.
      </CtaBlock>
    </div>
  );
}

const agent001 = {
  id: 'agent-support', num: '001', icon: 'bot',
  tagline: <>Un service client qui répond en <em>30 secondes</em>.</>,
  desc: "Répond aux clients en français, allemand, anglais et italien. Connecté à votre base de connaissances, il traite 80% des demandes niveau 1 sans intervention humaine. Escalade intelligemment les cas complexes au bon humain avec le contexte complet.",
  stats: [
    { v: '450+', l: 'Tickets / jour' },
    { v: '< 30s', l: 'Temps réponse' },
    { v: '78%', l: 'Résolution auto' },
    { v: '4', l: 'Langues' },
  ],
  caps: [
    "Analyse d'intention multilingue (FR/DE/EN/IT)",
    "RAG sur votre base de connaissances",
    "Escalade contextualisée avec historique complet",
    "Rédaction du ton de votre marque",
    "Intégration Zendesk, Intercom, Freshdesk, Slack",
  ],
  terminal: [
    '$ ticket #4821 reçu · fr-CH',
    '$ intent: demande_remboursement · confiance 94%',
    '$ KB lookup: politique_retours.md · 2.1s',
    '$ draft généré · tone: empathique',
    '$ réponse envoyée ✓',
  ],
  usecases: [
    "Triage de tickets support multilingues",
    "Réponses automatiques FAQ niveau 1",
    "Escalade contextualisée vers agents humains",
    "Self-service sur base de connaissances",
  ],
};
const agent002 = {
  id: 'agent-inbox', num: '002', icon: 'mail',
  tagline: <>Votre boîte mail, <em>triée</em> et répondue.</>,
  desc: "Trie, classe et répond à vos emails professionnels. Apprend votre ton, identifie les urgences, rédige les réponses type, escalade au bon humain. Il protège votre attention en ne remontant que ce qui compte vraiment.",
  stats: [
    { v: '320+', l: 'Emails / jour' },
    { v: '12h', l: 'h/sem récup.' },
    { v: '96%', l: 'Précision tri' },
    { v: 'Gmail · O365', l: 'Connexions' },
  ],
  caps: [
    "Tri automatique par intention et urgence",
    "Apprentissage continu de votre ton",
    "Brouillons prêts à envoyer en 1 clic",
    "Détection des commitments et followups",
    "Résumé quotidien des priorités",
  ],
  terminal: [
    '$ sync inbox · 23 nouveaux messages',
    '$ classification: 4 urgents · 11 standard · 8 spam',
    '$ drafts générés: 11 réponses prêtes',
    '$ followups détectés: 3 en attente > 72h',
    '$ résumé envoyé à 08:30 ✓',
  ],
  usecases: [
    "Triage boîte email d'équipe support",
    "Résumé quotidien des priorités CEO/direction",
    "Pré-rédaction de réponses clients",
    "Détection de followups en retard",
  ],
};
const agent003 = {
  id: 'agent-extract', num: '003', icon: 'cpu',
  tagline: <>Des documents <em>lus</em> par une machine.</>,
  desc: "Extrait automatiquement les données structurées de vos factures, devis, contrats, formulaires. Précision 98%. Structure tout dans votre CRM ou ERP. Valide les montants, détecte les anomalies, flag les pièces douteuses.",
  stats: [
    { v: '98.2%', l: 'Précision' },
    { v: '240', l: 'Docs / heure' },
    { v: 'PDF · JPG · DOCX', l: 'Formats' },
    { v: '40+', l: 'Destinations' },
  ],
  caps: [
    "OCR multi-format (PDF scannés, photos, scans)",
    "Détection automatique du type de document",
    "Validation des montants et TVA",
    "Flag des anomalies et doublons",
    "Export direct CRM, ERP, comptabilité",
  ],
  terminal: [
    '$ invoice_2026_0412.pdf · OCR en cours',
    '$ fournisseur: Acme SA · TVA CH-123.456.789',
    '$ montant: CHF 4\'850.00 · TVA 7.7% validée',
    '$ export Bexio: entry #B-8821 ✓',
    '$ anomalie détectée: doublon de #B-8815 · flag',
  ],
  usecases: [
    "Extraction factures fournisseurs → compta",
    "Traitement de formulaires scannés",
    "Analyse de contrats et baux",
    "Détection d'anomalies et doublons",
  ],
};
const agent004 = {
  id: 'agent-ops', num: '004', icon: 'workflow',
  tagline: <>L'orchestrateur qui <em>connecte</em> tous vos outils.</>,
  desc: "Surveille vos systèmes, détecte les anomalies, orchestre les workflows entre Slack, HubSpot, Notion, Google Workspace. Essaim d'agents coordonnés qui parlent entre eux. Le chef d'orchestre qui fait tourner votre stack.",
  stats: [
    { v: '40+', l: 'Intégrations' },
    { v: '99.98%', l: 'Uptime' },
    { v: '1\'200+', l: 'Workflows/jour' },
    { v: '< 2s', l: 'Latence P95' },
  ],
  caps: [
    "Orchestration multi-agents avec mémoire partagée",
    "Intégrations natives : Slack, HubSpot, Notion, Google",
    "Webhooks et API sur mesure",
    "Observabilité complète : logs, traces, métriques",
    "Rollback automatique en cas d'échec",
  ],
  terminal: [
    '$ workflow sync_crm déclenché · trigger: new_deal',
    '$ step 1/4: lookup HubSpot · 340ms',
    '$ step 2/4: création Notion · 180ms',
    '$ step 3/4: notification Slack #sales · 90ms',
    '$ step 4/4: email follow-up programmé J+3 ✓',
  ],
  usecases: [
    "Synchronisation CRM ↔ outil métier",
    "Orchestration de workflows multi-étapes",
    "Monitoring infra avec alerting intelligent",
    "Automatisation de processus internes",
  ],
};

function AgentCard({ agent, alt, onOpenAudit }) {
  return (
    <section id={agent.id} className={'agent-card' + (alt ? ' agent-card--alt' : '')}>
      <div className="agent-card__inner">
        {/* Colonne gauche : titre + desc + stats */}
        <div>
          <div className="agent-card__num">— {agent.num} · {agent.id.replace('agent-', '').toUpperCase()}</div>
          <div style={{ color: 'var(--ac)', marginBottom: 16 }}><Icon name={agent.icon} size={28} /></div>
          <h2 className="agent-card__title">{agent.tagline}</h2>
          <p className="agent-card__desc">{agent.desc}</p>
          <div className="agent-card__stats">
            {agent.stats.map((s, i) => (
              <div key={i} className="agent-card__stat">
                <div className="agent-card__stat-value">
                  <ScrambleStat value={s.v} />
                </div>
                <div className="agent-card__stat-label">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="agent-card__disclaimer">
            — Benchmarks cibles basés sur architecture type · Performance réelle variable selon cas d'usage
          </p>
        </div>

        {/* Colonne droite : capacités + terminal + usecases + CTAs */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-d-faint)', margin: '0 0 16px' }}>— Capacités</h4>
          <ul className="agent-card__caps">
            {agent.caps.map(c => <li key={c}>{c}</li>)}
          </ul>
          <div className="terminal">
            {agent.terminal.map((l, i) => <div key={i} className="terminal__line">{l}</div>)}
          </div>
          <div className="usecases-block">
            <h4>Cas d'usage types</h4>
            <ul>{agent.usecases.map(u => <li key={u}>{u}</li>)}</ul>
          </div>
          <div className="btn-row">
            <button className="btn-primary" onClick={onOpenAudit}>
              Déployer cet agent <Icon name="arrowRight" size={16} />
            </button>
            {agent.id === 'agent-ops' ? (
              <button className="btn-ghost" onClick={() => window.__nav('/contact')}>Parler à un humain</button>
            ) : (
              <button className="btn-ghost" onClick={() => window.__nav('/home')}>Essayer la démo live</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// PAGE PROJETS
// =========================================================================
function ProjetsPage({ onOpenAudit }) {
  const [filter, setFilter] = useState('Tous');
  const all = getProjectsData();
  const chips = ['Tous', 'Plateformes', 'Agents verticaux', 'Produits de niche', 'Comparateurs'];
  // Mapping catégorie -> chip
  const matchChip = (p, chip) => {
    if (chip === 'Tous') return true;
    if (chip === 'Plateformes') return p.category === 'PLATEFORME SAAS';
    if (chip === 'Agents verticaux') return p.category === 'SAAS VERTICAL';
    if (chip === 'Produits de niche') return p.category === 'PRODUIT DE NICHE' || p.category === 'SAAS VERTICAL';
    if (chip === 'Comparateurs') return p.category === 'COMPARATEUR';
    return true;
  };
  const filtered = all.filter(p => matchChip(p, filter));

  return (
    <div className="route-view" id="main-content">
      <section className="page-head">
        <div className="wrap">
          <div className="page-head__label">— Projets Binacore · En prod et en dev</div>
          <h1 className="page-head__h1">Ce qu'on a construit. En <em>vrai</em>, avec des URLs.</h1>
          <p className="page-head__lead">
            Plutôt que des cas clients anonymes, voici les produits qu'on a shippés. Certains sont nos propres plateformes, d'autres sont des MVP qu'on peut décliner pour vous.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingBlock: 40 }}>
        <div className="wrap">
          <div className="projects-filter">
            {chips.map(c => (
              <button
                key={c}
                className={'chip' + (filter === c ? ' chip--active' : '')}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="grid-auto">
            {filtered.map(p => (
              <article key={p.id} className="project-card">
                <div className="project-ph"><span>{p.title}</span></div>
                <div className="project-card__body">
                  <div className="project-card__category">{p.category}</div>
                  <h3 className="project-card__title">{p.title}</h3>
                  <p className="project-card__desc">{p.desc}</p>
                  <p className="project-card__take">{p.take}</p>
                  <div className="project-card__stack">{p.stack.join(' · ')}</div>
                  <div className="project-card__status">● {p.status}</div>
                  <div className="project-card__actions">
                    {p.url && (
                      <a className="btn-ghost" href={p.url} target="_blank" rel="noopener noreferrer">
                        Voir en prod <Icon name="arrowUpRight" size={14} />
                      </a>
                    )}
                    <button className="btn-primary" onClick={onOpenAudit}>
                      Décliner pour vous <Icon name="arrowRight" size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock tag="— Audit gratuit · 48h · Sans engagement" onOpenAudit={onOpenAudit}>
        Votre projet sera le <em>prochain</em>.
      </CtaBlock>
    </div>
  );
}

// =========================================================================
// PAGE PROCESSUS
// =========================================================================
function ProcessusPage({ onOpenAudit }) {
  const phases = [
    {
      id: 'phase-01', n: '01', t: 'AUDIT', d: '48h',
      title: <>On cartographie votre <em>chaos</em>.</>,
      desc: "Audit gratuit et sans engagement. On comprend vos process, on identifie les tâches répétitives, on chiffre le potentiel d'automatisation. Pour Automatisations, Agents ou SaaS — le processus est le même.",
      how: "Appel de 30 min, questionnaire ciblé, analyse de vos outils existants. On repart avec une vision claire sans que vous ayez à signer quoi que ce soit.",
      deliv: [
        "Cartographie des process à fort potentiel",
        "Chiffrage en heures récupérables/semaine",
        "Recommandation du premier livrable à déployer",
        "Rapport PDF envoyé sous 48 h",
      ],
    },
    {
      id: 'phase-02', n: '02', t: 'DESIGN', d: '1 semaine',
      title: <>On conçoit <em>le livrable</em>.</>,
      desc: "Architecture sur-mesure. Choix du modèle (Claude, Llama, Mistral, Qwen). Intégrations. Garde-fous nLPD. Plan de déploiement détaillé.",
      how: "Atelier de 2 h avec vos équipes techniques et métier. On valide ensemble l'architecture avant le moindre déploiement.",
      deliv: [
        "Spécification fonctionnelle détaillée",
        "Choix du modèle LLM et architecture RAG",
        "Plan d'intégrations (Slack, CRM, ERP…)",
        "Garde-fous de conformité nLPD",
      ],
    },
    {
      id: 'phase-03', n: '03', t: 'DÉPLOIEMENT', d: '2 semaines',
      title: <>On branche <em>et on teste</em>.</>,
      desc: "3 semaines chrono. Hébergement CH ou self-hosted. Tests réels sur vos données. Formation de vos équipes. Mise en production surveillée.",
      how: "Phase de shadow-mode : le livrable tourne en parallèle de vos équipes pendant 5 jours. Vous validez les réponses avant la bascule en production.",
      deliv: [
        "Infrastructure provisionnée (Hetzner CH)",
        "Agent entraîné sur vos données privées",
        "Tests en parallèle sur cas réels",
        "Formation en présentiel ou visio",
      ],
    },
    {
      id: 'phase-04', n: '04', t: 'ITÉRATION', d: 'continu',
      title: <>On fait grandir <em>l'équipe</em>.</>,
      desc: "Livrables additionnels, nouveaux workflows, évolutions continues. Votre premier agent devient une équipe. SLA 4h en Enterprise.",
      how: "Votre agent apprend en continu. Chaque mois on regarde ensemble ce qui marche, ce qui peut être amélioré, et on décide des prochains livrables à déployer.",
      deliv: [
        "Monitoring 24/7 avec alerting",
        "Revue mensuelle des performances",
        "Livrables additionnels à la demande",
        "SLA 4h ouvrable · 8h nuit/weekend",
      ],
    },
  ];

  return (
    <div className="route-view" id="main-content">
      <section className="page-head">
        <div className="wrap">
          <div className="page-head__label">— Processus · 3 semaines chrono</div>
          <h1 className="page-head__h1">De l'audit à <em>l'itération</em>. En 3 semaines.</h1>
          <p className="page-head__lead">
            Une méthodologie éprouvée en 4 phases. Chaque étape est cadencée, livrée, validée. Pas de surprise, pas de dérapage, pas de jargon.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {phases.map(p => (
            <div key={p.id} id={p.id} className="timeline">
              <div className="timeline__rail">
                <div className="timeline__rail-num">{p.n}</div>
                <div className="timeline__rail-duration">{p.t} · {p.d}</div>
              </div>
              <div className="phase">
                <h2 className="phase__title">{p.title}</h2>
                <p className="phase__desc">{p.desc}</p>
                <p className="phase__how">{p.how}</p>
                <div className="phase__deliverables">
                  <h4>Livrables</h4>
                  <ul>{p.deliv.map(d => <li key={d}>{d}</li>)}</ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap">
          <div className="pricing-block" style={{ marginTop: 0 }}>
            <h3>— Délais réalistes par type de livrable</h3>
            <div className="pricing-line"><span className="pricing-line__name">Automatisation simple</span><span className="pricing-line__price">3 jours</span></div>
            <div className="pricing-line"><span className="pricing-line__name">Automatisation complexe</span><span className="pricing-line__price">7 jours</span></div>
            <div className="pricing-line"><span className="pricing-line__name">Agent IA avec RAG</span><span className="pricing-line__price">14-21 jours</span></div>
            <div className="pricing-line"><span className="pricing-line__name">SaaS sur-mesure V1</span><span className="pricing-line__price">4-6 semaines</span></div>
            <div className="pricing-line"><span className="pricing-line__name">Extension SaaS existant</span><span className="pricing-line__price">2-3 semaines</span></div>
            <p style={{ color: 'var(--ink-d-mute)', fontSize: 14, lineHeight: 1.6, marginTop: 24 }}>
              Ces délais sont basés sur notre rythme réel en 2024-2026. Nous refuserons un projet que nous ne pouvons pas tenir.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-block">
        <div className="wrap">
          <div className="cta-block__tag">— Audit gratuit · 48h · Sans engagement</div>
          <h2>Prêt à démarrer <em>l'audit</em> ?</h2>
          <p className="mono" style={{ marginBottom: 32, color: 'var(--ink-d-mute)' }}>
            48 h, gratuit, sans engagement. Vous repartez avec un diagnostic chiffré.
          </p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <button className="btn-primary" onClick={onOpenAudit}>
              Lancer l'audit <Icon name="arrowRight" size={16} />
            </button>
            <button className="btn-ghost" onClick={() => window.__nav('/contact')}>
              Nous parler directement
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// =========================================================================
// PAGE À PROPOS + CHATBOT AUDIT
// =========================================================================
function AboutPage({ onOpenAudit }) {
  return (
    <div className="route-view" id="main-content">
      <section className="page-head">
        <div className="wrap">
          <div className="page-head__label">— À propos · Duo genevois</div>
          <h1 className="page-head__h1">Un père, un fils, un stack.<br /><em>Binacore</em>, c'est ça.</h1>
          <p className="page-head__lead">
            Binacore est un atelier de build IA indépendant basé à Genève. Deux personnes, une même conviction : les PME suisses méritent mieux que des SaaS américains à 500€/mois par utilisateur. On construit les alternatives.
          </p>
        </div>
      </section>

      {/* Équipe */}
      <section className="section">
        <div className="wrap">
          <div className="section-header">
            <span className="tag">Équipe · 02 personnes</span>
            <h2 className="h2-section">Deux builders. Aucune <em>sous-traitance</em>.</h2>
          </div>
          <div className="team-grid">
            <article className="person">
              <div className="person__photo" aria-label="Photo Boualem Bensalem (placeholder)">BB</div>
              <div className="person__role">Fondateur · Lead Builder</div>
              <h3 className="person__name">Boualem Bensalem</h3>
              <p className="person__bio">
                Citoyen Suisse-Algérien basé à Genève. Autodidacte IA depuis 2022, autant dire depuis que ChatGPT est sorti. 400 000+ lignes de code accumulées sur des projets persos et clients. Construit iafactory.ch et iafactoryalgeria en 2024-2025. Lance Binacore comme marque d'offre services en 2024.
              </p>
              <div className="person__stack">FastAPI · Next.js · RAG · Multi-agents · LiteLLM · Qdrant · PostgreSQL · Docker</div>
              <p className="person__quote">« Je ne vends pas de slides. Je livre du soft qui tourne le lundi matin. »</p>
              <div className="person__contact">contact@binacore.ch</div>
            </article>

            <article className="person">
              <div className="person__photo" aria-label="Photo Ayoub Bensalem (placeholder)">AB</div>
              <div className="person__role">Développeur · Co-builder</div>
              <h3 className="person__name">Ayoub Bensalem</h3>
              <p className="person__bio">
                Fils de Boualem. En formation technique. Autonome sur des briques complètes depuis 2024. Co-créateur de KhutbaBox. Spécialisé en intégrations front et produits voix/audio.
              </p>
              <div className="person__stack">Next.js · Front · Bots WhatsApp · Audio APIs · Azure Speech · ElevenLabs</div>
              <p className="person__quote">« On construit pendant que les autres font des appels d'offre. »</p>
              <div className="person__contact">contact@binacore.ch</div>
            </article>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="section section--alt">
        <div className="wrap">
          <div className="section-header">
            <span className="tag">Histoire · 2022 → 2026</span>
            <h2 className="h2-section">De ChatGPT à <em>Binacore v2</em>.</h2>
          </div>
          <div className="history-list">
            <div className="history-item">
              <div className="history-year">2022</div>
              <div className="history-event">Boualem découvre ChatGPT. Commence à apprendre le code par l'IA.</div>
            </div>
            <div className="history-item">
              <div className="history-year">2023</div>
              <div className="history-event">Premiers prototypes RAG. Échecs, itérations, premières validations techniques.</div>
            </div>
            <div className="history-item">
              <div className="history-year">2024</div>
              <div className="history-event">Lancement de iafactory.ch. Fondation de Binacore comme marque d'offre services. Début de la collaboration avec Ayoub.</div>
            </div>
            <div className="history-item">
              <div className="history-year">2025</div>
              <div className="history-event">Plateforme Algérie en production. Projet RateBoost démarré. KhutbaBox en MVP.</div>
            </div>
            <div className="history-item">
              <div className="history-year">2026</div>
              <div className="history-event">Duo stabilisé. Stack maîtrisée. Site Binacore v2 en ligne.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Conviction */}
      <section className="manifesto">
        <div className="wrap">
          <p className="manifesto__quote">
            « <em>Une PME suisse</em> ne devrait pas dépendre d'un SaaS américain à 500€/mois/user pour faire tourner son métier. On construit <em>les alternatives</em>, hébergées en Suisse, dans votre langue, avec votre code qui vous appartient. »
          </p>
          <div className="manifesto__sig">— Boualem Bensalem · 2026</div>
        </div>
      </section>

      {/* Chatbot d'audit */}
      <section className="section section--alt" id="audit-chatbot">
        <div className="wrap">
          <div className="section-header" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <span className="tag">Premier audit · 100% gratuit · Sans engagement</span>
            <h2 className="h2-section">Envie d'un diagnostic ? <em>Discutez</em> avec notre assistant.</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              3 minutes de questions, vous repartez avec une reco chiffrée.
            </p>
          </div>
          <AuditChatbot />
        </div>
      </section>
    </div>
  );
}

// ---------- Chatbot audit (11 étapes) ----------
function AuditChatbot() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState('INTRO');
  const [answers, setAnswers] = useState({});
  const [typing, setTyping] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [diagnostic, setDiagnostic] = useState(null);
  const bodyRef = useRef(null);

  const scrollDown = () => { setTimeout(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, 50); };

  const botSay = (text, options = null, afterDelay = 700) => {
    setTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, { sender: 'bot', text, options }]);
      setTyping(false);
      scrollDown();
    }, afterDelay);
  };

  const userSay = (text) => {
    setMessages(m => [...m, { sender: 'user', text }]);
    scrollDown();
  };

  // Initial message
  useEffect(() => {
    botSay(
      "Bonjour. Je suis l'assistant d'audit Binacore. En 3 minutes, je vais comprendre votre activité et identifier les livrables IA qui vous feraient gagner le plus de temps. Prêt ?",
      [{ label: "Oui, c'est parti", value: 'GO' }, { label: "Combien ça coûte ?", value: 'PRICING' }]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickOption = (value, label) => {
    userSay(label);

    if (step === 'INTRO') {
      if (value === 'GO') { setStep('PILIER'); askPilier(); }
      else { setStep('PRICING_HINT'); askPricingHint(); }
    } else if (step === 'PRICING_HINT') {
      if (value === 'CONTINUE') { setStep('PILIER'); askPilier(); }
      else { botSay("Compris. Vous pouvez revenir dès que vous voulez.", []); setStep('END_EARLY'); }
    } else if (step === 'PILIER') {
      setAnswers(a => ({ ...a, pillar: label })); setStep('SECTEUR'); askSecteur();
    } else if (step === 'SECTEUR') {
      setAnswers(a => ({ ...a, sector: label })); setStep('TAILLE'); askTaille();
    } else if (step === 'TAILLE') {
      setAnswers(a => ({ ...a, size: label })); setStep('PAIN'); askPain();
    } else if (step === 'PAIN') {
      setAnswers(a => ({ ...a, pain: label })); setStep('VOLUME'); askVolume();
    } else if (step === 'VOLUME') {
      setAnswers(a => ({ ...a, volume: label })); setStep('DATA'); askData();
    } else if (step === 'DATA') {
      setAnswers(a => ({ ...a, data: label })); setStep('STACK'); askStack();
    } else if (step === 'STACK') {
      setAnswers(a => ({ ...a, stack: label })); setStep('TIMELINE'); askTimeline();
    } else if (step === 'TIMELINE') {
      setAnswers(a => ({ ...a, timeline: label })); setStep('EMAIL'); askEmail();
    }
  };

  const askPricingHint = () => {
    botSay(
      "L'audit est 100% gratuit, sans engagement. Ensuite, selon votre besoin : Automatisations dès CHF 1'800, Agents IA dès CHF 6'500, SaaS sur-mesure dès CHF 18'000. On continue l'audit ?",
      [{ label: "Oui, continuons", value: 'CONTINUE' }, { label: "Plus tard", value: 'LATER' }]
    );
  };
  const askPilier = () => {
    botSay(
      "Vous cherchez plutôt…",
      [
        { label: "Une automatisation rapide", value: 'AUTO' },
        { label: "Un agent IA intelligent", value: 'AGENT' },
        { label: "Un SaaS sur-mesure", value: 'SAAS' },
        { label: "Je veux un avis d'expert", value: 'EXPERT' },
      ]
    );
  };
  const askSecteur = () => {
    botSay(
      "Dans quel secteur évoluez-vous ?",
      ['Fiduciaire/Comptabilité','Cabinet d\'avocats/Étude','Santé/Clinique','PME industrielle','Immobilier/Régie','Marketing/Agence','SaaS/Tech','Autre'].map(o => ({ label: o, value: o }))
    );
  };
  const askTaille = () => {
    botSay(
      "Combien d'employés dans l'équipe ?",
      ['Solo/2-3','Petite équipe (5-15)','PME (15-50)','ETI (50-250)','Grand compte (250+)'].map(o => ({ label: o, value: o }))
    );
  };
  const askPain = () => {
    botSay(
      "Quelle tâche vous coûte le plus de temps au quotidien ?",
      [
        'Répondre aux emails clients',
        'Lire et saisir des documents',
        'Support client/SAV',
        'Synchroniser nos outils',
        "Recherche d'information interne",
        "Créer un SaaS ou plateforme pour mon métier",
        'Plusieurs de ces points',
      ].map(o => ({ label: o, value: o }))
    );
  };
  const askVolume = () => {
    botSay(
      "Approximativement, combien d'unités par jour ?",
      ['< 20', '20-100', '100-500', '500-2000', '> 2000'].map(o => ({ label: o, value: o }))
    );
  };
  const askData = () => {
    botSay(
      "Vos données contiennent-elles des informations confidentielles ?",
      ['Oui très sensibles', 'Oui modérément', 'Peu ou pas', 'Je ne sais pas'].map(o => ({ label: o, value: o }))
    );
  };
  const askStack = () => {
    botSay(
      "Avec quels outils travaillez-vous principalement ?",
      ['Google Workspace','Microsoft 365','Bexio/Abacus','Salesforce/HubSpot','Notion/Airtable','Plusieurs','Autres/sur mesure'].map(o => ({ label: o, value: o }))
    );
  };
  const askTimeline = () => {
    botSay(
      "Quand voulez-vous démarrer ?",
      ['Dès que possible', "D'ici 1 mois", "D'ici 3 mois", "J'explore juste"].map(o => ({ label: o, value: o }))
    );
  };
  const askEmail = () => {
    botSay("Parfait. J'ai de quoi vous faire un diagnostic chiffré. Où je l'envoie ?", []);
  };

  const submitEmail = () => {
    const email = emailDraft.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setEmailErr("Email invalide. Format attendu : prenom@domaine.ch");
      return;
    }
    setEmailErr('');
    userSay(email);
    const finalAns = { ...answers, email };
    setAnswers(finalAns);
    setStep('DONE');
    setTimeout(() => {
      const livrables = pickLivrables(finalAns);
      const hours = estimateHours(finalAns);
      setDiagnostic({ livrables, hours, answers: finalAns });
    }, 900);
  };

  const reset = () => {
    setMessages([]); setStep('INTRO'); setAnswers({}); setDiagnostic(null); setEmailDraft(''); setEmailErr('');
    setTimeout(() => {
      botSay(
        "Bonjour. Je suis l'assistant d'audit Binacore. En 3 minutes, je vais comprendre votre activité et identifier les livrables IA qui vous feraient gagner le plus de temps. Prêt ?",
        [{ label: "Oui, c'est parti", value: 'GO' }, { label: "Combien ça coûte ?", value: 'PRICING' }]
      );
    }, 200);
  };

  if (diagnostic) {
    return <ChatbotDiagnosis data={diagnostic} onReset={reset} />;
  }

  const lastBotMsg = [...messages].reverse().find(m => m.sender === 'bot');
  const activeOptions = (lastBotMsg && lastBotMsg.options) || [];

  return (
    <div className="chatbox" role="region" aria-label="Chatbot d'audit">
      <header className="chatbox__header">
        <div className="chatbox__avatar" aria-hidden="true">B</div>
        <div className="chatbox__header-text">
          <h3 className="chatbox__title">Assistant d'audit Binacore</h3>
          <div className="chatbox__status">
            <span className="brand-dot" aria-hidden="true"></span>
            En ligne · répond en 10s
          </div>
        </div>
        <button className="chatbox__reset" onClick={reset} aria-label="Réinitialiser">
          <Icon name="refresh" size={16} />
        </button>
      </header>

      <div className="chatbox__body" ref={bodyRef}>
        {messages.map((m, i) => (
          <Fragment key={i}>
            <div className={'chat-msg chat-msg--' + m.sender}>
              <div className="chat-msg__bubble">{m.text}</div>
            </div>
            {m.sender === 'bot' && m.options && m.options.length > 0 && i === messages.length - 1 && !typing && (
              <div className="chatbox__options">
                {m.options.map((o, k) => (
                  <button key={k} className="chatbox__option" onClick={() => pickOption(o.value, o.label)}>{o.label}</button>
                ))}
              </div>
            )}
          </Fragment>
        ))}
        {typing && (
          <div className="chat-msg chat-msg--bot">
            <div className="chatbox__typing">
              <span className="typing-dot"></span><span className="typing-dot"></span><span className="typing-dot"></span>
            </div>
          </div>
        )}
      </div>

      {step === 'EMAIL' && !typing && (
        <div className="chatbox__input-row">
          <input
            type="email"
            className="chatbox__input"
            placeholder="vous@entreprise.ch"
            value={emailDraft}
            onChange={e => setEmailDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') submitEmail(); }}
          />
          <button className="chatbox__submit" onClick={submitEmail} disabled={!emailDraft}>
            Envoyer →
          </button>
        </div>
      )}
      {emailErr && <div style={{ padding: '0 20px 12px', color: 'var(--ac2)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{emailErr}</div>}
    </div>
  );
}

// ---------- Logique pickLivrables (page /a-propos chatbot) ----------
function pickLivrables(answers) {
  const result = [];
  const pillar = answers.pillar || '';
  const pain = answers.pain || '';
  const stack = answers.stack || '';

  if (pillar === 'Un SaaS sur-mesure') {
    result.push({ code: 'SAAS', name: 'SaaS sur-mesure', reason: "Projet plateforme métier adapté à votre vertical" });
  }
  if (pain.includes('emails')) result.push({ code: '002', name: 'Agent Inbox', reason: 'tri et réponse automatique à vos emails' });
  if (pain.includes('documents') || pain.includes('saisir')) result.push({ code: '003', name: 'Agent Extract', reason: 'extraction automatique de vos documents' });
  if (pain.includes('Support') || pain.includes('SAV')) result.push({ code: '001', name: 'Agent Support', reason: 'réponses clients multilingues 24/7' });
  if (pain.includes('outils') || pain.includes('Synchroniser') || stack.includes('Plusieurs')) result.push({ code: '004', name: 'Agent Ops', reason: 'orchestration de votre stack outillage' });
  if (pain.includes('Recherche') || pain.includes('information')) result.push({ code: '001', name: 'Agent Support', reason: 'RAG sur votre base de connaissances' });
  if (pain.includes('SaaS') || pain.includes('plateforme')) result.push({ code: 'SAAS', name: 'SaaS sur-mesure', reason: 'Plateforme verticale adaptée à votre métier' });

  const seen = new Set();
  const unique = result.filter(r => { if (seen.has(r.code)) return false; seen.add(r.code); return true; }).slice(0, 3);
  if (unique.length === 0) return [{ code: '002', name: 'Agent Inbox', reason: 'point de départ classique pour gagner du temps' }];
  return unique;
}

function estimateHours(answers) {
  const v = answers.volume;
  if (v === '> 2000') return '50 à 80 h/sem';
  if (v === '500-2000') return '20 à 45 h/sem';
  if (v === '100-500') return '10 à 25 h/sem';
  if (v === '20-100') return '4 à 12 h/sem';
  if (v === '< 20') return '2 à 6 h/sem';
  return "selon cas d'usage";
}

function ChatbotDiagnosis({ data, onReset }) {
  const { livrables, hours, answers } = data;
  return (
    <div className="diagnosis">
      <div className="diagnosis__tag">— Diagnostic généré</div>
      <h3>Voici ce qu'on recommanderait pour vous.</h3>
      <p className="diagnosis__lead">
        Sur la base de vos réponses, nous identifions <b>{livrables.length} livrable(s)</b> à fort impact et un potentiel de <b style={{ color: 'var(--ac)' }}>{hours}</b> récupérées sur les tâches répétitives.
      </p>

      <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-d-faint)', margin: '0 0 12px', fontWeight: 500 }}>Livrables recommandés</h4>
      <ul className="diagnosis__reco-list">
        {livrables.map((l, i) => (
          <li key={i} className="diagnosis__reco">
            <span className="diagnosis__reco-code">{l.code}</span>
            <div className="diagnosis__reco-body">
              <strong>{l.name}</strong>
              <span>{l.reason}</span>
            </div>
          </li>
        ))}
      </ul>

      <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-d-faint)', margin: '0 0 12px', fontWeight: 500 }}>Votre profil</h4>
      <div className="diagnosis__profile">
        <div><b>Secteur</b> : {answers.sector || '—'} &nbsp;·&nbsp; <b>Taille</b> : {answers.size || '—'}</div>
        <div><b>Volume/jour</b> : {answers.volume || '—'} &nbsp;·&nbsp; <b>Sensibilité</b> : {answers.data || '—'}</div>
        <div><b>Stack</b> : {answers.stack || '—'} &nbsp;·&nbsp; <b>Démarrage</b> : {answers.timeline || '—'}</div>
        <div><b>Pilier</b> : {answers.pillar || '—'}</div>
      </div>

      <div className="diagnosis__footer">
        Rapport détaillé envoyé à <b style={{ color: 'var(--ac)' }}>{answers.email}</b> sous 48 h. Vous serez contacté par Boualem ou Ayoub pour en discuter. Sans engagement.
      </div>

      <div className="btn-row" style={{ marginTop: 24 }}>
        <button className="btn-ghost" onClick={onReset}>
          <Icon name="refresh" size={14} /> Recommencer
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// PAGE CONTACT
// =========================================================================
function ContactPage({ onOpenAudit }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', projectType: '', message: '' });
  const [errors, setErrors] = useState({});

  const setField = (f) => (e) => setForm(s => ({ ...s, [f]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'Nom requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) err.email = 'Email invalide';
    if (form.message.trim().length < 20) err.message = 'Message trop court (20 caractères min)';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Tentative POST backend, fallback mailto
    const payload = new URLSearchParams(form).toString();
    fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: payload })
      .then(() => {
        window.__toast("Message reçu. Réponse sous 24 h ouvrées.");
        setForm({ name: '', email: '', company: '', projectType: '', message: '' });
      })
      .catch(() => {
        // Fallback : ouvre le client mail
        const subject = encodeURIComponent(`Contact Binacore — ${form.projectType || 'Projet'}`);
        const body = encodeURIComponent(`Nom : ${form.name}\nEntreprise : ${form.company}\nType de projet : ${form.projectType}\n\n${form.message}`);
        window.location.href = `mailto:contact@binacore.ch?subject=${subject}&body=${body}`;
        window.__toast("Ouverture de votre client mail…");
      });
  };

  return (
    <div className="route-view" id="main-content">
      <section className="page-head">
        <div className="wrap">
          <div className="page-head__label">— Contact direct</div>
          <h1 className="page-head__h1">Parlons de votre <em>projet</em>.</h1>
          <p className="page-head__lead">
            Audit sous 48 h. Réponse email sous 24 h ouvrées.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact-grid">
            {/* Colonne info */}
            <div className="contact-info">
              <span className="tag">Contact direct</span>
              <dl>
                <dt>Email</dt>
                <dd><a href="mailto:contact@binacore.ch">contact@binacore.ch</a></dd>

                <dt>Localisation</dt>
                <dd>Genève, Suisse.<br />Rendez-vous physiques sur demande.</dd>

                <dt>Horaires</dt>
                <dd>Lun-Ven · 09h-18h · UTC+1</dd>

                <dt>Réponse</dt>
                <dd>Audit sous 48 h<br />SLA 4 h en Enterprise</dd>
              </dl>
              <div style={{ marginTop: 40, paddingTop: 40, borderTop: '1px solid var(--line-d)' }}>
                <span className="tag">Infrastructure</span>
                <dl>
                  <dt>Hébergement</dt>
                  <dd>CH (Hetzner Zurich)</dd>
                  <dt>Conformité</dt>
                  <dd>nLPD · RGPD</dd>
                  <dt>Chiffrement</dt>
                  <dd>AES-256</dd>
                </dl>
              </div>
            </div>

            {/* Colonne formulaire */}
            <form onSubmit={submit} noValidate>
              <div className="form-field">
                <label htmlFor="f-name">Nom <span>*</span></label>
                <input id="f-name" type="text" value={form.name} onChange={setField('name')} required />
                {errors.name && <div className="form-field__error">{errors.name}</div>}
              </div>

              <div className="form-field">
                <label htmlFor="f-email">Email <span>*</span></label>
                <input id="f-email" type="email" value={form.email} onChange={setField('email')} required />
                {errors.email && <div className="form-field__error">{errors.email}</div>}
              </div>

              <div className="form-field">
                <label htmlFor="f-company">Entreprise</label>
                <input id="f-company" type="text" value={form.company} onChange={setField('company')} />
              </div>

              <div className="form-field">
                <label htmlFor="f-type">Type de projet</label>
                <select id="f-type" value={form.projectType} onChange={setField('projectType')}>
                  <option value="">Choisir…</option>
                  <option>Automatisation</option>
                  <option>Agent IA</option>
                  <option>SaaS sur-mesure</option>
                  <option>Conseil</option>
                  <option>Autre</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="f-msg">Message <span>*</span></label>
                <textarea id="f-msg" value={form.message} onChange={setField('message')} required></textarea>
                {errors.message && <div className="form-field__error">{errors.message}</div>}
              </div>

              <button className="btn-primary" type="submit">
                Envoyer <Icon name="arrowRight" size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="cta-block">
        <div className="wrap">
          <div className="cta-block__tag">— Ou</div>
          <h2>Préférez un audit guidé par <em>chatbot</em> ?</h2>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => window.__nav('/a-propos', 'audit-chatbot')}>
              Lancer l'audit <Icon name="arrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// =========================================================================
// PAGES LÉGALES
// =========================================================================
function LegalPage() {
  return (
    <div className="route-view" id="main-content">
      <section className="page-head">
        <div className="wrap">
          <div className="page-head__label">— Légal</div>
          <h1 className="page-head__h1">Mentions légales</h1>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <LegalBlock title="Éditeur du site">
            Binacore est une marque exploitée par <b>Boualem Bensalem</b>, raison individuelle inscrite au Registre du commerce du canton de Genève, Suisse.<br /><br />
            Contact : <a href="mailto:contact@binacore.ch" style={{ color: 'var(--ac)' }}>contact@binacore.ch</a><br />
            Adresse postale : sur demande.
          </LegalBlock>
          <LegalBlock title="Hébergement">
            Infrastructure hébergée en Suisse (canton de Zurich) chez Hetzner.
          </LegalBlock>
          <LegalBlock title="Propriété intellectuelle">
            Le contenu de ce site (textes, visuels, code) est la propriété exclusive de Boualem Bensalem, sauf mention contraire. Toute reproduction ou utilisation sans autorisation écrite est interdite.
          </LegalBlock>
          <LegalBlock title="Limitation de responsabilité">
            Binacore décline toute responsabilité quant à l'utilisation qui pourrait être faite des informations présentes sur ce site, qui ont une valeur indicative et sont susceptibles d'évolution.
          </LegalBlock>
          <LegalBlock title="Dernière mise à jour">
            Avril 2026.
          </LegalBlock>
        </div>
      </section>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="route-view" id="main-content">
      <section className="page-head">
        <div className="wrap">
          <div className="page-head__label">— Légal</div>
          <h1 className="page-head__h1">Politique de confidentialité</h1>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <LegalBlock title="1. Données collectées">
            <b>Via le formulaire de contact</b> : nom, email, entreprise, message.<br /><br />
            <b>Via les démos IA</b> : uniquement le contenu soumis pour la requête, non conservé au-delà de la réponse.<br /><br />
            <b>Via les cookies</b> : aucun cookie de tracking. Cookies techniques uniquement si nécessaire au fonctionnement.
          </LegalBlock>
          <LegalBlock title="2. Finalité">
            Ces données servent uniquement à vous répondre. Aucune donnée n'est revendue ou transmise à des tiers.
          </LegalBlock>
          <LegalBlock title="3. Conservation">
            Emails de contact : conservés 2 ans puis supprimés.<br />
            Données de démo : non conservées au-delà de la requête.
          </LegalBlock>
          <LegalBlock title="4. Vos droits (RGPD + nLPD)">
            Vous pouvez demander l'accès, la rectification ou la suppression de vos données à <a href="mailto:contact@binacore.ch" style={{ color: 'var(--ac)' }}>contact@binacore.ch</a>.
          </LegalBlock>
          <LegalBlock title="5. Hébergement">
            Données hébergées en Suisse (Hetzner, région Zurich).
          </LegalBlock>
          <LegalBlock title="6. Dernière mise à jour">
            Avril 2026.
          </LegalBlock>
        </div>
      </section>
    </div>
  );
}

function LegalBlock({ title, children }) {
  return (
    <article style={{ padding: '32px 0', borderBottom: '1px solid var(--line-d)' }}>
      <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ac)', margin: '0 0 16px', fontWeight: 500 }}>
        {title}
      </h2>
      <div style={{ color: 'var(--ink-d)', fontSize: 15, lineHeight: 1.7 }}>{children}</div>
    </article>
  );
}

// ---------- Expose ----------
window.Binacore.Pages = {
  HomePage, ServicesPage, AgentsPage, ProjetsPage, ProcessusPage, AboutPage, ContactPage, LegalPage, PrivacyPage
};
