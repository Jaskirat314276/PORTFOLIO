'use client';

import { useEffect, useRef, useState } from 'react';

// Stick-figure runner that sprints along a track at the bottom of the
// viewport as the page scrolls. Legs/arms animate only while scrolling,
// and the figure flips to face the direction of travel.
export default function ScrollRunner() {
  const [progress, setProgress] = useState(0);
  const [moving, setMoving] = useState(false);
  const [dir, setDir] = useState(1); // 1 = down (right), -1 = up (left)
  const idleTimer = useRef(null);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0);
      if (y !== lastY.current) setDir(y > lastY.current ? 1 : -1);
      lastY.current = y;
      setMoving(true);
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setMoving(false), 180);
    };
    const raf = requestAnimationFrame(() => {
      onScroll();
      setMoving(false);
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(idleTimer.current);
    };
  }, []);

  const playState = moving ? 'running' : 'paused';

  return (
    <div className="scroll-runner" aria-hidden="true" style={{
      position: 'fixed', left: 0, right: 0, bottom: 0,
      padding: '0 24px 10px', zIndex: 60, pointerEvents: 'none',
    }}>
      <style>{`
        @keyframes runner-leg-a { 0% { transform: rotate(42deg); } 50% { transform: rotate(-34deg); } 100% { transform: rotate(42deg); } }
        @keyframes runner-leg-b { 0% { transform: rotate(-34deg); } 50% { transform: rotate(42deg); } 100% { transform: rotate(-34deg); } }
        @keyframes runner-arm-a { 0% { transform: rotate(-38deg); } 50% { transform: rotate(34deg); } 100% { transform: rotate(-38deg); } }
        @keyframes runner-arm-b { 0% { transform: rotate(34deg); } 50% { transform: rotate(-38deg); } 100% { transform: rotate(34deg); } }
        @keyframes runner-bob { 0% { transform: translateY(0); } 50% { transform: translateY(-1.6px); } 100% { transform: translateY(0); } }
        @media (max-width: 768px) {
          .scroll-runner { padding: 0 14px 6px !important; }
        }
      `}</style>

      <div style={{ position: 'relative', height: '34px' }}>
        {/* Track */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: '3px', height: '1px',
          background: 'rgba(245,241,234,0.12)',
        }} />
        {/* Covered portion of the track */}
        <div style={{
          position: 'absolute', left: 0, bottom: '3px', height: '1px',
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, rgba(255,107,61,0.15), #ff6b3d)',
          boxShadow: '0 0 12px rgba(255,107,61,0.7)',
        }} />

        {/* Runner */}
        <div style={{
          position: 'absolute', bottom: '2px',
          left: `${progress * 100}%`,
          transform: 'translateX(-50%)',
          transition: 'left 0.1s linear',
        }}>
          <div style={{
            animation: 'runner-bob 0.4s linear infinite',
            animationPlayState: playState,
            transform: dir === -1 ? 'scaleX(-1)' : 'none',
          }}>
            <svg width="30" height="32" viewBox="0 0 30 32" fill="none"
              style={{ display: 'block', filter: 'drop-shadow(0 0 6px rgba(255,107,61,0.8))' }}>
              <g stroke="#ff6b3d" strokeWidth="2" strokeLinecap="round">
                {/* head */}
                <circle cx="17" cy="5" r="3" fill="#ff6b3d" stroke="none" />
                {/* torso, leaning forward */}
                <line x1="16" y1="8.5" x2="13" y2="18" />
                {/* arms — swing from the shoulder */}
                <g style={{ transformOrigin: '15px 10.5px', animation: 'runner-arm-a 0.4s linear infinite', animationPlayState: playState }}>
                  <polyline points="15,10.5 19,14 23,12" fill="none" />
                </g>
                <g style={{ transformOrigin: '15px 10.5px', animation: 'runner-arm-b 0.4s linear infinite', animationPlayState: playState }}>
                  <polyline points="15,10.5 11,14 7,12.5" fill="none" />
                </g>
                {/* legs — swing from the hip */}
                <g style={{ transformOrigin: '13px 18px', animation: 'runner-leg-a 0.4s linear infinite', animationPlayState: playState }}>
                  <polyline points="13,18 17,23 16,29" fill="none" />
                </g>
                <g style={{ transformOrigin: '13px 18px', animation: 'runner-leg-b 0.4s linear infinite', animationPlayState: playState }}>
                  <polyline points="13,18 10,24 12,29" fill="none" />
                </g>
              </g>
            </svg>
          </div>
          {/* Progress readout above the runner */}
          <div style={{
            position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)',
            fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(245,241,234,0.45)',
            whiteSpace: 'nowrap',
          }}>
            {Math.round(progress * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}
