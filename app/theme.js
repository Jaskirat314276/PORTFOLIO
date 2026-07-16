// ============================================================
// THE TRACE — Claude design language, warm-dark. One accent.
// Single source of truth for palette + font stacks (inline styles).
// CSS custom-property twins live in globals.css (:root).
// ============================================================

export const palette = {
  bg: '#08080a', // cool near-black
  surface: '#101013',
  surfaceHi: '#17171b',
  border: 'rgba(245,241,234,0.1)',
  borderHi: 'rgba(245,241,234,0.22)',
  text: '#f5f1ea', // warm ivory
  textDim: 'rgba(245,241,234,0.7)',
  textMuted: 'rgba(245,241,234,0.45)',
  accent: '#ff6b3d', // primary orange
  accentDim: '#d9531f',
  accentSoft: 'rgba(255,107,61,0.12)',
  accent2: '#5b9eff', // secondary blue
  accent2Soft: 'rgba(91,158,255,0.12)',
  paper: '#faf9f5', // paper-cream dossiers + detail pages
  paperInk: '#1f1e1d',
  paperLine: '#e8e5db',
  success: '#10b981',
  danger: '#ef4444',
  info: '#5b9eff',
};

export const font = {
  display: "var(--font-display), 'Instrument Serif', Georgia, serif",
  body: "var(--font-body), 'Bricolage Grotesque', system-ui, sans-serif",
  mono: "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace",
};

// convenience aliases (used all over the inline styles)
export const c = palette;
