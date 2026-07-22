'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Hero icosahedron with edges, orbital rings, counter-rotating core and a
// particle galaxy — orange primary + blue secondary. Pauses offscreen and
// on document.hidden; DPR clamped.
export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const w = mount.clientWidth, h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    mount.appendChild(renderer.domElement);

    // Main icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.5, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0xff6b3d, metalness: 0.7, roughness: 0.2, flatShading: true, transparent: true, opacity: 0.85,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    // Edge wireframe
    const edges = new THREE.EdgesGeometry(icoGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    scene.add(wireframe);

    // Outer wireframe sphere (blue)
    const outerGeo = new THREE.IcosahedronGeometry(2.5, 1);
    const outerEdges = new THREE.EdgesGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({ color: 0x5b9eff, transparent: true, opacity: 0.2 });
    const outerWire = new THREE.LineSegments(outerEdges, outerMat);
    scene.add(outerWire);

    // Tilted orbital rings
    const ringGeo = new THREE.TorusGeometry(2.1, 0.012, 16, 140);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xff6b3d, transparent: true, opacity: 0.55 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI * 0.42;
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(2.1, 0.009, 16, 140);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x5b9eff, transparent: true, opacity: 0.35 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI * 0.42;
    ring2.rotation.y = Math.PI * 0.5;
    scene.add(ring2);

    // Inner counter-rotating core
    const coreGeo = new THREE.OctahedronGeometry(0.55, 0);
    const coreEdges = new THREE.EdgesGeometry(coreGeo);
    const coreMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 });
    const core = new THREE.LineSegments(coreEdges, coreMat);
    scene.add(core);

    // Particle galaxy — orange↔blue ramp
    const pGeo = new THREE.BufferGeometry();
    const pCount = 800;
    const positions = new Float32Array(pCount * 3);
    const colors = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 3 + Math.random() * 4, theta = Math.random() * Math.PI * 2, phi = Math.acos(Math.random() * 2 - 1);
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
    const pMat = new THREE.PointsMaterial({ size: 0.03, transparent: true, opacity: 0.7, vertexColors: true, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const l1 = new THREE.PointLight(0xff6b3d, 5, 15); l1.position.set(3, 3, 3); scene.add(l1);
    const l2 = new THREE.PointLight(0x5b9eff, 3, 15); l2.position.set(-3, -2, 2); scene.add(l2);
    const l3 = new THREE.PointLight(0xffffff, 1.5, 15); l3.position.set(0, 4, -3); scene.add(l3);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener('mousemove', onMove);

    let frameId, visible = true;
    const clock = new THREE.Clock();
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!visible || document.hidden) return;
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

      ring.rotation.z = t * 0.3;
      ring2.rotation.z = -t * 0.25;

      core.rotation.x = -t * 0.5;
      core.rotation.y = -t * 0.4;
      const cs = 1 + Math.sin(t * 2) * 0.1;
      core.scale.setScalar(cs);

      const s = 1 + Math.sin(t * 1.5) * 0.03;
      ico.scale.setScalar(s);
      wireframe.scale.setScalar(s);

      renderer.render(scene, camera);
    };
    animate();

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.01 });
    io.observe(mount);

    const onResize = () => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      if (!nw || !nh) return;
      camera.aspect = nw / nh; camera.updateProjectionMatrix();
      renderer.setSize(nw, nh, false);
    };
    window.addEventListener('resize', onResize);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;
    if (ro) ro.observe(mount);

    return () => {
      cancelAnimationFrame(frameId);
      io.disconnect();
      window.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
      mount.removeEventListener('mousemove', onMove);
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      icoGeo.dispose(); icoMat.dispose(); edges.dispose(); lineMat.dispose();
      outerGeo.dispose(); outerEdges.dispose(); outerMat.dispose();
      ringGeo.dispose(); ringMat.dispose(); ring2Geo.dispose(); ring2Mat.dispose();
      coreGeo.dispose(); coreEdges.dispose(); coreMat.dispose();
      pGeo.dispose(); pMat.dispose(); renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
