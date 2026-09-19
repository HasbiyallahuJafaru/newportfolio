"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/content";
import { SplitText } from "./motion";

const EASE = [0.22, 1, 0.36, 1] as const;

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

  // The footage drifts slower than the copy. That difference is what reads as
  // camera depth; a matched speed just reads as a fade.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      {/* Footage is held back to a texture: desaturated and dimmed so the type
          is the subject. It is 1280x720, which cannot carry a hero on its own. */}
      <motion.div
        style={{ scale: videoScale }}
        className="absolute inset-0 will-change-transform"
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover saturate-[0.5] brightness-[0.9] contrast-[1.05]"
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

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/55 to-transparent"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-content px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32"
      >
        <div className="max-w-5xl">
          <h1 className="script text-[clamp(2.75rem,7.6vw,6.5rem)] text-paper">
            <SplitText
              trigger="mount"
              delay={0.08}
              text={hero.lineOne}
              className="block"
            />
            <SplitText
              trigger="mount"
              delay={0.26}
              text={hero.lineTwo}
              className="block"
            />
          </h1>

          {/* The one rule that draws itself. It marks the line between the
              claim and the explanation. */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
            className="mt-8 h-px w-full origin-left bg-signal"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
            className="mt-8 max-w-xl text-base font-light leading-relaxed text-muted md:text-lg"
          >
            {hero.subtitle}
          </motion.p>

        </div>
      </motion.div>
    </section>
  );
}
