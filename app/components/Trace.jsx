'use client';

import { useEffect, useRef, useState } from 'react';

// Progress (0..1) of an element travelling through the viewport.
// Drives every scroll-scrubbed trace segment + the rail pulse.
export function useScrollProgress(ref, { startAt = 0.85, endAt = 0.35 } = {}) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const startY = startAt * vh;
      const total = r.height + (startAt - endAt) * vh;
      const traveled = startY - r.top;
      const next = total > 0 ? Math.max(0, Math.min(1, traveled / total)) : 0;
      // quantize: skip sub-0.1% deltas so fast scrolling doesn't re-render
      // the section every frame (keeps the main thread free for the IOs)
      setP((prev) => (Math.abs(next - prev) < 0.001 && next !== 0 && next !== 1 ? prev : next));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, startAt, endAt]);
  return p;
}

// POWER-ON LIGHTING: flips data-powered on a target element when the
// segment's draw progress passes onAt (hysteresis via offAt so it never
// flickers at the boundary). One attribute toggle — never per-frame styles.
export function usePower(targetRef, p, { onAt = 0.55, offAt = 0.45 } = {}) {
  useEffect(() => {
    const el = targetRef?.current;
    if (!el) return;
    if (p >= onAt) el.setAttribute('data-powered', '');
    else if (p < offAt) el.removeAttribute('data-powered');
  }, [targetRef, p, onAt, offAt]);
}

// Discrete count of thresholds the progress has passed. Unlike
// useScrollProgress this only re-renders on a crossing (≤ thresholds.length
// times per direction), so it's safe to consume high in the tree.
export function useThresholdCount(ref, thresholds, { startAt = 0.85, endAt = 0.35 } = {}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const startY = startAt * vh;
      const total = r.height + (startAt - endAt) * vh;
      const traveled = startY - r.top;
      const p = total > 0 ? Math.max(0, Math.min(1, traveled / total)) : 0;
      let next = 0;
      for (const t of thresholds) if (p >= t) next++;
      setCount((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, startAt, endAt, thresholds]);
  return count;
}

// A single vertical connector trace that draws with scroll — used for
// the hero cue drop and the achievements→now-building pass-through.
export function VerticalTrace({ height = 120, className = '', dotTop = false }) {
  const ref = useRef(null);
  const p = useScrollProgress(ref, { startAt: 0.9, endAt: 0.5 });
  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
      aria-hidden="true"
    >
      {dotTop && (
        <span
          className="scroll-cue-dot"
          style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)',
            marginBottom: 8,
          }}
        />
      )}
      <svg width="2" height={height} viewBox={`0 0 2 ${height}`} style={{ overflow: 'visible' }}>
        <line
          x1="1" y1="0" x2="1" y2={height}
          className="trace-path"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - p}
        />
      </svg>
    </div>
  );
}

// Left-margin circuit run with 45° jogs, scrubbed to the target's scroll
// window — the trace's s3 (skills) and s6 (achievements→now-building)
// pass-through segments.
export function MarginTrace({ targetRef, powerRef, reduced = false, startAt = 0.9, endAt = 0.35, style }) {
  const p = useScrollProgress(targetRef, { startAt, endAt });
  usePower(powerRef || targetRef, p);
  const off = reduced ? 0 : 1 - p;
  const d = 'M 30 0 L 30 360 L 12 400 L 12 640 L 30 680 L 30 1000';
  return (
    <svg
      aria-hidden="true"
      className="margin-trace"
      viewBox="0 0 60 1000"
      preserveAspectRatio="none"
      style={{ position: 'absolute', left: 0, top: 0, width: 60, height: '100%', pointerEvents: 'none', zIndex: 0, ...style }}
    >
      <path d={d} className="trace-path trace-dim" />
      <path d={d} className="trace-path" pathLength="1" strokeDasharray="1" strokeDashoffset={off} />
    </svg>
  );
}

// THE INTERSECTION BEAT — CODE (from left) × HARDWARE (from right)
// hairlines draw toward each other, cross under the word "intersection",
// and merge into one line exiting the bottom. The thesis in one move.
export function IntersectionBeat({ powerRef }) {
  const ref = useRef(null);
  const p = useScrollProgress(ref, { startAt: 0.8, endAt: 0.45 });
  usePower(powerRef, p);
  const off = 1 - p;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ position: 'absolute', inset: '-10% 0 -30% 0', zIndex: 0, pointerEvents: 'none' }}
    >
      <svg
        width="100%" height="100%" viewBox="0 0 1000 460"
        preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}
      >
        {/* CODE — from the left, 45° bend into the crossing */}
        <path
          d="M 0 120 L 380 120 L 500 240"
          className="trace-path" pathLength="1" strokeDasharray="1" strokeDashoffset={off}
        />
        {/* HARDWARE — from the right, 45° bend into the crossing */}
        <path
          d="M 1000 120 L 620 120 L 500 240"
          className="trace-path" pathLength="1" strokeDasharray="1" strokeDashoffset={off}
        />
        {/* merged trace exits the bottom */}
        <path
          d="M 500 240 L 500 460"
          className="trace-path" pathLength="1" strokeDasharray="1"
          strokeDashoffset={Math.max(0, 1 - Math.max(0, (p - 0.6) / 0.4))}
        />
        <circle cx="500" cy="240" r={p > 0.55 ? 4 : 0} fill="var(--accent)" style={{ transition: 'r 0.3s' }} />
      </svg>
      <span style={{
        position: 'absolute', left: '2%', top: 'calc(26% - 18px)',
        fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em',
        color: 'var(--text-muted)', opacity: p > 0.1 ? 1 : 0, transition: 'opacity 0.4s',
      }}>CODE</span>
      <span style={{
        position: 'absolute', right: '2%', top: 'calc(26% - 18px)',
        fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em',
        color: 'var(--text-muted)', opacity: p > 0.1 ? 1 : 0, transition: 'opacity 0.4s',
      }}>HARDWARE</span>
    </div>
  );
}
