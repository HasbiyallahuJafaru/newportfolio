"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { hero, whatsappUrl } from "@/lib/content";
import { Magnetic, SplitText } from "./motion";
import { ArrowRightIcon, WhatsAppIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

const CTA =
  "group flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 sm:w-auto";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  // Keep the background video running: browsers pause it on tab switch, on
  // low power mode, and occasionally swallow the initial autoplay attempt.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.play().catch(() => {
        /* autoplay blocked — nothing useful to do for a decorative video */
      });
    };

    const onEnded = () => {
      video.currentTime = 0;
      play();
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
    };

    play();
    video.addEventListener("pause", play);
    video.addEventListener("ended", onEnded);
    video.addEventListener("loadeddata", play);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("pause", play);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadeddata", play);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Three depth bands: the video drifts slowest, the copy leaves fastest. That
  // separation is what reads as camera depth rather than a fade.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 130]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.14]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background video */}
      <motion.div
        style={{ scale: videoScale, y: videoY }}
        className="absolute inset-0 will-change-transform"
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
          aria-hidden
          disableRemotePlayback
        >
          <source src="/images/hero.mp4" type="video/mp4" />
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
      {/* Slow-breathing warm bloom. The one piece of motion on the page that is
          purely atmospheric, so it stays very low contrast. */}
      <div
        aria-hidden
        className="aurora pointer-events-none absolute -left-[12%] top-[-8%] h-[68vh] w-[68vh] rounded-full bg-bronze/25 blur-[130px]"
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

      {/* Content — capped at pt-24 so the copy sits in the optical centre */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-content px-6 pt-24 md:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="glass mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
        >
          <span aria-hidden className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] font-light uppercase tracking-[0.2em] text-cream/80">
            {hero.eyebrow}
          </span>
        </motion.p>

        <h1 className="max-w-4xl text-[10vw] font-semibold leading-[0.98] tracking-tightest sm:text-6xl md:text-7xl lg:text-8xl">
          <SplitText
            trigger="mount"
            delay={0.1}
            text={hero.lineOne}
            className="block text-cream"
          />
          {/* The gradient lives on the words, not the container: a transformed
              descendant inside a background-clip:text parent loses the fill in
              some engines and the words paint transparent. */}
          <SplitText
            trigger="mount"
            delay={0.3}
            text={hero.lineTwo}
            className="block"
            wordClassName="text-gradient"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          className="mt-7 max-w-xl text-base font-light leading-relaxed text-muted md:text-lg"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Magnetic className="w-full sm:w-auto">
            <a href="#work" className={`${CTA} bg-cream text-void hover:bg-white focus-visible:ring-cream/50`}>
              View Work
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
          <Magnetic className="w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${CTA} glass text-cream hover:border-bronze focus-visible:ring-bronze/60`}
            >
              <WhatsAppIcon className="h-4 w-4 text-bronze-lite" />
              WhatsApp Me
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
