'use client';

import { useRef, useState } from 'react';

export default function TiltCard({ children, intensity = 12 }) {
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setT({
      rx: (y - 0.5) * -intensity,
      ry: (x - 0.5) * intensity,
      gx: x * 100,
      gy: y * 100,
    });
  };
  const handleLeave = () => setT({ rx: 0, ry: 0, gx: 50, gy: 50 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(0)`,
        transition: 'transform 0.2s ease-out',
        transformStyle: 'preserve-3d',
        position: 'relative',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit',
          background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(255,107,61,0.15) 0%, transparent 50%)`,
          opacity: t.rx === 0 && t.ry === 0 ? 0 : 1,
          transition: 'opacity 0.3s', pointerEvents: 'none', zIndex: 2,
        }}
      />
      {children}
    </div>
  );
}
