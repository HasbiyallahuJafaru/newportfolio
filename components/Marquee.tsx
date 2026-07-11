"use client";

import { marquee } from "@/lib/content";

export function Marquee() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const items = [...marquee, ...marquee];

  return (
    <section
      aria-hidden
      className="border-y border-line bg-sunk py-6 md:py-8"
    >
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center">
          {items.map((item, i) => (
            <div key={i} className="flex items-center">
              <span className="whitespace-nowrap px-8 text-2xl font-light tracking-tight text-muted md:text-3xl">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-bronze" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
