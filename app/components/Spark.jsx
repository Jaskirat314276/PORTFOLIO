'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '../lib/useReducedMotion';

// 6-particle spark burst — fires once when `fire` flips true (a card
// docking onto the trace). Pure transform/opacity, aria-hidden.
export default function Spark({ fire, color = 'var(--accent)', style }) {
  const [burst, setBurst] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => { if (fire) setBurst((b) => b + 1); }, [fire]);
  if (!burst || reduced) return null;
  return (
    <span key={burst} aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, zIndex: 6, ...style }}>
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 + 0.4;
        const d = 15 + (i % 3) * 8;
        return (
          <span
            key={i}
            style={{
              position: 'absolute', left: 0, top: 0, width: 3.5, height: 3.5, borderRadius: '50%',
              background: color, boxShadow: `0 0 8px ${color}`,
              '--dx': `${Math.cos(a) * d}px`,
              '--dy': `${Math.sin(a) * d + 7}px`, // slight gravity
              animation: `spark-fly 0.5s ease-out ${i * 0.02}s forwards`,
              opacity: 0,
            }}
          />
        );
      })}
    </span>
  );
}
