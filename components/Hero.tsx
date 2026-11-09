"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { hero, whatsappUrl } from "@/lib/content";
import { HeroGlobe } from "./HeroGlobe";
import { Magnetic } from "./motion";
import { ArrowRightIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Copy lifts and fades faster than the globe recedes; the globe handles its
  // own scroll response inside the scene, and that mismatch reads as depth.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* Ambient light the globe sits in. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(50%_55%_at_70%_50%,rgba(228,50,63,0.13),transparent_70%)] max-md:bg-[radial-gradient(90%_45%_at_50%_30%,rgba(228,50,63,0.14),transparent_70%)]"
      />

      {/* On a phone the globe sits behind the copy, up top; from md it takes
          the right of the frame and bleeds off the edge. */}
      <HeroGlobe className="absolute left-1/2 top-[4%] aspect-square w-[150vw] max-w-[760px] -translate-x-1/2 opacity-70 md:left-auto md:right-[-7vw] md:top-1/2 md:w-[min(64vw,980px)] md:max-w-none md:-translate-y-1/2 md:translate-x-0" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-ink via-ink/80 to-transparent md:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-ink via-ink/70 to-transparent md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
      />

      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none relative z-10 mx-auto w-full max-w-content px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-32"
      >
        <div className="pointer-events-auto max-w-2xl">
          <h1 className="script text-[clamp(2.75rem,7vw,6.25rem)] text-paper">
            {[hero.lineOne, hero.lineTwo].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: EASE, delay: 0.1 + i * 0.18 }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
            className="mt-8 h-px w-full max-w-xl origin-left bg-gradient-to-r from-signal via-signal/60 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
            className="mt-8 max-w-xl text-base font-light leading-relaxed text-muted md:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <Magnetic strength={0.25}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-signal-deep py-4 pl-7 pr-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-paper shadow-[0_10px_40px_-10px_rgba(228,50,63,0.6)] transition-transform duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-hi focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-signal transition-transform duration-500 ease-out group-hover:translate-x-0"
                />
                <span className="relative">Start a project</span>
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-paper/10 transition-transform duration-500 group-hover:translate-x-0.5">
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </a>
            </Magnetic>
            <a
              href="#work"
              className="group inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-paper/80 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-hi"
            >
              <span className="relative">
                See the work
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
