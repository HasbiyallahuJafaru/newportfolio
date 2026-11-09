"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/lib/content";
import { Reveal } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const DWELL = 7000;

// One quote at a time, set large, beside the work it is about. The client
// list underneath doubles as the control: each name carries a progress line
// that fills while its quote is up. Hovering or focusing the section holds it.
export function Testimonials() {
  const items = testimonials.items;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // restarts the progress line on manual picks
  const timer = useRef<number>();

  const go = useCallback(
    (i: number) => {
      setActive((i + items.length) % items.length);
      setCycle((c) => c + 1);
    },
    [items.length],
  );

  useEffect(() => {
    if (reduce || paused) return;
    timer.current = window.setTimeout(() => go(active + 1), DWELL);
    return () => clearTimeout(timer.current);
  }, [active, paused, reduce, go, cycle]);

  const current = items[active];

  return (
    <section
      id="clients"
      className="relative scroll-mt-24 overflow-hidden border-t border-line bg-ink py-24 md:py-36"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        setCycle((c) => c + 1);
      }}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node)) return;
        setPaused(false);
        setCycle((c) => c + 1);
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/3 h-[560px] w-[560px] rounded-full bg-signal/[0.07] blur-[140px]"
      />

      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <h2 className="script text-[clamp(2.4rem,6.4vw,5rem)] text-paper">
            {testimonials.label}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-12 md:gap-12">
          {/* Quote stage */}
          <Reveal className="flex flex-col md:col-span-7">
            <span
              aria-hidden
              className="script -mb-10 block h-24 select-none text-[9rem] leading-none text-signal md:-mb-6 md:h-32 md:text-[12rem]"
            >
              &ldquo;
            </span>

            <div className="relative min-h-[15rem] sm:min-h-[12rem] md:min-h-[17rem]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={active}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <blockquote className="text-[1.35rem] font-light leading-[1.5] text-paper md:text-[1.9rem] md:leading-[1.42]">
                    {current.quote}
                  </blockquote>
                  <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <span className="font-medium text-paper">{current.author}</span>
                    <span aria-hidden className="h-px w-6 bg-signal" />
                    <span className="font-light text-muted">{current.org}</span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Client list, also the control. */}
            <div className="mt-12 grid grid-cols-3 gap-4 md:mt-16 md:gap-6" role="group" aria-label="Choose a client">
              {items.map((item, i) => {
                const on = i === active;
                return (
                  <button
                    key={item.org}
                    type="button"
                    onClick={() => go(i)}
                    aria-pressed={on}
                    className="group text-left focus-visible:outline-none"
                  >
                    <span className="relative block h-px w-full overflow-hidden bg-line-hi">
                      <span
                        key={`${i}-${active}-${cycle}`}
                        className={`absolute inset-y-0 left-0 bg-signal ${
                          on
                            ? reduce
                              ? "w-full"
                              : `w-full origin-left animate-[progress_7s_linear_forwards] ${paused ? "[animation-play-state:paused]" : ""}`
                            : "w-0"
                        }`}
                      />
                    </span>
                    <span
                      className={`mt-4 block text-[13px] font-medium leading-snug transition-colors duration-300 group-focus-visible:text-signal-hi md:text-sm ${
                        on ? "text-paper" : "text-faint group-hover:text-muted"
                      }`}
                    >
                      {item.org}
                    </span>
                    <span className="mt-1 hidden text-xs font-light text-faint sm:block">
                      {item.project}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* The work each quote is about, as a deck in 3D. */}
          <Reveal delay={0.1} className="md:col-span-5">
            <div className="relative mx-auto aspect-[4/3.4] w-full max-w-[520px] [perspective:1600px]">
              {items.map((item, i) => {
                const offset = (i - active + items.length) % items.length; // 0 = front
                return (
                  <motion.button
                    key={item.org}
                    type="button"
                    tabIndex={-1}
                    aria-hidden
                    onClick={() => go(i)}
                    className="absolute inset-x-0 top-0 aspect-[16/10] w-full origin-bottom cursor-pointer overflow-hidden bg-surface shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-line-hi"
                    initial={false}
                    animate={
                      reduce
                        ? { opacity: offset === 0 ? 1 : 0, zIndex: 3 - offset }
                        : {
                            y: offset * 34,
                            z: -offset * 120,
                            rotateX: offset * -6,
                            rotateY: offset === 0 ? -9 : -4,
                            scale: 1 - offset * 0.04,
                            opacity: 1 - offset * 0.3,
                            zIndex: 3 - offset,
                          }
                    }
                    transition={{ type: "spring", stiffness: 140, damping: 22 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 90vw, 520px"
                      className="object-cover object-left-top"
                    />
                    <span
                      className={`absolute inset-0 bg-ink transition-opacity duration-700 ${
                        offset === 0 ? "opacity-0" : "opacity-50"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
