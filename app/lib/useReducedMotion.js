'use client';

import { useEffect, useState } from 'react';

// Single shared hook. Reads prefers-reduced-motion and stays live.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);
  return reduced;
}

// Coarse device tier: 'A' full, 'B' mid (no WebGL hero), 'C' weak/touch.
export function detectTier() {
  if (typeof window === 'undefined') return 'A';
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cores = navigator.hardwareConcurrency || 4;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (!fine || saveData) return 'C';
  if (reduced) return 'B';
  if (cores >= 8) return 'A';
  return 'B';
}
