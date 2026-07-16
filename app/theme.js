// ============================================================
// THE TRACE — Claude design language, warm-dark. One accent.
// Single source of truth for palette + font stacks (inline styles).
// CSS custom-property twins live in globals.css (:root).
// ============================================================

export const palette = {
  bg: '#1a1815', // cool near-black
  surface: '#23211d',
  surfaceHi: '#2c2925',
  border: 'rgba(240,238,229,0.1)',
  borderHi: 'rgba(240,238,229,0.22)',
  text: '#f0eee5', // warm ivory
  textDim: 'rgba(240,238,229,0.7)',
  textMuted: 'rgba(240,238,229,0.45)',
  accent: '#d97757', // primary orange
  accentDim: '#a8593c',
  accentSoft: 'rgba(217,119,87,0.12)',
  accent2: '#a8593c', // deep terracotta
  accent2Soft: 'rgba(91,158,255,0.12)',
  paper: '#faf9f5', // paper-cream dossiers + detail pages
  paperInk: '#1f1e1d',
  paperLine: '#e8e5db',
  success: '#7d9b76',
  danger: '#c45a4a',
  info: '#6a8fae',
};

export const font = {
  display: "var(--font-display), 'Instrument Serif', Georgia, serif",
  body: "var(--font-body), 'Bricolage Grotesque', system-ui, sans-serif",
  mono: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
};

// convenience aliases (used all over the inline styles)
export const c = palette;
