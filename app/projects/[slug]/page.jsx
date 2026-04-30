import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { projects, getProject } from '../data';
import Nav from '../../components/Nav';
import CustomCursor from '../../components/CustomCursor';
import BackgroundScene from '../../components/BackgroundScene';
import Magnetic from '../../components/Magnetic';
import Reveal from '../../components/Reveal';
import TiltCard from '../../components/TiltCard';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.title} — JASKIRAT PORTFOLIO`,
    description: project.desc,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

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
        <Nav linkPrefix="/" />

        <main className="project-detail-main" style={{ padding: '60px 0 140px', maxWidth: '900px' }}>
          <Reveal>
            <Link
              href="/#projects"
              className="hover-target project-detail-back"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                color: 'rgba(245,241,234,0.7)', fontSize: '14px',
                marginBottom: '48px',
              }}
            >
              <ArrowLeft size={16} /> Back to projects
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="project-detail-num" style={{
              fontFamily: "'Instrument Serif', serif", fontSize: '96px',
              color: '#ff6b3d', lineHeight: 1, marginBottom: '12px',
            }}>{project.num}</div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{
              fontSize: '13px', color: 'rgba(245,241,234,0.5)',
              letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px',
            }}>{project.date}</div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="glow" style={{
              fontSize: 'clamp(32px, 6vw, 72px)', fontWeight: 500,
              letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '40px',
            }}>
              {project.title.includes('—') ? (
                <>
                  {project.title.split('—')[0]}
                  <span style={{
                    fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#ff6b3d',
                  }}>— {project.title.split('—').slice(1).join('—').trim()}</span>
                </>
              ) : (
                project.title
              )}
            </h1>
          </Reveal>

          {project.links?.github !== undefined && (
            <Reveal delay={0.2}>
              <div style={{
                display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px',
              }}>
                <Magnetic>
                  <a
                    href={project.links.github || '#'}
                    target={project.links.github ? '_blank' : undefined}
                    rel={project.links.github ? 'noopener noreferrer' : undefined}
                    className="hover-target"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '12px 24px', border: '1px solid rgba(245,241,234,0.2)',
                      borderRadius: '999px', fontSize: '14px', fontWeight: 500,
                    }}
                  >
                    <Github size={14} /> GitHub
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={project.links.demo || '#'}
                    target={project.links.demo ? '_blank' : undefined}
                    rel={project.links.demo ? 'noopener noreferrer' : undefined}
                    className="hover-target"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '12px 24px', background: '#ff6b3d', color: '#08080a',
                      borderRadius: '999px', fontSize: '14px', fontWeight: 500,
                    }}
                  >
                    <ExternalLink size={14} /> Live
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.25}>
            <p style={{
              fontSize: '18px', lineHeight: 1.7,
              color: 'rgba(245,241,234,0.75)', marginBottom: '40px',
            }}>{project.desc}</p>
          </Reveal>

          <Reveal delay={0.3}>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '60px',
            }}>
              {project.tags.map((t) => (
                <span key={t} style={{
                  fontSize: '13px', padding: '6px 14px',
                  background: 'rgba(245,241,234,0.06)',
                  border: '1px solid rgba(245,241,234,0.1)',
                  borderRadius: '999px', color: 'rgba(245,241,234,0.75)',
                }}>{t}</span>
              ))}
            </div>
          </Reveal>

          {project.highlights?.length > 0 && (
            <Reveal delay={0.35}>
              <section style={{ marginBottom: '60px' }}>
                <div style={{
                  fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#ff6b3d', marginBottom: '24px',
                }}>— Highlights</div>
                <TiltCard intensity={6}>
                  <div className="hover-target" style={{
                    padding: '40px',
                    background: 'linear-gradient(135deg, rgba(245,241,234,0.04) 0%, rgba(245,241,234,0.01) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(245,241,234,0.08)', borderRadius: '20px',
                  }}>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '16px' }}>
                      {project.highlights.map((h, i) => (
                        <li key={i} style={{
                          display: 'flex', gap: '14px',
                      fontSize: '16px', lineHeight: 1.6,
                      color: 'rgba(245,241,234,0.8)',
                    }}>
                          <span style={{ color: '#ff6b3d', flexShrink: 0, fontWeight: 600 }}>›</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </section>
            </Reveal>
          )}

        </main>
      </div>
    </div>
  );
}
