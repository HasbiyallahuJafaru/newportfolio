"use client";

import { useEffect, useRef, useState } from "react";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// Mount point for the WebGL globe. three.js arrives in its own chunk via a
// dynamic import once the page is idle, so it never competes with the
// headline for first paint. Without WebGL the hero keeps its glow and type.
export function HeroGlobe({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el || !hasWebGL()) return;

    let disposed = false;
    let globe: { dispose(): void } | null = null;

    const boot = () =>
      import("./gl/globeScene").then(({ createGlobe }) => {
        if (disposed) return;
        globe = createGlobe({
          container: el,
          label: label.current,
          reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          coarse: window.matchMedia("(pointer: coarse)").matches,
        });
        setReady(true);
      });

    const idle = (window as any).requestIdleCallback as
      | ((cb: () => void, o?: { timeout: number }) => number)
      | undefined;
    const handle = idle ? idle(boot, { timeout: 900 }) : window.setTimeout(boot, 200);

    return () => {
      disposed = true;
      if (idle) (window as any).cancelIdleCallback?.(handle);
      else clearTimeout(handle);
      globe?.dispose();
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`transition-opacity duration-[1400ms] ease-out ${ready ? "opacity-100" : "opacity-0"} ${className}`}
    >
      <div ref={host} className="absolute inset-0 touch-pan-y" />
      {/* Kaduna marker label, positioned by the scene each frame. */}
      <div
        ref={label}
        className="pointer-events-none absolute left-0 top-0 opacity-0 will-change-transform max-md:hidden"
      >
        <div className="group/label -mt-3 ml-4 flex items-center gap-2 whitespace-nowrap [[data-flip='1']_&]:-ml-4 [[data-flip='1']_&]:flex-row-reverse">
          <span className="h-px w-6 bg-signal" />
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-paper">
            Kaduna, NG
          </span>
        </div>
      </div>
    </div>
  );
}
