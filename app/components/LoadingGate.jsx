'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import BackgroundScene from './BackgroundScene';

const ACCENT = 0xff6b3d;
const ACCENT_DIM = 0xd9531f;
const BLUE = 0x5b9eff;
const IVORY = 0xf5f1ea;

const POST_LOG = [
  'JS-CORE BOOT v2.0',
  'PSU OK · 5V RAIL STABLE',
  'CLK 60FPS',
  'LOADING PORTFOLIO…',
];

// ── Voxel "JS" assembly (kept from v1, recoloured terracotta/ivory) ──
function LoaderScene() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const w = mount.clientWidth, h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0.4, 4.6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    mount.appendChild(renderer.domElement);

    const J = [[1,1,1,1,1],[0,0,0,1,1],[0,0,0,1,1],[0,0,0,1,1],[0,0,0,1,1],[1,0,0,1,1],[1,1,1,1,0]];
    const S = [[0,1,1,1,1],[1,1,0,0,0],[1,1,0,0,0],[0,1,1,1,0],[0,0,0,1,1],[0,0,0,1,1],[1,1,1,1,0]];
    const CELL = 0.22, CUBE = 0.18, LO = CELL / 2, LW = 5, LH = 7, GAP = 0.5;
    const totalW = LW * CELL * 2 + GAP, letterH = LH * CELL;
    const jX = -totalW / 2, sX = -totalW / 2 + LW * CELL + GAP;

    const group = new THREE.Group();
    scene.add(group);
    const cubes = [];

    const addLetter = (pat, offX, warmBias) => {
      for (let row = 0; row < pat.length; row++) {
        for (let col = 0; col < pat[row].length; col++) {
          if (!pat[row][col]) continue;
          const x = offX + col * CELL + CELL / 2;
          const y = letterH / 2 - row * CELL - CELL / 2;
          [LO, -LO].forEach((z) => {
            const target = new THREE.Vector3(x, y, z);
            const th = Math.random() * Math.PI * 2, ph = Math.acos(Math.random() * 2 - 1), r = 7 + Math.random() * 5;
            const start = new THREE.Vector3(Math.sin(ph) * Math.cos(th) * r, Math.cos(ph) * r, Math.sin(ph) * Math.sin(th) * r);
            const roll = Math.random();
            const color = roll < warmBias ? ACCENT : roll < warmBias + 0.15 ? BLUE : IVORY;
            const emissive = color === ACCENT ? 0xff3a1a : color === BLUE ? 0x244e8c : 0x2a2a26;
            const geo = new THREE.BoxGeometry(CUBE, CUBE, CUBE);
            const mat = new THREE.MeshStandardMaterial({ color, metalness: 0.7, roughness: 0.3, emissive, emissiveIntensity: 0.25, transparent: true, opacity: 0 });
            const cube = new THREE.Mesh(geo, mat);
            cube.position.copy(start);
            group.add(cube);
            const eg = new THREE.EdgesGeometry(geo);
            const lm = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
            cube.add(new THREE.LineSegments(eg, lm));
            const axis = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
            cubes.push({ mesh: cube, start, target, delay: Math.random() * 0.5, axis, geo, mat, eg, lm });
          });
        }
      }
    };
    addLetter(J, jX, 0.82);
    addLetter(S, sX, 0.7);

    const grid = new THREE.GridHelper(14, 28, ACCENT, BLUE);
    grid.material.transparent = true; grid.material.opacity = 0.14; grid.position.y = -1.9;
    scene.add(grid);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const l1 = new THREE.PointLight(ACCENT, 7, 16); l1.position.set(3, 3, 3); scene.add(l1);
    const l2 = new THREE.PointLight(BLUE, 4, 16); l2.position.set(-3, -2, 2); scene.add(l2);

    let frameId;
    const DUR = 1.6, t0 = performance.now();
    const animate = () => {
      const t = (performance.now() - t0) / 1000;
      const bt = Math.min(1, t / DUR);
      for (const c of cubes) {
        const local = Math.max(0, Math.min(1, (bt - c.delay) / 0.5));
        const e = 1 - Math.pow(1 - local, 3);
        c.mesh.position.lerpVectors(c.start, c.target, e);
        c.mat.opacity = e;
        c.mesh.children[0].material.opacity = e * 0.5;
        const sp = (1 - e) * 0.18 + 0.004;
        c.mesh.rotation.x += sp * c.axis.x; c.mesh.rotation.y += sp * c.axis.y; c.mesh.rotation.z += sp * c.axis.z;
      }
      group.rotation.y = Math.sin(t * 0.45) * 0.26;
      group.rotation.x = Math.sin(t * 0.3) * 0.05;
      grid.rotation.y = t * 0.06;
      camera.position.x = Math.sin(t * 0.25) * 0.08;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      if (!nw || !nh) return;
      camera.aspect = nw / nh; camera.updateProjectionMatrix();
      renderer.setSize(nw, nh, false);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      cubes.forEach((c) => { c.geo.dispose(); c.mat.dispose(); c.eg.dispose(); c.lm.dispose(); });
      grid.geometry.dispose();
      renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}

export default function LoadingGate({ children }) {
  const [phase, setPhase] = useState('init'); // init | running | done | gone
  const [pct, setPct] = useState(0);
  const [logIdx, setLogIdx] = useState(0);
  const [fly, setFly] = useState(null); // {x, y} — the dot that becomes the nav LED

  // POWER ON: a terracotta dot flies from the loader to the nav LED —
  // the boot BECOMES the LED; the trace is born.
  useEffect(() => {
    if (phase !== 'done') return;
    const led = document.getElementById('nav-led');
    const cx = window.innerWidth / 2, cy = window.innerHeight * 0.62;
    setFly({ x: cx, y: cy });
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => {
      if (led) {
        const r = led.getBoundingClientRect();
        setFly({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      } else {
        setFly({ x: cx, y: -20 });
      }
    }));
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // decide once, on mount: reduced-motion or repeat visit → skip entirely
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = sessionStorage.getItem('js-boot');
    if (reduced || seen) { setPhase('gone'); return; }
    sessionStorage.setItem('js-boot', '1');
    setPhase('running');
  }, []);

  useEffect(() => {
    if (phase !== 'running') return;
    document.body.style.overflow = 'hidden';

    let val = 0, cancelled = false, timer;
    const stalls = { 37: 220, 61: 200, 89: 240 };
    const finish = () => {
      setPhase('done');
      setTimeout(() => setPhase('gone'), 560);
    };
    const step = () => {
      if (cancelled) return;
      if (val >= 100) { setPct(100); setLogIdx(POST_LOG.length); finish(); return; }
      val = Math.min(100, val + 1 + Math.floor(Math.random() * 3));
      setPct(val);
      setLogIdx(Math.min(POST_LOG.length - 1, Math.floor((val / 100) * POST_LOG.length)));
      let delay = 16;
      for (const s in stalls) if (val >= +s && val < +s + 3) delay = stalls[s];
      timer = setTimeout(step, delay);
    };
    timer = setTimeout(step, 200);

    const hardCap = setTimeout(finish, 2400);
    const skip = () => { cancelled = true; setPct(100); setLogIdx(POST_LOG.length); finish(); };
    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);

    return () => {
      cancelled = true;
      clearTimeout(timer); clearTimeout(hardCap);
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 'done' || phase === 'gone') document.body.style.overflow = '';
    // boot handoff: the hero's word-assembly waits for this signal
    if (phase === 'gone') {
      window.__bootDone = true;
      window.dispatchEvent(new Event('js:boot-done'));
    }
  }, [phase]);

  const showLoader = phase === 'running' || phase === 'done';

  return (
    <>
      {children}
      {phase === 'done' && fly && (
        <span
          aria-hidden="true"
          style={{
            position: 'fixed', left: 0, top: 0, zIndex: 10001,
            width: 8, height: 8, borderRadius: '50%',
            background: '#ff6b3d', boxShadow: '0 0 14px #ff6b3d',
            transform: `translate(${fly.x - 4}px, ${fly.y - 4}px)`,
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}
        />
      )}
      {showLoader && (
        <div
          aria-busy="true"
          aria-live="polite"
          style={{
            position: 'fixed', inset: 0, zIndex: 9999, background: '#08080a',
            color: '#f5f1ea', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            opacity: phase === 'done' ? 0 : 1,
            pointerEvents: phase === 'done' ? 'none' : 'auto',
            transition: 'opacity 0.55s ease',
          }}
        >
          {/* ambient 3D behind the voxels */}
          <BackgroundScene />

          {/* glow */}
          <div style={{
            position: 'absolute', top: '20%', left: '50%', width: 520, height: 520,
            transform: 'translateX(-50%)', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,107,61,0.16) 0%, transparent 70%)',
            filter: 'blur(80px)', pointerEvents: 'none',
          }} />

          {/* corner ticks */}
          {['tl', 'tr', 'bl', 'br'].map((k) => (
            <span key={k} style={{
              position: 'absolute', width: 26, height: 26, pointerEvents: 'none',
              [k[0] === 't' ? 'top' : 'bottom']: 26,
              [k[1] === 'l' ? 'left' : 'right']: 26,
              [k[0] === 't' ? 'borderTop' : 'borderBottom']: '1px solid var(--accent)',
              [k[1] === 'l' ? 'borderLeft' : 'borderRight']: '1px solid var(--accent)',
              opacity: 0.6,
            }} />
          ))}

          {/* POST log — bottom left, mono */}
          <div style={{
            position: 'absolute', bottom: 40, left: 'max(28px, 5vw)',
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
            color: 'var(--text-dim)', lineHeight: 1.9,
          }}>
            {POST_LOG.slice(0, logIdx).map((l, i) => (
              <div key={i}><span style={{ color: 'var(--accent)' }}>›</span> {l} <span style={{ color: 'var(--success)' }}>OK</span></div>
            ))}
            {pct >= 100 && <div style={{ color: 'var(--accent)' }}>› POWER ON</div>}
          </div>

          {/* counter — bottom right */}
          <div style={{
            position: 'absolute', bottom: 40, right: 'max(28px, 5vw)',
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 40, color: 'var(--text)',
          }}>
            {String(pct).padStart(3, '0')}
          </div>

          {/* 3D voxels */}
          <div style={{ width: 'min(420px, 78vw)', height: 'min(420px, 78vw)', position: 'relative', zIndex: 2 }}>
            <LoaderScene />
          </div>

          {/* name */}
          <div style={{ textAlign: 'center', marginTop: 8, position: 'relative', zIndex: 2 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 10 }}>
              — WELCOME —
            </div>
            <div className="serif" style={{ fontStyle: 'italic', fontSize: 'clamp(34px,6vw,58px)', color: 'var(--accent)', lineHeight: 1 }}>
              Jaskirat Singh
            </div>
          </div>

          {/* progress hairline */}
          <div style={{ width: 'min(440px, 82vw)', marginTop: 26, position: 'relative', zIndex: 2 }}>
            <div style={{ height: 2, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #ff6b3d, #5b9eff)', boxShadow: '0 0 12px rgba(255,107,61,0.6)', transition: 'width 0.1s linear' }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
