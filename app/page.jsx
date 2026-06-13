'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { projects } from './projects/data';
import Nav from './components/Nav';
import CustomCursor from './components/CustomCursor';
import BackgroundScene from './components/BackgroundScene';
import Magnetic from './components/Magnetic';
import Reveal from './components/Reveal';
import TiltCard from './components/TiltCard';
import {
  Github, Linkedin, Mail, ArrowUpRight, Download, Phone, MapPin,
  Code2, Database, Cloud, Cpu, Zap, Brain, Award, GraduationCap,
  Briefcase, Trophy, FolderGit2, Sparkles, ChevronDown, Bot
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
        onClick={() => setOpen((v) => !v)}
        className="resume-button"
        style={{
          padding: '14px 28px', border: '1px solid rgba(245,241,234,0.2)',
          borderRadius: '999px', fontSize: '14px', fontWeight: 500,
          background: 'transparent', color: 'inherit', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px',
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
            minWidth: '240px', padding: '8px',
            background: '#0f0f12', border: '1px solid rgba(245,241,234,0.15)',
            borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            zIndex: 50,
          }}
        >
          {RESUMES.map((r) => (
            <a
              key={r.file}
              href={r.file}
              download
              role="menuitem"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '12px 14px', borderRadius: '10px',
                fontSize: '14px', color: '#f5f1ea', textDecoration: 'none',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(245,241,234,0.08)'; }}
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


// ============================================================
// 3D HERO — Icosahedron with edges, particles, chromatic glow
// ============================================================
const HeroScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    mount.appendChild(renderer.domElement);

    // Main icosahedron — slightly translucent
    const icoGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0xff6b3d,
      metalness: 0.7,
      roughness: 0.2,
      flatShading: true,
      transparent: true,
      opacity: 0.85,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    // Edge lines for that wireframe-on-solid look
    const edges = new THREE.EdgesGeometry(icoGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    scene.add(wireframe);

    // Outer wireframe sphere
    const outerGeo = new THREE.IcosahedronGeometry(2.5, 1);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({ color: 0x5b9eff, transparent: true, opacity: 0.2 });
    const outerWire = new THREE.LineSegments(outerEdges, outerMat);
    scene.add(outerWire);

    // Particle galaxy
    const pGeo = new THREE.BufferGeometry();
    const pCount = 800;
    const positions = new Float32Array(pCount * 3);
    const colors = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const mix = Math.random();
      colors[i * 3] = 1 * mix + 0.3 * (1 - mix);
      colors[i * 3 + 1] = 0.4 * mix + 0.6 * (1 - mix);
      colors[i * 3 + 2] = 0.2 * mix + 1 * (1 - mix);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.03, transparent: true, opacity: 0.7, vertexColors: true, blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const l1 = new THREE.PointLight(0xff6b3d, 5, 15);
    l1.position.set(3, 3, 3);
    scene.add(l1);
    const l2 = new THREE.PointLight(0x5b9eff, 3, 15);
    l2.position.set(-3, -2, 2);
    scene.add(l2);
    const l3 = new THREE.PointLight(0xffffff, 1.5, 15);
    l3.position.set(0, 4, -3);
    scene.add(l3);

    // Mouse parallax
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener('mousemove', onMove);

    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      ico.rotation.x = t * 0.2 + mouse.y * 0.5;
      ico.rotation.y = t * 0.3 + mouse.x * 0.5;
      wireframe.rotation.copy(ico.rotation);

      outerWire.rotation.x = -t * 0.1;
      outerWire.rotation.y = t * 0.15;

      particles.rotation.y = t * 0.05;
      particles.rotation.x = t * 0.03;

      // Pulsate scale
      const s = 1 + Math.sin(t * 1.5) * 0.03;
      ico.scale.set(s, s, s);
      wireframe.scale.set(s, s, s);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      if (nw === 0 || nh === 0) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh, false);
    };
    window.addEventListener('resize', onResize);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;
    if (ro) ro.observe(mount);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
      mount.removeEventListener('mousemove', onMove);
      mount.removeChild(renderer.domElement);
      icoGeo.dispose(); icoMat.dispose(); edges.dispose(); lineMat.dispose();
      outerGeo.dispose(); outerEdges.dispose(); outerMat.dispose();
      pGeo.dispose(); pMat.dispose(); renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />;
};

// ============================================================
// MAGNETIC BUTTON — Pulls toward cursor on hover
// ============================================================
// ============================================================
// TILT CARD with depth and glow
// ============================================================
// ============================================================
// COUNT-UP NUMBER
// ============================================================
const CountUp = ({ end, suffix = '' }) => {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const dur = 1800;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.floor(end * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        ob.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [end]);
  return <span ref={ref}>{n}{suffix}</span>;
};

// ============================================================
// MAIN PORTFOLIO
// ============================================================
export default function Portfolio() {
  const stats = [
    { value: 6, suffix: '+', label: 'Projects Built', icon: <FolderGit2 size={20} /> },
    { value: 300, suffix: '+', label: 'LeetCode Problems', icon: <Code2 size={20} /> },
    { value: 2, suffix: '+', label: 'Years Coding', icon: <Sparkles size={20} /> },
    { value: 200, suffix: '+', label: 'Students Mentored', icon: <Award size={20} /> },
  ];

  const skills = [
    {
      cat: 'Frontend', icon: <Code2 size={22} />, color: '#ff6b3d',
      items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML / CSS'],
    },
    {
      cat: 'Backend', icon: <Cpu size={22} />, color: '#5b9eff',
      items: ['Node.js', 'REST APIs', 'C++', 'C', 'Python'],
    },
    {
      cat: 'Data & ML', icon: <Brain size={22} />, color: '#a855f7',
      items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Structured Query Language(SQL)', 'Statsmodels (SARIMA)', 'Power BI', 'Excel'],
    },
    {
      cat: 'GenAI & LLM', icon: <Bot size={22} />, color: '#a78bfa',
      items: ['LangChain', 'RAG', 'OpenAI', 'LLaMA 3.2', 'VectorDB', 'AnthropicAI API', 'OpenAI API', 'Prompt Engineering'],
    },
    {
      cat: 'Databases', icon: <Database size={22} />, color: '#10b981',
      items: ['MySQL', 'Prisma ORM', 'Supabase', 'VectorDB'],
    },
    {
      cat: 'Cloud & DevOps', icon: <Cloud size={22} />, color: '#06b6d4',
      items: ['Docker', 'Prometheus', 'Terraform', 'AWS(Amazon Web Service'],
    },
    {
      cat: 'CS Fundamentals', icon: <Sparkles size={22} />, color: '#f59e0b',
      items: ['Data Structure Algorithm', 'Object Oriented Programming', 'Database Management System', 'Operating Systems', 'Computer Networks'],
    },
    {
      cat: 'Core Electrical', icon: <Zap size={22} />, color: '#eab308',
      items: ['MATLAB / Simulink', 'Eagle PCB Design', 'Power Electronics','IoT'],
    },
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
    {
      degree: 'B.Tech in Electrical & Electronics Engineering',
      school: 'Birla Institute of Technology, Mesra',
      date: 'Nov 2022 — May 2026',
      grade: 'CGPA: 7.15',
      location: 'Ranchi, Jharkhand',
    },
    {
      degree: 'Class XII — CBSE',
      school: 'Munam Public School',
      date: '2019 — 2021',
      grade: 'Percentage: 95%',
      location: 'Hazaribagh, Jharkhand',
    },
    {
      degree: 'Class X — CBSE',
      school: 'Angels High School',
      date: 'Completed 2019',
      grade: 'Percentage: 91%',
      location: 'Hazaribagh, Jharkhand',
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#08080a',
      color: '#f5f1ea',
      fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
      overflow: 'hidden',
      position: 'relative',
      cursor: 'none',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700&family=Instrument+Serif:ital@0;1&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @media (hover: hover) and (pointer: fine) {
          body { cursor: none; }
          a, button { cursor: none; }
        }
        a { color: inherit; text-decoration: none; }
        .glow { text-shadow: 0 0 60px rgba(255, 107, 61, 0.4); }
      `}</style>

      <CustomCursor />

      {/* 3D ambient background */}
      <BackgroundScene />

      {/* Ambient gradient orbs */}
      <div className="ambient-orb" style={{
        position: 'fixed', top: '10%', left: '-15%', width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,61,0.15) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div className="ambient-orb" style={{
        position: 'fixed', bottom: '5%', right: '-15%', width: '700px', height: '700px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(91,158,255,0.12) 0%, transparent 70%)',
        filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Grain */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
        opacity: 0.05, pointerEvents: 'none', zIndex: 1, mixBlendMode: 'overlay',
      }} />

      <div className="page-container" style={{ position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

        {/* NAV */}
        <Nav />

        {/* HERO */}
        <section className="hero-grid" style={{
          display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px',
          alignItems: 'center', padding: '80px 0 120px', minHeight: '90vh',
        }}>
          <div>
            <Reveal>
              <div className="hero-eyebrow" style={{
                fontSize: '18px', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#ff6b3d', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ width: '32px', height: '1px', background: '#ff6b3d' }} />
                Available for Opportunities · 2026
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="hero-h1" style={{
                fontSize: 'clamp(40px, 7vw, 96px)', lineHeight: 0.95,
                letterSpacing: '-0.03em', fontWeight: 500, marginBottom: '32px',
              }}>
                Hi, I'm<br />
                <span className="glow" style={{
                  fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#ff6b3d',
                }}>Jaskirat Singh</span><br />
                — I build things.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="hero-paragraph" style={{
                fontSize: '18px', color: 'rgba(245,241,234,0.7)',
                maxWidth: '520px', marginBottom: '40px', lineHeight: 1.6,
              }}>
                Final-year B.Tech student in Electrical & Electronics Engineering at BIT Mesra, with hands-on experience as a Software Developer Intern. I work across full-stack web, AI/ML, and power electronics.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="hero-cta-row" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Magnetic>
                  <a href="#projects" className="hero-cta" style={{
                    padding: '14px 28px', background: '#f5f1ea', color: '#08080a',
                    borderRadius: '999px', fontSize: '14px', fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                    See my work <ArrowUpRight size={16} />
                  </a>
                </Magnetic>
                <ResumeDropdown />
              </div>
            </Reveal>
          </div>
          <div className="hero-3d" style={{ height: '550px', width: '100%' }}>
            <HeroScene />
          </div>
        </section>

        {/* ABOUT + STATS */}
        <section id="about" className="section" style={{ padding: '120px 0', borderTop: '1px solid rgba(245,241,234,0.08)' }}>
          <Reveal>
            <div className="section-eyebrow" style={{
              fontSize: '18px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#ff6b3d', marginBottom: '24px',
            }}>— About me</div>
          </Reveal>
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', marginBottom: '80px' }}>
            <Reveal delay={0.1}>
              <h2 className="section-h2" style={{
                fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.05,
                letterSpacing: '-0.02em', fontWeight: 500,
              }}>
                Engineer at the <span style={{
                  fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#ff6b3d',
                }}>intersection</span> of code & hardware.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <p style={{ fontSize: '18px', color: 'rgba(245,241,234,0.85)', marginBottom: '20px', lineHeight: 1.7 }}>
                  I'm a final-year EEE student at BIT Mesra who genuinely enjoys both sides of the stack — writing clean React/Next.js apps and designing power electronics circuits.
                </p>
                <p style={{ fontSize: '16px', color: 'rgba(245,241,234,0.6)', marginBottom: '24px', lineHeight: 1.7 }}>
                  My internship at Productimate AI Solutions sharpened my full-stack skills, and side projects in AI (LangChain, RAG) and forecasting (SARIMA, Power BI) keep me exploring new domains.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <span style={{
                    padding: '6px 14px', background: 'rgba(255,107,61,0.1)', color: '#ff6b3d',
                    border: '1px solid rgba(255,107,61,0.3)', borderRadius: '999px', fontSize: '13px',
                  }}><MapPin size={12} style={{ display: 'inline', marginRight: '6px' }} />Ranchi, India</span>
                  <span style={{
                    padding: '6px 14px', background: 'rgba(91,158,255,0.1)', color: '#5b9eff',
                    border: '1px solid rgba(91,158,255,0.3)', borderRadius: '999px', fontSize: '13px',
                  }}>BIT Mesra · 2026</span>
                  <span style={{
                    padding: '6px 14px', background: 'rgba(16,185,129,0.1)', color: '#10b981',
                    border: '1px solid rgba(16,185,129,0.3)', borderRadius: '999px', fontSize: '13px',
                  }}>Open to work</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <TiltCard intensity={8}>
                  <div className="hover-target stat-card" style={{
                    padding: '32px', height: '100%',
                    background: 'linear-gradient(135deg, rgba(245,241,234,0.04) 0%, rgba(245,241,234,0.01) 100%)',
                    border: '1px solid rgba(245,241,234,0.08)', borderRadius: '20px',
                    backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ color: '#ff6b3d', marginBottom: '20px' }}>{s.icon}</div>
                    <div className="stat-card-value" style={{
                      fontSize: '48px', fontWeight: 600, letterSpacing: '-0.02em',
                      lineHeight: 1, marginBottom: '8px',
                    }}>
                      <CountUp end={s.value} suffix={s.suffix} />
                    </div>
                    <div style={{ fontSize: '14px', color: 'rgba(245,241,234,0.6)' }}>{s.label}</div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section" style={{ padding: '120px 0', borderTop: '1px solid rgba(245,241,234,0.08)' }}>
          <Reveal>
            <div className="section-eyebrow" style={{
              fontSize: '18px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#ff6b3d', marginBottom: '24px',
            }}>— Skills & Tools</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-h2" style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.05,
              letterSpacing: '-0.02em', fontWeight: 500, marginBottom: '60px',
            }}>
              The <span style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#ff6b3d',
              }}>toolkit</span> I work with.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {skills.map((s, i) => (
              <Reveal key={s.cat} delay={i * 0.05}>
                <TiltCard>
                  <div className="hover-target skill-card" style={{
                    padding: '32px', height: '100%',
                    background: 'linear-gradient(135deg, rgba(245,241,234,0.04) 0%, rgba(245,241,234,0.01) 100%)',
                    border: '1px solid rgba(245,241,234,0.08)', borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                  }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '12px',
                      background: `${s.color}20`, color: s.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '20px', border: `1px solid ${s.color}40`,
                    }}>{s.icon}</div>
                    <h4 style={{
                      fontFamily: "'Instrument Serif', serif", fontSize: '24px',
                      color: '#f5f1ea', marginBottom: '20px',
                    }}>{s.cat}</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {s.items.map((item) => (
                        <span key={item} style={{
                          fontSize: '12px', padding: '5px 12px',
                          background: 'rgba(245,241,234,0.04)',
                          border: '1px solid rgba(245,241,234,0.08)',
                          borderRadius: '999px', color: 'rgba(245,241,234,0.75)',
                        }}>{item}</span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section" style={{ padding: '120px 0', borderTop: '1px solid rgba(245,241,234,0.08)' }}>
          <Reveal>
            <div className="section-eyebrow" style={{
              fontSize: '18px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#ff6b3d', marginBottom: '24px',
            }}>— Experience</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-h2" style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.05,
              letterSpacing: '-0.02em', fontWeight: 500, marginBottom: '60px',
            }}>
              Where I've <span style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#ff6b3d',
              }}>worked</span> & led.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gap: '20px' }}>
            {experience.map((e, i) => (
              <Reveal key={e.company} delay={i * 0.1}>
                <TiltCard intensity={6}>
                  <div className="hover-target exp-card" style={{
                    padding: '40px',
                    background: 'linear-gradient(135deg, rgba(245,241,234,0.04) 0%, rgba(245,241,234,0.01) 100%)',
                    border: '1px solid rgba(245,241,234,0.08)', borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                  }}>
                    <div className="exp-card-header" style={{
                      display: 'flex', justifyContent: 'space-between',
                      flexWrap: 'wrap', gap: '12px', marginBottom: '20px',
                    }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                          <Briefcase size={18} style={{ color: '#ff6b3d' }} />
                          <h3 style={{ fontSize: '24px', fontWeight: 500, letterSpacing: '-0.01em' }}>{e.role}</h3>
                        </div>
                        <p style={{ fontSize: '16px', color: '#ff6b3d' }}>{e.company} · {e.location}</p>
                      </div>
                      <span style={{
                        fontSize: '13px', color: 'rgba(245,241,234,0.5)', alignSelf: 'flex-start',
                        padding: '4px 12px', background: 'rgba(245,241,234,0.05)',
                        border: '1px solid rgba(245,241,234,0.08)', borderRadius: '999px',
                      }}>{e.date}</span>
                    </div>
                    <ul style={{ listStyle: 'none', marginBottom: '20px' }}>
                      {e.points.map((p, idx) => (
                        <li key={idx} style={{
                          fontSize: '15px', color: 'rgba(245,241,234,0.7)',
                          paddingLeft: '20px', position: 'relative', marginBottom: '10px', lineHeight: 1.6,
                        }}>
                          <span style={{
                            position: 'absolute', left: 0, top: '10px',
                            width: '8px', height: '1px', background: '#ff6b3d',
                          }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {e.stack.map((t) => (
                        <span key={t} style={{
                          fontSize: '12px', padding: '4px 12px',
                          background: 'rgba(255,107,61,0.08)',
                          border: '1px solid rgba(255,107,61,0.2)',
                          borderRadius: '999px', color: '#ff6b3d',
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section" style={{ padding: '120px 0', borderTop: '1px solid rgba(245,241,234,0.08)' }}>
          <Reveal>
            <div className="section-eyebrow" style={{
              fontSize: '18px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#ff6b3d', marginBottom: '24px',
            }}>— Selected work</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-h2" style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.05,
              letterSpacing: '-0.02em', fontWeight: 500, marginBottom: '60px',
            }}>
              Things I've <span style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#ff6b3d',
              }}>built</span>.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gap: '20px' }}>
            {projects.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.08}>
                <TiltCard intensity={6}>
                  <Link href={`/projects/${p.slug}`} className="hover-target project-row" style={{
                    display: 'grid', gridTemplateColumns: '80px 1fr auto',
                    gap: '32px', alignItems: 'center', padding: '40px',
                    background: 'linear-gradient(135deg, rgba(245,241,234,0.04) 0%, rgba(245,241,234,0.01) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(245,241,234,0.08)', borderRadius: '20px',
                  }}>
                    <div className="project-num" style={{
                      fontFamily: "'Instrument Serif', serif", fontSize: '56px',
                      color: '#ff6b3d', lineHeight: 1,
                    }}>{p.num}</div>
                    <div>
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'baseline', marginBottom: '8px', flexWrap: 'wrap', gap: '8px',
                      }}>
                        <h3 style={{ fontSize: '26px', fontWeight: 500, letterSpacing: '-0.01em' }}>
                          {p.title}
                        </h3>
                        <span style={{ fontSize: '13px', color: 'rgba(245,241,234,0.4)' }}>{p.date}</span>
                      </div>
                      <p style={{
                        color: 'rgba(245,241,234,0.65)', fontSize: '15px',
                        marginBottom: '16px', lineHeight: 1.6,
                      }}>{p.desc}</p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {p.tags.map((t) => (
                          <span key={t} style={{
                            fontSize: '12px', padding: '4px 12px',
                            background: 'rgba(245,241,234,0.06)',
                            border: '1px solid rgba(245,241,234,0.1)',
                            borderRadius: '999px', color: 'rgba(245,241,234,0.7)',
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <ArrowUpRight size={28} className="project-row-arrow" style={{ color: '#ff6b3d' }} />
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="section" style={{ padding: '120px 0', borderTop: '1px solid rgba(245,241,234,0.08)' }}>
          <Reveal>
            <div className="section-eyebrow" style={{
              fontSize: '18px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#ff6b3d', marginBottom: '24px',
            }}>— Achievements</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-h2" style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.05,
              letterSpacing: '-0.02em', fontWeight: 500, marginBottom: '60px',
            }}>
              Wins & <span style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#ff6b3d',
              }}>recognition</span>.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {achievements.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06}>
                <TiltCard intensity={8}>
                  <div className="hover-target achievement-card" style={{
                    padding: '28px', height: '100%',
                    background: 'linear-gradient(135deg, rgba(245,241,234,0.04) 0%, rgba(245,241,234,0.01) 100%)',
                    border: '1px solid rgba(245,241,234,0.08)', borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    display: 'flex', gap: '20px', alignItems: 'flex-start',
                  }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '12px',
                      background: 'rgba(255,107,61,0.1)', color: '#ff6b3d',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid rgba(255,107,61,0.3)', flexShrink: 0,
                    }}>{a.icon}</div>
                    <div>
                      <h4 style={{
                        fontSize: '17px', fontWeight: 500,
                        marginBottom: '6px', letterSpacing: '-0.01em',
                      }}>{a.title}</h4>
                      <p style={{ fontSize: '14px', color: 'rgba(245,241,234,0.55)' }}>{a.org}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="section" style={{ padding: '120px 0', borderTop: '1px solid rgba(245,241,234,0.08)' }}>
          <Reveal>
            <div className="section-eyebrow" style={{
              fontSize: '18px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#ff6b3d', marginBottom: '24px',
            }}>— Education</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-h2" style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.05,
              letterSpacing: '-0.02em', fontWeight: 500, marginBottom: '60px',
            }}>
              My <span style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#ff6b3d',
              }}>academic</span> journey.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gap: '20px' }}>
            {education.map((ed, i) => (
              <Reveal key={ed.school} delay={i * 0.1}>
                <TiltCard intensity={5}>
                  <div className="hover-target edu-row" style={{
                    padding: '32px',
                    background: 'linear-gradient(135deg, rgba(245,241,234,0.04) 0%, rgba(245,241,234,0.01) 100%)',
                    border: '1px solid rgba(245,241,234,0.08)', borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    display: 'grid', gridTemplateColumns: 'auto 1fr auto',
                    gap: '24px', alignItems: 'center',
                  }}>
                    <div style={{
                      width: '52px', height: '52px', borderRadius: '14px',
                      background: 'rgba(255,107,61,0.1)', color: '#ff6b3d',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid rgba(255,107,61,0.3)',
                    }}><GraduationCap size={24} /></div>
                    <div>
                      <h3 style={{
                        fontSize: '20px', fontWeight: 500,
                        marginBottom: '6px', letterSpacing: '-0.01em',
                      }}>{ed.degree}</h3>
                      <p style={{ fontSize: '15px', color: '#ff6b3d', marginBottom: '4px' }}>
                        {ed.school}
                      </p>
                      <p style={{ fontSize: '13px', color: 'rgba(245,241,234,0.5)' }}>
                        {ed.date} · {ed.location}
                      </p>
                    </div>
                    <span className="edu-grade" style={{
                      fontFamily: "'Instrument Serif', serif", fontSize: '24px',
                      color: '#f5f1ea', whiteSpace: 'nowrap',
                    }}>{ed.grade}</span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact-section" style={{ padding: '140px 0 80px', borderTop: '1px solid rgba(245,241,234,0.08)' }}>
          <Reveal>
            <div className="section-eyebrow" style={{
              fontSize: '18px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#ff6b3d', marginBottom: '24px',
            }}>— Get in touch</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="glow" style={{
              fontSize: 'clamp(40px, 8vw, 110px)', lineHeight: 0.95,
              letterSpacing: '-0.03em', fontWeight: 500, marginBottom: '40px',
            }}>
              Let's build<br />
              something <span style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#ff6b3d',
              }}>together</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Magnetic strength={0.2}>
              <a href="mailto:jaskiratsingh314276@gmail.com" className="contact-email" style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(20px, 3.5vw, 40px)', color: '#f5f1ea',
                borderBottom: '1px solid rgba(245,241,234,0.2)', paddingBottom: '8px',
                display: 'inline-block', marginBottom: '48px',
                wordBreak: 'break-word',
              }}>jaskiratsingh314276@gmail.com →</a>
            </Magnetic>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="contact-socials" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
              {[
                { icon: <Github size={16} />, label: 'GitHub', href: 'https://github.com/' },
                { icon: <Linkedin size={16} />, label: 'LinkedIn', href: 'https://linkedin.com/' },
                { icon: <Code2 size={16} />, label: 'LeetCode · Jaskirat-singh', href: 'https://leetcode.com/Jaskirat-singh' },
                { icon: <Code2 size={16} />, label: 'GeeksforGeeks · jaskiratsi2k1r', href: '#' },
                { icon: <Phone size={16} />, label: '+91 8340361891', href: 'tel:+918340361891' },
              ].map((s) => (
                <Magnetic key={s.label}>
                  <a href={s.href} className="hover-target" style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '12px 20px', border: '1px solid rgba(245,241,234,0.15)',
                    borderRadius: '999px', fontSize: '14px',
                    color: 'rgba(245,241,234,0.8)', transition: 'all 0.2s',
                  }}>{s.icon} {s.label}</a>
                </Magnetic>
              ))}
            </div>
          </Reveal>
        </section>

        {/* FOOTER */}
        <footer className="footer" style={{
          padding: '32px 0', borderTop: '1px solid rgba(245,241,234,0.08)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
          color: 'rgba(245,241,234,0.4)', fontSize: '13px',
        }}>
          <div>© 2026 Jaskirat Singh</div>
          <div>Crafted with passion · Ranchi, India</div>
        </footer>
      </div>
    </div>
  );
}
