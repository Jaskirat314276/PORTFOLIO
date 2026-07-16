'use client';

import { useEffect, useRef, useState } from 'react';

const LABELS = { view: 'VIEW', open: 'OPEN', drag: 'DRAG', press: 'PRESS' };

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setEnabled(mq.matches && !rm.matches);
    apply();
    mq.addEventListener('change', apply);
    rm.addEventListener('change', apply);
    return () => { mq.removeEventListener('change', apply); rm.removeEventListener('change', apply); };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current, ring = ringRef.current, label = labelRef.current;
    if (!dot || !ring) return;
    document.body.classList.add('cursor-active');

    let mx = 0, my = 0, rx = 0, ry = 0;
    let target = null;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    let raf;
    const loop = () => {
      rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2;
      const scale = target ? 1.7 : 1;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      if (label) label.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%) translateY(26px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const findTarget = (el) => {
      let n = el;
      while (n && n !== document.body) {
        if (n.dataset && n.dataset.cursor) return n.dataset.cursor;
        if (n.tagName === 'A' || n.tagName === 'BUTTON') return 'view';
        n = n.parentElement;
      }
      return null;
    };
    const onOver = (e) => {
      const t = findTarget(e.target);
      target = t;
      if (t) {
        ring.style.borderColor = 'var(--accent)';
        ring.style.background = t === 'press' ? 'var(--accent-soft)' : 'transparent';
        dot.style.background = 'var(--accent)';
        if (label) { label.textContent = LABELS[t] || ''; label.style.opacity = '1'; }
      } else {
        ring.style.borderColor = 'rgba(240,238,229,0.3)';
        ring.style.background = 'transparent';
        dot.style.background = 'var(--text)';
        if (label) label.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('pointerover', onOver);
    const restore = () => { target = null; if (label) label.style.opacity = '0'; };
    window.addEventListener('blur', restore);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('blur', restore);
      document.body.classList.remove('cursor-active');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" style={{
        position: 'fixed', top: 0, left: 0, width: 7, height: 7, borderRadius: '50%',
        background: 'var(--text)', pointerEvents: 'none', zIndex: 9999,
        mixBlendMode: 'difference', transition: 'background 0.2s',
      }} />
      <div ref={ringRef} className="custom-cursor-ring" style={{
        position: 'fixed', top: 0, left: 0, width: 34, height: 34, borderRadius: '50%',
        border: '1px solid rgba(240,238,229,0.3)', pointerEvents: 'none', zIndex: 9998,
        transition: 'background 0.3s, border-color 0.3s',
      }} />
      <div ref={labelRef} className="custom-cursor-label" style={{
        position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999,
        fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em',
        color: 'var(--accent)', opacity: 0, transition: 'opacity 0.2s',
      }} />
    </>
  );
}
