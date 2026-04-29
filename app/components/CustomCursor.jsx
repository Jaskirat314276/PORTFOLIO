'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let isHovering = false;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`;
      requestAnimationFrame(animate);
    };
    animate();

    const handleEnter = () => {
      isHovering = true;
      ring.style.borderColor = '#ff6b3d';
      ring.style.background = 'rgba(255, 107, 61, 0.1)';
      dot.style.background = '#ff6b3d';
    };
    const handleLeave = () => {
      isHovering = false;
      ring.style.borderColor = 'rgba(245, 241, 234, 0.3)';
      ring.style.background = 'transparent';
      dot.style.background = '#f5f1ea';
    };

    window.addEventListener('mousemove', handleMove);
    document.querySelectorAll('a, button, .hover-target').forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: '8px', height: '8px',
          borderRadius: '50%', background: '#f5f1ea', pointerEvents: 'none',
          zIndex: 9999, mixBlendMode: 'difference', transition: 'background 0.2s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: '36px', height: '36px',
          borderRadius: '50%', border: '1px solid rgba(245,241,234,0.3)',
          pointerEvents: 'none', zIndex: 9998,
          transition: 'background 0.3s, border-color 0.3s, scale 0.3s',
        }}
      />
    </>
  );
}
