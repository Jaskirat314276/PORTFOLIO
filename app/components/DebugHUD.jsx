'use client';

import { useEffect, useState } from 'react';
import { detectTier } from '../lib/useReducedMotion';

// ?debug → fixed mono panel: FPS · TIER · SCROLL% · TRACE%.
export default function DebugHUD() {
  const [on, setOn] = useState(false);
  const [fps, setFps] = useState(60);
  const [scroll, setScroll] = useState(0);
  const [trace, setTrace] = useState(0);
  const [tier, setTier] = useState('A');

  useEffect(() => {
    setOn(new URLSearchParams(window.location.search).has('debug'));
    setTier(detectTier());
  }, []);

  useEffect(() => {
    if (!on) return;
    let raf = 0, frames = 0, last = performance.now();
    const loop = (now) => {
      frames++;
      if (now - last >= 1000) {
        setFps(frames); frames = 0; last = now;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setScroll(max > 0 ? Math.round((doc.scrollTop / max) * 100) : 0);
        setTrace(Math.round((window.__traceProgress || 0) * 100));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [on]);

  if (!on) return null;
  return (
    <div className="debug-hud" aria-hidden="true">
      FPS <b>{fps}</b> · TIER <b>{tier}</b><br />
      SCROLL <b>{scroll}%</b> · TRACE <b>{trace}%</b>
    </div>
  );
}
