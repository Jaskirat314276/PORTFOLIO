import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Check } from 'lucide-react';
import { projects, getProject } from '../data';
import Nav from '../../components/Nav';
import Magnetic from '../../components/Magnetic';
import Reveal from '../../components/Reveal';

const STAMP_FOR = {
  '01': 'FLAGSHIP · 2026', '02': 'SHIPPED', '03': 'LIVE DEMO',
  '04': 'LIVE DEMO', '05': 'HARDWARE · 300V TESTED', '06': 'SIMULATION',
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.title} — Jaskirat Singh`,
    description: project.desc,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const ink = 'var(--paper-ink)';
  const dim = 'rgba(31,30,29,0.62)';
  const line = 'var(--paper-line)';

  return (
    <div className="paper-page" style={{
      minHeight: '100vh', background: 'var(--paper)', color: ink,
      fontFamily: 'var(--sans)', position: 'relative',
    }}>
      <style>{`
        .paper-page { animation: paperIn 0.32s ease both; }
        @keyframes paperIn { from { background: #08080a; } to { background: var(--paper); } }
        .tick-draw { stroke-dasharray: 22; stroke-dashoffset: 22; animation: tickDraw 0.4s ease forwards; }
        @keyframes tickDraw { to { stroke-dashoffset: 0; } }
        .paper-btn { transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease; }
        .paper-btn:hover { transform: translateY(-2px); }
        @media (prefers-reduced-motion: reduce) {
          .paper-page { animation: none; }
          .tick-draw { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>

      <Nav linkPrefix="/" paper />

      <main className="container" style={{ maxWidth: 900, paddingTop: 108, paddingBottom: 120 }}>
        <Reveal>
          <Link href="/#projects" data-cursor="view" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, color: dim, fontSize: 14,
            fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 44,
          }}>
            <ArrowLeft size={15} /> Back to the rail
          </Link>
        </Reveal>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <Reveal>
            <div className="serif" style={{ fontSize: 'clamp(72px, 12vw, 132px)', color: 'var(--accent-dim)', lineHeight: 0.9 }}>
              {project.num}
            </div>
          </Reveal>
          <span className="stamp" style={{ marginTop: 24 }}>{STAMP_FOR[project.num]}</span>
        </div>

        <Reveal delay={0.05}>
          <div className="mono" style={{ fontSize: 11, color: dim, marginTop: 10, marginBottom: 18 }}>{project.date}</div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="serif" style={{ fontSize: 'clamp(30px, 5.5vw, 60px)', fontWeight: 400, lineHeight: 1.06, letterSpacing: '-0.01em', marginBottom: 34, color: ink }}>
            {project.title}
          </h1>
        </Reveal>

        {project.links && (project.links.github || project.links.demo) && (
          <Reveal delay={0.15}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
              {project.links.github && (
                <Magnetic>
                  <a href={project.links.github} target="_blank" rel="noreferrer" data-cursor="press" className="paper-btn" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px',
                    border: `1px solid ${ink}`, borderRadius: 999, fontSize: 14, color: ink,
                  }}>
                    <Github size={14} /> GitHub
                  </a>
                </Magnetic>
              )}
              {project.links.demo && (
                <Magnetic>
                  <a href={project.links.demo} target="_blank" rel="noreferrer" data-cursor="press" className="paper-btn" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px',
                    background: 'var(--accent)', color: 'var(--paper)', borderRadius: 999, fontSize: 14, fontWeight: 500,
                  }}>
                    <ExternalLink size={14} /> Live Demo
                  </a>
                </Magnetic>
              )}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.2}>
          <p style={{ fontSize: 17.5, lineHeight: 1.75, color: 'rgba(31,30,29,0.82)', marginBottom: 40, maxWidth: 720 }}>
            {project.desc}
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 56 }}>
            {project.tags.map((t) => (
              <span key={t} className="mono" style={{
                fontSize: 10, letterSpacing: '0.08em', padding: '6px 12px', borderRadius: 6,
                background: line, color: 'rgba(31,30,29,0.68)',
              }}>{t}</span>
            ))}
          </div>
        </Reveal>

        {project.highlights?.length > 0 && (
          <Reveal delay={0.3}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--accent-dim)', marginBottom: 22 }}>— HIGHLIGHTS</div>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 16, borderTop: `1px solid ${line}`, paddingTop: 26 }}>
              {project.highlights.map((h, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, fontSize: 16, lineHeight: 1.6, color: 'rgba(31,30,29,0.85)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true">
                    <path className="tick-draw" d="M5 12.5l4.5 4.5L19 7" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ animationDelay: `${0.35 + i * 0.12}s` }} />
                  </svg>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </main>
    </div>
  );
}
