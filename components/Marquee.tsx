"use client";

import { marquee } from "@/lib/content";
import { VelocityMarquee } from "./motion";

export function Marquee() {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-line bg-sunk py-6 md:py-8"
    >
      {/* Polka dot texture, faded at the edges to match the marquee mask */}
      <div className="polka mask-fade-x absolute inset-0" />

      <div className="mask-fade-x relative">
        <VelocityMarquee items={marquee} itemClassName="text-muted" />
      </div>
    </section>
  );
}
