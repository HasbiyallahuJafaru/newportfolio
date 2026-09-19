"use client";

// Motion primitives shared across the page.
//
// Everything here reads scroll state through Motion's hooks (`useScroll`,
// `useVelocity`, `useAnimationFrame`) rather than a raw `scroll` listener, so
// there is exactly one rAF loop for the page and nothing fights over frames.
// Each primitive degrades to a static render under `prefers-reduced-motion`.

import {
  Fragment,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type Variants,
} from "framer-motion";

/** Height-independent in-view trigger. A percentage threshold never fires for
 *  blocks taller than the viewport, which is how the nine-card work grid would
 *  get stuck invisible on a phone. */
export const VIEWPORT = {
  once: true,
  amount: "some",
  margin: "0px 0px -80px 0px",
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

// ─────────────────────────────────────────────────────────────
// ScrollProgress — hairline read-through of page position
// ─────────────────────────────────────────────────────────────
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-signal"
    />
  );
}

// ─────────────────────────────────────────────────────────────
// SplitText — kinetic word reveal behind a per-word mask
// ─────────────────────────────────────────────────────────────
type SplitTextProps = {
  text: string;
  className?: string;
  /** Extra classes on each animated word (e.g. gradient text fill). */
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** "view" reveals on scroll into view; "mount" plays immediately. */
  trigger?: "view" | "mount";
};

export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  trigger = "view",
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: "112%" },
    show: { y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  const play =
    trigger === "mount"
      ? { initial: "hidden" as const, animate: "show" as const }
      : { initial: "hidden" as const, whileInView: "show" as const, viewport: VIEWPORT };

  return (
    <motion.span className={className} variants={container} {...play}>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          {/* The padding/margin pair gives ascenders and descenders room inside
              the mask while cancelling out of the line box, so the author's
              leading survives. Clipping is the classic split-text bug: with a
              display line-height under 1 the glyphs get shaved. */}
          <span className="inline-block overflow-hidden pt-[0.2em] pb-[0.34em] -mt-[0.2em] -mb-[0.34em] align-bottom">
            <motion.span variants={word} className={`inline-block ${wordClassName ?? ""}`}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}

// ─────────────────────────────────────────────────────────────
// Magnetic — element leans toward the cursor, springs back
// ─────────────────────────────────────────────────────────────
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of cursor offset the element travels. */
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 230, damping: 18, mass: 0.35 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={className}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// SpotlightCard — cursor-tracked border glow + optional 3D tilt
// ─────────────────────────────────────────────────────────────
export function SpotlightCard({
  children,
  className = "",
  tilt = 5,
  radius = 340,
}: {
  children: ReactNode;
  className?: string;
  /** Max degrees of tilt. 0 disables the transform entirely. */
  tilt?: number;
  /** Glow radius in px. */
  radius?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 200, damping: 22 };
  const rotateX = useSpring(useTransform(my, [0, 1], [tilt, -tilt]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-tilt, tilt]), spring);

  const off = reduce || tilt === 0;
  const ring = useMotionTemplate`radial-gradient(${radius}px circle at ${px}px ${py}px, rgba(228,50,63,0.9), rgba(228,50,63,0.18) 45%, transparent 72%)`;
  const wash = useMotionTemplate`radial-gradient(${radius * 1.5}px circle at ${px}px ${py}px, rgba(228,50,63,0.12), transparent 68%)`;

  // Painted as a 1px ring by XOR-ing two masks, so only the border lights up.
  const ringMask: CSSProperties = {
    padding: 1,
    WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    maskComposite: "exclude",
  };

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div
      ref={ref}
      onPointerMove={track}
      onPointerLeave={reset}
      className={`group/spot relative ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={off ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-[inherit]"
      >
        {children}

        {!reduce && (
          <>
            <motion.span
              aria-hidden
              style={{ background: ring, ...ringMask }}
              className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
            />
            <motion.span
              aria-hidden
              style={{ background: wash }}
              className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover/spot:opacity-100"
            />
          </>
        )}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VelocityMarquee — text strip whose speed and skew track scroll
// ─────────────────────────────────────────────────────────────
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export function VelocityMarquee({
  items,
  className = "",
  /** Base travel as a percentage of strip width per second. */
  speed = 1.25,
  itemClassName = "",
}: {
  items: string[];
  className?: string;
  speed?: number;
  itemClassName?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(-1);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  // Scroll faster and the strip accelerates; reverse scroll flips direction.
  const factor = useTransform(smooth, [0, 1200], [0, 5], { clamp: false });
  const skewX = useTransform(smooth, [-1800, 0, 1800], [7, 0, -7], { clamp: true });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_t, delta) => {
    if (reduce) return;
    const boost = factor.get();
    if (boost < 0) direction.current = 1;
    else if (boost > 0) direction.current = -1;

    // delta is ms; clamp it so a backgrounded tab can't teleport the strip.
    const step = Math.min(delta, 40) / 1000;
    baseX.set(baseX.get() + direction.current * speed * (1 + Math.abs(boost)) * step);
  });

  // Duplicated once so the -50% wrap point is pixel-identical to the start.
  const loop = [...items, ...items];

  return (
    <motion.div style={{ x, skewX }} className={`flex w-max items-center ${className}`}>
      {loop.map((item, i) => (
        <div key={`${item}-${i}`} className="flex items-center">
          <span
            className={`display whitespace-nowrap px-7 text-xl md:px-9 md:text-2xl ${itemClassName}`}
          >
            {item}
          </span>
          <span aria-hidden className="h-5 w-px shrink-0 bg-signal" />
        </div>
      ))}
    </motion.div>
  );
}
