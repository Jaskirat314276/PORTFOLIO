'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../lib/useReducedMotion';

// ASCII only — block glyphs (▓▒░) fall back to a system font with wider
// advances, making the chip jitter in width mid-decrypt
const GLYPHS = '#$%&/=+*<>';

// Mono decrypt-from-glyph-soup. Fires once when scrolled into view.
export default function ScrambleText({ text, duration = 900, className, style }) {
  const ref = useRef(null);
  const [out, setOut] = useState(text);
  const [go, setGo] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting || e.boundingClientRect.bottom < 0) { setGo(true); ob.disconnect(); }
      },
      { threshold: [0, 0.4] }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    if (!go || reduced) { setOut(text); return; }
    const steps = Math.max(12, Math.floor(duration / 36));
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const revealed = Math.floor((frame / steps) * text.length);
      setOut(
        text.split('').map((ch, i) =>
          i < revealed || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
        ).join('')
      );
      if (frame >= steps) { setOut(text); clearInterval(id); }
    }, 36);
    return () => clearInterval(id);
  }, [go, reduced, text, duration]);

  return <span ref={ref} className={className} style={style}>{out}</span>;
}
