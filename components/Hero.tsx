"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { hero, profile, whatsappUrl } from "@/lib/content";
import { WhatsAppIcon } from "./icons";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Subtle parallax: content drifts up & fades as you scroll past the hero.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background video */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          disableRemotePlayback
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Warm tint + legibility scrims (robust to bright video) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,24,22,0.80) 0%, rgba(26,24,22,0.62) 38%, rgba(26,24,22,0.92) 100%)",
        }}
      />
      {/* Left anchor for the left-aligned headline */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(26,24,22,0.78) 0%, rgba(26,24,22,0.35) 45%, rgba(26,24,22,0) 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "radial-gradient(80% 60% at 35% 40%, rgba(140,115,85,0.20) 0%, rgba(26,24,22,0) 70%)",
        }}
      />
      {/* Bottom fade into the page */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent"
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-content px-6 pt-28 md:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-6 flex items-center gap-3 text-[11px] font-light uppercase tracking-[0.24em] text-bronze-lite"
        >
          <span className="inline-block h-px w-8 bg-bronze" />
          {hero.eyebrow}
        </motion.p>

        <h1 className="max-w-4xl text-[15vw] font-semibold leading-[0.92] tracking-tightest sm:text-7xl md:text-8xl">
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.05 }}
            className="block text-cream"
          >
            {hero.lineOne}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="block text-gradient"
          >
            {hero.lineTwo}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.28 }}
          className="mt-7 max-w-xl text-base font-light leading-relaxed text-muted md:text-lg"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <a
            href="#work"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-void transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50"
          >
            View Work
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-line bg-raised/40 px-7 py-3.5 text-sm font-medium text-cream backdrop-blur-sm transition-colors duration-300 hover:border-bronze hover:bg-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
          >
            <WhatsAppIcon className="h-4 w-4 text-bronze-lite" />
            WhatsApp Me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
