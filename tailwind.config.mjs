import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper)",
        "paper-2": "var(--color-paper-2)",
        ink: "var(--color-ink)",
        "ink-2": "var(--color-ink-2)",
        muted: "var(--color-muted)",
        rule: "var(--color-rule)",
        accent: "var(--color-accent)",
        "accent-soft": "var(--color-accent-soft)",
        focus: "var(--color-focus)",
        chip: "var(--color-chip)",
        "chip-ink": "var(--color-chip-ink)",
      },
      fontFamily: {
        sans: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-display)", ...defaultTheme.fontFamily.serif],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.serif],
        body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        measure: "var(--measure)",
        page: "var(--page-max)",
      },
      transitionTimingFunction: {
        hall: "var(--ease-out)",
      },
      transitionDuration: {
        short: "var(--dur-short)",
        mid: "var(--dur-mid)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
