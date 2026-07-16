'use client';

import { useEffect, useRef, useState } from 'react';

// THE signature primitive: objects enter FROM THE SIDES and dock.
// side: 'left' | 'right'. mobile collapses travel to 24px (CSS-driven).
// onDocked fires once when the entrance transition ends (sparks/stamps hook here).
export default function SlideDock({
  children, side = 'left', delay = 0, onDocked, className = '', style,
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const dockedRef = useRef(false);
  const onDockedRef = useRef(onDocked);
  onDockedRef.current = onDocked;
  const reportDock = () => {
    if (dockedRef.current) return;
    dockedRef.current = true;
    onDockedRef.current && onDockedRef.current();
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      // rescue clause: if the user blew past it (element fully above the
      // viewport), snap it in — nothing may stay hidden above you.
      ([e]) => {
        if (e.isIntersecting || e.boundingClientRect.bottom < 0) { setShown(true); ob.disconnect(); }
      },
      { threshold: [0, 0.2], rootMargin: '-12% 0px' }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  // Fallback: if transitionend never fires (reduced motion, tab switch),
  // still report the dock so sparks/stamps don't stall.
  useEffect(() => {
    if (!shown) return;
    const t = setTimeout(reportDock, 700 + delay * 1000 + 150);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, delay]);

  const handleEnd = (e) => {
    if (e.target !== ref.current) return;
    if (shown) reportDock();
  };

  return (
    <div
      ref={ref}
      onTransitionEnd={handleEnd}
      className={`slidedock from-${side} ${shown ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s`, ...style }}
    >
      {children}
    </div>
  );
}
