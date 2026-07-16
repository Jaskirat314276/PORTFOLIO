'use client';

import { useReducedMotion } from '../lib/useReducedMotion';

// Deterministic pseudo-random from index — SSR-safe (no Math.random in
// render, so the server and client agree on every offset).
const rnd = (i, salt) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Words (or characters) start scattered in space — thrown offsets,
// rotation, scale, no opacity — and CONVERGE into their final positions
// when `active` flips true.
// segments: [{ text, className, style, atomic, chars, underline } | { br }].
// `atomic` keeps a segment as one flying unit, `chars` splits it into
// per-character units (the accent name), and `underline` mounts the
// trace underline under the whole segment.
export default function ScatterText({ segments, active, delay = 0, stagger = 0.055, distance = 1 }) {
  const reduced = useReducedMotion();
  const on = active || reduced;
  let w = 0;
  return (
    <>
      {segments.map((seg, si) => {
        if (seg.br) return <br key={`br${si}`} />;
        const units = seg.atomic ? [seg.text] : seg.chars ? seg.text.split('') : seg.text.split(' ');
        return (
          <span
            key={si}
            className={seg.className}
            style={{
              ...(seg.underline ? { position: 'relative', display: 'inline-block' } : null),
              ...seg.style,
            }}
          >
            {units.map((unit, wi) => {
              // spaces between flying characters stay put
              if (seg.chars && unit === ' ') {
                return <span key={wi} style={{ whiteSpace: 'pre' }}> </span>;
              }
              const i = w++;
              // round everything — full-precision floats break hydration
              // (server HTML vs CSSOM-normalized client values)
              const dx = +((rnd(i, 1) - 0.5) * 260 * distance).toFixed(1);
              const dy = +((rnd(i, 2) - 0.5) * 180 * distance).toFixed(1);
              const rot = +((rnd(i, 3) - 0.5) * (seg.chars ? 60 : 26)).toFixed(1);
              const sc = +(0.5 + rnd(i, 4) * 0.9).toFixed(2);
              const dl = +(delay + i * stagger).toFixed(3);
              return (
                <span
                  key={wi}
                  style={{
                    display: 'inline-block', whiteSpace: 'pre',
                    opacity: on ? 1 : 0,
                    transform: on ? 'none' : `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${sc})`,
                    transition: reduced
                      ? 'none'
                      : `transform 0.9s var(--ease-expo) ${dl}s, opacity 0.7s ease ${dl}s`,
                  }}
                >
                  {unit}{!seg.atomic && !seg.chars && wi < units.length - 1 ? ' ' : ''}
                </span>
              );
            })}
            {/* mount the underline only once active, so its draw delay counts
                from the convergence start (not from page mount behind the boot gate) */}
            {seg.underline && on && <span className="name-underline" aria-hidden="true" />}
          </span>
        );
      })}
    </>
  );
}
