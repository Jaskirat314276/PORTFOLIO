'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../lib/useReducedMotion';

const WORDS = ['CODE', 'CIRCUITS', 'DATA', 'GENAI'];
const STACK = ['FASTAPI', 'YOLOV8', 'SARIMA', 'LANGCHAIN', 'REACT', 'DOCKER', 'MATLAB', 'POWER BI', 'NEXT.JS', 'CLAUDE', 'POSTGRES', 'SIMULINK'];

// Giant outlined-serif marquee that answers your scroll: velocity maps to
// speed (clamped ±3×), scrolling up reverses it, dragging nudges it.
// The solid accent word advances each loop. Counter-row drifts opposite.
export default function VelocityMarquee() {
  const wrapRef = useRef(null);
  const rowA = useRef(null);
  const rowB = useRef(null);
  const [solid, setSolid] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current, a = rowA.current, b = rowB.current;
    if (!wrap || !a || !b) return;

    let xA = 0, xB = -1, ts = 1;
    let lastY = window.scrollY, lastT = performance.now();
    let visible = true, raf = 0;
    let halfA = a.scrollWidth / 2, halfB = b.scrollWidth / 2;
    xB = -halfB / 2;

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, {});
    io.observe(wrap);
    const ro = new ResizeObserver(() => { halfA = a.scrollWidth / 2; halfB = b.scrollWidth / 2; });
    ro.observe(a); ro.observe(b);

    // click-drag nudges the band
    let dragging = false, lastPX = 0;
    const onDown = (e) => { dragging = true; lastPX = e.clientX; };
    const onMoveP = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastPX; lastPX = e.clientX;
      xA += dx; xB -= dx * 0.4;
    };
    const onUp = () => { dragging = false; };
    wrap.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMoveP);
    window.addEventListener('pointerup', onUp);

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(64, now - lastT); lastT = now;
      if (!visible || document.hidden) { lastY = window.scrollY; return; }

      const y = window.scrollY;
      const vel = (y - lastY) / Math.max(1, dt); // px/ms, signed
      lastY = y;
      const target = Math.max(-3, Math.min(3, 1 + vel * 2.4));
      ts += (target - ts) * 0.07; // lerp back toward 1

      xA -= (halfA / 40000) * dt * ts;
      if (xA <= -halfA) { xA += halfA; setSolid((s) => (s + 1) % WORDS.length); }
      else if (xA > 0) xA -= halfA;

      xB += (halfB / 60000) * dt * ts;
      if (xB >= 0) xB -= halfB;
      else if (xB < -halfB) xB += halfB;

      a.style.transform = `translate3d(${xA}px,0,0)`;
      b.style.transform = `translate3d(${xB}px,0,0)`;
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect(); ro.disconnect();
      wrap.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMoveP);
      window.removeEventListener('pointerup', onUp);
    };
  }, [reduced]);

  const words = [...WORDS, ...WORDS, ...WORDS];

  return (
    <section
      ref={wrapRef}
      className="marquee-band"
      aria-hidden="true"
      data-cursor="drag"
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', touchAction: 'pan-y', userSelect: 'none' }}
    >
      <div ref={rowA} className="marquee-row" style={{ willChange: 'transform' }}>
        {[0, 1].map((dup) => (
          <span key={dup} style={{ display: 'flex' }}>
            {words.map((w, i) => (
              <span key={`${dup}-${i}`} className={`marquee-word ${i % WORDS.length === solid ? 'solid' : ''}`}>
                {w}<span style={{ WebkitTextStroke: 0, color: 'var(--border-hi)' }}> · </span>
              </span>
            ))}
          </span>
        ))}
      </div>
      <div ref={rowB} className="marquee-row" style={{ marginTop: 18, willChange: 'transform' }}>
        {[0, 1].map((dup) => (
          <span key={dup} style={{ display: 'flex' }}>
            {[...STACK, ...STACK].map((w, i) => (
              <span key={`${dup}-${i}`} className="marquee-mono">{w} ·</span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}
