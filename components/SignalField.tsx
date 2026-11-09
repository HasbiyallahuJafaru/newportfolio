"use client";

import { useEffect, useRef, useState } from "react";

// Lazy mount for the halftone signal field. Boots when it is about to scroll
// into view, so three.js is never fetched for a visitor who doesn't get this
// far. The CSS dot grid underneath is the fallback when WebGL is missing.
export function SignalField({
  className = "",
  intensity = 1,
  cell = 9,
}: {
  className?: string;
  intensity?: number;
  cell?: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let ok = false;
    try {
      ok = !!document.createElement("canvas").getContext("webgl");
    } catch {}
    if (!ok) return;

    let disposed = false;
    let field: { dispose(): void } | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        import("./gl/fieldScene").then(({ createSignalField }) => {
          if (disposed) return;
          field = createSignalField(el, {
            reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
            intensity,
            cell,
          });
          setReady(true);
        });
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => {
      disposed = true;
      io.disconnect();
      field?.dispose();
    };
  }, [intensity, cell]);

  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="dot-grid absolute inset-0 opacity-60" />
      <div
        ref={host}
        className={`absolute inset-0 transition-opacity duration-[1200ms] ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
