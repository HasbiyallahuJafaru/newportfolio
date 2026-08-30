"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Trigger as soon as the block's leading edge clears the fold, rather than
 * when a *fraction* of it is on screen. A percentage threshold silently fails
 * once a block grows taller than the viewport — a one-column grid of nine
 * project cards is ~4000px on a phone, so "20% visible" (~800px) can never be
 * satisfied and the cards stay at opacity 0 forever. Keep this height-independent.
 */
const VIEWPORT = { once: true, amount: "some", margin: "0px 0px -80px 0px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds */
  delay?: number;
  /** Travel distance in px before settling */
  y?: number;
  as?: "div" | "section" | "li" | "span";
};

/**
 * Fades + lifts a block into view once, when ~20% is visible.
 * Honours prefers-reduced-motion (renders static).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Container that staggers its <Reveal> / motion children.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Child item for use inside RevealGroup */
export function RevealItem({
  children,
  className,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
