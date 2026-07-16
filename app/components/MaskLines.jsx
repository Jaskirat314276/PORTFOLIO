'use client';

import { useEffect, useRef, useState } from 'react';
import { stagger } from '../lib/motion';

// Serif headline that rises line-by-line from an overflow:hidden mask.
// Pass `lines` as an array of React nodes (one per visual line).
export default function MaskLines({ lines, className = '', as: Tag = 'h2' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting || e.boundingClientRect.bottom < 0) { setShown(true); ob.disconnect(); }
      },
      { threshold: [0, 0.3] }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`maskline ${shown ? 'in' : ''}`}>
          <span style={{ transitionDelay: `${(i * stagger.headlineLines) / 1000}s` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
