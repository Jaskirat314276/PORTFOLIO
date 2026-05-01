'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import BackgroundScene from './BackgroundScene';

const STATUS_MESSAGES = [
  'INITIALIZING SCENES',
  'COMPILING SHADERS',
  'ASSEMBLING GEOMETRY',
  'PLACING VERTICES',
  'FINALIZING BUILD',
];

const ACCENT_ORANGE = 0xff6b3d;
const ACCENT_BLUE = 0x5b9eff;
const ACCENT_WHITE = 0xf5f1ea;

function LoaderScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0.4, 4.6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    mount.appendChild(renderer.domElement);

    // ── Letter targets: cubes assemble into "JS" ───────────────
    // 5-wide × 7-tall pixel grids, two-layer extrusion for depth.
    const J_PATTERN = [
      [1, 1, 1, 1, 1],
      [0, 0, 0, 1, 1],
      [0, 0, 0, 1, 1],
      [0, 0, 0, 1, 1],
      [0, 0, 0, 1, 1],
      [1, 0, 0, 1, 1],
      [1, 1, 1, 1, 0],
    ];
    const S_PATTERN = [
      [0, 1, 1, 1, 1],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 1, 1],
      [0, 0, 0, 1, 1],
      [1, 1, 1, 1, 0],
    ];

    const CELL = 0.22;
    const CUBE_SIZE = 0.18;
    const LAYER_OFFSET = CELL / 2; // depth thickness
    const LETTER_W = 5;
    const LETTER_H = 7;
    const LETTER_GAP = 0.5;

    const totalWidth = LETTER_W * CELL * 2 + LETTER_GAP;
    const letterHeight = LETTER_H * CELL;
    const jOffsetX = -totalWidth / 2;
    const sOffsetX = -totalWidth / 2 + LETTER_W * CELL + LETTER_GAP;

    const buildGroup = new THREE.Group();
    scene.add(buildGroup);

    const cubes = [];

    const addLetterCubes = (pattern, offsetX, palette) => {
      for (let row = 0; row < pattern.length; row++) {
        for (let col = 0; col < pattern[row].length; col++) {
          if (!pattern[row][col]) continue;
          const x = offsetX + col * CELL + CELL / 2;
          const y = letterHeight / 2 - row * CELL - CELL / 2;
          // two layers along Z for depth
          [LAYER_OFFSET, -LAYER_OFFSET].forEach((z) => {
            const target = new THREE.Vector3(x, y, z);

            // start far away, random direction
            const sTheta = Math.random() * Math.PI * 2;
            const sPhi = Math.acos(Math.random() * 2 - 1);
            const sR = 7 + Math.random() * 5;
            const start = new THREE.Vector3(
              Math.sin(sPhi) * Math.cos(sTheta) * sR,
              Math.cos(sPhi) * sR,
              Math.sin(sPhi) * Math.sin(sTheta) * sR,
            );

            const roll = Math.random();
            const color = roll < palette.orange ? ACCENT_ORANGE
              : roll < palette.orange + palette.blue ? ACCENT_BLUE
              : ACCENT_WHITE;
            const emissive = color === ACCENT_ORANGE ? 0xff3a1a
              : color === ACCENT_BLUE ? 0x244e8c
              : 0x333333;

            const geo = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
            const mat = new THREE.MeshStandardMaterial({
              color,
              metalness: 0.78,
              roughness: 0.25,
              emissive,
              emissiveIntensity: 0.22,
              transparent: true,
              opacity: 0,
            });
            const cube = new THREE.Mesh(geo, mat);
            cube.position.copy(start);
            buildGroup.add(cube);

            const edgesGeo = new THREE.EdgesGeometry(geo);
            const lineMat = new THREE.LineBasicMaterial({
              color: 0xffffff, transparent: true, opacity: 0,
            });
            const wire = new THREE.LineSegments(edgesGeo, lineMat);
            cube.add(wire);

            const spinAxis = new THREE.Vector3(
              Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5,
            ).normalize();

            cubes.push({
              mesh: cube, wire,
              start, target,
              delay: Math.random() * 0.5,
              spinAxis,
              geo, mat, edgesGeo, lineMat,
            });
          });
        }
      }
    };

    // J leans warm, S leans cool — both still mostly orange
    addLetterCubes(J_PATTERN, jOffsetX, { orange: 0.82, blue: 0.10 });
    addLetterCubes(S_PATTERN, sOffsetX, { orange: 0.7, blue: 0.22 });

    // ── Wireframe grid floor for depth ─────────────────────────
    const grid = new THREE.GridHelper(14, 28, ACCENT_ORANGE, ACCENT_ORANGE);
    grid.material.transparent = true;
    grid.material.opacity = 0.16;
    grid.position.y = -1.9;
    scene.add(grid);

    const grid2 = new THREE.GridHelper(20, 20, ACCENT_BLUE, ACCENT_BLUE);
    grid2.material.transparent = true;
    grid2.material.opacity = 0.07;
    grid2.position.y = -1.91;
    scene.add(grid2);

    // ── Background particle dust ───────────────────────────────
    const buildParticles = (count, rMin, rMax, size, opacity) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = rMin + Math.random() * (rMax - rMin);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
        const mix = Math.random();
        colors[i * 3] = 1 * mix + 0.36 * (1 - mix);
        colors[i * 3 + 1] = 0.42 * mix + 0.62 * (1 - mix);
        colors[i * 3 + 2] = 0.24 * mix + 1 * (1 - mix);
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const mat = new THREE.PointsMaterial({
        size, transparent: true, opacity,
        vertexColors: true, blending: THREE.AdditiveBlending,
      });
      return { points: new THREE.Points(geo, mat), geo, mat };
    };
    const farP = buildParticles(380, 3.5, 7, 0.018, 0.5);
    scene.add(farP.points);

    // ── Lighting ───────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.42));
    const l1 = new THREE.PointLight(ACCENT_ORANGE, 7, 16);
    l1.position.set(3, 3, 3);
    scene.add(l1);
    const l2 = new THREE.PointLight(ACCENT_BLUE, 4.5, 16);
    l2.position.set(-3, -2, 2);
    scene.add(l2);
    const l3 = new THREE.PointLight(0xffffff, 1.5, 16);
    l3.position.set(0, 4, -3);
    scene.add(l3);

    let frameId;
    const ASSEMBLY_DUR = 2.4; // seconds for the assembly
    const startTime = performance.now();

    const animate = () => {
      const t = (performance.now() - startTime) / 1000;

      const buildT = Math.min(1, t / ASSEMBLY_DUR);

      for (let i = 0; i < cubes.length; i++) {
        const c = cubes[i];
        const localRaw = (buildT - c.delay) / (1 - 0.5);
        const local = Math.max(0, Math.min(1, localRaw));
        // ease-out cubic
        const eased = 1 - Math.pow(1 - local, 3);

        c.mesh.position.lerpVectors(c.start, c.target, eased);
        c.mat.opacity = eased;
        c.lineMat.opacity = eased * 0.55;

        // Spin fast in flight, settle on arrival
        const spinSpeed = (1 - eased) * 0.18 + 0.005;
        c.mesh.rotation.x += spinSpeed * c.spinAxis.x;
        c.mesh.rotation.y += spinSpeed * c.spinAxis.y;
        c.mesh.rotation.z += spinSpeed * c.spinAxis.z;
      }

      // After assembly, gentle sway so the depth of the letters reads in 3D
      buildGroup.rotation.y = Math.sin(t * 0.45) * 0.28;
      buildGroup.rotation.x = Math.sin(t * 0.3) * 0.06;

      grid.rotation.y = t * 0.06;
      grid2.rotation.y = -t * 0.04;

      farP.points.rotation.y = -t * 0.05;
      farP.points.rotation.x = Math.sin(t * 0.3) * 0.08;

      // Tiny camera drift — letters stay readable, we just see them breathe
      camera.position.x = Math.sin(t * 0.25) * 0.08;
      camera.position.y = 0.4 + Math.sin(t * 0.4) * 0.05;
      camera.lookAt(0, 0, 0);

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
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      cubes.forEach((c) => {
        c.geo.dispose(); c.mat.dispose();
        c.edgesGeo.dispose(); c.lineMat.dispose();
      });
      grid.geometry.dispose();
      if (grid.material.dispose) grid.material.dispose();
      grid2.geometry.dispose();
      if (grid2.material.dispose) grid2.material.dispose();
      farP.geo.dispose(); farP.mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}

function CornerBracket({ corner }) {
  const base = {
    position: 'absolute', width: '28px', height: '28px',
    pointerEvents: 'none', zIndex: 2,
  };
  const orange = '#ff6b3d';
  const stroke = '1px';
  const positions = {
    tl: { top: '24px', left: '24px',
      borderTop: `${stroke} solid ${orange}`, borderLeft: `${stroke} solid ${orange}` },
    tr: { top: '24px', right: '24px',
      borderTop: `${stroke} solid ${orange}`, borderRight: `${stroke} solid ${orange}` },
    bl: { bottom: '24px', left: '24px',
      borderBottom: `${stroke} solid ${orange}`, borderLeft: `${stroke} solid ${orange}` },
    br: { bottom: '24px', right: '24px',
      borderBottom: `${stroke} solid ${orange}`, borderRight: `${stroke} solid ${orange}` },
  };
  return <div style={{ ...base, ...positions[corner] }} />;
}

export default function LoadingGate({ children }) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [vitals, setVitals] = useState({ fps: 60, verts: 0, mem: 24 });

  useEffect(() => {
    const duration = 2900;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
        setTimeout(() => setHidden(true), 750);
      }
    };
    raf = requestAnimationFrame(tick);

    const statusInterval = setInterval(() => {
      setStatusIdx((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 600);

    const vitalsInterval = setInterval(() => {
      setVitals({
        fps: 58 + Math.floor(Math.random() * 4),
        verts: Math.min(78, Math.floor(Math.random() * 78)),
        mem: 22 + Math.floor(Math.random() * 18),
      });
    }, 110);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(statusInterval);
      clearInterval(vitalsInterval);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = '';
  }, [done]);

  if (hidden) return <>{children}</>;

  const pct = Math.floor(progress * 100);

  return (
    <>
      {children}
      <div
        aria-busy="true"
        aria-live="polite"
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: '#08080a', color: '#f5f1ea',
          fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          opacity: done ? 0 : 1,
          pointerEvents: done ? 'none' : 'auto',
          transition: 'opacity 0.7s ease',
          overflow: 'hidden',
        }}
      >
        {/* Main page CSS — copied verbatim so the loader matches */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          @media (hover: hover) and (pointer: fine) {
            body { cursor: none; }
            a, button { cursor: none; }
          }
          a { color: inherit; text-decoration: none; }
          .glow { text-shadow: 0 0 60px rgba(255, 107, 61, 0.4); }

          @keyframes loader-pulse {
            0%, 100% { opacity: 0.55; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); }
          }
          @keyframes loader-flicker {
            0%, 100% { opacity: 0.55; }
            50% { opacity: 0.95; }
          }
          @keyframes loader-scan {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100%); opacity: 0; }
          }
        `}</style>

        {/* Same 3D ambient background as the main page (floating polyhedra + rings + stars) */}
        <BackgroundScene />

        {/* Ambient orbs */}
        <div style={{
          position: 'absolute', top: '8%', left: '-15%',
          width: '520px', height: '520px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,61,0.18) 0%, transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1,
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', right: '-15%',
          width: '620px', height: '620px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91,158,255,0.14) 0%, transparent 70%)',
          filter: 'blur(100px)', pointerEvents: 'none', zIndex: 1,
        }} />

        {/* Grain */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
          opacity: 0.05, pointerEvents: 'none', mixBlendMode: 'overlay',
        }} />

        {/* Vertical scan-line */}
        <div style={{
          position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1,
        }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, height: '120px',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,107,61,0.06) 50%, transparent 100%)',
            animation: 'loader-scan 3.6s linear infinite',
          }} />
        </div>

        <CornerBracket corner="tl" />
        <CornerBracket corner="tr" />
        <CornerBracket corner="bl" />
        <CornerBracket corner="br" />

        {/* Brand top-left */}
        <div style={{
          position: 'absolute', top: '32px', left: '64px', zIndex: 2,
          fontSize: '28px', fontWeight: 600, letterSpacing: '-0.02em',
        }}>
          JS<span style={{ color: '#ff6b3d' }}>.</span>
        </div>

        {/* Building indicator top-right */}
        <div style={{
          position: 'absolute', top: '40px', right: '64px', zIndex: 2,
          display: 'flex', alignItems: 'center', gap: '10px',
          fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'rgba(245,241,234,0.55)',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#ff6b3d', boxShadow: '0 0 14px #ff6b3d',
            animation: 'loader-pulse 1.2s ease-in-out infinite',
          }} />
          Building
        </div>

        {/* Left vitals — desktop only */}
        <div className="loader-vitals-left" style={{
          position: 'absolute', top: '50%', left: '64px',
          transform: 'translateY(-50%)', zIndex: 2,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: '10px', color: 'rgba(245,241,234,0.45)',
          letterSpacing: '0.15em', display: 'flex', flexDirection: 'column', gap: '14px',
          minWidth: '160px',
        }}>
          <div>
            <div style={{ color: '#ff6b3d', marginBottom: '4px' }}>// VITALS</div>
            <div>FPS......{vitals.fps.toString().padStart(3, '0')}</div>
            <div>VERTS....{vitals.verts.toString().padStart(2, '0')}/78</div>
            <div>MEM......{vitals.mem.toString().padStart(2, '0')}MB</div>
          </div>
          <div>
            <div style={{ color: '#ff6b3d', marginBottom: '4px' }}>// SYSTEM</div>
            <div>ENGINE...THREE.JS</div>
            <div>RUNTIME..NEXT 16</div>
            <div>NODE.....20.x</div>
          </div>
        </div>

        {/* Right scene info — desktop only */}
        <div className="loader-vitals-right" style={{
          position: 'absolute', top: '50%', right: '64px',
          transform: 'translateY(-50%)', zIndex: 2,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: '10px', color: 'rgba(245,241,234,0.45)',
          letterSpacing: '0.15em', display: 'flex', flexDirection: 'column', gap: '14px',
          textAlign: 'right', minWidth: '170px',
        }}>
          <div>
            <div style={{ color: '#5b9eff', marginBottom: '4px' }}>SCENE //</div>
            <div>NODES.......{(48 + (pct % 12)).toString()}</div>
            <div>DRAW CALLS..{(12 + (pct % 7)).toString()}</div>
            <div>TRIANGLES..{(2400 + pct * 18).toLocaleString()}</div>
          </div>
          <div>
            <div style={{ color: '#5b9eff', marginBottom: '4px' }}>BUILD //</div>
            <div>STAGE.......{statusIdx + 1}/5</div>
            <div>PROGRESS....{pct.toString().padStart(3, '0')}%</div>
            <div>TARGET......JS</div>
          </div>
        </div>

        {/* 3D scene */}
        <div style={{
          position: 'relative', zIndex: 2, marginBottom: '28px',
        }}>
          <div className="loader-scene" style={{
            width: 'min(440px, 80vw)',
            height: 'min(440px, 80vw)',
          }}>
            <LoaderScene />
          </div>
        </div>

        {/* Welcome label + name */}
        <div style={{
          position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: '36px',
        }}>
          <div style={{
            fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase',
            color: 'rgba(245,241,234,0.45)', marginBottom: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          }}>
            <span style={{ width: '24px', height: '1px', background: '#ff6b3d' }} />
            Welcome
            <span style={{ width: '24px', height: '1px', background: '#ff6b3d' }} />
          </div>
          <div className="glow" style={{
            fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
            fontSize: 'clamp(36px, 6vw, 64px)', color: '#ff6b3d',
            lineHeight: 1, letterSpacing: '-0.02em',
          }}>
            Jaskirat Singh
          </div>
        </div>

        {/* Progress */}
        <div style={{
          width: 'min(460px, 84vw)', position: 'relative', zIndex: 2,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            marginBottom: '10px',
            fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(245,241,234,0.55)',
          }}>
            <span style={{ animation: 'loader-flicker 1.4s ease-in-out infinite' }}>
              {STATUS_MESSAGES[statusIdx]}
            </span>
            <span style={{
              fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
              fontSize: '22px', color: '#f5f1ea', letterSpacing: '0',
            }}>
              {pct.toString().padStart(3, '0')}%
            </span>
          </div>
          <div style={{
            width: '100%', height: '2px',
            background: 'rgba(245,241,234,0.08)',
            borderRadius: '999px', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: `${pct}%`,
              background: 'linear-gradient(90deg, #ff6b3d 0%, #5b9eff 100%)',
              boxShadow: '0 0 14px rgba(255,107,61,0.65)',
            }} />
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            {[0.92, 0.78, 0.64].map((mult, i) => (
              <div key={i} style={{
                flex: 1, height: '1px', background: 'rgba(245,241,234,0.06)',
                borderRadius: '999px', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(100, pct * mult + i * 4)}%`,
                  background: i === 0 ? '#ff6b3d' : i === 1 ? '#5b9eff' : 'rgba(245,241,234,0.5)',
                  opacity: 0.6,
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
