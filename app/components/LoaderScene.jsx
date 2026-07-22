'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ACCENT = 0xff6b3d;
const BLUE = 0x5b9eff;
const IVORY = 0xf5f1ea;

// ── Voxel "JS" assembly (kept from v1, recoloured terracotta/ivory) ──
// Lives in its own chunk so three.js stays out of the initial bundle
// (LoadingGate dynamic-imports this with ssr: false).
export default function LoaderScene() {
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
      grid.material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);
  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
