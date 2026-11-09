// The hero globe, in plain three.js.
//
// It tells the business's actual story: the studio is in Kaduna, the clients
// are in Nigeria and in North America. Land is drawn as dots, a signal ripples
// out from Kaduna, and light travels along the arcs to where the work went.
//
// Plain three.js rather than React Three Fiber: the site is on React 18 / Next
// 14, the scene is one self-contained object, and this keeps the chunk small.
// This module is only ever loaded through a dynamic import, after first paint.

import * as THREE from "three";
import { LAND } from "@/lib/globeLand";
import { subscribe } from "@/lib/ticker";

const HOME = { lat: 10.52, lng: 7.44 }; // Kaduna
const DESTINATIONS = [
  { lat: 6.52, lng: 3.38 }, // Lagos
  { lat: 9.06, lng: 7.49 }, // Abuja
  { lat: 43.65, lng: -79.38 }, // Toronto
  { lat: 40.71, lng: -74.0 }, // New York
  { lat: 33.75, lng: -84.39 }, // Atlanta
];

const SIGNAL = new THREE.Color("#e4323f");
const PAPER = new THREE.Color("#d9d8d4");

function toVec(lat: number, lng: number, r = 1) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

/** Rasterise the coastline outlines into an equirectangular land mask. */
function landMask(w = 720, h = 360) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#fff";
  for (const poly of LAND) {
    ctx.beginPath();
    for (let i = 0; i < poly.length; i += 2) {
      const x = ((poly[i] + 180) / 360) * w;
      const y = ((90 - poly[i + 1]) / 180) * h;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }
  const data = ctx.getImageData(0, 0, w, h).data;
  return (lat: number, lng: number) => {
    const x = Math.min(w - 1, Math.max(0, Math.floor(((lng + 180) / 360) * w)));
    const y = Math.min(h - 1, Math.max(0, Math.floor(((90 - lat) / 180) * h)));
    return data[(y * w + x) * 4] > 127;
  };
}

const dotsVertex = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform vec3 uHome;
  attribute float aLand;
  attribute float aRand;
  varying float vAlpha;
  varying float vSignal;
  varying float vLand;

  void main() {
    // Intro: each dot starts scattered out in space and settles onto the
    // sphere, staggered by its random seed so the globe assembles rather than
    // pops in.
    float t = clamp((uIntro - aRand * 0.45) / 0.55, 0.0, 1.0);
    t = 1.0 - pow(1.0 - t, 3.0);
    vec3 scatter = normalize(position + vec3(sin(aRand * 91.7), cos(aRand * 47.3), sin(aRand * 13.1)) * 0.9);
    vec3 p = mix(scatter * (2.6 + aRand * 2.2), position, t);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vec3 n = normalize(normalMatrix * position);
    float facing = dot(n, normalize(-mv.xyz));

    // A ring of signal travelling outward from Kaduna across the surface.
    float d = distance(position, uHome);
    float wave = mod(uTime * 0.32, 2.2);
    float ring = exp(-pow((d - wave) * 9.0, 2.0)) * (1.0 - wave / 2.2);
    float near = smoothstep(0.22, 0.0, d);
    vSignal = max(ring * aLand, near * aLand);

    float twinkle = 0.75 + 0.25 * sin(uTime * 1.6 + aRand * 40.0);
    float size = mix(0.55, 1.0, aLand) * (1.0 + vSignal * 0.9);
    gl_PointSize = uSize * size * twinkle * uPixelRatio / -mv.z;
    gl_Position = projectionMatrix * mv;

    vLand = aLand;
    vAlpha = smoothstep(-0.05, 0.35, facing) * mix(0.14, 1.0, aLand) * t;
  }
`;

const dotsFragment = /* glsl */ `
  uniform vec3 uPaper;
  uniform vec3 uSignal;
  varying float vAlpha;
  varying float vSignal;
  varying float vLand;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float edge = smoothstep(0.5, 0.32, r);
    vec3 col = mix(uPaper * mix(0.5, 1.05, vLand), uSignal * 1.25, clamp(vSignal, 0.0, 1.0));
    gl_FragColor = vec4(col, edge * vAlpha);
    #include <colorspace_fragment>
  }
`;

const arcVertex = /* glsl */ `
  varying float vT;
  void main() {
    vT = uv.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const arcFragment = /* glsl */ `
  uniform float uTime;
  uniform float uOffset;
  uniform float uDraw;
  uniform vec3 uSignal;
  varying float vT;
  void main() {
    if (vT > uDraw) discard;
    // A bright head with a fading tail, running home to client.
    float head = fract(uTime * 0.22 + uOffset);
    float dist = head - vT;
    float tail = dist >= 0.0 ? exp(-dist * 9.0) : 0.0;
    float a = 0.14 + tail * 0.95;
    gl_FragColor = vec4(uSignal * (1.0 + tail * 0.6), a);
    #include <colorspace_fragment>
  }
`;

const ringFragment = /* glsl */ `
  uniform float uTime;
  uniform float uPhase;
  uniform vec3 uSignal;
  varying vec2 vUv;
  void main() {
    float t = fract(uTime * 0.45 + uPhase);
    float r = length(vUv - 0.5) * 2.0;
    float ring = smoothstep(0.08, 0.0, abs(r - t)) * (1.0 - t);
    if (ring < 0.01) discard;
    gl_FragColor = vec4(uSignal, ring);
    #include <colorspace_fragment>
  }
`;

const atmoVertex = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const atmoFragment = /* glsl */ `
  uniform vec3 uSignal;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    float f = pow(1.0 - abs(dot(vN, vV)), 4.0);
    gl_FragColor = vec4(uSignal, f * 0.4);
    #include <colorspace_fragment>
  }
`;

export type GlobeOptions = {
  container: HTMLElement;
  label?: HTMLElement | null;
  reduceMotion: boolean;
  coarse: boolean;
};

export function createGlobe({ container, label, reduceMotion, coarse }: GlobeOptions) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%;";

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0, 4.6);

  // tilt (outer) holds the view angle; spin (inner) turns on the globe's axis.
  const tilt = new THREE.Group();
  const spin = new THREE.Group();
  tilt.add(spin);
  scene.add(tilt);

  // Centre the view between West Africa and North America so every arc reads.
  const focus = toVec(0, -10);
  const baseSpin = -Math.atan2(focus.x, focus.z);
  const baseTilt = 0.42;
  spin.rotation.y = baseSpin;
  tilt.rotation.x = baseTilt;

  // ── Dots ──────────────────────────────────────────────────────
  const isLand = landMask();
  const count = coarse ? 24000 : 44000;
  const positions: number[] = [];
  const land: number[] = [];
  const rand: number[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const x = Math.cos(th) * r;
    const z = Math.sin(th) * r;
    const lat = (Math.asin(y) * 180) / Math.PI;
    // Inverse of toVec's projection.
    const lng = ((Math.atan2(z, -x) * 180) / Math.PI + 360) % 360 - 180;
    const onLand = isLand(lat, lng);
    // Ocean is thinned out: enough to hold the sphere's silhouette.
    if (!onLand && i % 4 !== 0) continue;
    positions.push(x, y, z);
    land.push(onLand ? 1 : 0);
    rand.push(Math.random());
  }
  const dotsGeo = new THREE.BufferGeometry();
  dotsGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  dotsGeo.setAttribute("aLand", new THREE.Float32BufferAttribute(land, 1));
  dotsGeo.setAttribute("aRand", new THREE.Float32BufferAttribute(rand, 1));

  const home = toVec(HOME.lat, HOME.lng);
  const dotsMat = new THREE.ShaderMaterial({
    vertexShader: dotsVertex,
    fragmentShader: dotsFragment,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uIntro: { value: reduceMotion ? 1 : 0 },
      uPixelRatio: { value: dpr },
      uSize: { value: coarse ? 9 : 10 },
      uHome: { value: home },
      uPaper: { value: PAPER },
      uSignal: { value: SIGNAL },
    },
  });
  spin.add(new THREE.Points(dotsGeo, dotsMat));

  // Occluder: hides dots on the far hemisphere so the globe reads as solid.
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.985, 64, 48),
    new THREE.MeshBasicMaterial({ color: 0x0b0b0c }),
  );
  core.renderOrder = -1;
  spin.add(core);

  // Rim light.
  const atmo = new THREE.Mesh(
    new THREE.SphereGeometry(1.09, 64, 48),
    new THREE.ShaderMaterial({
      vertexShader: atmoVertex,
      fragmentShader: atmoFragment,
      uniforms: { uSignal: { value: SIGNAL } },
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  tilt.add(atmo);

  // ── Arcs ──────────────────────────────────────────────────────
  const arcMats: THREE.ShaderMaterial[] = [];
  DESTINATIONS.forEach((dest, i) => {
    const a = home.clone();
    const b = toVec(dest.lat, dest.lng);
    const angle = a.angleTo(b);
    const lift = 0.06 + angle * 0.28;
    const pts: THREE.Vector3[] = [];
    for (let s = 0; s <= 64; s++) {
      const t = s / 64;
      // Spherical interpolation, lifted off the surface in an arch.
      const v = new THREE.Vector3()
        .copy(a)
        .multiplyScalar(Math.sin((1 - t) * angle) / Math.sin(angle))
        .add(b.clone().multiplyScalar(Math.sin(t * angle) / Math.sin(angle)));
      v.normalize().multiplyScalar(1 + Math.sin(Math.PI * t) * lift);
      pts.push(v);
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const mat = new THREE.ShaderMaterial({
      vertexShader: arcVertex,
      fragmentShader: arcFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uOffset: { value: i * 0.27 },
        uDraw: { value: reduceMotion ? 1 : 0 },
        uSignal: { value: SIGNAL },
      },
    });
    arcMats.push(mat);
    spin.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 96, angle > 0.3 ? 0.0042 : 0.003, 6), mat));

    // Landing marker at each destination.
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.009, 12, 8),
      new THREE.MeshBasicMaterial({ color: SIGNAL }),
    );
    dot.position.copy(b.clone().multiplyScalar(1.004));
    spin.add(dot);
  });

  // ── Kaduna marker: a solid point and two expanding rings ────────
  const ringMats: THREE.ShaderMaterial[] = [];
  const pin = new THREE.Mesh(
    new THREE.SphereGeometry(0.018, 16, 12),
    new THREE.MeshBasicMaterial({ color: SIGNAL }),
  );
  pin.position.copy(home.clone().multiplyScalar(1.006));
  spin.add(pin);
  for (let i = 0; i < 2; i++) {
    const m = new THREE.ShaderMaterial({
      vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
      fragmentShader: ringFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: { uTime: { value: 0 }, uPhase: { value: i * 0.5 }, uSignal: { value: SIGNAL } },
    });
    ringMats.push(m);
    const ring = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.26), m);
    ring.position.copy(home.clone().multiplyScalar(1.008));
    ring.lookAt(home.clone().multiplyScalar(2));
    spin.add(ring);
  }

  // ── Distant dust, for depth behind the globe ───────────────────
  const dustCount = coarse ? 260 : 520;
  const dust = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(3 + Math.random() * 6);
    v.z -= 4;
    dust.set([v.x, v.y, v.z], i * 3);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
  const dustPoints = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({ color: 0x8a8a92, size: 0.018, transparent: true, opacity: 0.5, depthWrite: false }),
  );
  scene.add(dustPoints);

  // ── Sizing ────────────────────────────────────────────────────
  let width = 1;
  let height = 1;
  const resize = () => {
    width = container.clientWidth || 1;
    height = container.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (reduceMotion) render();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  // ── Input ─────────────────────────────────────────────────────
  const pointer = { x: 0, y: 0 };
  const look = { x: 0, y: 0 };
  let dragging = false;
  let dragX = 0;
  let dragOffset = 0;
  let dragVel = 0;

  const onMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    if (dragging) {
      const dx = (e.clientX - dragX) / 220;
      dragX = e.clientX;
      dragOffset += dx;
      dragVel = dx;
      if (reduceMotion) {
        spin.rotation.y = baseSpin + dragOffset;
        render();
      }
    }
  };
  const onDown = (e: PointerEvent) => {
    if (coarse) return;
    dragging = true;
    dragX = e.clientX;
    container.style.cursor = "grabbing";
  };
  const onUp = () => {
    dragging = false;
    container.style.cursor = "";
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  container.addEventListener("pointerdown", onDown);
  window.addEventListener("pointerup", onUp);

  // ── Visibility: stop rendering when the hero is off screen ──────
  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  io.observe(container);

  // ── Frame ─────────────────────────────────────────────────────
  const tmp = new THREE.Vector3();
  function placeLabel() {
    if (!label) return;
    tmp.copy(home).multiplyScalar(1.02);
    pin.parent!.localToWorld(tmp);
    const facing = tmp.clone().normalize().dot(camera.position.clone().normalize());
    tmp.project(camera);
    const x = (tmp.x * 0.5 + 0.5) * width;
    const y = (-tmp.y * 0.5 + 0.5) * height;
    // Near the right edge the label hangs off the pin's left side instead.
    const flip = x > width * 0.72;
    label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)${flip ? " translateX(-100%)" : ""}`;
    label.dataset.flip = flip ? "1" : "0";
    label.style.opacity = String(Math.max(0, Math.min(1, (facing - 0.15) * 4)) * Math.min(1, dotsMat.uniforms.uIntro.value * 1.6 - 0.6));
  }

  function render() {
    placeLabel();
    renderer.render(scene, camera);
  }

  let elapsed = 0;
  const start = performance.now();
  const unsubscribe = reduceMotion
    ? () => {}
    : subscribe((_time, delta) => {
        if (!visible || document.hidden) return;
        const dt = delta / 1000;
        elapsed += dt;
        const since = (performance.now() - start) / 1000;

        dotsMat.uniforms.uIntro.value = Math.min(1, since / 2.6);
        dotsMat.uniforms.uTime.value = elapsed;
        const draw = Math.min(1, Math.max(0, (since - 1.8) / 1.4));
        for (const m of arcMats) {
          m.uniforms.uTime.value = elapsed;
          m.uniforms.uDraw.value = draw;
        }
        for (const m of ringMats) m.uniforms.uTime.value = elapsed;

        // Drag inertia, then a spring back towards the home view so Kaduna
        // never ends up on the far side for long.
        if (!dragging) {
          dragOffset += dragVel;
          dragVel *= 0.94;
          dragOffset *= 0.985;
        }
        const sway = Math.sin(elapsed * 0.12) * 0.3;
        spin.rotation.y = baseSpin + sway + dragOffset;

        look.x += (pointer.x - look.x) * 0.04;
        look.y += (pointer.y - look.y) * 0.04;
        tilt.rotation.x = baseTilt + look.y * 0.12;
        tilt.rotation.z = -look.x * 0.06;

        // Scroll: the globe drifts up and sinks back as the hero leaves.
        const p = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
        camera.position.z = 4.6 + p * 1.6;
        tilt.position.y = p * 0.55;
        dustPoints.rotation.y = elapsed * 0.01 + look.x * 0.05;

        render();
      }, 20);

  resize();
  if (reduceMotion) render();

  return {
    dispose() {
      unsubscribe();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
