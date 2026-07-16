'use client';

import { useEffect, useRef, useState } from 'react';

// Terracotta rubber stamp — slams in (scale 1.4→1, back-out) and settles
// at a slight rotation. Self-triggers on view, or pass `active` to
// sequence it off a dock (stamps land AFTER their card docks).
// Custom settle angle via style={{ '--rot': '-6deg' }}.
export default function Stamp({ children, delay = 0.2, active, className = '', style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const controlled = active !== undefined;

  useEffect(() => {
    if (controlled) return;
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting || e.boundingClientRect.bottom < 0) { setShown(true); ob.disconnect(); }
      },
      { threshold: [0, 0.5] }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [controlled]);

  const on = controlled ? active : shown;

  return (
    <span
      ref={ref}
      className={`stamp stamp-in ${on ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </span>
  );
}
