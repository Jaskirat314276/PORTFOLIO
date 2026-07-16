'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { projects } from './projects/data';
import Nav from './components/Nav';

// three.js stays out of the initial bundle; the scene mounts only after
// the boot loader hands off, so exactly ONE WebGL context exists at a time
const BackgroundScene = dynamic(() => import('./components/BackgroundScene'), { ssr: false });
import TiltCard from './components/TiltCard';
import GlowField from './components/GlowField';
import GrainOverlay from './components/GrainOverlay';
import ScrollProgress from './components/ScrollProgress';
import DebugHUD from './components/DebugHUD';
import Magnetic from './components/Magnetic';
import Reveal from './components/Reveal';
import ScatterText from './components/ScatterText';
import ScrambleText from './components/ScrambleText';
import MaskLines from './components/MaskLines';
import Odometer from './components/Odometer';
import SlideDock from './components/SlideDock';
import Spark from './components/Spark';
import Stamp from './components/Stamp';
import VelocityMarquee from './components/VelocityMarquee';
import ContactForm from './components/ContactForm';
import { VerticalTrace, IntersectionBeat, MarginTrace, useScrollProgress, useThresholdCount, usePower } from './components/Trace';
import { ConvergeBand, DivergeBand, GhostNum, WordRise } from './components/ScrollBands';
import { RAIL_THRESHOLDS } from './lib/motion';
import { useReducedMotion, detectTier } from './lib/useReducedMotion';
import {
  Github, Linkedin, ArrowUpRight, Download, Phone, MapPin,
  Code2, Database, Cloud, Cpu, Zap, Brain, Award, GraduationCap,
  Briefcase, Trophy, Sparkles, ChevronDown, Bot, FolderGit2,
} from 'lucide-react';

const RESUMES = [
  { label: 'Software Development', file: '/JASKIRAT_RESUME_SD.pdf' },
  { label: 'Data Analyst', file: '/RESUME_JASKIRAT_DA_FINAL.pdf' },
  { label: 'Core (Electrical)', file: '/RESUME_JASKIRAT_COREFINAL.pdf' },
];

const ResumeDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        data-cursor="press"
        onClick={() => setOpen((v) => !v)}
        style={{
          padding: '14px 28px', border: '1px solid var(--border-hi)',
          borderRadius: 999, fontSize: 14, fontWeight: 500,
          background: 'transparent', color: 'inherit', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
        }}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Download size={14} /> Download Resume
        <ChevronDown size={14} style={{
          transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }} />
      </button>
      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0,
            minWidth: 240, padding: 8,
            background: 'var(--surface-hi)', border: '1px solid var(--border-hi)',
            borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            zIndex: 50,
          }}
        >
          {RESUMES.map((r, i) => (
            <a
              key={r.file}
              href={r.file}
              download
              role="menuitem"
              data-cursor="press"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 14px', borderRadius: 10,
                fontSize: 14, color: 'var(--text)',
                animation: `hud-pop 0.35s var(--ease-back) ${i * 0.06}s both`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-soft)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <Download size={14} /> {r.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

// footer LED: pulses three times when it enters view, then rests lit.
// EASTER EGG: triple-click it (or type "jas" anywhere) and it blinks
// "HIRE ME" in Morse — once per session.
const MORSE = { H: '....', I: '..', R: '.-.', E: '.', M: '--' };
const FooterLed = () => {
  const ref = useRef(null);
  const [mode, setMode] = useState('idle');
  const [lit, setLit] = useState(true);
  const clicksRef = useRef([]);
  const keysRef = useRef('');
  const timersRef = useRef([]);

  const runMorse = () => {
    if (sessionStorage.getItem('js-egg')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    sessionStorage.setItem('js-egg', '1');
    const seq = [];
    'HIRE ME'.split('').forEach((ch) => {
      if (ch === ' ') { seq.push([0, 700]); return; }
      MORSE[ch].split('').forEach((s) => seq.push([s === '.' ? 140 : 420, 140]));
      seq.push([0, 420]);
    });
    setMode('morse');
    setLit(false);
    let t = 250;
    const timers = timersRef.current;
    seq.forEach(([on, off]) => {
      if (on) { timers.push(setTimeout(() => setLit(true), t)); t += on; }
      timers.push(setTimeout(() => setLit(false), t)); t += off;
    });
    timers.push(setTimeout(() => {
      setLit(true); setMode('rest');
      console.log('ok, you found it. now go hire jaskirat. — the trace');
    }, t + 250));
  };

  const onClick = () => {
    const now = performance.now();
    clicksRef.current = [...clicksRef.current.filter((c) => now - c < 650), now];
    if (clicksRef.current.length >= 3) runMorse();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      keysRef.current = (keysRef.current + e.key.toLowerCase()).slice(-3);
      if (keysRef.current === 'jas') runMorse();
    };
    window.addEventListener('keydown', onKey);
    const timers = timersRef.current;
    return () => {
      window.removeEventListener('keydown', onKey);
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setMode((m) => (m === 'idle' ? 'pulsing' : m)); ob.disconnect(); } },
      { threshold: 0.4 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    if (mode !== 'pulsing') return;
    const t = setTimeout(() => setMode((m) => (m === 'pulsing' ? 'rest' : m)), 2500);
    return () => clearTimeout(t);
  }, [mode]);

  return (
    <span
      ref={ref}
      id="footer-led"
      onClick={onClick}
      className={`footer-led ${mode === 'pulsing' ? 'pulsing' : mode === 'rest' ? 'rest' : ''}`}
      style={mode === 'morse' ? {
        animation: 'none',
        opacity: lit ? 1 : 0.12,
        boxShadow: lit ? '0 0 16px var(--accent)' : 'none',
        transition: 'opacity 0.04s linear',
      } : undefined}
      aria-hidden="true"
    />
  );
};

// clicking the email copies it; the arrow stays a true mailto link
const EMAIL = 'jaskiratsingh314276@gmail.com';
const CopyEmail = () => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const serifStyle = {
    fontSize: 'clamp(20px, 3.5vw, 42px)', color: 'var(--text)',
    borderBottom: '1px solid var(--border)', paddingBottom: 8,
    display: 'inline-block', wordBreak: 'break-word', position: 'relative',
  };

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: 22 }}>
      <a href={`mailto:${EMAIL}`} onClick={copy} data-cursor="press" className="serif" style={serifStyle} title="Click to copy">
        {EMAIL}
        {/* trace s7 — the line terminates into the email underline */}
        <span className="email-trace" aria-hidden="true" />
      </a>
      <a href={`mailto:${EMAIL}`} aria-label="Compose an email" className="serif" style={{ fontSize: 'clamp(20px, 3.5vw, 42px)', marginLeft: 12 }}>
        →
      </a>
      {copied && <span className="copied-chip" aria-hidden="true">Copied ✓</span>}
      <span aria-live="polite" className="sr-only">{copied ? 'Email address copied' : ''}</span>
    </span>
  );
};

const STAMPS = ['FLAGSHIP · 2026', 'SHIPPED', 'LIVE DEMO', 'LIVE DEMO', 'HARDWARE · 300V TESTED', 'SIMULATION'];
const PIN_TOPS = ['26%', '44%', '62%', '80%'];

// ── scroll-scrubbed leaves ──────────────────────────────────
// These own their own useScrollProgress so per-frame progress state
// re-renders only this tiny subtree, never the whole page.

const ExpSpine = ({ targetRef, powerRef, reduced }) => {
  const p = useScrollProgress(targetRef, { startAt: 0.85, endAt: 0.35 });
  usePower(powerRef, p);
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', left: 10, top: 0, width: 2, height: '100%', overflow: 'visible' }}
      viewBox="0 0 2 100"
      preserveAspectRatio="none"
    >
      <line x1="1" y1="0" x2="1" y2="100" className="trace-path trace-dim" />
      <line x1="1" y1="0" x2="1" y2="100" className="trace-path" pathLength="1" strokeDasharray="1" strokeDashoffset={reduced ? 0 : 1 - p} />
    </svg>
  );
};

const RailSpine = ({ targetRef, powerRef, reduced }) => {
  const p = useScrollProgress(targetRef, { startAt: 0.8, endAt: 0.25 });
  usePower(powerRef, p, { onAt: 0.1, offAt: 0.04 });
  const histRef = useRef([]);
  const [tier, setTier] = useState('A');
  const [, settle] = useState(0);
  useEffect(() => { setTier(detectTier()); }, []);
  useEffect(() => {
    window.__traceProgress = p;
    const h = histRef.current;
    h.push(p);
    if (h.length > 26) h.splice(0, h.length - 26);
    // scroll idle → collapse the tail under the pulse instead of freezing a comet
    const t = setTimeout(() => { histRef.current = []; settle((v) => v + 1); }, 160);
    return () => clearTimeout(t);
  }, [p]);

  // tail samples lag the pulse by reading progress history (1 render behind)
  const tailCount = tier === 'A' ? 6 : 4;
  const h = histRef.current;
  const tail = [];
  for (let i = 1; i <= tailCount; i++) {
    const idx = h.length - 1 - i * 3;
    tail.push(idx >= 0 ? h[idx] : p);
  }

  return (
    <>
      <svg className="rail-spine" aria-hidden="true" viewBox="0 0 2 100" preserveAspectRatio="none">
        <line x1="1" y1="0" x2="1" y2="100" className="trace-path trace-dim" />
        <line x1="1" y1="0" x2="1" y2="100" className="trace-path" pathLength="1" strokeDasharray="1" strokeDashoffset={reduced ? 0 : 1 - p} />
      </svg>
      {!reduced && (
        <>
          <span className="rail-pulse" style={{ top: `${p * 100}%` }} aria-hidden="true" />
          {tail.map((tp, i) => {
            const s = 5 - i * 0.55;
            return (
              <span
                key={i}
                className="pulse-tail"
                aria-hidden="true"
                style={{ top: `${tp * 100}%`, width: s, height: s, marginLeft: -s / 2, opacity: Math.max(0, 0.45 - i * 0.06) }}
              />
            );
          })}
        </>
      )}
    </>
  );
};

// glowing dot launches off the HireFlow card along a bezier every ~6s —
// an email leaving the outbox. IO-gated, pauses on hidden tabs, skipped
// for reduced motion and tier C.
const EnvelopeLaunch = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [shot, setShot] = useState(0);

  useEffect(() => {
    if (reduced || detectTier() === 'C') return;
    const el = ref.current;
    if (!el) return;
    let timer;
    const ob = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) {
        timer = setInterval(() => { if (!document.hidden) setShot((s) => s + 1); }, 6000);
      }
    }, { threshold: 0.3 });
    ob.observe(el);
    return () => { clearInterval(timer); ob.disconnect(); };
  }, [reduced]);

  return (
    <span ref={ref} aria-hidden="true" style={{ position: 'absolute', top: 26, right: 150, width: 0, height: 0 }}>
      {shot > 0 && <span key={shot} className="env-dot" />}
    </span>
  );
};

const RailHud = ({ targetRef }) => {
  const p = useScrollProgress(targetRef, { startAt: 0.8, endAt: 0.25 });
  const litCount = RAIL_THRESHOLDS.filter((t) => p >= t).length;
  const hudFile = Math.max(1, Math.min(projects.length, litCount || 1));
  return (
    <div className="rail-hud" aria-hidden="true">
      <span
        className="mono"
        style={{
          fontSize: 10, letterSpacing: '0.16em', color: 'var(--text-dim)',
          background: 'rgba(35,33,29,0.85)', backdropFilter: 'blur(8px)',
          border: '1px solid var(--border)', borderRadius: 6, padding: '7px 12px',
        }}
      >
        <span key={hudFile} className="hud-pop">
          FILE {String(hudFile).padStart(2, '0')}/{String(projects.length).padStart(2, '0')} — {projects[hudFile - 1].title.split(' — ')[0]}
        </span>
        {' '}· {String(Math.round(p * 100)).padStart(3, '0')}%
      </span>
    </div>
  );
};

// ============================================================
// MAIN PORTFOLIO — THE TRACE
// ============================================================
export default function Portfolio() {
  const reduced = useReducedMotion();

  // hero kinetic type waits for the boot preloader to finish
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const on = () => setHeroIn(true);
    window.addEventListener('js:boot-done', on);
    // boot already done (session replay) → next tick; else hard cap so the hero never stays blank
    const t = setTimeout(on, window.__bootDone ? 0 : 3800);
    return () => { window.removeEventListener('js:boot-done', on); clearTimeout(t); };
  }, []);

  // experience spine + project rail live in scrubbed leaf components;
  // the page only tracks the DISCRETE lit count (≤6 re-renders per pass)
  const expRef = useRef(null);
  const railRef = useRef(null);
  const skillsRef = useRef(null);
  const passRef = useRef(null);
  const aboutRef = useRef(null);
  const expSecRef = useRef(null);
  const projSecRef = useRef(null);
  const contactRef = useRef(null);
  const litCount = useThresholdCount(railRef, RAIL_THRESHOLDS, { startAt: 0.8, endAt: 0.25 });

  // console sign-off, once per session — for recruiters who open DevTools
  useEffect(() => {
    if (sessionStorage.getItem('js-console')) return;
    sessionStorage.setItem('js-console', '1');
    console.log(
      '%cTHE TRACE%c signal acquired — you read consoles. so does jaskirat: jaskiratsingh314276@gmail.com',
      'background:#d97757;color:#1a1815;padding:2px 8px;border-radius:4px;font-weight:600',
      'color:#b0aa9c;padding-left:6px'
    );
  }, []);

  // contact has no scrub segment — power it on first meaningful view
  useEffect(() => {
    const el = contactRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.setAttribute('data-powered', ''); ob.disconnect(); } },
      { threshold: 0.2 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  const [expDocked, setExpDocked] = useState([false, false, false]);
  const [railDocked, setRailDocked] = useState(() => projects.map(() => false));
  const dockExp = (i) => setExpDocked((a) => a.map((v, j) => (j === i ? true : v)));
  const dockRail = (i) => setRailDocked((a) => a.map((v, j) => (j === i ? true : v)));

  const stats = [
    { value: 6, suffix: '+', label: 'Projects Built', icon: <FolderGit2 size={20} /> },
    { value: 300, suffix: '+', label: 'LeetCode Problems', icon: <Code2 size={20} />, gag: true },
    { value: 2, suffix: '+', label: 'Years Coding', icon: <Sparkles size={20} /> },
    { value: 200, suffix: '+', label: 'Students Mentored', icon: <Award size={20} /> },
  ];

  const skills = [
    { cat: 'Frontend', icon: <Code2 size={22} />, items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML / CSS'] },
    { cat: 'Backend', icon: <Cpu size={22} />, items: ['Node.js', 'REST APIs', 'C++', 'C', 'Python'] },
    { cat: 'Data & ML', icon: <Brain size={22} />, items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Structured Query Language (SQL)', 'Statsmodels (SARIMA)', 'Power BI', 'Excel'] },
    { cat: 'GenAI & LLM', icon: <Bot size={22} />, items: ['LangChain', 'RAG', 'OpenAI', 'LLaMA 3.2', 'VectorDB', 'AnthropicAI API', 'OpenAI API', 'Prompt Engineering'] },
    { cat: 'Databases', icon: <Database size={22} />, items: ['MySQL', 'Prisma ORM', 'Supabase', 'VectorDB'] },
    { cat: 'Cloud & DevOps', icon: <Cloud size={22} />, items: ['Docker', 'Prometheus', 'Terraform', 'AWS (Amazon Web Services)'] },
    { cat: 'CS Fundamentals', icon: <Sparkles size={22} />, items: ['Data Structure Algorithm', 'Object Oriented Programming', 'Database Management System', 'Operating Systems', 'Computer Networks'] },
    { cat: 'Core Electrical', icon: <Zap size={22} />, items: ['MATLAB / Simulink', 'Eagle PCB Design', 'Power Electronics', 'IoT'] },
  ];

  const experience = [
    {
      role: 'Software Developer Intern',
      company: 'Productimate AI Solutions',
      date: 'May 2025 — Jul 2025',
      location: 'Remote',
      points: [
        'Built a scalable B2B SaaS Sales Agent platform used for enterprise workflows, reducing manual sales processing time by ~40% through automated dashboard components.',
        'Implemented role-based authentication and secure login/signup flows with persistent session management, improving platform security and user access control.',
        'Integrated RESTful backend APIs with the frontend, ensuring secure data exchange and optimized response handling across core features.',
      ],
      stack: ['React.js', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    },
    {
      role: 'Project & Tech Coordinator',
      company: 'EEESOC, BIT Mesra',
      date: 'Jan 2023 — Present',
      location: 'BIT Mesra',
      points: [
        'Mentored and organized a hands-on C++ workshop for 200+ students, strengthening their problem-solving and core programming fundamentals.',
        'Led workshops on micro-controller programming, PWM, and core electronics topics across multiple semesters.',
      ],
      stack: ['C++', 'Microcontrollers', 'Mentorship', 'Workshop Design'],
    },
    {
      role: 'Tech & Management Lead',
      company: 'Team Aveon Racing',
      date: 'Jan 2024 — Present',
      location: 'BIT Mesra',
      points: [
        'Managed a team in developing the complete electrical powertrain for an electric all-terrain vehicle competing in EBAJA SAEINDIA 2025.',
        'Coordinated cross-functional work spanning powertrain design, testing, and team management.',
      ],
      stack: ['EV Powertrain', 'Team Lead', 'EBAJA SAEINDIA'],
    },
  ];

  const achievements = [
    { title: 'Rank 1 — Summer Mentorship Program', org: 'EEESOC, BIT Mesra', icon: <Trophy size={22} /> },
    { title: '3rd Position — CodeZilla Coding Competition', org: 'Pantheon 2024 (30+ teams)', icon: <Award size={22} /> },
    { title: 'Core Team Member — Bitotsav', org: "BIT Mesra's biggest cultural fest", icon: <Sparkles size={22} /> },
    { title: 'Co-led Induction Project', org: "Honoring India's freedom fighters", icon: <Sparkles size={22} /> },
    { title: '300+ LeetCode Problems', org: 'Handle: Jaskirat-singh', icon: <Code2 size={22} /> },
    { title: 'EBAJA SAEINDIA 2025', org: 'Team Aveon Racing — Management Lead', icon: <Zap size={22} /> },
  ];

  const education = [
    { degree: 'B.Tech in Electrical & Electronics Engineering', school: 'Birla Institute of Technology, Mesra', date: 'Nov 2022 — May 2026', grade: 'CGPA: 7.15', location: 'Ranchi, Jharkhand' },
    { degree: 'Class XII — CBSE', school: 'Munam Public School', date: '2019 — 2021', grade: 'Percentage: 95%', location: 'Hazaribagh, Jharkhand' },
    { degree: 'Class X — CBSE', school: 'Angels High School', date: 'Completed 2019', grade: 'Percentage: 91%', location: 'Hazaribagh, Jharkhand' },
  ];

  const socials = [
    { icon: <Github size={16} />, label: 'GitHub', href: 'https://github.com/Jaskirat314276' },
    { icon: <Linkedin size={16} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/jaskirat-singh-b644a4255/' },
    { icon: <Code2 size={16} />, label: 'LeetCode · Jaskirat-singh', href: 'https://leetcode.com/Jaskirat-singh' },
    { icon: <Code2 size={16} />, label: 'GeeksforGeeks · jaskiratsi2k1r', href: 'https://www.geeksforgeeks.org/user/jaskiratsi2k1r' },
    { icon: <Phone size={16} />, label: '+91 8340361891', href: 'tel:+918340361891' },
  ];

  return (
    <div className="page">
      {/* ambient 3D — mounts after the boot loader hands off, so the
          loader's voxel scene is the only WebGL context during boot */}
      {heroIn && <BackgroundScene />}
      <GlowField />
      <GrainOverlay />
      <ScrollProgress />
      <DebugHUD />
      <Nav />

      <main id="main" style={{ position: 'relative' }}>
        {/* HERO — full-bleed type assembling from random positions over the 3D field */}
        <section
          className="container"
          style={{
            position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center',
            paddingTop: 150, paddingBottom: 50, minHeight: '90vh', overflowX: 'clip',
          }}
        >
          <div className="eyebrow" style={{ marginBottom: 38, alignSelf: 'flex-start' }}>
            <span className="led" />
            <ScrambleText text="AVAILABLE FOR OPPORTUNITIES · 2026" />
          </div>
          <h1
            className="head head-xl"
            aria-label="Hi, I'm Jaskirat Singh — I build things."
            style={{ fontSize: 'clamp(48px, 9.5vw, 138px)', marginBottom: 36, maxWidth: 1100 }}
          >
            <ScatterText
              active={heroIn}
              delay={0.05}
              stagger={0.05}
              distance={1.6}
              segments={[
                { text: "Hi, I'm" },
                { br: true },
                { text: 'Jaskirat Singh', chars: true, underline: true, wave: true, className: 'ital' },
                { br: true },
                { text: '— I build things.' },
              ]}
            />
          </h1>
          <p style={{ fontSize: 19, color: 'var(--text-dim)', maxWidth: 580, marginBottom: 44, lineHeight: 1.6 }}>
            <ScatterText
              active={heroIn}
              delay={0.85}
              stagger={0.014}
              distance={0.55}
              segments={[
                { text: 'Final-year B.Tech student in Electrical & Electronics Engineering at BIT Mesra, with hands-on experience as a Software Developer Intern. I work across full-stack web, AI/ML, and power electronics.' },
              ]}
            />
          </p>
          <div
            style={{
              display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center',
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? 'none' : 'translateY(26px)',
              transition: 'opacity 0.6s var(--ease-expo) 1.2s, transform 0.6s var(--ease-expo) 1.2s',
            }}
          >
            <Magnetic>
              <a
                href="#projects"
                data-cursor="press"
                style={{
                  padding: '14px 28px', background: 'var(--text)', color: 'var(--bg)',
                  borderRadius: 999, fontSize: 14, fontWeight: 500,
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                See my work <ArrowUpRight size={16} />
              </a>
            </Magnetic>
            <ResumeDropdown />
          </div>
        </section>

        {/* SCROLL CUE — the trace's origin */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, paddingBottom: 26 }} aria-hidden="true">
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--text-muted)' }}>
            Scroll to explore
          </span>
          <VerticalTrace height={90} dotTop />
        </div>

        {/* SOFTWARE × HARDWARE converge beat */}
        <ConvergeBand />

        {/* ABOUT + STATS */}
        <section id="about" className="section" ref={aboutRef}>
          <div className="container">
            <div className="section-head">
              <GhostNum>01</GhostNum>
              <Reveal>
                <div className="eyebrow"><span className="led" /><ScrambleText text="01 — About me" /></div>
              </Reveal>
            </div>
            <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start', marginBottom: 80 }}>
              <div style={{ position: 'relative' }}>
                <IntersectionBeat powerRef={aboutRef} />
                <MaskLines
                  className="head"
                  lines={[
                    'Engineer at the',
                    <><span className="ital">intersection</span> of</>,
                    'code & hardware.',
                  ]}
                />
              </div>
              <div>
                <WordRise
                  text="I'm a final-year EEE student at BIT Mesra who genuinely enjoys both sides of the stack — writing clean React/Next.js apps and designing power electronics circuits."
                  style={{ fontSize: 18, color: 'var(--text-dim)', marginBottom: 20, lineHeight: 1.7 }}
                />
                <WordRise
                  text="My internship at Productimate AI Solutions sharpened my full-stack skills, and side projects in AI (LangChain, RAG) and forecasting (SARIMA, Power BI) keep me exploring new domains."
                  style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 26, lineHeight: 1.7 }}
                />
                <Reveal className="cascade" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  <span className="chip" style={{ transitionDelay: '0.05s' }}><MapPin size={11} style={{ display: 'inline', marginRight: 6, verticalAlign: '-1px' }} />Ranchi, India</span>
                  <span className="chip" style={{ transitionDelay: '0.1s' }}>BIT Mesra · 2026</span>
                  <span className="chip" style={{ transitionDelay: '0.15s', color: 'var(--accent)', borderColor: 'rgba(217,119,87,0.4)' }}>Open to work</span>
                </Reveal>
              </div>
            </div>

            {/* Stats — slot-machine odometers; the 300 is still counting */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18 }}>
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.07} style={{ height: '100%' }}>
                  <TiltCard intensity={9}>
                    <div className="card corner-ticks" style={{ padding: 30, height: '100%' }}>
                      <div style={{ color: 'var(--accent)', marginBottom: 18 }}>{s.icon}</div>
                      <div style={{ fontSize: 48, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 10 }}>
                        <Odometer value={s.value} suffix={s.suffix} gag={!!s.gag} />
                      </div>
                      <div className="mono" style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{s.label}</div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS — IC package module library */}
        <section id="skills" className="section" ref={skillsRef}>
          {/* trace s3 — margin run down the section's left edge */}
          <MarginTrace targetRef={skillsRef} reduced={reduced} />
          <div className="container">
            <div className="section-head">
              <GhostNum>02</GhostNum>
              <Reveal>
                <div className="eyebrow"><span className="led" /><ScrambleText text={'02 — Skills & tools'} /></div>
              </Reveal>
              <MaskLines className="head" lines={[<>The <span className="ital">toolkit</span></>, 'I work with.']} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 18 }}>
              {skills.map((s, i) => (
                <Reveal key={s.cat} delay={(i % 4) * 0.07} style={{ height: '100%' }}>
                  <div className="card ic-card">
                    {PIN_TOPS.map((t) => <span key={`l${t}`} className="ic-pin l" style={{ left: -8, top: t }} />)}
                    {PIN_TOPS.map((t) => <span key={`r${t}`} className="ic-pin r" style={{ right: -8, top: t }} />)}
                    <span className="ref">U{i + 1}</span>
                    <div className="ic-icon">{s.icon}</div>
                    <h3 className="serif" style={{ fontSize: 25, marginBottom: 20 }}>{s.cat}</h3>
                    <div className="cascade" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {s.items.map((item, ci) => (
                        <span key={item} className="chip" style={{ transitionDelay: `${0.15 + ci * 0.03}s` }}>{item}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE — the timeline spine */}
        <section id="experience" className="section" ref={expSecRef}>
          <div className="container">
            <div className="section-head">
              <GhostNum>03</GhostNum>
              <Reveal>
                <div className="eyebrow"><span className="led" /><ScrambleText text="03 — Experience" /></div>
              </Reveal>
              <MaskLines className="head" lines={[<>Where I&apos;ve <span className="ital">worked</span></>, '& led.']} />
            </div>
            <div ref={expRef} style={{ position: 'relative', paddingLeft: 46 }}>
              {/* the spine — draws with scroll */}
              <ExpSpine targetRef={expRef} powerRef={expSecRef} reduced={reduced} />
              <div style={{ display: 'grid', gap: 22 }}>
                {experience.map((e, i) => (
                  <div key={e.company} style={{ position: 'relative' }}>
                    {/* via on the spine — lights when the card docks */}
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute', left: -41, top: 38, width: 12, height: 12, borderRadius: '50%',
                        border: '1.5px solid', zIndex: 2,
                        borderColor: expDocked[i] ? 'var(--accent)' : 'var(--border-hi)',
                        background: expDocked[i] ? 'var(--accent-soft)' : 'var(--bg)',
                        boxShadow: expDocked[i] ? '0 0 12px rgba(217,119,87,0.7)' : 'none',
                        transition: 'border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease',
                      }}
                    />
                    <Spark fire={expDocked[i]} style={{ left: -35, top: 44 }} />
                    <SlideDock side="right" onDocked={() => dockExp(i)}>
                      <div className="card" style={{ padding: '36px 34px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                              <Briefcase size={17} style={{ color: 'var(--accent)' }} />
                              <h3 style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>{e.role}</h3>
                            </div>
                            <p style={{ fontSize: 15, color: 'var(--accent)' }}>{e.company} · {e.location}</p>
                          </div>
                          <Stamp active={expDocked[i]} delay={0.15} style={{ '--rot': '-3deg', alignSelf: 'flex-start' }}>{e.date}</Stamp>
                        </div>
                        <ul style={{ listStyle: 'none', marginBottom: 20 }}>
                          {e.points.map((p, idx) => (
                            <li
                              key={idx}
                              className="exp-li"
                              style={{
                                fontSize: 15, color: 'var(--text-dim)', paddingLeft: 26,
                                position: 'relative', marginBottom: 10, lineHeight: 1.65,
                                transitionDelay: `${0.1 + idx * 0.06}s`,
                              }}
                            >
                              <span className="exp-dash" style={{
                                position: 'absolute', left: 0, top: 11, width: 14, height: 1.5,
                                background: 'var(--accent)', transitionDelay: `${0.15 + idx * 0.06}s`,
                              }} />
                              {p}
                            </li>
                          ))}
                        </ul>
                        <div className="cascade" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {e.stack.map((t, ci) => (
                            <span key={t} className="chip" style={{ color: 'var(--accent)', borderColor: 'rgba(217,119,87,0.3)', transitionDelay: `${0.2 + ci * 0.03}s` }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </SlideDock>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FROM IDEA / TO SHIPPED diverge beat */}
        <DivergeBand />

        {/* THE PROJECT RAIL */}
        <section id="projects" className="section" ref={projSecRef}>
          <div className="container">
            <div className="section-head">
              <GhostNum>04</GhostNum>
              <Reveal>
                <div className="eyebrow"><span className="led" /><ScrambleText text="Selected work — 6 files" /></div>
              </Reveal>
              <MaskLines className="head" lines={[<>Things I&apos;ve <span className="ital">built</span>.</>]} />
            </div>

            {/* mono HUD ticks FILE 0X/06 */}
            {!reduced && <RailHud targetRef={railRef} />}

            <div ref={railRef} className="rail-track" style={{ position: 'relative', padding: '30px 0' }}>
              {/* the rail — draws with scroll, pulse rides it */}
              <RailSpine targetRef={railRef} powerRef={projSecRef} reduced={reduced} />

              {projects.map((p, i) => {
                const fromLeft = i % 2 === 0;
                const lit = reduced || litCount > i;
                const desc = p.slug === 'warehouse-optimizer' ? `${p.desc.split('. ')[0]}.` : p.desc;
                return (
                  <div
                    key={p.slug}
                    className="dossier-row"
                    style={{ display: 'grid', gridTemplateColumns: '1fr 90px 1fr', alignItems: 'center', margin: '46px 0' }}
                  >
                    <div className="rail-col" aria-hidden="true">
                      <span className={`rail-stub ${fromLeft ? 'left' : 'right'} ${lit ? 'lit' : ''}`} />
                      <span className={`rail-via ${lit ? 'lit' : ''}`} />
                      <Spark fire={railDocked[i]} style={{ left: '50%', top: '50%' }} />
                    </div>
                    <SlideDock
                      side={fromLeft ? 'left' : 'right'}
                      onDocked={() => dockRail(i)}
                      shadow
                      className={fromLeft ? 'dossier-card-l' : 'dossier-card-r'}
                      style={{ width: '100%', maxWidth: 520 }}
                    >
                      <Link
                        href={`/projects/${p.slug}`}
                        data-cursor="open"
                        className="paper"
                        style={{
                          display: 'block', position: 'relative', padding: '26px 28px 24px',
                          opacity: lit ? 1 : 0.62, transition: 'opacity 0.4s ease',
                        }}
                      >
                        <Stamp active={railDocked[i]} delay={0.2} style={{ position: 'absolute', top: 16, right: 16 }}>
                          {STAMPS[i]}
                        </Stamp>
                        <div className="serif" style={{ fontSize: 46, lineHeight: 1, color: 'var(--accent-dim)', marginBottom: 12 }}>{p.num}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                          <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--paper-ink)' }}>{p.title}</h3>
                          <span className="mono" style={{ fontSize: 9.5, color: 'rgba(31,30,29,0.55)' }}>{p.date}</span>
                        </div>
                        <p style={{ fontSize: 14, color: 'rgba(31,30,29,0.75)', lineHeight: 1.6, marginBottom: 16 }}>{desc}</p>
                        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
                          {p.tags.map((t) => <span key={t} className="mchip">{t}</span>)}
                          <ArrowUpRight size={18} style={{ color: 'var(--accent-dim)', marginLeft: 'auto' }} />
                        </div>
                      </Link>
                    </SlideDock>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* VELOCITY MARQUEE */}
        <VelocityMarquee />

        {/* trace s6 — pass-through margin line: achievements → education → now-building */}
        <div ref={passRef} style={{ position: 'relative' }}>
        <MarginTrace targetRef={passRef} reduced={reduced} startAt={0.85} endAt={0.25} />

        {/* ACHIEVEMENTS */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <GhostNum>05</GhostNum>
              <Reveal>
                <div className="eyebrow"><span className="led" /><ScrambleText text="05 — Achievements" /></div>
              </Reveal>
              <MaskLines className="head" lines={[<>Wins &amp; <span className="ital">recognition</span>.</>]} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
              {achievements.map((a, i) => (
                <SlideDock key={a.title} side={i % 2 === 0 ? 'left' : 'right'} delay={(i % 2) * 0.06} style={{ height: '100%' }}>
                  <TiltCard intensity={8}>
                    <div className="card" style={{ padding: 26, height: '100%', display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                      <div className="stamp-icon" style={{
                        width: 46, height: 46, borderRadius: 11, flexShrink: 0,
                        background: 'var(--accent-soft)', color: 'var(--accent)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid rgba(217,119,87,0.3)',
                      }}>{a.icon}</div>
                      <div>
                        <h3 style={{ fontSize: 16.5, fontWeight: 500, marginBottom: 6, letterSpacing: '-0.01em' }}>{a.title}</h3>
                        <p style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>{a.org}</p>
                      </div>
                    </div>
                  </TiltCard>
                </SlideDock>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION — rest beat */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <GhostNum>06</GhostNum>
              <Reveal>
                <div className="eyebrow"><span className="led" /><ScrambleText text="06 — Education" /></div>
              </Reveal>
              <MaskLines className="head" lines={[<>My <span className="ital">academic</span> journey.</>]} />
            </div>
            <div style={{ display: 'grid', gap: 18 }}>
              {education.map((ed, i) => (
                <Reveal key={ed.school} delay={i * 0.08}>
                  <div className="card edu-card" style={{ padding: 28, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 24, alignItems: 'center' }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: 13,
                      background: 'var(--accent-soft)', color: 'var(--accent)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid rgba(217,119,87,0.3)',
                    }}><GraduationCap size={22} /></div>
                    <div>
                      <h3 style={{ fontSize: 19, fontWeight: 500, marginBottom: 5, letterSpacing: '-0.01em' }}>{ed.degree}</h3>
                      <p style={{ fontSize: 14.5, color: 'var(--accent)', marginBottom: 3 }}>{ed.school}</p>
                      <p className="mono" style={{ fontSize: 10, color: 'var(--text-muted)' }}>{ed.date} · {ed.location}</p>
                    </div>
                    <span className="serif edu-grade" style={{ fontSize: 23, whiteSpace: 'nowrap' }}>{ed.grade}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CURRENTLY SHIPPING */}
        <section className="section" style={{ padding: '90px 0' }}>
          <div className="container">
            <div className="section-head" style={{ marginBottom: 34 }}>
              <GhostNum style={{ fontSize: 'clamp(90px, 10vw, 170px)' }}>07</GhostNum>
              <Reveal>
                <div className="eyebrow"><span className="led" /><ScrambleText text="Currently shipping" /></div>
              </Reveal>
            </div>
            <SlideDock side="left">
              <div style={{ position: 'relative' }}>
              {/* launches OUTSIDE the card — .card clips overflow */}
              <EnvelopeLaunch />
              <a
                href="https://github.com/Jaskirat314276/AI_EMAIL_SENDER-HIREFLOW-AI-"
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                className="card corner-ticks"
                style={{ display: 'block', padding: '34px 36px', position: 'relative' }}
              >
                <span className="mono" style={{
                  position: 'absolute', top: 20, right: 22, overflow: 'hidden',
                  fontSize: 9.5, letterSpacing: '0.18em', color: 'var(--accent)',
                  border: '1px solid rgba(217,119,87,0.4)', borderRadius: 5, padding: '5px 10px',
                }}>
                  In development
                  <span aria-hidden="true" style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(100deg, transparent, rgba(217,119,87,0.22), transparent)',
                    animation: 'scan-sheen 2.8s linear infinite',
                  }} />
                </span>
                <h3 className="serif nowb-head" style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', marginBottom: 12, paddingRight: 130 }}>
                  Now building: <span className="ital">HireFlow AI</span> — a job-outreach copilot.
                </h3>
                <p style={{ fontSize: 15.5, color: 'var(--text-dim)', maxWidth: 640, lineHeight: 1.65, marginBottom: 16 }}>
                  Turns a spreadsheet of recruiters into personalized, paced, tracked cold email — extraction to inbox to interview.
                </p>
                <span className="mono" style={{ fontSize: 10.5, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Github size={13} /> View the repo <ArrowUpRight size={12} />
                </span>
              </a>
              </div>
            </SlideDock>
          </div>
        </section>
        </div>

        {/* CONTACT */}
        <section id="contact" className="section" ref={contactRef} style={{ padding: '140px 0 90px' }}>
          <div className="container">
            <div className="section-head">
              <GhostNum>08</GhostNum>
              <Reveal>
                <div className="eyebrow"><span className="led" /><ScrambleText text="08 — Get in touch" /></div>
              </Reveal>
              <MaskLines className="head head-xl" lines={["Let's build", <>something <span className="ital">together</span>.</>]} />
            </div>
            <Reveal delay={0.15}>
              <Magnetic strength={0.2}>
                <CopyEmail />
              </Magnetic>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.24em', color: 'var(--text-muted)', marginBottom: 44 }}>
                Email · LinkedIn · GitHub · LeetCode — pick a wire.
              </div>
            </Reveal>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {socials.map((s, i) => (
                <SlideDock key={s.label} side={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.05}>
                  <Magnetic>
                    <a
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                      data-cursor="press"
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '12px 20px', border: '1px solid var(--border-hi)',
                        borderRadius: 999, fontSize: 13.5, color: 'var(--text-dim)',
                      }}
                    >{s.icon} {s.label}</a>
                  </Magnetic>
                </SlideDock>
              ))}
            </div>

            {/* direct line — Netlify Forms, lands in the dashboard + email */}
            <Reveal delay={0.1} style={{ marginTop: 64 }}>
              <div className="eyebrow" style={{ marginBottom: 22 }}>
                <span className="led" /><ScrambleText text="Or drop a message" />
              </div>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER — the trace terminates in the LED */}
      <footer style={{ borderTop: '1px solid var(--border)', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '36px 0 0' }} aria-hidden="true">
          <VerticalTrace height={64} />
          <FooterLed />
        </div>
        <div
          className="footer-row container"
          style={{
            display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
            paddingTop: 26, paddingBottom: 34, color: 'var(--text-muted)', fontSize: 13,
          }}
        >
          <div>© 2026 Jaskirat Singh</div>
          <div>Crafted with passion · Ranchi, India</div>
        </div>
      </footer>
    </div>
  );
}
