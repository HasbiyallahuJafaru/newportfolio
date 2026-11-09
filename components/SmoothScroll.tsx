"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scrollState, subscribe } from "@/lib/ticker";

// Inertial scrolling for wheel and trackpad. Touch keeps native scrolling:
// phones already have momentum, and hijacking it makes the page feel wrong.
// Under prefers-reduced-motion nothing is installed at all.
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      autoRaf: false,
    });

    const off = subscribe((time) => {
      lenis.raf(time);
      scrollState.velocity = lenis.velocity;
    }, 0);

    // Same-page anchors go through Lenis so they glide instead of jump. This
    // runs in the capture phase, ahead of Next's <Link> handler, which then
    // sees defaultPrevented and leaves the navigation alone.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const hash = href.startsWith("#") ? href : href.startsWith("/#") && location.pathname === "/" ? href.slice(1) : null;
      if (!hash) return;
      const target = hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: target === 0 ? 0 : -72, duration: 1.4 });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      off();
      lenis.destroy();
      scrollState.velocity = 0;
    };
  }, []);

  return null;
}
