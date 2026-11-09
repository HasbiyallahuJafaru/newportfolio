// One requestAnimationFrame loop for the whole page.
//
// Lenis, the hero globe and the WebGL gallery all need a frame callback, and
// the order matters: the gallery reads element positions, so it has to run
// after Lenis has moved the page for that frame or every plane trails the DOM
// by one frame. Subscribers run in ascending priority.

type Tick = (time: number, delta: number) => void;

const subs: { fn: Tick; priority: number }[] = [];
let raf = 0;
let last = 0;

function loop(time: number) {
  const delta = last ? Math.min(time - last, 64) : 16.7;
  last = time;
  for (let i = 0; i < subs.length; i++) subs[i].fn(time, delta);
  raf = requestAnimationFrame(loop);
}

export function subscribe(fn: Tick, priority = 0) {
  subs.push({ fn, priority });
  subs.sort((a, b) => a.priority - b.priority);
  if (!raf) {
    last = 0;
    raf = requestAnimationFrame(loop);
  }
  return () => {
    const i = subs.findIndex((s) => s.fn === fn);
    if (i >= 0) subs.splice(i, 1);
    if (!subs.length && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}

/** Scroll velocity in px per frame, written by SmoothScroll (or the native
 *  fallback) and read by the WebGL gallery. */
export const scrollState = { velocity: 0 };
