'use client';

import { useEffect, useRef, useState } from 'react';

// v2: whileInView fade + rise (transform/opacity only), once, staggered
// children optional. Keeps the original API (children, delay).
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div', style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        // fire in view, or rescue if already scrolled past
        if (e.isIntersecting || e.boundingClientRect.bottom < 0) { setShown(true); ob.disconnect(); }
      },
      { threshold: [0, 0.12], rootMargin: '-8% 0px' }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </Tag>
  );
}
