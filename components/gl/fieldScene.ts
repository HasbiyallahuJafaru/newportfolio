// The signal field: a halftone of dots whose size follows a slow, domain-
// warped noise field. It is the globe's dot language carried down the page,
// used behind the pricing card and the closing call to action.
//
// One full-screen triangle, one fragment shader. The cursor pushes the field
// up where it sits, so the dots swell toward it.

import * as THREE from "three";
import { subscribe } from "@/lib/ticker";

const fragment = /* glsl */ `
  uniform vec2 uRes;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uCell;
  uniform float uIntensity;
  uniform vec3 uInk;
  uniform vec3 uSignal;
  uniform vec3 uPaper;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; }
    return v;
  }
  float field(vec2 p) {
    float t = uTime * 0.06;
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p + 3.0 * q + vec2(8.3, 2.8)));
    return fbm(p + 2.6 * r);
  }

  void main() {
    vec2 frag = gl_FragCoord.xy;
    // Snap to the halftone grid and sample the field once per cell.
    vec2 cell = floor(frag / uCell);
    vec2 center = (cell + 0.5) * uCell;
    vec2 uv = center / uRes.y;
    float f = field(uv * 2.2);

    vec2 m = uMouse * uRes / uRes.y;
    float near = exp(-pow(distance(uv, m) * 3.2, 2.0)) * uHover;
    float v = clamp(smoothstep(0.32, 0.78, f) * uIntensity + near * 0.55, 0.0, 1.0);

    float radius = v * uCell * 0.48;
    float d = distance(frag, center);
    float dotMask = smoothstep(radius, radius - 1.2, d);

    vec3 dotCol = mix(uSignal * 0.55, mix(uSignal, uPaper, 0.18), v);
    vec3 glow = uSignal * smoothstep(0.35, 0.9, f) * 0.12 * uIntensity;
    vec3 col = uInk + glow + dotCol * dotMask;
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

export function createSignalField(
  container: HTMLElement,
  { reduceMotion, intensity = 1, cell = 9 }: { reduceMotion: boolean; intensity?: number; cell?: number },
) {
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "low-power" });
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(dpr);
  container.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%;";

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = {
    uRes: { value: new THREE.Vector2(1, 1) },
    uTime: { value: 8 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHover: { value: 0 },
    uCell: { value: cell * dpr },
    uIntensity: { value: intensity },
    uInk: { value: new THREE.Color("#0b0b0c") },
    uSignal: { value: new THREE.Color("#e4323f") },
    uPaper: { value: new THREE.Color("#f4f3f1") },
  };
  const material = new THREE.ShaderMaterial({
    vertexShader: "void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }",
    fragmentShader: fragment,
    uniforms,
    depthTest: false,
  });
  // A single oversized triangle covers the viewport without a diagonal seam.
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
  scene.add(new THREE.Mesh(geo, material));

  const render = () => renderer.render(scene, camera);
  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w * dpr, h * dpr);
    if (reduceMotion) render();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  // Pointer tracked across the whole section, not just the canvas, so the
  // field responds while the cursor is over the copy laid on top of it.
  const target = { x: 0.5, y: 0.5, hover: 0 };
  const zone = (container.closest("[data-field-zone]") as HTMLElement) ?? container;
  const onMove = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    target.x = (e.clientX - r.left) / r.width;
    target.y = 1 - (e.clientY - r.top) / r.height;
    target.hover = 1;
  };
  const onLeave = () => (target.hover = 0);
  zone.addEventListener("pointermove", onMove);
  zone.addEventListener("pointerleave", onLeave);

  let visible = false;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "100px" });
  io.observe(container);

  const unsubscribe = reduceMotion
    ? () => {}
    : subscribe((_t, delta) => {
        if (!visible || document.hidden) return;
        const k = Math.min(1, (delta / 1000) * 5);
        uniforms.uTime.value += delta / 1000;
        uniforms.uMouse.value.x += (target.x - uniforms.uMouse.value.x) * k;
        uniforms.uMouse.value.y += (target.y - uniforms.uMouse.value.y) * k;
        uniforms.uHover.value += (target.hover - uniforms.uHover.value) * k * 0.6;
        render();
      }, 25);

  if (reduceMotion) render();

  return {
    dispose() {
      unsubscribe();
      ro.disconnect();
      io.disconnect();
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
      geo.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
