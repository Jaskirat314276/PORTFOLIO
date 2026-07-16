'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { detectTier } from '../lib/useReducedMotion';

// Scroll fly-through: the camera travels down a z-corridor of code/science
// objects — </> tags, IC chips, atoms, data cubes, signal waves, molecules —
// plus starfield tiles. Anything falling behind the camera recycles ahead,
// star tiles leapfrog, and scroll velocity kicks the FOV + star size for a
// subtle streak. Mouse parallax preserved. Tier C keeps a gentle ambient
// drift (no travel); pauses on document.hidden; skipped for reduced motion.
export default function BackgroundScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tier = detectTier();
    const fly = tier !== 'C';
    const CAM_START = 18;
    const TRAVEL = tier === 'A' ? 140 : tier === 'B' ? 90 : 0;
    const AHEAD = fly ? 50 : 20;   // spawn window in front of the camera
    const BEHIND = fly ? 8 : 0;    // grace zone behind before recycling
    const CORRIDOR = AHEAD + BEHIND;
    const shapeCount = tier === 'A' ? 14 : tier === 'B' ? 8 : 4;
    const starsPerTile = tier === 'A' ? 750 : tier === 'B' ? 300 : 350;
    const dpr = tier === 'A' ? Math.min(window.devicePixelRatio, 1.5) : 1;

    const w = window.innerWidth, h = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 200);
    camera.position.z = CAM_START;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: tier !== 'C' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(dpr);
    mount.appendChild(renderer.domElement);

    // ── shared assets (every instance reuses these; disposed once) ──
    const ACCENT = 0xd97757, DIM = 0xa8593c, IVORY = 0xf0eee5;
    const geos = [], mats = [];
    const g = (geo) => { geos.push(geo); return geo; };
    const m = (mat) => { mats.push(mat); return mat; };
    const solid = (color, opacity) => m(new THREE.MeshStandardMaterial({
      color, metalness: 0.5, roughness: 0.45, flatShading: true, transparent: true, opacity,
    }));
    const basic = (color, opacity) => m(new THREE.MeshBasicMaterial({ color, transparent: true, opacity }));
    const line = (color, opacity) => m(new THREE.LineBasicMaterial({ color, transparent: true, opacity }));

    const accentMat = solid(ACCENT, 0.34);
    const blueMat = solid(DIM, 0.3);
    const ivoryMat = solid(IVORY, 0.26);
    const orbitMat = basic(IVORY, 0.22);
    const lineAccent = line(ACCENT, 0.45);
    const lineBlue = line(DIM, 0.5);
    const lineIvory = line(IVORY, 0.35);

    const barGeo = g(new THREE.BoxGeometry(0.95, 0.11, 0.11));
    const slashGeo = g(new THREE.BoxGeometry(1.5, 0.11, 0.11));
    const chipGeo = g(new THREE.BoxGeometry(1.35, 1.35, 0.16));
    const chipEdges = g(new THREE.EdgesGeometry(chipGeo));
    const dieGeo = g(new THREE.BoxGeometry(0.55, 0.55, 0.2));
    const pinGeo = g(new THREE.BoxGeometry(0.24, 0.055, 0.055));
    const nucleusGeo = g(new THREE.SphereGeometry(0.2, 12, 12));
    const orbitGeo = g(new THREE.TorusGeometry(0.85, 0.018, 6, 44));
    const cubeGeo = g(new THREE.BoxGeometry(1.45, 1.45, 1.45));
    const cubeEdges = g(new THREE.EdgesGeometry(cubeGeo));
    const coreGeo = g(new THREE.BoxGeometry(0.5, 0.5, 0.5));
    const nodeGeo = g(new THREE.SphereGeometry(0.15, 10, 10));

    const sinePts = [];
    for (let i = 0; i <= 40; i++) {
      const x = -1.3 + (i / 40) * 2.6;
      sinePts.push(new THREE.Vector3(x, Math.sin(x * 3.2) * 0.42, 0));
    }
    const sineGeo = g(new THREE.BufferGeometry().setFromPoints(sinePts));

    const molNodes = [
      new THREE.Vector3(0.7, 0.7, 0.7), new THREE.Vector3(-0.7, -0.7, 0.7),
      new THREE.Vector3(-0.7, 0.7, -0.7), new THREE.Vector3(0.7, -0.7, -0.7),
    ];
    const bondPts = [];
    for (let i = 0; i < molNodes.length; i++)
      for (let j = i + 1; j < molNodes.length; j++) bondPts.push(molNodes[i], molNodes[j]);
    const bondGeo = g(new THREE.BufferGeometry().setFromPoints(bondPts));

    // ── builders: one recognizable object each ──
    const buildCodeTag = () => {
      const grp = new THREE.Group();
      const mk = (geo, mat, rz, x, y) => {
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.z = rz; mesh.position.set(x, y, 0);
        grp.add(mesh);
      };
      mk(barGeo, accentMat, 0.7, -0.95, 0.3);   // <
      mk(barGeo, accentMat, -0.7, -0.95, -0.3);
      mk(barGeo, accentMat, -0.7, 0.95, 0.3);   // >
      mk(barGeo, accentMat, 0.7, 0.95, -0.3);
      mk(slashGeo, ivoryMat, 1.05, 0, 0);       // /
      return grp;
    };

    const buildChip = () => {
      const grp = new THREE.Group();
      grp.add(new THREE.Mesh(chipGeo, blueMat));
      grp.add(new THREE.LineSegments(chipEdges, lineIvory));
      const die = new THREE.Mesh(dieGeo, accentMat);
      die.position.z = 0.05;
      grp.add(die);
      for (let i = 0; i < 4; i++) {
        const y = -0.51 + i * 0.34;
        const pl = new THREE.Mesh(pinGeo, ivoryMat); pl.position.set(-0.8, y, 0); grp.add(pl);
        const pr = new THREE.Mesh(pinGeo, ivoryMat); pr.position.set(0.8, y, 0); grp.add(pr);
      }
      return grp;
    };

    const buildAtom = () => {
      const grp = new THREE.Group();
      grp.add(new THREE.Mesh(nucleusGeo, accentMat));
      const tilts = [[Math.PI / 2, 0], [Math.PI / 3, Math.PI / 3], [-Math.PI / 3, -Math.PI / 3]];
      tilts.forEach(([rx, ry]) => {
        const orbit = new THREE.Mesh(orbitGeo, orbitMat);
        orbit.rotation.x = rx; orbit.rotation.y = ry;
        grp.add(orbit);
      });
      return grp;
    };

    const buildDataCube = () => {
      const grp = new THREE.Group();
      grp.add(new THREE.LineSegments(cubeEdges, lineIvory));
      grp.add(new THREE.Mesh(coreGeo, accentMat));
      return grp;
    };

    const buildSignal = () => {
      const grp = new THREE.Group();
      grp.add(new THREE.Line(sineGeo, lineAccent));
      const phase = new THREE.Line(sineGeo, lineBlue);
      phase.scale.y = -1;
      grp.add(phase);
      return grp;
    };

    const buildMolecule = () => {
      const grp = new THREE.Group();
      molNodes.forEach((p, i) => {
        const node = new THREE.Mesh(nodeGeo, i % 2 === 0 ? accentMat : blueMat);
        node.position.copy(p);
        grp.add(node);
      });
      grp.add(new THREE.LineSegments(bondGeo, lineIvory));
      return grp;
    };

    const builders = [buildCodeTag, buildChip, buildAtom, buildDataCube, buildSignal, buildMolecule];

    // lateral donut spawn — never directly in the camera's path
    const lateral = (obj) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.5 + Math.random() * 8;
      obj.x = Math.cos(angle) * radius;
      obj.y = Math.sin(angle) * radius * 0.7;
    };

    const shapes = [];
    for (let i = 0; i < shapeCount; i++) {
      const group = builders[i % builders.length]();
      group.scale.setScalar(0.75 + Math.random() * 0.7);
      const pos = { x: 0, y: 0 };
      lateral(pos);
      group.position.set(pos.x, pos.y, CAM_START + BEHIND - ((i + Math.random()) / shapeCount) * CORRIDOR);
      group.rotation.set(Math.random() * 0.6 - 0.3, Math.random() * 0.6 - 0.3, Math.random() * 0.5 - 0.25);
      group.userData = {
        rotSpeed: { x: (Math.random() - 0.5) * 0.16, y: (Math.random() - 0.5) * 0.2, z: (Math.random() - 0.5) * 0.1 },
        floatSpeed: 0.3 + Math.random() * 0.5, floatAmp: 0.4 + Math.random() * 0.6,
        basePos: group.position.clone(),
      };
      scene.add(group);
      shapes.push(group);
    }

    // starfield as leapfrogging tiles (object-level recycling, no per-vertex work)
    const TILE_DEPTH = 70;
    const makeStarTile = () => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(starsPerTile * 3);
      const colors = new Float32Array(starsPerTile * 3);
      for (let i = 0; i < starsPerTile; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 80;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
        positions[i * 3 + 2] = (Math.random() - 0.5) * TILE_DEPTH;
        const tone = Math.random();
        if (tone < 0.6) { colors[i * 3] = 1; colors[i * 3 + 1] = 0.95; colors[i * 3 + 2] = 0.9; }
        else if (tone < 0.85) { colors[i * 3] = 1; colors[i * 3 + 1] = 0.55; colors[i * 3 + 2] = 0.3; }
        else { colors[i * 3] = 0.72; colors[i * 3 + 1] = 0.68; colors[i * 3 + 2] = 0.6; }
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      return g(geo);
    };
    const STAR_SIZE = 0.06;
    const starMat = m(new THREE.PointsMaterial({ size: STAR_SIZE, transparent: true, opacity: 0.7, vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    const starTiles = [];
    const tileCount = fly ? 2 : 1;
    for (let i = 0; i < tileCount; i++) {
      const tile = new THREE.Points(makeStarTile(), starMat);
      tile.position.z = CAM_START - 25 - i * TILE_DEPTH;
      scene.add(tile);
      starTiles.push(tile);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const keyLight = new THREE.PointLight(0xd97757, 4, 40); scene.add(keyLight);
    const fillLight = new THREE.PointLight(0xf0eee5, 2, 40); scene.add(fillLight);
    const rimLight = new THREE.PointLight(0xffffff, 1.5, 30); scene.add(rimLight);

    const parallax = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => { parallax.tx = (e.clientX / window.innerWidth - 0.5) * 2; parallax.ty = (e.clientY / window.innerHeight - 0.5) * 2; };

    // scroll → corridor progress; scrollMax cached (never read layout per frame)
    let scrollY = window.scrollY, scrollMax = 1;
    const measure = () => { scrollMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); };
    measure();
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    let frameId, t0, frames = 0;
    let camZ = CAM_START, fov = 60, streak = 0;
    const animate = (now) => {
      frameId = requestAnimationFrame(animate);
      if (document.hidden) return;
      if (t0 === undefined) t0 = now;
      const t = (now - t0) / 1000;
      if (++frames % 240 === 0) measure(); // content height can change after mount

      parallax.x += (parallax.tx - parallax.x) * 0.04;
      parallax.y += (parallax.ty - parallax.y) * 0.04;

      // the journey: camera glides toward its scroll-mapped depth
      const targetZ = CAM_START - (scrollY / scrollMax) * TRAVEL;
      const prevZ = camZ;
      camZ += (targetZ - camZ) * 0.07;
      const dz = prevZ - camZ; // >0 while diving deeper

      // velocity streak: FOV widens and stars fatten on fast scroll
      streak += (Math.min(1, Math.abs(dz) * 4) - streak) * 0.12;
      fov += (60 + streak * 11 - fov) * 0.1;
      camera.fov = fov;
      camera.updateProjectionMatrix();
      starMat.size = STAR_SIZE * (1 + streak * 1.3);

      shapes.forEach((grp, i) => {
        const u = grp.userData;
        grp.rotation.x += u.rotSpeed.x * 0.01;
        grp.rotation.y += u.rotSpeed.y * 0.01;
        grp.rotation.z += u.rotSpeed.z * 0.01;
        if (fly && u.basePos.z > camZ + BEHIND) {
          // fell behind the camera → respawn ahead at a fresh lateral spot
          u.basePos.z -= CORRIDOR;
          lateral(u.basePos);
        }
        grp.position.x = u.basePos.x + Math.sin(t * u.floatSpeed * 0.4 + i) * u.floatAmp;
        grp.position.y = u.basePos.y + Math.cos(t * u.floatSpeed * 0.5 + i * 0.7) * u.floatAmp * 0.8;
        grp.position.z = u.basePos.z;
      });
      starTiles.forEach((tile) => {
        tile.rotation.z = t * 0.008;
        if (fly && tile.position.z - TILE_DEPTH / 2 > camZ + 6) tile.position.z -= TILE_DEPTH * tileCount;
      });

      camera.position.x += (parallax.x * 1.8 - camera.position.x) * 0.05;
      camera.position.y += (-parallax.y * 1.2 - camera.position.y) * 0.05;
      camera.position.z = camZ;
      camera.lookAt(camera.position.x * 0.4, camera.position.y * 0.4, camZ - 14);

      // lights ride with the camera so the corridor stays lit all the way down
      keyLight.position.set(8, 6, camZ - 13);
      fillLight.position.set(-8, -4, camZ - 13);
      rimLight.position.set(0, 8, camZ - 26);

      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    const onResize = () => {
      const nw = window.innerWidth, nh = window.innerHeight;
      camera.aspect = nw / nh; camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      measure();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      geos.forEach((geo) => geo.dispose());
      mats.forEach((mat) => mat.dispose());
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}
