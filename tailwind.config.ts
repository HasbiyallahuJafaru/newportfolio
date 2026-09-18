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
        // Single warm dark theme. There is deliberately no light variant: the
        // page used to flip to off-white mid-scroll, which broke the cinematic
        // flow between sections.
        void: "#1a1816", // page background (base tone)
        raised: "#211e1b", // raised surfaces / cards
        sunk: "#151311", // deeper sections
        umber: "#241a12", // warm finale tint (Contact)
        ebony: "#100e0c", // deepest (Footer)
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
    },
  },
  plugins: [],
};

export default config;
