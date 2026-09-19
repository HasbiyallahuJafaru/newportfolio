"use client";

import { marquee } from "@/lib/content";
import { VelocityMarquee } from "./motion";

export function Marquee() {
  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-line bg-deep py-5 md:py-6"
    >
      <div className="mask-fade-x">
        <VelocityMarquee items={marquee} itemClassName="text-paper" />
      </div>
    </section>
  );
}
