'use client';

import { useEffect, useRef, useState } from 'react';
import Spark from './Spark';
import { useScrollProgress } from './Trace';
import { useReducedMotion } from '../lib/useReducedMotion';

// ============================================================
// Scroll-scrubbed kinetic bands — content CONVERGES / DIVERGES
// with scroll and reverses cleanly when you scroll back.
// transform + opacity only.
// ============================================================

// SOFTWARE →← HARDWARE : the two halves travel in from the edges and
// meet at a via; on contact the via lights, sparks fire, and the
// punchline decrypts underneath. Scroll back and they part again.
export function ConvergeBand() {
  const ref = useRef(null);
  const p = useScrollProgress(ref, { startAt: 0.95, endAt: 0.35 });
  const reduced = useReducedMotion();
  const prog = reduced ? 1 : p;
  const off = Math.max(0, 1 - prog * 1.9); // 1 → 0 by ~53% of the pass
  const met = off <= 0.02;

  return (
    <section ref={ref} className="section" style={{ padding: '96px 0', textAlign: 'center' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 'clamp(12px, 2.4vw, 30px)', whiteSpace: 'nowrap',
      }}>
        <span className="serif" style={{
          fontSize: 'clamp(26px, 6.5vw, 92px)', lineHeight: 1, color: 'var(--text)',
          display: 'inline-block',
          transform: `translateX(${-off * 22}vw)`,
          opacity: 0.25 + (1 - off) * 0.75,
          transition: 'transform 0.18s linear, opacity 0.18s linear',
        }}>Software</span>

        <span style={{ position: 'relative', width: 16, height: 16, flexShrink: 0 }} aria-hidden="true">
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: `1.5px solid ${met ? 'var(--accent)' : 'var(--border-hi)'}`,
            background: met ? 'var(--accent-soft)' : 'transparent',
            boxShadow: met ? '0 0 14px rgba(255,107,61,0.7)' : 'none',
            transform: met ? 'scale(1.15)' : 'scale(1)',
            transition: 'all 0.35s var(--ease-back)',
          }} />
          <Spark fire={met} style={{ left: 8, top: 8 }} />
        </span>

        <span className="serif" style={{
          fontSize: 'clamp(26px, 6.5vw, 92px)', lineHeight: 1, fontStyle: 'italic', color: 'var(--accent)',
          display: 'inline-block',
          transform: `translateX(${off * 22}vw)`,
          opacity: 0.25 + (1 - off) * 0.75,
          transition: 'transform 0.18s linear, opacity 0.18s linear',
        }}>Hardware</span>
      </div>

      <div className="mono" style={{
        marginTop: 30, fontSize: 11, letterSpacing: '0.22em',
        color: met ? 'var(--accent)' : 'var(--text-muted)',
        opacity: met ? 1 : 0,
        transform: met ? 'none' : 'translateY(12px)',
        transition: 'opacity 0.45s var(--ease-expo), transform 0.45s var(--ease-expo), color 0.3s ease',
      }}>
        — ONE ENGINEER · ZERO HANDOFFS —
      </div>
    </section>
  );
}

// FROM IDEA / TO SHIPPED : the two lines DIVERGE toward opposite edges
// as you scroll, opening a gap where a trace draws and real proof-points
// fade in. Scroll back up and the lines close over them again.
export function DivergeBand() {
  const ref = useRef(null);
  const p = useScrollProgress(ref, { startAt: 0.9, endAt: 0.3 });
  const reduced = useReducedMotion();
  const prog = reduced ? 1 : p;
  const spread = Math.min(1, prog * 1.6);

  const FACTS = ['<30S IMAGE → INVENTORY', '25+ REST ENDPOINTS', '300V TESTED', '30+ TEAMS BEATEN'];

  return (
    <section ref={ref} className="section" style={{ padding: '96px 0', textAlign: 'center' }}>
      <div className="serif" aria-hidden="true" style={{
        fontSize: 'clamp(38px, 7.5vw, 108px)', lineHeight: 1, whiteSpace: 'nowrap',
        color: 'transparent', WebkitTextStroke: '1px var(--border-hi)',
        transform: `translateX(${-spread * 15}vw)`,
        transition: 'transform 0.18s linear',
      }}>FROM IDEA</div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
        margin: '22px 0', flexWrap: 'wrap',
        opacity: spread, transition: 'opacity 0.25s ease',
      }}>
        <span aria-hidden="true" style={{
          width: 'clamp(24px, 6vw, 90px)', height: 1.5, background: 'var(--accent)',
          boxShadow: '0 0 6px rgba(255,107,61,0.6)',
          transform: `scaleX(${spread})`, transformOrigin: 'right',
          transition: 'transform 0.2s linear',
        }} />
        {FACTS.map((f, i) => (
          <span key={f} className="mono" style={{
            fontSize: 10.5, letterSpacing: '0.16em', color: 'var(--text-dim)',
            opacity: spread > 0.35 + i * 0.12 ? 1 : 0,
            transform: spread > 0.35 + i * 0.12 ? 'none' : 'translateY(8px)',
            transition: 'opacity 0.4s var(--ease-expo), transform 0.4s var(--ease-expo)',
          }}>{f}{i < FACTS.length - 1 ? '  ·' : ''}</span>
        ))}
        <span aria-hidden="true" style={{
          width: 'clamp(24px, 6vw, 90px)', height: 1.5, background: 'var(--accent)',
          boxShadow: '0 0 6px rgba(255,107,61,0.6)',
          transform: `scaleX(${spread})`, transformOrigin: 'left',
          transition: 'transform 0.2s linear',
        }} />
      </div>

      <div className="serif" style={{
        fontSize: 'clamp(38px, 7.5vw, 108px)', lineHeight: 1, whiteSpace: 'nowrap', color: 'var(--text)',
        transform: `translateX(${spread * 15}vw)`,
        transition: 'transform 0.18s linear',
      }}>TO <span className="ital">shipped</span>.</div>
    </section>
  );
}

// Ghost section numeral with a gentle scroll parallax (no React state —
// writes the transform directly, so it costs nothing per frame).
export function GhostNum({ children, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const t = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.transform = `translateY(${t * 70}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <span ref={ref} className="ghost-num" aria-hidden="true" style={style}>{children}</span>;
}

// Paragraph whose words rise one by one from a mask (editorial reveal).
export function WordRise({ text, as: Tag = 'p', className, style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting || e.boundingClientRect.bottom < 0) { setShown(true); ob.disconnect(); }
      },
      { threshold: [0, 0.2] }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  const on = shown || reduced;

  return (
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <span style={{
            display: 'inline-block',
            transform: on ? 'none' : 'translateY(110%)',
            transition: `transform 0.5s var(--ease-expo) ${0.018 * i}s`,
          }}>{w}&nbsp;</span>
        </span>
      ))}
    </Tag>
  );
}
