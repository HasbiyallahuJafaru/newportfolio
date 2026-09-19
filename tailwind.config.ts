import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // One locked dark world. No light variant: the page is a gallery for
      // screenshots, and a mid-scroll flip to off-white breaks the reading of
      // every shot on it.
      //
      // Contrast, measured against ink / surface:
      //   paper 17.7  ·  muted 7.8  ·  faint 4.9  ·  signal 4.5  ·  signal-hi 5.1
      //   paper on signal-deep 6.0
      // signal-hi exists because plain signal lands at 4.30 on surface, just
      // under AA. Use signal for marks and rules, signal-hi for text.
      colors: {
        ink: "#0b0b0c", // page
        surface: "#121214", // raised panels
        deep: "#08080a", // recessed bands, footer
        line: "#23232a", // hairlines
        "line-hi": "#34343d", // hairlines that need to be seen
        paper: "#f4f3f1", // primary text
        muted: "#a3a3a8", // body text
        faint: "#82828a", // labels, metadata
        signal: "#e4323f", // the one accent: rules, numerals, marks
        "signal-hi": "#ec4b56", // accent as text on surface
        "signal-deep": "#b8121f", // accent as a fill under paper text
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-dm-sans)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        display: "-0.045em",
      },
      // Shape rule, applied everywhere: surfaces and media are square,
      // interactive controls are pills. Nothing in between.
      borderRadius: {
        none: "0",
        DEFAULT: "0",
        sm: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "9999px",
      },
      maxWidth: {
        content: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
