import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm identity — refined
        void: "#1a1816", // page background (base tone)
        raised: "#211e1b", // raised surfaces / cards
        sunk: "#151311", // deeper sections
        umber: "#241a12", // warm finale tint (Contact)
        ebony: "#100e0c", // deepest (Footer)
        // Warm light sections (off-white)
        paper: "#f4efe6", // warm off-white section bg
        "paper-raised": "#fbf9f5", // light cards
        "light-line": "#e5ddce", // borders on light
        ink: "#1a1816", // primary text on light
        "ink-muted": "#6f665a", // secondary text on light
        cream: "#faf8f5", // primary text
        muted: "#b5aa9c", // secondary text (AA on void)
        faint: "#7c7468", // tertiary / labels
        bronze: "#8c7355", // primary accent
        "bronze-lite": "#b89876", // accent highlight
        line: "#2e2b28", // borders / hairlines
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
