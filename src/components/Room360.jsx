import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

// A lightweight, complete room model: the camera looks around from inside it.
// Geometry is rendered on interaction, never in an idle animation loop.
function createRoom(scene, room) {
  const materials = new Map();
  const material = color => {
    if (!materials.has(color)) materials.set(color, new THREE.MeshStandardMaterial({ color, roughness: .87 }));
    return materials.get(color);
  };
  function mesh(geometry, color, position, rotation) {
    const object = new THREE.Mesh(geometry, material(color));
    object.position.set(...position);
    if (rotation) object.rotation.set(...rotation);
    object.castShadow = true;
    object.receiveShadow = true;
    scene.add(object);
    return object;
  }
  const box = (size, color, at, radius = 0) => mesh(radius ? new RoundedBoxGeometry(...size, 2, radius) : new THREE.BoxGeometry(...size), color, at);
  const cylinder = (top, bottom, height, color, at) => mesh(new THREE.CylinderGeometry(top, bottom, height, 24), color, at);
  const sphere = (radius, color, at, scale) => { const object = mesh(new THREE.SphereGeometry(radius, 14, 10), color, at); if (scale) object.scale.set(...scale); return object; };
  const cream = '#f1e6d7', mint = '#a8bdb0', wood = '#b99a75', dark = '#22494a';
  box([8, .1, 7], '#d3b992', [0, -.06, 0]);
  for (let i = -9; i <= 9; i++) box([.015, .006, 7], '#bda17d', [i * .42, .002, 0]);
  box([8, .1, 7], '#f5eee3', [0, 3.35, 0]);
  box([8, 3.4, .1], cream, [0, 1.65, -3.5]);
  box([8, 3.4, .1], '#e6dac7', [0, 1.65, 3.5]);
  box([.1, 3.4, 7], '#efe5d6', [-4, 1.65, 0]);
  box([.1, 3.4, 7], '#ece5d9', [4, 1.65, 0]);
  for (const z of [-3.43, 3.43]) box([8, .15, .06], '#fff7eb', [0, .075, z]);
  for (const x of [-3.93, 3.93]) box([.06, .15, 7], '#fff7eb', [x, .075, 0]);

  // Window, curtains and soft light patches echo the original room illustration.
  box([.06, 1.9, 2.5], '#d6eeea', [-3.92, 1.85, -.65]);
  for (const z of [-1.94, -.65, .64]) box([.12, 2.05, .08], '#fff9ee', [-3.84, 1.85, z]);
  for (const y of [.86, 1.85, 2.84]) box([.12, .08, 2.65], '#fff9ee', [-3.84, y, -.65]);
  for (const z of [-2.22, .94]) box([.23, 2.7, .36], '#e4d5bf', [-3.7, 1.52, z], .07);
  box([1.1, .012, 2.1], '#e9d2a6', [-2.7, .01, -.4]);

  function plant(x, z, size = 1) {
    cylinder(.25 * size, .19 * size, .4 * size, '#e1c7a7', [x, .2 * size, z]);
    cylinder(.035, .045, 1.05 * size, '#817354', [x, .83 * size, z]);
    for (let i = 0; i < 7; i++) {
      const angle = i * 2.4;
      const leaf = sphere(.23 * size, i % 2 ? '#7a9775' : '#587d62', [x + Math.cos(angle) * .25 * size, (.7 + i * .1) * size, z + Math.sin(angle) * .25 * size], [1, .45, 1.6]);
      leaf.rotation.z = Math.cos(angle) * .5;
    }
  }
  function art(x, y, z, color, rotate = false) {
    const frame = box([1.05, 1.35, .09], wood, [x, y, z]);
    const picture = box([.92, 1.22, .03], '#f9f2e7', [x, y, z + .06]);
    const accent = box([.54, .75, .02], color, [x, y, z + .09], .1);
    if (rotate) { frame.rotation.y = Math.PI; picture.position.z = z - .06; accent.position.z = z - .09; }
  }
  plant(-3.1, -2.7, 1.1);
  plant(3.15, 2.5, .9);
  art(0, 2.35, -3.4, '#d9bb8f');
  art(-1.45, 2.35, -3.4, '#a2b7a0');

  if (room === 'kitchen') {
    for (let i = -2; i <= 2; i++) {
      box([.94, .85, .7], '#dca57b', [i, .46, -3.05], .035);
      box([.97, .07, .8], '#f5e5ce', [i, .92, -3.02]);
      box([.24, .03, .04], '#7b735f', [i, .78, -2.68]);
    }
    box([2.3, .9, 1.15], '#e1ceb2', [0, .46, -.8], .05);
    box([2.45, .09, 1.3], '#f7ebd7', [0, .96, -.8], .04);
    cylinder(.28, .28, .06, dark, [-1.9, .99, -3]);
    cylinder(.2, .2, .06, dark, [-1.2, .99, -3]);
    for (const x of [-.75, .75]) {
      cylinder(.27, .27, .09, wood, [x, .6, .5]);
      for (const side of [-.16, .16]) box([.055, .56, .055], dark, [x + side, .28, .5]);
    }
    plant(1.8, -2.9, .4);
    box([1.1, 1.95, .82], '#f0e9dd', [3.2, 1, -2.8], .08);
    box([.06, .6, .07], '#b0b5a6', [2.83, 1.4, -2.36]);
  } else if (room === 'entrance') {
    box([1.6, 2.65, .12], '#b9956e', [0, 1.33, -3.38], .03);
    box([1.4, 2.4, .04], '#caaa84', [0, 1.34, -3.3], .02);
    cylinder(.055, .055, .12, dark, [.5, 1.2, -3.2]).rotation.x = Math.PI / 2;
    box([2, .08, .65], wood, [2.6, .9, -2.7], .03);
    for (const x of [1.8, 3.4]) box([.06, .85, .5], dark, [x, .44, -2.7]);
    box([1.65, .12, .7], mint, [-2.4, .49, -2.5], .06);
    for (const x of [-3, -1.8]) box([.08, .46, .55], wood, [x, .23, -2.5]);
    box([1.9, .012, 3.4], '#bcc9b7', [0, .015, -.9], .05);
    plant(2.6, -2.7, .35);
    art(2.6, 2, -3.4, '#bdc8b7');
  } else if (room === 'bedroom') {
    box([2.5, .4, 2.7], '#c9b18e', [0, .27, -1.5], .08);
    box([2.4, .25, 2.6], '#f8f2e7', [0, .59, -1.5], .1);
    box([2.43, .1, 1.65], mint, [0, .77, -1.06], .04);
    box([2.65, 1.25, .2], '#d7c5ac', [0, .75, -2.9], .08);
    for (const x of [-.62, .62]) box([.9, .18, .56], '#fff7eb', [x, .83, -2.38], .09);
  } else {
    const sofa = '#8eafa0';
    box([2.9, .37, 1.08], sofa, [0, .45, -2.45], .13);
    box([2.9, .87, .27], sofa, [0, .9, -2.93], .1);
    for (const x of [-1.42, 1.42]) box([.26, .63, 1.14], sofa, [x, .66, -2.45], .1);
    for (const x of [-.72, .72]) box([1.3, .16, .88], '#b2c9ba', [x, .72, -2.39], .07);
    for (const x of [-1.12, 1.12]) for (const z of [-2.8, -2.05]) cylinder(.055, .04, .3, wood, [x, .15, z]);
    const cushion = box([.64, .64, .18], '#eee1c9', [.84, 1.05, -2.7], .11); cushion.rotation.z = -.15; cushion.rotation.x = -.15;
    box([3.8, .014, 2.85], '#abbdb0', [0, .02, -.9], .1);
    cylinder(.92, .92, .1, '#e7d3b2', [0, .52, -.8]);
    for (const x of [-.52, .52]) cylinder(.1, .1, .46, '#cbb494', [x, .24, -.8]);
    box([.4, .055, .3], '#9daa99', [-.34, .61, -.8]);
    box([.35, .05, .29], '#f1e6ce', [-.3, .66, -.8]);
    cylinder(.19, .12, .09, '#b6a17c', [.3, .62, -.8]);
    sphere(.08, '#9cab62', [.28, .71, -.8]);
    box([.85, .24, .85], '#b3c4b7', [2.75, .46, -.5], .12);
    box([.85, .7, .22], '#b3c4b7', [2.75, .82, -.87], .09);
    for (const x of [2.4, 3.1]) box([.15, .35, .85], '#b3c4b7', [x, .7, -.5], .05);
    cylinder(.29, .32, .06, '#ae925a', [2.2, .04, -2.8]);
    cylinder(.025, .025, 1.9, '#ae925a', [2.2, 1, -2.8]);
    cylinder(.16, .4, .28, '#ddbf7b', [2.2, 2, -2.8]);
  }
  // Furnish the reverse view so all 360 degrees have meaningful depth and detail.
  box([2.7, .65, .5], '#bdac8e', [-.9, .39, 3.12], .045);
  box([2.8, .065, .58], '#eadac0', [-.9, .75, 3.08], .02);
  art(-.9, 2.0, 3.38, '#9bad9a', true);
  cylinder(.14, .12, .35, '#e1c7aa', [-1.7, .96, 3.07]);
  sphere(.19, '#9aaf8b', [-1.7, 1.25, 3.07], [1, 1.5, 1]);
  box([.5, .06, .3], '#607d76', [-.2, .83, 3.07]);
}

export default function Room360({ room = 'living', roomName = 'Living Room' }) {
  const host = useRef(null), engine = useRef(null), pointers = useRef(new Map()), gesture = useRef(null);
  const [status, setStatus] = useState('loading'), [retry, setRetry] = useState(0);
  useEffect(() => {
    const element = host.current, panoramic = room === 'living';
    const scene = new THREE.Scene();
    const initialFov = panoramic ? 88 : 76, initialPitch = panoramic ? -.15 : -.13;
    const camera = new THREE.PerspectiveCamera(initialFov, 1, .05, 30);
    camera.position.set(0, panoramic ? 0 : 1.45, panoramic ? 0 : 1.1);
    scene.background = new THREE.Color('#e8ddcd');
    let renderer, observer, texture, frame = 0, disposed = false, failed = false, loaded = !panoramic;
    let yaw = 0, pitch = initialPitch;
    setStatus('loading');
    element.dataset.heading = '0';
    element.dataset.fov = String(initialFov);
    const releasePointers = () => {
      for (const pointerId of pointers.current.keys()) {
        if (element.hasPointerCapture(pointerId)) element.releasePointerCapture(pointerId);
      }
      pointers.current.clear(); gesture.current = null;
    };
    const fail = () => {
      if (disposed || failed) return;
      failed = true; engine.current = null;
      cancelAnimationFrame(frame); frame = 0;
      releasePointers(); setStatus('error');
    };
    const draw = () => {
      if (frame || disposed || failed || !renderer) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (disposed || failed) return;
        try { renderer.render(scene, camera); } catch { fail(); }
      });
    };
    const look = () => {
      camera.lookAt(camera.position.x + Math.sin(yaw) * Math.cos(pitch), camera.position.y + Math.sin(pitch), camera.position.z - Math.cos(yaw) * Math.cos(pitch));
      element.dataset.heading = String(Math.round(((yaw * 180 / Math.PI) % 360 + 360) % 360));
      element.dataset.pitch = String(Math.round(pitch * 180 / Math.PI));
      draw();
    };
    const zoom = value => {
      camera.fov = clamp(value, 42, 105);
      camera.updateProjectionMatrix();
      element.dataset.fov = String(Math.round(camera.fov * 100) / 100);
      draw();
    };
    const lost = event => { event.preventDefault(); fail(); };
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !panoramic, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, panoramic ? 2 : 1.5));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = panoramic ? THREE.NoToneMapping : THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = panoramic ? 1 : 1.25;
      renderer.domElement.setAttribute('aria-hidden', 'true');
      element.appendChild(renderer.domElement);
      renderer.domElement.addEventListener('webglcontextlost', lost);
      if (panoramic) {
        const geometry = new THREE.SphereGeometry(10, 64, 40);
        geometry.scale(-1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false });
        const panorama = new THREE.Mesh(geometry, material);
        // Place the sofa (55% of the source panorama width) at the initial view.
        panorama.rotation.y = Math.PI * 2 * .55 - Math.PI * 1.5;
        panorama.visible = false;
        scene.add(panorama);
        texture = new THREE.TextureLoader().load('/assets/living-room-360.jpg', image => {
          if (disposed || failed) { image.dispose(); return; }
          image.colorSpace = THREE.SRGBColorSpace;
          image.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
          image.needsUpdate = true;
          material.map = image; material.needsUpdate = true;
          panorama.visible = true; loaded = true;
          setStatus('ready'); draw();
        }, undefined, fail);
      } else {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        scene.add(new THREE.HemisphereLight('#fff4dc', '#a4a38c', 2.7));
        const sun = new THREE.DirectionalLight('#fff1d0', 3.1);
        sun.position.set(-3.2, 3, 1);
        sun.castShadow = true; sun.shadow.mapSize.set(512, 512);
        sun.shadow.camera.left = -5; sun.shadow.camera.right = 5;
        sun.shadow.camera.top = 5; sun.shadow.camera.bottom = -5;
        sun.shadow.bias = -.003;
        scene.add(sun); createRoom(scene, room);
        setStatus('ready');
      }
      engine.current = {
        move(dx, dy) {
          if (!loaded) return;
          // Client coordinates follow the scaled phone frame, so normalize them
          // against the actual on-screen size rather than the design canvas.
          const rect = element.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const verticalFov = THREE.MathUtils.degToRad(camera.fov);
          const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
          yaw -= dx / rect.width * horizontalFov;
          pitch = clamp(pitch + dy / rect.height * verticalFov, panoramic ? -1.45 : -.65, panoramic ? 1.45 : .6);
          look();
        },
        rotate(dx, dy) {
          yaw += dx; pitch = clamp(pitch + dy, panoramic ? -1.45 : -.65, panoramic ? 1.45 : .6); look();
        },
        zoom,
        reset() { yaw = 0; pitch = initialPitch; zoom(initialFov); look(); },
        getFov: () => camera.fov,
      };
      const resize = () => {
        const width = element.clientWidth, height = element.clientHeight;
        if (!width || !height || disposed) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height; camera.updateProjectionMatrix(); draw();
      };
      observer = new ResizeObserver(resize); observer.observe(element); resize(); look();
    } catch { fail(); }
    return () => {
      disposed = true;
      cancelAnimationFrame(frame); observer?.disconnect(); engine.current = null;
      releasePointers();
      const geometries = new Set(), materials = new Set();
      scene.traverse(object => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
        if (object.shadow) object.shadow.dispose();
      });
      texture?.dispose();
      geometries.forEach(value => value.dispose()); materials.forEach(value => value.dispose());
      if (renderer) {
        renderer.domElement.removeEventListener('webglcontextlost', lost);
        renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
      }
    };
  }, [room, retry]);
  const begin = event => {
    if (!engine.current || status !== 'ready' || pointers.current.size >= 2 || (event.pointerType === 'mouse' && event.button !== 0)) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current = { distance: Math.hypot(a.x - b.x, a.y - b.y), fov: engine.current.getFov() };
    }
  };
  const move = event => {
    const previous = pointers.current.get(event.pointerId); if (!previous) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2 && gesture.current) {
      const [a, b] = [...pointers.current.values()], distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance > 0) engine.current?.zoom(gesture.current.fov * gesture.current.distance / distance);
    } else engine.current?.move(event.clientX - previous.x, event.clientY - previous.y);
  };
  const end = event => {
    pointers.current.delete(event.pointerId); gesture.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return <div className="room360" data-state={status}>
    <div className="room360-stage" ref={host} tabIndex={status === 'ready' ? 0 : -1} role="application" aria-label={roomName + ' panoramic room preview. Swipe to look around, pinch to zoom, or use arrow keys.'} aria-busy={status === 'loading'} onPointerDown={begin} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end} onKeyDown={event => {
      const directions = { ArrowLeft: [-.14, 0], ArrowRight: [.14, 0], ArrowUp: [0, .1], ArrowDown: [0, -.1] };
      if (directions[event.key]) { event.preventDefault(); engine.current?.rotate(...directions[event.key]); }
      else if (event.key === '+' || event.key === '=') { event.preventDefault(); engine.current?.zoom((engine.current?.getFov() || 76) - 8); }
      else if (event.key === '-') { event.preventDefault(); engine.current?.zoom((engine.current?.getFov() || 76) + 8); }
    }} />
    {status === 'loading' && <div className="room360-loading" role="status" aria-label="Loading room panorama"><span aria-hidden="true"/></div>}
    {status === 'error' && <div className="room360-error" role="alert"><p>Couldn’t load this room. Tap Reset to try again.</p></div>}
    <button className="room360-reset" disabled={status === 'loading'} onClick={() => status === 'error' ? setRetry(value => value + 1) : engine.current?.reset()} aria-label="Reset room view"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 11a9 9 0 1 1 2.6 7M3 4v7h7"/></svg></button>
  </div>;
}
