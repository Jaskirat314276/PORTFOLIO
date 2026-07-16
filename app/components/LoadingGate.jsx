'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// three.js voxel scene loads in its own chunk, client-only — keeps the
// initial bundle (this file sits in the root layout) three-free.
const LoaderScene = dynamic(() => import('./LoaderScene'), { ssr: false });

const POST_LOG = [
  'JS-CORE BOOT v2.0',
  'PSU OK · 5V RAIL STABLE',
  'CLK 60FPS',
  'LOADING PORTFOLIO…',
];

export default function LoadingGate({ children }) {
  const [phase, setPhase] = useState('init'); // init | running | done | gone
  const [pct, setPct] = useState(0);
  const [logIdx, setLogIdx] = useState(0);
  const [fly, setFly] = useState(null); // {x, y} — the dot that becomes the nav LED

  // POWER ON: a terracotta dot flies from the loader to the nav LED —
  // the boot BECOMES the LED; the trace is born.
  useEffect(() => {
    if (phase !== 'done') return;
    const led = document.getElementById('nav-led');
    const cx = window.innerWidth / 2, cy = window.innerHeight * 0.62;
    setFly({ x: cx, y: cy });
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => {
      if (led) {
        const r = led.getBoundingClientRect();
        setFly({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      } else {
        setFly({ x: cx, y: -20 });
      }
    }));
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // decide once, on mount: reduced-motion or repeat visit → skip entirely
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = sessionStorage.getItem('js-boot');
    if (reduced || seen) { setPhase('gone'); return; }
    sessionStorage.setItem('js-boot', '1');
    setPhase('running');
  }, []);

  useEffect(() => {
    if (phase !== 'running') return;
    document.body.style.overflow = 'hidden';

    let val = 0, cancelled = false, timer;
    const stalls = { 37: 220, 61: 200, 89: 240 };
    const finish = () => {
      setPhase('done');
      setTimeout(() => setPhase('gone'), 560);
    };
    const step = () => {
      if (cancelled) return;
      if (val >= 100) { setPct(100); setLogIdx(POST_LOG.length); finish(); return; }
      val = Math.min(100, val + 2 + Math.floor(Math.random() * 4));
      setPct(val);
      setLogIdx(Math.min(POST_LOG.length - 1, Math.floor((val / 100) * POST_LOG.length)));
      let delay = 33;
      for (const s in stalls) if (val >= +s && val < +s + 3) delay = stalls[s];
      timer = setTimeout(step, delay);
    };
    timer = setTimeout(step, 200);

    const hardCap = setTimeout(finish, 2400);
    const skip = () => { cancelled = true; setPct(100); setLogIdx(POST_LOG.length); finish(); };
    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);

    return () => {
      cancelled = true;
      clearTimeout(timer); clearTimeout(hardCap);
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 'done' || phase === 'gone') document.body.style.overflow = '';
    // boot handoff: the hero's word-assembly waits for this signal
    if (phase === 'gone') {
      window.__bootDone = true;
      window.dispatchEvent(new Event('js:boot-done'));
    }
  }, [phase]);

  const showLoader = phase === 'running' || phase === 'done';

  return (
    <>
      {children}
      {phase === 'done' && fly && (
        <span
          aria-hidden="true"
          style={{
            position: 'fixed', left: 0, top: 0, zIndex: 10001,
            width: 8, height: 8, borderRadius: '50%',
            background: '#ff6b3d', boxShadow: '0 0 14px #ff6b3d',
            transform: `translate(${fly.x - 4}px, ${fly.y - 4}px)`,
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}
        />
      )}
      {showLoader && (
        <div
          aria-busy="true"
          aria-live="polite"
          style={{
            position: 'fixed', inset: 0, zIndex: 9999, background: '#08080a',
            color: '#f5f1ea', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            opacity: phase === 'done' ? 0 : 1,
            pointerEvents: phase === 'done' ? 'none' : 'auto',
            transition: 'opacity 0.55s ease',
          }}
        >
          {/* glow */}
          <div style={{
            position: 'absolute', top: '20%', left: '50%', width: 520, height: 520,
            transform: 'translateX(-50%)', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,61,0.16) 0%, transparent 70%)',
            filter: 'blur(80px)', pointerEvents: 'none',
          }} />

          {/* corner ticks */}
          {['tl', 'tr', 'bl', 'br'].map((k) => (
            <span key={k} style={{
              position: 'absolute', width: 26, height: 26, pointerEvents: 'none',
              [k[0] === 't' ? 'top' : 'bottom']: 26,
              [k[1] === 'l' ? 'left' : 'right']: 26,
              [k[0] === 't' ? 'borderTop' : 'borderBottom']: '1px solid var(--accent)',
              [k[1] === 'l' ? 'borderLeft' : 'borderRight']: '1px solid var(--accent)',
              opacity: 0.6,
            }} />
          ))}

          {/* POST log — bottom left, mono */}
          <div style={{
            position: 'absolute', bottom: 40, left: 'max(28px, 5vw)',
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
            color: 'var(--text-dim)', lineHeight: 1.9,
          }}>
            {POST_LOG.slice(0, logIdx).map((l, i) => (
              <div key={i}><span style={{ color: 'var(--accent)' }}>›</span> {l} <span style={{ color: 'var(--success)' }}>OK</span></div>
            ))}
            {pct >= 100 && <div style={{ color: 'var(--accent)' }}>› POWER ON</div>}
          </div>

          {/* counter — bottom right */}
          <div style={{
            position: 'absolute', bottom: 40, right: 'max(28px, 5vw)',
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 40, color: 'var(--text)',
          }}>
            {String(pct).padStart(3, '0')}
          </div>

          {/* 3D voxels */}
          <div style={{ width: 'min(420px, 78vw)', height: 'min(420px, 78vw)', position: 'relative', zIndex: 2 }}>
            <LoaderScene />
          </div>

          {/* name */}
          <div style={{ textAlign: 'center', marginTop: 8, position: 'relative', zIndex: 2 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 10 }}>
              — WELCOME —
            </div>
            <div className="serif" style={{ fontStyle: 'italic', fontSize: 'clamp(34px,6vw,58px)', color: 'var(--accent)', lineHeight: 1 }}>
              Jaskirat Singh
            </div>
          </div>

          {/* progress hairline */}
          <div style={{ width: 'min(440px, 82vw)', marginTop: 26, position: 'relative', zIndex: 2 }}>
            <div style={{ height: 2, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '100%', transform: `scaleX(${pct / 100})`, transformOrigin: 'left', background: 'linear-gradient(90deg, #ff6b3d, #5b9eff)', boxShadow: '0 0 12px rgba(255,107,61,0.6)', transition: 'transform 0.1s linear' }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
