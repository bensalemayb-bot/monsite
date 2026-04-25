// =========================================================================
// Binacore — Démos IA (v1 : mode fallback offline, pas de backend live)
// En v2 on branchera /api/demo/{rag,ocr,email,audio} avec rate limiting.
// En attendant, les démos tournent avec les données figées de demo-fallbacks.json.
// =========================================================================

const { useState, useEffect, useRef } = React;
const { Icon: DemoIcon } = window.Binacore;

// ---------- Wrapper générique ----------
function DemoModal({ title, description, children, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="demo-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="demo-modal" onClick={e => e.stopPropagation()}>
        <header className="demo-modal__header">
          <button className="demo-modal__close" onClick={onClose} aria-label="Fermer">
            <DemoIcon name="close" size={18} />
          </button>
          <span className="tag">Démo interactive</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </header>
        <main className="demo-modal__body">{children}</main>
        <footer className="demo-modal__footer">
          Démo publique · Vos données ne sont pas conservées · 10 essais/heure max
        </footer>
      </div>
    </div>
  );
}

// ---------- v1 : placeholder "Bientôt disponible" commun ----------
function DemoComingSoon({ demoKey }) {
  const messages = {
    rag: {
      title: "RAG Chatbot — Cabinet Comptable Lac Léman",
      lines: [
        "Cette démo interrogera un mini-corpus de 20 documents fiduciaires.",
        "Réponses streamées avec sources citées.",
        "Modèle : Claude Haiku via LiteLLM · latence cible < 3s.",
      ],
    },
    ocr: {
      title: "OCR Facture — Extraction structurée",
      lines: [
        "Upload PDF (≤ 2 Mo) ou 3 exemples pré-chargés.",
        "Output JSON : fournisseur, TVA, montants, anomalies, doublons.",
        "Stack : Tesseract/EasyOCR + Claude pour structuration.",
      ],
    },
    email: {
      title: "Tri Email — Classification + draft",
      lines: [
        "Collez un email, obtenez catégorie + urgence + brouillon de réponse.",
        "5 exemples pré-chargés pour tester rapidement.",
        "Prompt seul, sans RAG.",
      ],
    },
    audio: {
      title: "Traducteur Audio — FR / AR / EN",
      lines: [
        "Enregistrez 15 s (MediaRecorder) ou uploadez un audio < 30 s.",
        "Transcription Whisper + traduction Claude en 3 langues.",
      ],
    },
  };
  const m = messages[demoKey] || { title: 'Démo', lines: [] };

  // Si le fallback JSON est disponible, on peut afficher une version statique (étape 1).
  const fallback = window.__demoFallbacks && window.__demoFallbacks[demoKey];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <span className="brand-dot" aria-hidden="true"></span>
        <span className="mono" style={{ color: 'var(--ac)' }}>BACKEND EN COURS DE DÉPLOIEMENT · Rendu statique</span>
      </div>

      <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-d-faint)', margin: '0 0 16px' }}>
        — {m.title}
      </h4>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {m.lines.map((l, i) => (
          <li key={i} style={{ color: 'var(--ink-d)', fontSize: 15, lineHeight: 1.55, paddingLeft: 20, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--ac)' }}>—</span>{l}
          </li>
        ))}
      </ul>

      {fallback && fallback.sample && (
        <div style={{ marginTop: 28 }}>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-d-faint)', margin: '0 0 12px' }}>
            — Exemple de sortie (démo v1)
          </h4>
          <pre style={{
            background: '#000', border: '1px solid var(--line-d)', borderRadius: 8,
            padding: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
            color: 'var(--ac)', whiteSpace: 'pre-wrap', margin: 0, overflow: 'auto',
            maxHeight: 240, lineHeight: 1.6
          }}>{typeof fallback.sample === 'string' ? fallback.sample : JSON.stringify(fallback.sample, null, 2)}</pre>
        </div>
      )}

      <div style={{ marginTop: 32, padding: 16, border: '1px solid var(--line-d)', borderRadius: 8, background: 'var(--bg-d)' }}>
        <div className="mono" style={{ color: 'var(--ink-d-mute)', fontSize: 12, lineHeight: 1.7 }}>
          Pour un test sur vos données réelles, demandez un audit gratuit. On déploie la démo brandée à votre marque en 48 h.
        </div>
      </div>

      <div className="btn-row" style={{ marginTop: 24 }}>
        <button className="btn-primary" onClick={() => { window.__nav('/contact'); window.__closeDemo && window.__closeDemo(); }}>
          Nous contacter <DemoIcon name="arrowRight" size={14} />
        </button>
      </div>
    </div>
  );
}

// ---------- Switcher global ----------
function DemoRoot({ demoKey, onClose }) {
  const titles = {
    rag: { t: "Démo 01 — RAG Chatbot", d: "Posez une question à un cabinet comptable fictif." },
    ocr: { t: "Démo 02 — OCR Facture", d: "Extraction structurée d'une facture PDF." },
    email: { t: "Démo 03 — Tri Email", d: "Classification + draft de réponse automatique." },
    audio: { t: "Démo 04 — Traducteur Audio", d: "Transcription FR + traduction AR/EN." },
  };
  const meta = titles[demoKey] || { t: 'Démo', d: '' };

  // Expose close pour les CTAs internes
  useEffect(() => { window.__closeDemo = onClose; return () => { delete window.__closeDemo; }; }, [onClose]);

  return (
    <DemoModal title={meta.t} description={meta.d} onClose={onClose}>
      <DemoComingSoon demoKey={demoKey} />
    </DemoModal>
  );
}

window.Binacore.DemoRoot = DemoRoot;
