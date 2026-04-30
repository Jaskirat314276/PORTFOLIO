'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Magnetic from './Magnetic';

const NavLink = ({ href, children, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        color: hover ? '#ff6b3d' : 'rgba(245,241,234,0.7)',
        textShadow: hover ? '0 0 12px rgba(255,107,61,0.6)' : 'none',
        transition: 'color 0.25s ease, text-shadow 0.25s ease',
      }}
    >
      {children}
      <span
        style={{
          position: 'absolute', left: 0, right: 0, bottom: -4, height: '1px',
          background: '#ff6b3d',
          transformOrigin: 'left',
          transform: `scaleX(${hover ? 1 : 0})`,
          transition: 'transform 0.3s ease',
          boxShadow: hover ? '0 0 8px rgba(255,107,61,0.8)' : 'none',
        }}
      />
    </a>
  );
};

export default function Nav({ linkPrefix = '' }) {
  const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav className="nav" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '32px 0', position: 'sticky', top: 0,
        background: 'rgba(8,8,10,0.7)', backdropFilter: 'blur(20px)',
        zIndex: 100, borderBottom: '1px solid rgba(245,241,234,0.06)',
      }}>
        <a
          href={linkPrefix || '/'}
          className="nav-logo"
          style={{ fontSize: '30px', fontWeight: 600, letterSpacing: '-0.02em' }}
        >
          JS<span style={{ color: '#ff6b3d' }}>.</span>
        </a>
        <div
          className="nav-links"
          style={{ display: 'flex', gap: '32px', fontSize: '14px', color: 'rgba(245,241,234,0.7)' }}
        >
          {sections.map((s) => (
            <NavLink key={s} href={`${linkPrefix}#${s}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </NavLink>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Magnetic>
            <a
              href="mailto:jaskiratsingh314276@gmail.com"
              className="nav-cta"
              style={{
                padding: '10px 22px', background: '#ff6b3d', color: '#08080a',
                borderRadius: '999px', fontSize: '14px', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              <span className="nav-cta-label">Hire me</span>
              <ArrowUpRight size={14} />
            </a>
          </Magnetic>
          <button
            type="button"
            className="nav-toggle hover-target"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{
              alignItems: 'center', justifyContent: 'center',
              width: '40px', height: '40px',
              background: 'transparent',
              border: '1px solid rgba(245,241,234,0.2)',
              borderRadius: '999px', color: '#f5f1ea',
            }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          onClick={closeMenu}
          style={{
            position: 'fixed', inset: 0, zIndex: 99,
            background: 'rgba(8,8,10,0.92)', backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '24px', padding: '24px',
          }}
        >
          {sections.map((s) => (
            <a
              key={s}
              href={`${linkPrefix}#${s}`}
              onClick={closeMenu}
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '36px', color: '#f5f1ea',
                letterSpacing: '-0.02em',
              }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
