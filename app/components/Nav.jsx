'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const SECTIONS = ['about', 'skills', 'experience', 'projects', 'contact'];

export default function Nav({ linkPrefix = '', paper = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [dotX, setDotX] = useState(null);
  const lastY = useRef(0);
  const linksRef = useRef(null);

  // scrollspy dot GLIDES between links
  useEffect(() => {
    const wrap = linksRef.current;
    if (!wrap || !active) { setDotX(null); return; }
    const measure = () => {
      const el = wrap.querySelector(`a[data-sec="${active}"]`);
      if (el) setDotX(el.offsetLeft + el.offsetWidth / 2);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  // scrolled state + hide on fast scroll-down / show on scroll-up
  useEffect(() => {
    lastY.current = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      const dy = y - lastY.current;
      if (y > 200 && dy > 8) setHidden(true);
      else if (dy < -4 || y < 200) setHidden(false);
      lastY.current = y;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // scrollspy
  useEffect(() => {
    if (linkPrefix) return; // detail pages don't scrollspy
    const obs = SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const ob = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: '-45% 0px -45% 0px' }
      );
      ob.observe(el);
      return ob;
    });
    return () => obs.forEach((o) => o && o.disconnect());
  }, [linkPrefix]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const barBg = paper ? 'rgba(250,249,245,0.82)' : 'rgba(35,33,29,0.82)';
  const ink = paper ? 'var(--paper-ink)' : 'var(--text)';
  const dim = paper ? 'rgba(31,30,29,0.6)' : 'var(--text-dim)';
  const hair = paper ? 'var(--paper-line)' : 'var(--border)';

  return (
    <>
      <nav
        aria-label="Primary"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 150,
          transform: hidden && !open ? 'translateY(-110%)' : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            background: barBg,
            backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
            borderBottom: `1px solid ${hair}`,
            opacity: scrolled ? 1 : 0, transition: 'opacity 0.35s ease',
            pointerEvents: 'none',
          }}
        />
        <div
          className="container"
          style={{
            position: 'relative', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', height: 68,
          }}
        >
          <a
            href={linkPrefix || '/'}
            data-cursor="view"
            style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: ink }}
          >
            JS
            <span id="nav-led" style={{
              width: 7, height: 7, borderRadius: '50%',
              background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)',
            }} />
          </a>

          <div ref={linksRef} className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 30, position: 'relative' }}>
            {SECTIONS.map((s) => (
              <a
                key={s}
                data-sec={s}
                href={`${linkPrefix}#${s}`}
                data-cursor="view"
                style={{
                  fontFamily: 'var(--mono)', fontSize: 11,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: active === s ? 'var(--accent)' : dim,
                  transition: 'color 0.25s ease', paddingBottom: 4,
                }}
              >
                {s}
              </a>
            ))}
            {/* the single dot that slides between links */}
            <span aria-hidden="true" style={{
              position: 'absolute', left: 0, bottom: -3, width: 4.5, height: 4.5,
              borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)',
              opacity: dotX == null ? 0 : 1,
              transform: `translateX(${(dotX ?? 0) - 2}px)`,
              transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
            }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a
              href="mailto:jaskiratsingh314276@gmail.com"
              data-cursor="press"
              className="nav-cta"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '9px 18px', background: 'var(--accent)', color: '#1a1815',
                borderRadius: 999, fontFamily: 'var(--mono)', fontSize: 11,
                letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500,
              }}
            >
              Hire me <ArrowUpRight size={13} />
            </a>
            <button
              type="button"
              className="nav-toggle"
              data-cursor="press"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              style={{
                alignItems: 'center', justifyContent: 'center', width: 42, height: 42,
                background: 'transparent', border: `1px solid ${hair}`,
                borderRadius: 999, color: ink, cursor: 'pointer',
              }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 149,
            background: paper ? 'rgba(250,249,245,0.96)' : 'rgba(26,24,21,0.96)',
            backdropFilter: 'blur(18px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 20, padding: 24,
          }}
        >
          {SECTIONS.map((s, i) => (
            <a
              key={s}
              href={`${linkPrefix}#${s}`}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 11vw, 60px)',
                color: ink, lineHeight: 1, animation: `menuRise 0.5s var(--ease-expo) ${i * 0.06}s both`,
              }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
          <style>{`@keyframes menuRise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }`}</style>
        </div>
      )}
    </>
  );
}
