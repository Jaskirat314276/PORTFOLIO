'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BackgroundScene() {
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

      shapes.forEach((g, i) => {
        const u = g.userData;
        g.rotation.x += u.rotSpeed.x * 0.01;
        g.rotation.y += u.rotSpeed.y * 0.01;
        g.rotation.z += u.rotSpeed.z * 0.01;
        g.position.x = u.basePos.x + Math.sin(t * u.floatSpeed * 0.4 + i) * u.floatAmp;
        g.position.y = u.basePos.y + Math.cos(t * u.floatSpeed * 0.5 + i * 0.7) * u.floatAmp * 0.8;
      });

      rings.forEach((r) => {
        r.rotation.x += r.userData.rotSpeed.x * 0.01;
        r.rotation.y += r.userData.rotSpeed.y * 0.01;
      });

      stars.rotation.y = t * 0.01;
      stars.rotation.x = t * 0.005;

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
}
