'use client';

import { useEffect, useState } from 'react';
import { detectTier } from '../lib/useReducedMotion';

// Film grain with a stepped ~10fps flicker (transform only). aria-hidden.
// The 200%-sized blend layer is real compositor work, so weak/touch
// devices (tier C) skip it entirely.
export default function GrainOverlay() {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(detectTier() !== 'C'); }, []);
  if (!show) return null;
  return <div className="grain" aria-hidden="true" />;
}
