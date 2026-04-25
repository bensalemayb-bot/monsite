// =========================================================================
// Binacore — Composants globaux
// Nav, MobileMenu, Footer, AuditModal, CursorFollower, ScrollProgress,
// Toast, Icon, StackStrip, Beat, CtaBlock, SectionHeader
// =========================================================================

const { useState, useEffect, useRef, useCallback, Fragment } = React;

// ---------- Icônes SVG inline (pas d'emoji dans l'UI) ----------
function Icon({ name, size = 20, strokeWidth = 1.6, className = '' }) {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round',
    className, 'aria-hidden': 'true'
  };
  const paths = {
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
    arrowUpRight: <><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></>,
    close: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    menu: <><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></>,
    bot: <><rect x="3" y="8" width="18" height="12" rx="2" /><path d="M12 8V4" /><circle cx="8.5" cy="14" r="1" /><circle cx="15.5" cy="14" r="1" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></>,
    cpu: <><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" /></>,
    workflow: <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.5 6h7M6 8.5v7M18 8.5v7M8.5 18h7" /></>,
    chat: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
    scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><line x1="7" y1="12" x2="17" y2="12" /></>,
    mic: <><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M19 10a7 7 0 0 1-14 0" /><line x1="12" y1="19" x2="12" y2="23" /></>,
    sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
    play: <polygon points="5 3 19 12 5 21 5 3" />,
    refresh: <><polyline points="23 4 23 10 17 10" /><path d="M20.49 15A9 9 0 1 1 18 5.64L23 10" /></>,
  };
  return <svg {...props}>{paths[name] || null}</svg>;
}

// ---------- Brand (logo + dot) ----------
function Brand({ onClick }) {
  return (
    <button
      className="nav__brand"
      onClick={onClick || (() => window.__nav('/home'))}
      aria-label="Retour à l'accueil Binacore"
      style={{ background: 'none', border: 'none', padding: 0 }}
    >
      <span className="brand-dot" aria-hidden="true"></span>
      <span>binacore</span>
    </button>
  );
}

// ---------- Nav (avec effet "scrolled" qui ajoute un fond flou) ----------
function Nav({ route, onOpenAudit, onOpenMobile }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Services', route: '/services' },
    { label: 'Agents', route: '/agents' },
    { label: 'Projets', route: '/projets' },
    { label: 'Processus', route: '/processus' },
    { label: 'À propos', route: '/a-propos' },
    { label: 'Contact', route: '/contact' },
  ];
  return (
    <header className={'nav' + (scrolled ? ' nav--scrolled' : '')} role="banner">
      <Brand />
      <nav className="nav__links" aria-label="Navigation principale">
        {links.map(l => (
          <button
            key={l.route}
            className={'nav__link' + (route === l.route ? ' active' : '')}
            onClick={() => window.__nav(l.route)}
            aria-current={route === l.route ? 'page' : undefined}
          >
            {l.label}
          </button>
        ))}
      </nav>
      <button className="nav__cta" onClick={onOpenAudit} aria-label="Démarrer un audit">
        Démarrer <Icon name="arrowUpRight" size={14} />
      </button>
      <button className="nav__burger" onClick={onOpenMobile} aria-label="Ouvrir le menu">
        <Icon name="menu" size={18} />
      </button>
    </header>
  );
}

// ---------- Mobile menu ----------
function MobileMenu({ open, onClose, onOpenAudit }) {
  const links = [
    { label: 'Services', route: '/services' },
    { label: 'Agents', route: '/agents' },
    { label: 'Projets', route: '/projets' },
    { label: 'Processus', route: '/processus' },
    { label: 'À propos', route: '/a-propos' },
    { label: 'Contact', route: '/contact' },
  ];
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div className={'mobile-menu' + (open ? ' mobile-menu--open' : '')} aria-hidden={!open}>
      <button className="mobile-menu__close" onClick={onClose} aria-label="Fermer le menu">
        <Icon name="close" size={20} />
      </button>
      <nav>
        {links.map(l => (
          <a key={l.route} onClick={() => { window.__nav(l.route); onClose(); }}>
            {l.label}
          </a>
        ))}
      </nav>
      <button
        className="btn-primary mobile-menu__cta"
        onClick={() => { onClose(); onOpenAudit(); }}
      >
        Démarrer un audit <Icon name="arrowRight" size={16} />
      </button>
    </div>
  );
}

// ---------- Footer ----------
function Footer({ onOpenAudit }) {
  const go = (r, a) => () => window.__nav(r, a);
  return (
    <footer className="footer" role="contentinfo">
      <div className="wrap">
        {/* Bandeau top "Let's talk" */}
        <div className="footer__hello">
          <div className="footer__hello-text">
            <span className="footer__status">
              <span className="footer__status-dot" aria-hidden="true"></span>
              Available · booking Mai 2026
            </span>
            <h3 className="footer__hello-title">
              Un projet IA en tête&nbsp;?<br />
              <span className="footer__hello-italic">Démarre par un audit gratuit.</span>
            </h3>
          </div>
          <div className="footer__hello-cta">
            <button className="shiny-cta" onClick={onOpenAudit} type="button">
              <span>Démarrer un audit</span>
              <Icon name="arrowUpRight" size={16} />
            </button>
            <a className="footer__email" href="mailto:contact@binacore.ch">contact@binacore.ch</a>
          </div>
        </div>

        <div className="footer__wordmark" aria-hidden="true">
          bina<span className="ac">core.</span>
        </div>

        <div className="footer__grid">
          <div className="footer__col">
            <Brand />
            <p className="footer__brand-desc">
              Builder IA genevois. Automatisations, agents et SaaS sur-mesure pour PME suisses.
            </p>
            <ul className="footer__social" aria-label="Réseaux sociaux">
              <li>
                <a href="mailto:contact@binacore.ch" aria-label="Email">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/boualem-bensalem" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.4v1.57h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://github.com/binacore" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.95-3.2.69-3.87-1.54-3.87-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.16 1.17.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.48 3.16-1.17 3.16-1.17.62 1.57.23 2.73.11 3.02.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.25 5.65.41.36.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.14 0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Offres</h4>
            <ul>
              <li><button onClick={go('/services', 'automatisations')}>Automatisations</button></li>
              <li><button onClick={go('/services', 'agents-ia')}>Agents IA</button></li>
              <li><button onClick={go('/services', 'saas-sur-mesure')}>SaaS sur-mesure</button></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Agents</h4>
            <ul>
              <li><button onClick={go('/agents', 'agent-support')}>Support</button></li>
              <li><button onClick={go('/agents', 'agent-inbox')}>Inbox</button></li>
              <li><button onClick={go('/agents', 'agent-extract')}>Extract</button></li>
              <li><button onClick={go('/agents', 'agent-ops')}>Ops</button></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Travail</h4>
            <ul>
              <li><button onClick={go('/projets')}>Projets</button></li>
              <li><button onClick={go('/processus')}>Processus</button></li>
              <li><button onClick={go('/a-propos')}>À propos</button></li>
              <li><button onClick={go('/contact')}>Contact</button></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Légal</h4>
            <ul>
              <li><button onClick={go('/mentions-legales')}>Mentions</button></li>
              <li><button onClick={go('/confidentialite')}>Confidentialité</button></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Binacore · Boualem Bensalem · Genève</span>
          <span>v2026.04 · Hébergement CH · Built with Claude</span>
        </div>
      </div>
    </footer>
  );
}

// ---------- Audit Modal — wrapper qui ouvre le chatbot d'audit conversationnel ----------
// Le composant AuditChatbot est défini dans pages.jsx et exposé via window.Binacore.
function AuditModal({ open, onClose }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const Chatbot = (window.Binacore && window.Binacore.AuditChatbot) || null;

  return (
    <div
      className="modal-backdrop modal-backdrop--chat"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Démarrer un audit Binacore"
    >
      <div className="audit-chat-shell" onClick={e => e.stopPropagation()}>
        <button
          className="audit-chat-shell__close"
          onClick={onClose}
          aria-label="Fermer le chat d'audit"
          type="button"
        >
          <Icon name="close" size={18} />
        </button>
        {Chatbot ? (
          <Chatbot />
        ) : (
          <div style={{ background: 'var(--bg-card)', padding: 32, borderRadius: 16, color: 'var(--ink-mute)' }}>
            Le chatbot d'audit n'est pas encore prêt. Réessayez dans quelques secondes.
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Cursor Follower (gros rond bleu, grossit sur hover d'éléments interactifs) ----------
function CursorFollower() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) { el.style.display = 'none'; return; }
    let x = 0, y = 0, rafId = 0;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(tick);
      // Détecte si la cible est interactive
      const t = e.target;
      const isInteractive =
        t.closest('button, a, [role="button"], .card, .proj-card, .service-card, .demo-card, .project-card, .person, .chip, .modal__option, .chatbox__option');
      if (isInteractive) el.classList.add('cursor-follower--hover');
      else el.classList.remove('cursor-follower--hover');
    };
    const tick = () => { el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`; rafId = 0; };
    window.addEventListener('mousemove', move, { passive: true });
    return () => { window.removeEventListener('mousemove', move); if (rafId) cancelAnimationFrame(rafId); };
  }, []);
  return <div className="cursor-follower" ref={ref} aria-hidden="true" />;
}

// ---------- Scroll Progress (% + barre bleue qui se remplit) ----------
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  const fillRef = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
      const clamped = Math.max(0, Math.min(100, p));
      setPct(clamped);
      if (fillRef.current) fillRef.current.style.setProperty('--p', String(clamped / 100));
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="scroll-progress" aria-hidden="true">
      <span>{String(pct).padStart(2, '0')}%</span>
      <div className="scroll-progress__bar"><div className="scroll-progress__fill" ref={fillRef}></div></div>
    </div>
  );
}

// ---------- Toast (singleton via window.__toast) ----------
function Toast() {
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.__toast = (m) => {
      setMsg(m);
      setVisible(true);
      setTimeout(() => setVisible(false), 3600);
    };
  }, []);
  return <div className={'toast' + (visible ? ' toast--visible' : '')} aria-live="polite">{msg}</div>;
}

// ---------- StackStrip ----------
function StackStrip({ items }) {
  return (
    <div className="stack-strip">
      {items.join(' · ')}
    </div>
  );
}

// ---------- SectionHeader ----------
function SectionHeader({ tag, children, lead }) {
  return (
    <div className="section-header">
      {tag && <span className="tag">{tag.replace(/^—\s*/, '')}</span>}
      <h2 className="h2-section">{children}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

// ---------- Beat (narrative) ----------
function Beat({ num, children }) {
  return (
    <div className="beat">
      <div className="beat__num">— {num}</div>
      <p className="beat__text">{children}</p>
    </div>
  );
}

// ---------- CtaBlock (bloc centré "— Audit gratuit · 48h · Sans engagement") ----------
function CtaBlock({ tag, children, buttons, onOpenAudit }) {
  return (
    <section className="cta-block">
      <div className="wrap">
        <div className="cta-block__tag">{tag}</div>
        <h2>{children}</h2>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          {buttons ? buttons : (
            <Magnetic className="btn-primary" onClick={onOpenAudit}>
              Démarrer l'audit <Icon name="arrowRight" size={16} />
            </Magnetic>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------- IntersectionObserver helper pour reveal ----------
function useReveal(ref, options = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('visible');
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

// ---------- Bouton magnétique (suit le curseur légèrement) ----------
function Magnetic({ children, className, onClick, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      const strength = 0.25;
      if (Math.abs(x) < r.width && Math.abs(y) < r.height) {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      }
    };
    const onLeave = () => { el.style.transform = 'translate(0, 0)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);
  return <button ref={ref} className={className} onClick={onClick} {...rest}>{children}</button>;
}

// ---------- Scramble text (sur les stats + headings quand visibles) ----------
function useScramble(ref, finalText, duration = 600) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !finalText) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = finalText;
      return;
    }
    const chars = '0123456789ABCDEF$#@%&*';
    const steps = 18;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        let currentStep = 0;
        const stepDuration = duration / steps;
        const run = () => {
          if (currentStep >= steps) { el.textContent = finalText; return; }
          el.textContent = finalText.split('').map(c => {
            if (/[\s+%<>\/.,'· -]/.test(c)) return c;
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('');
          currentStep++;
          setTimeout(run, stepDuration);
        };
        run();
        io.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, finalText, duration]);
}

// ---------- Stat avec scramble automatique ----------
function ScrambleStat({ value, className }) {
  const ref = useRef(null);
  useScramble(ref, String(value));
  return <span ref={ref} className={className}>{value}</span>;
}

// Expose globalement (pas de bundler, donc on attache à window)
window.Binacore = window.Binacore || {};
Object.assign(window.Binacore, {
  Icon, Brand, Nav, MobileMenu, Footer, AuditModal,
  CursorFollower, ScrollProgress, Toast,
  StackStrip, SectionHeader, Beat, CtaBlock,
  useReveal, Magnetic, useScramble, ScrambleStat,
});
