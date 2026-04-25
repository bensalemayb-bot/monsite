// =========================================================================
// Binacore — App root (montage React + routing hash-based)
// =========================================================================

const { useState, useEffect } = React;
const {
  Nav, MobileMenu, Footer, AuditModal,
  CursorFollower, ScrollProgress, Toast, Pages, DemoRoot
} = window.Binacore;

function App() {
  const [route, setRoute] = useState(window.__currentRoute());
  const [auditOpen, setAuditOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demoKey, setDemoKey] = useState(null);

  // Hashchange -> maj route state + ferme les overlays si besoin
  useEffect(() => {
    const onHash = () => {
      const r = window.__currentRoute();
      setRoute(r);
      applyRouteMeta(r);
      // Ferme systématiquement les overlays à chaque changement de route
      setMobileOpen(false);
      setAuditOpen(false);
      setDemoKey(null);
    };
    window.addEventListener('hashchange', onHash);
    applyRouteMeta(route);
    return () => window.removeEventListener('hashchange', onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAudit = () => setAuditOpen(true);
  const openDemo = (key) => setDemoKey(key);

  // Sélection de page
  let PageEl = null;
  const pageProps = { onOpenAudit: openAudit, onOpenDemo: openDemo };
  switch (route) {
    case '/services':         PageEl = <Pages.ServicesPage {...pageProps} />; break;
    case '/agents':           PageEl = <Pages.AgentsPage {...pageProps} />; break;
    case '/projets':          PageEl = <Pages.ProjetsPage {...pageProps} />; break;
    case '/processus':        PageEl = <Pages.ProcessusPage {...pageProps} />; break;
    case '/a-propos':         PageEl = <Pages.AboutPage {...pageProps} />; break;
    case '/contact':          PageEl = <Pages.ContactPage {...pageProps} />; break;
    case '/mentions-legales': PageEl = <Pages.LegalPage />; break;
    case '/confidentialite':  PageEl = <Pages.PrivacyPage />; break;
    case '/cas-usage':        PageEl = <Pages.ProjetsPage {...pageProps} />; break; // fallback redirection
    case '/home':
    default:                  PageEl = <Pages.HomePage {...pageProps} />; break;
  }

  return (
    <>
      <Nav route={route} onOpenAudit={openAudit} onOpenMobile={() => setMobileOpen(true)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} onOpenAudit={openAudit} />
      <ScrollProgress />
      <CursorFollower />
      <main key={route}>{PageEl}</main>
      <Footer onOpenAudit={openAudit} />
      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
      {demoKey && <DemoRoot demoKey={demoKey} onClose={() => setDemoKey(null)} />}
      <Toast />
    </>
  );
}

// ---------- Meta par route (title + description) ----------
function applyRouteMeta(route) {
  const metas = {
    '/home':              { t: 'Binacore — Builder IA Genève · Automatisations, Agents IA, SaaS sur-mesure', d: "Atelier de build IA indépendant basé à Genève. Automatisations, agents IA et SaaS sur-mesure pour PME suisses. Livraison rapide grâce à Claude Code." },
    '/services':          { t: 'Services — Binacore', d: "Trois piliers : Automatisations (dès CHF 1'800), Agents IA (dès CHF 6'500), SaaS sur-mesure (dès CHF 18'000). Prix transparents, code livré." },
    '/agents':            { t: 'Agents IA — Binacore', d: "Quatre archétypes : Support multilingue, Inbox, Extract (OCR), Ops (orchestration). Architectures de référence adaptées à votre métier." },
    '/projets':           { t: 'Projets — Binacore', d: "Ce qu'on a construit : iafactory.ch, RateBoost, KhutbaBox, change.iafactory.ch, iafactoryalgeria. En prod, cliquable, duplicable." },
    '/processus':         { t: 'Processus — Binacore', d: "4 phases : Audit (48h) · Design (1sem) · Déploiement (2sem) · Itération continue. Délais réalistes basés sur notre rythme 2024-2026." },
    '/a-propos':          { t: 'À propos — Binacore', d: "Boualem Bensalem (fondateur) et Ayoub Bensalem (co-builder). Atelier indépendant genevois. Chatbot d'audit gratuit sans engagement." },
    '/contact':           { t: 'Contact — Binacore', d: "Audit sous 48 h. Réponse sous 24 h ouvrées. contact@binacore.ch · Genève, Suisse." },
    '/mentions-legales':  { t: 'Mentions légales — Binacore', d: "Informations légales Binacore · Boualem Bensalem · Genève." },
    '/confidentialite':   { t: 'Confidentialité — Binacore', d: "Politique de confidentialité Binacore. Conformité nLPD et RGPD. Hébergement Suisse." },
  };
  const m = metas[route] || metas['/home'];
  document.title = m.t;
  let desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', m.d);
  let ogT = document.querySelector('meta[property="og:title"]');
  if (ogT) ogT.setAttribute('content', m.t);
  let ogD = document.querySelector('meta[property="og:description"]');
  if (ogD) ogD.setAttribute('content', m.d);
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
