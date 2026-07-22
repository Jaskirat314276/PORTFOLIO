import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { projects, getProject } from '../data';
import Nav from '../../components/Nav';
import Magnetic from '../../components/Magnetic';
import Reveal from '../../components/Reveal';
import GlowField from '../../components/GlowField';
import GrainOverlay from '../../components/GrainOverlay';

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

// Detail pages share the main page's dark board language: espresso-black
// bg, orange accent, mono eyebrows, ghost numeral, dark chips.
export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="page" style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <style>{`
        .tick-draw { stroke-dasharray: 22; stroke-dashoffset: 22; animation: tickDraw 0.4s ease forwards; }
        @keyframes tickDraw { to { stroke-dashoffset: 0; } }
        .detail-head { position: relative; overflow-x: clip; }
        .detail-btn { transition: transform 0.18s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
        .detail-btn:hover { transform: translateY(-2px); }
        @media (prefers-reduced-motion: reduce) {
          .tick-draw { animation: none; stroke-dashoffset: 0; }
          .detail-btn:hover { transform: none; }
        }
      `}</style>

      <GlowField />
      <GrainOverlay />
      <Nav linkPrefix="/" />

      <main className="container" style={{ maxWidth: 960, paddingTop: 108, paddingBottom: 120, position: 'relative' }}>
        <Reveal>
          <Link href="/#projects" data-cursor="view" className="mono" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-dim)',
            fontSize: 12, marginBottom: 44,
          }}>
            <ArrowLeft size={15} /> Back to the rail
          </Link>
        </Reveal>

        <div className="detail-head">
          {/* ghost numeral — same texture as the main page sections */}
          <span className="ghost-num" aria-hidden="true" style={{ top: '-0.2em' }}>{project.num}</span>

          <Reveal>
            <div className="eyebrow" style={{ marginBottom: 26 }}>
              <span className="led" />
              File {project.num}/0{projects.length} — {project.date}
            </div>
          </Reveal>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
            <Reveal delay={0.05} style={{ minWidth: 0 }}>
              <h1 className="head" style={{ fontSize: 'clamp(32px, 6vw, 64px)', maxWidth: 780 }}>
                {project.title}
              </h1>
            </Reveal>
            <span className="stamp" style={{ marginTop: 10, flexShrink: 0 }}>{STAMP_FOR[project.num]}</span>
          </div>
        </div>

        {project.links && (project.links.github || project.links.demo) && (
          <Reveal delay={0.12}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', margin: '36px 0 0' }}>
              {project.links.demo && (
                <Magnetic>
                  <a href={project.links.demo} target="_blank" rel="noreferrer" data-cursor="press" className="detail-btn" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px',
                    background: 'var(--text)', color: 'var(--bg)', borderRadius: 999, fontSize: 14, fontWeight: 500,
                  }}>
                    <ExternalLink size={15} /> Live Demo
                  </a>
                </Magnetic>
              )}
              {project.links.github && (
                <Magnetic>
                  <a href={project.links.github} target="_blank" rel="noreferrer" data-cursor="press" className="detail-btn" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px',
                    border: '1px solid var(--border-hi)', borderRadius: 999, fontSize: 14, color: 'var(--text)',
                  }}>
                    <Github size={15} /> GitHub
                  </a>
                </Magnetic>
              )}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.18}>
          <p style={{ fontSize: 17.5, lineHeight: 1.75, color: 'var(--text-dim)', margin: '40px 0', maxWidth: 720 }}>
            {project.desc}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 56 }}>
            {project.tags.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </Reveal>

        {project.highlights?.length > 0 && (
          <Reveal delay={0.3}>
            <div className="card corner-ticks" style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', marginBottom: 24 }}>— Highlights</div>
              <ul style={{ listStyle: 'none', display: 'grid', gap: 16 }}>
                {project.highlights.map((h, i) => (
                  <li key={i} style={{ display: 'flex', gap: 14, fontSize: 15.5, lineHeight: 1.65, color: 'var(--text-dim)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true">
                      <path className="tick-draw" d="M5 12.5l4.5 4.5L19 7" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ animationDelay: `${0.35 + i * 0.12}s` }} />
                    </svg>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </main>
    </div>
  );
}
