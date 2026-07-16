'use client';

import { useEffect, useRef, useState } from 'react';
import { ease } from '../lib/motion';
import { useReducedMotion } from '../lib/useReducedMotion';

// Slot-machine odometer. Digit columns roll to their target (right→left
// stagger). `gag` makes the value tick +1 once, 1.2s after it settles —
// the LeetCode counter that's "still counting".
export default function Odometer({ value, suffix = '', gag = false, onGag }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  const [rolled, setRolled] = useState(false);
  const [flash, setFlash] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) { setRolled(true); return; }
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting || e.boundingClientRect.bottom < 0) { setRolled(true); ob.disconnect(); }
      },
      { threshold: [0, 0.6] }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!rolled || !gag || reduced) return;
    const t = setTimeout(() => {
      setDisplay((v) => v + 1);
      setFlash(true);
      onGag && onGag(true);
      const off = setTimeout(() => { setFlash(false); onGag && onGag(false); }, 1500);
      return () => clearTimeout(off);
    }, 2100);
    return () => clearTimeout(t);
  }, [rolled, gag, reduced, onGag]);

  const digits = String(display).split('');

  return (
    <span
      ref={ref}
      style={{
        display: 'inline-flex', alignItems: 'flex-start',
        color: flash ? 'var(--accent)' : 'inherit',
        transition: 'color 0.3s ease',
      }}
    >
      {digits.map((d, i) => {
        const target = Number(d);
        // stagger from the right
        const delay = (digits.length - 1 - i) * 0.06;
        return (
          <span
            key={i}
            style={{
              display: 'inline-block', height: '1em', overflow: 'hidden',
              verticalAlign: 'top',
            }}
          >
            <span
              style={{
                display: 'flex', flexDirection: 'column',
                transform: `translateY(${rolled ? -target : 0}em)`,
                transition: reduced ? 'none' : `transform 0.9s ${ease.expo} ${delay}s`,
              }}
            >
              {Array.from({ length: 10 }, (_, n) => (
                <span key={n} style={{ height: '1em', lineHeight: '1em' }}>{n}</span>
              ))}
            </span>
          </span>
        );
      })}
      {suffix && (
        <span
          style={{
            color: 'var(--accent)',
            transform: rolled ? 'scale(1)' : 'scale(1.4)',
            opacity: rolled ? 1 : 0,
            transition: `transform 0.5s ${ease.back} 0.5s, opacity 0.5s ${ease.back} 0.5s`,
          }}
        >
          {suffix}
        </span>
      )}
    </span>
  );
}
