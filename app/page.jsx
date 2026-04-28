'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Github, Linkedin, Mail, ArrowUpRight, Download, Phone, MapPin,
  Code2, Database, Cloud, Cpu, Zap, Brain, Award, GraduationCap,
  Briefcase, Trophy, FolderGit2, Sparkles
} from 'lucide-react';

// ============================================================
// CUSTOM CURSOR — Dual-layer with magnetic hover detection
// ============================================================
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let isHovering = false;

    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`;
      requestAnimationFrame(animate);
    };
    animate();

    const handleEnter = () => {
      isHovering = true;
      ring.style.borderColor = '#ff6b3d';
      ring.style.background = 'rgba(255, 107, 61, 0.1)';
      dot.style.background = '#ff6b3d';
    };
    const handleLeave = () => {
      isHovering = false;
      ring.style.borderColor = 'rgba(245, 241, 234, 0.3)';
      ring.style.background = 'transparent';
      dot.style.background = '#f5f1ea';
    };

    window.addEventListener('mousemove', handleMove);
    document.querySelectorAll('a, button, .hover-target').forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: '8px', height: '8px',
          borderRadius: '50%', background: '#f5f1ea', pointerEvents: 'none',
          zIndex: 9999, mixBlendMode: 'difference', transition: 'background 0.2s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, width: '36px', height: '36px',
          borderRadius: '50%', border: '1px solid rgba(245,241,234,0.3)',
          pointerEvents: 'none', zIndex: 9998,
          transition: 'background 0.3s, border-color 0.3s, scale 0.3s',
        }}
      />
    </>
  );
};

// ============================================================
// 3D BACKGROUND — Full-viewport ambient scene with drifting
// low-poly shapes, wireframe rings, and a starfield. Sits
// behind all content via `pointerEvents: none`.
// ============================================================
const BackgroundScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 200);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Drifting low-poly shapes
    const shapes = [];
    const shapeDefs = [
      { geo: new THREE.OctahedronGeometry(1.1, 0), color: 0xff6b3d, edgeColor: 0xffb89a },
      { geo: new THREE.TetrahedronGeometry(1.3, 0), color: 0x5b9eff, edgeColor: 0xb8d4ff },
      { geo: new THREE.IcosahedronGeometry(1.0, 0), color: 0xff6b3d, edgeColor: 0xffffff },
      { geo: new THREE.DodecahedronGeometry(1.0, 0), color: 0x5b9eff, edgeColor: 0xffffff },
      { geo: new THREE.OctahedronGeometry(0.9, 0), color: 0xff6b3d, edgeColor: 0xffb89a },
      { geo: new THREE.TetrahedronGeometry(1.5, 0), color: 0x5b9eff, edgeColor: 0xb8d4ff },
      { geo: new THREE.IcosahedronGeometry(1.2, 0), color: 0xffffff, edgeColor: 0xff6b3d },
      { geo: new THREE.DodecahedronGeometry(0.8, 0), color: 0xff6b3d, edgeColor: 0xffffff },
    ];

    shapeDefs.forEach((def, i) => {
      const mat = new THREE.MeshStandardMaterial({
        color: def.color, metalness: 0.6, roughness: 0.4,
        flatShading: true, transparent: true, opacity: 0.18,
      });
      const mesh = new THREE.Mesh(def.geo, mat);

      const edges = new THREE.EdgesGeometry(def.geo);
      const lineMat = new THREE.LineBasicMaterial({
        color: def.edgeColor, transparent: true, opacity: 0.35,
      });
      const wire = new THREE.LineSegments(edges, lineMat);

      const group = new THREE.Group();
      group.add(mesh); group.add(wire);

      // Spread shapes across the viewport in a wide volume
      const angle = (i / shapeDefs.length) * Math.PI * 2;
      const radius = 7 + Math.random() * 5;
      group.position.x = Math.cos(angle) * radius;
      group.position.y = Math.sin(angle) * radius * 0.6 + (Math.random() - 0.5) * 4;
      group.position.z = (Math.random() - 0.5) * 8;

      group.userData = {
        rotSpeed: { x: (Math.random() - 0.5) * 0.3, y: (Math.random() - 0.5) * 0.3, z: (Math.random() - 0.5) * 0.2 },
        floatSpeed: 0.3 + Math.random() * 0.5,
        floatAmp: 0.4 + Math.random() * 0.6,
        basePos: group.position.clone(),
        edges, lineMat, mat,
      };

      scene.add(group);
      shapes.push(group);
    });

    // Wireframe torus rings, slowly tumbling
    const rings = [];
    for (let i = 0; i < 3; i++) {
      const torusGeo = new THREE.TorusGeometry(4 + i * 2, 0.02, 8, 80);
      const torusMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xff6b3d : 0x5b9eff,
        transparent: true, opacity: 0.15,
      });
      const torus = new THREE.Mesh(torusGeo, torusMat);
      torus.rotation.x = Math.random() * Math.PI;
      torus.rotation.y = Math.random() * Math.PI;
      torus.position.z = -3 - i * 2;
      torus.userData = {
        rotSpeed: { x: (Math.random() - 0.5) * 0.15, y: (Math.random() - 0.5) * 0.15 },
        torusGeo, torusMat,
      };
      scene.add(torus);
      rings.push(torus);
    }

    // Starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1500;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3]     = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
      const tone = Math.random();
      if (tone < 0.6) {
        starColors[i * 3] = 1; starColors[i * 3 + 1] = 0.95; starColors[i * 3 + 2] = 0.9;
      } else if (tone < 0.85) {
        starColors[i * 3] = 1; starColors[i * 3 + 1] = 0.55; starColors[i * 3 + 2] = 0.3;
      } else {
        starColors[i * 3] = 0.4; starColors[i * 3 + 1] = 0.65; starColors[i * 3 + 2] = 1;
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.06, transparent: true, opacity: 0.7,
      vertexColors: true, blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const keyLight = new THREE.PointLight(0xff6b3d, 4, 40);
    keyLight.position.set(8, 6, 5);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x5b9eff, 3, 40);
    fillLight.position.set(-8, -4, 5);
    scene.add(fillLight);
    const rimLight = new THREE.PointLight(0xffffff, 1.5, 30);
    rimLight.position.set(0, 8, -8);
    scene.add(rimLight);

    // Mouse + scroll parallax
    const parallax = { x: 0, y: 0, tx: 0, ty: 0, scrollY: 0 };
    const onMove = (e) => {
      parallax.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      parallax.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => { parallax.scrollY = window.scrollY; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      parallax.x += (parallax.tx - parallax.x) * 0.04;
      parallax.y += (parallax.ty - parallax.y) * 0.04;

      // Shapes: spin + gentle vertical bob + horizontal drift
      shapes.forEach((g, i) => {
        const u = g.userData;
        g.rotation.x += u.rotSpeed.x * 0.01;
        g.rotation.y += u.rotSpeed.y * 0.01;
        g.rotation.z += u.rotSpeed.z * 0.01;
        g.position.x = u.basePos.x + Math.sin(t * u.floatSpeed * 0.4 + i) * u.floatAmp;
        g.position.y = u.basePos.y + Math.cos(t * u.floatSpeed * 0.5 + i * 0.7) * u.floatAmp * 0.8;
      });

      // Tumbling rings
      rings.forEach((r) => {
        r.rotation.x += r.userData.rotSpeed.x * 0.01;
        r.rotation.y += r.userData.rotSpeed.y * 0.01;
      });

      // Slow starfield drift
      stars.rotation.y = t * 0.01;
      stars.rotation.x = t * 0.005;

      // Camera parallax — mouse + slight scroll-driven dolly
      camera.position.x += (parallax.x * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (-parallax.y * 1.0 - parallax.scrollY * 0.0015 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      shapes.forEach((g) => {
        g.userData.edges.dispose();
        g.userData.lineMat.dispose();
        g.userData.mat.dispose();
      });
      shapeDefs.forEach((d) => d.geo.dispose());
      rings.forEach((r) => { r.userData.torusGeo.dispose(); r.userData.torusMat.dispose(); });
      starGeo.dispose(); starMat.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 0,
        pointerEvents: 'none',
      }}
    />
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
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      mount.removeEventListener('mousemove', onMove);
      mount.removeChild(renderer.domElement);
      icoGeo.dispose(); icoMat.dispose(); edges.dispose(); lineMat.dispose();
      outerGeo.dispose(); outerEdges.dispose(); outerMat.dispose();
      pGeo.dispose(); pMat.dispose(); renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

// ============================================================
// MAGNETIC BUTTON — Pulls toward cursor on hover
// ============================================================
const Magnetic = ({ children, strength = 0.4 }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPos({ x, y });
  };
  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        display: 'inline-block',
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      {children}
    </div>
  );
};

// ============================================================
// TILT CARD with depth and glow
// ============================================================
const TiltCard = ({ children, intensity = 12 }) => {
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setT({
      rx: (y - 0.5) * -intensity,
      ry: (x - 0.5) * intensity,
      gx: x * 100,
      gy: y * 100,
    });
  };
  const handleLeave = () => setT({ rx: 0, ry: 0, gx: 50, gy: 50 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(1000px) rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(0)`,
        transition: 'transform 0.2s ease-out',
        transformStyle: 'preserve-3d',
        position: 'relative',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit',
          background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(255,107,61,0.15) 0%, transparent 50%)`,
          opacity: t.rx === 0 && t.ry === 0 ? 0 : 1,
          transition: 'opacity 0.3s', pointerEvents: 'none', zIndex: 2,
        }}
      />
      {children}
    </div>
  );
};

// ============================================================
// REVEAL — Scroll-triggered fade up
// ============================================================
const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold: 0.1 });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    }}>{children}</div>
  );
};

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
      items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Statsmodels (SARIMA)', 'LangChain', 'RAG', 'OpenAI', 'LLaMA 3.2'],
    },
    {
      cat: 'Databases', icon: <Database size={22} />, color: '#10b981',
      items: ['MySQL', 'SQL', 'Prisma ORM', 'Supabase', 'VectorDB'],
    },
    {
      cat: 'Cloud & DevOps', icon: <Cloud size={22} />, color: '#06b6d4',
      items: ['Docker', 'Prometheus', 'Terraform', 'Power BI', 'DAX'],
    },
    {
      cat: 'CS Fundamentals', icon: <Sparkles size={22} />, color: '#f59e0b',
      items: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
    },
    {
      cat: 'Core Electrical', icon: <Zap size={22} />, color: '#eab308',
      items: ['MATLAB / Simulink', 'Eagle PCB Design', 'Arduino', 'Power Electronics', 'SMPS Design', 'PFC Systems', 'IoT'],
    },
  ];

  const projects = [
    {
      num: '01',
      title: 'Warehouse Optimizer — AI Inventory & Fulfillment Platform',
      date: '2026',
      desc: 'AI-powered platform that turns warehouse photos into structured stock data in seconds. A YOLOv8 + EasyOCR + Claude pipeline auto-extracts SKUs from shipment images and updates inventory in real time, paired with order management, ARIMA-based demand forecasting, smart shipment suggestions, a live WebSocket dashboard, and one-click Excel reporting. End-to-end image-to-inventory in under 30 seconds, 25+ documented REST endpoints, and zero-config deployment via `make up`.',
      tags: ['FastAPI', 'PostgreSQL', 'Redis', 'YOLOv8', 'EasyOCR', 'Claude', 'ARIMA', 'React 18', 'WebSockets', 'Docker'],
    },
    {
      num: '02',
      title: 'Smart School ERP System',
      date: 'Dec 2024',
      desc: 'Full-stack multi-role ERP platform supporting students, parents, faculty, and administrators with RBAC for secure, isolated data access. Containerized with Docker for production-grade deployment.',
      tags: ['React.js', 'Prisma', 'Supabase', 'ClerkAuth', 'Docker'],
    },
    {
      num: '03',
      title: 'AI LinkedIn Post Generator',
      date: 'Jul 2025',
      desc: 'AI-powered content tool that generates context-aware LinkedIn posts by analyzing influencers\' historical content. Built a RAG pipeline to preserve unique writing styles using LLaMA 3.2.',
      tags: ['LangChain', 'RAG', 'VectorDB', 'Streamlit', 'LLaMA 3.2'],
    },
    {
      num: '04',
      title: 'FutureFlow — Demand Forecast System',
      date: 'Dec 2024',
      desc: 'Time-series demand forecasting platform using SARIMA modeling. Built Power BI dashboard with KPIs (MoM Growth, YoY Growth, Forecast Error) and DAX measures for real-time monitoring.',
      tags: ['Python', 'SQL', 'statsmodels', 'Power BI', 'DAX'],
    },
    {
      num: '05',
      title: 'Universal EV Battery Charger',
      date: 'Dec 2024',
      desc: 'Designed a forward converter-based battery charger PCB using Eagle CAD. Conducted high-voltage testing up to 300V with full protection circuit for system safety and reliability.',
      tags: ['Eagle CAD', 'SMPS', 'High-Voltage Testing', 'PCB Design'],
    },
    {
      num: '06',
      title: 'Power Factor Correction Device',
      date: 'May 2025',
      desc: 'Simulated a PFC system using a boost converter topology with ICE3PCS01G IC controller. Achieved improved power factor and reduced THD, validating energy efficiency gains.',
      tags: ['MATLAB', 'Simulink', 'Boost Converter', 'Power Electronics'],
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
    { title: 'EBAJA SAEINDIA 2025', org: 'Team Aveon Racing — Powertrain Lead', icon: <Zap size={22} /> },
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
        body { cursor: none !important; }
        a, button { cursor: none !important; }
        a { color: inherit; text-decoration: none; }
        .glow { text-shadow: 0 0 60px rgba(255, 107, 61, 0.4); }
      `}</style>

      <CustomCursor />

      {/* 3D ambient background */}
      <BackgroundScene />

      {/* Ambient gradient orbs */}
      <div style={{
        position: 'fixed', top: '10%', left: '-15%', width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,61,0.15) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
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

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>

        {/* NAV */}
        <nav style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '32px 0', position: 'sticky', top: 0,
          background: 'rgba(8,8,10,0.7)', backdropFilter: 'blur(20px)',
          zIndex: 100, borderBottom: '1px solid rgba(245,241,234,0.06)',
        }}>
          <div style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.02em' }}>
            JS<span style={{ color: '#ff6b3d' }}>.</span>
          </div>
          <div style={{ display: 'flex', gap: '32px', fontSize: '14px', color: 'rgba(245,241,234,0.7)' }}>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <Magnetic>
            <a href="mailto:jaskiratsingh314276@gmail.com" style={{
              padding: '10px 22px', background: '#ff6b3d', color: '#08080a',
              borderRadius: '999px', fontSize: '14px', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              Hire me <ArrowUpRight size={14} />
            </a>
          </Magnetic>
        </nav>

        {/* HERO */}
        <section style={{
          display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px',
          alignItems: 'center', padding: '80px 0 120px', minHeight: '90vh',
        }}>
          <div>
            <Reveal>
              <div style={{
                fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#ff6b3d', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ width: '32px', height: '1px', background: '#ff6b3d' }} />
                Available for full-time roles · 2026
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 style={{
                fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 0.95,
                letterSpacing: '-0.03em', fontWeight: 500, marginBottom: '32px',
              }}>
                Hi, I'm<br />
                <span className="glow" style={{
                  fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#ff6b3d',
                }}>Jaskirat</span><br />
                — I build things.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{
                fontSize: '18px', color: 'rgba(245,241,234,0.7)',
                maxWidth: '520px', marginBottom: '40px', lineHeight: 1.6,
              }}>
                Final-year B.Tech student in Electrical & Electronics Engineering at BIT Mesra, with hands-on experience as a Software Developer Intern. I work across full-stack web, AI/ML, and power electronics.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Magnetic>
                  <a href="#projects" style={{
                    padding: '14px 28px', background: '#f5f1ea', color: '#08080a',
                    borderRadius: '999px', fontSize: '14px', fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                    See my work <ArrowUpRight size={16} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="/resume.pdf" download style={{
                    padding: '14px 28px', border: '1px solid rgba(245,241,234,0.2)',
                    borderRadius: '999px', fontSize: '14px', fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}>
                    <Download size={14} /> Download Resume
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>
          <div style={{ height: '550px', width: '100%' }}>
            <HeroScene />
          </div>
        </section>

        {/* ABOUT + STATS */}
        <section id="about" style={{ padding: '120px 0', borderTop: '1px solid rgba(245,241,234,0.08)' }}>
          <Reveal>
            <div style={{
              fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#ff6b3d', marginBottom: '24px',
            }}>— About me</div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', marginBottom: '80px' }}>
            <Reveal delay={0.1}>
              <h2 style={{
                fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05,
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <TiltCard intensity={8}>
                  <div className="hover-target" style={{
                    padding: '32px', height: '100%',
                    background: 'linear-gradient(135deg, rgba(245,241,234,0.04) 0%, rgba(245,241,234,0.01) 100%)',
                    border: '1px solid rgba(245,241,234,0.08)', borderRadius: '20px',
                    backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ color: '#ff6b3d', marginBottom: '20px' }}>{s.icon}</div>
                    <div style={{
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
        <section id="skills" style={{ padding: '120px 0', borderTop: '1px solid rgba(245,241,234,0.08)' }}>
          <Reveal>
            <div style={{
              fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#ff6b3d', marginBottom: '24px',
            }}>— Skills & Tools</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05,
              letterSpacing: '-0.02em', fontWeight: 500, marginBottom: '60px',
            }}>
              The <span style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#ff6b3d',
              }}>toolkit</span> I work with.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {skills.map((s, i) => (
              <Reveal key={s.cat} delay={i * 0.05}>
                <TiltCard>
                  <div className="hover-target" style={{
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
        <section id="experience" style={{ padding: '120px 0', borderTop: '1px solid rgba(245,241,234,0.08)' }}>
          <Reveal>
            <div style={{
              fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#ff6b3d', marginBottom: '24px',
            }}>— Experience</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05,
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
                  <div className="hover-target" style={{
                    padding: '40px',
                    background: 'linear-gradient(135deg, rgba(245,241,234,0.04) 0%, rgba(245,241,234,0.01) 100%)',
                    border: '1px solid rgba(245,241,234,0.08)', borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                  }}>
                    <div style={{
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
        <section id="projects" style={{ padding: '120px 0', borderTop: '1px solid rgba(245,241,234,0.08)' }}>
          <Reveal>
            <div style={{
              fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#ff6b3d', marginBottom: '24px',
            }}>— Selected work</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05,
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
                  <a href="#" className="hover-target" style={{
                    display: 'grid', gridTemplateColumns: '80px 1fr auto',
                    gap: '32px', alignItems: 'center', padding: '40px',
                    background: 'linear-gradient(135deg, rgba(245,241,234,0.04) 0%, rgba(245,241,234,0.01) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(245,241,234,0.08)', borderRadius: '20px',
                  }}>
                    <div style={{
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
                    <ArrowUpRight size={28} style={{ color: '#ff6b3d' }} />
                  </a>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section style={{ padding: '120px 0', borderTop: '1px solid rgba(245,241,234,0.08)' }}>
          <Reveal>
            <div style={{
              fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#ff6b3d', marginBottom: '24px',
            }}>— Achievements</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05,
              letterSpacing: '-0.02em', fontWeight: 500, marginBottom: '60px',
            }}>
              Wins & <span style={{
                fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#ff6b3d',
              }}>recognition</span>.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {achievements.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06}>
                <TiltCard intensity={8}>
                  <div className="hover-target" style={{
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
        <section style={{ padding: '120px 0', borderTop: '1px solid rgba(245,241,234,0.08)' }}>
          <Reveal>
            <div style={{
              fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#ff6b3d', marginBottom: '24px',
            }}>— Education</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05,
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
                  <div className="hover-target" style={{
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
                    <span style={{
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
        <section id="contact" style={{ padding: '140px 0 80px', borderTop: '1px solid rgba(245,241,234,0.08)' }}>
          <Reveal>
            <div style={{
              fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#ff6b3d', marginBottom: '24px',
            }}>— Get in touch</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="glow" style={{
              fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.95,
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
              <a href="mailto:jaskiratsingh314276@gmail.com" style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(24px, 3.5vw, 40px)', color: '#f5f1ea',
                borderBottom: '1px solid rgba(245,241,234,0.2)', paddingBottom: '8px',
                display: 'inline-block', marginBottom: '48px',
              }}>jaskiratsingh314276@gmail.com →</a>
            </Magnetic>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
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
        <footer style={{
          padding: '32px 0', borderTop: '1px solid rgba(245,241,234,0.08)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
          color: 'rgba(245,241,234,0.4)', fontSize: '13px',
        }}>
          <div>© 2026 Jaskirat Singh</div>
          <div>Crafted with care · Ranchi, India</div>
        </footer>
      </div>
    </div>
  );
}
