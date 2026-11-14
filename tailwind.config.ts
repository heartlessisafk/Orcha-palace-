import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "810px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        brand: {
          navy: {
            DEFAULT: "#0C1731", // Primary Midnight Royal Navy
            light: "#1A2B50",   // Elevated Navy / Hover
            deep: "#060C1B",    // Pure Abyss Navy
            border: "rgba(255, 255, 255, 0.12)",
          },
          beige: {
            DEFAULT: "#F4F0E6", // Warm Heritage Linen / Cream
            sand: "#E8DCC5",    // Muted Sand Neutral
            light: "#FAF7F2",   // Ultra-light Warm Tint
          },
          canvas: "#FDFBF7",    // Off-White Heritage Canvas Background
          gold: {
            DEFAULT: "#8C6D3F", // Antique Bronze / Warm Gold Accent
            light: "#B89758",   // Warm Gold Highlight
            dark: "#6E532B",    // Deep Bronze
            muted: "rgba(140, 109, 63, 0.2)",
          },
          charcoal: {
            DEFAULT: "#260E01", // Earth Charcoal (Warm Black Body Text)
            soft: "#3A2B20",
          },
          olive: "#57503F",     // Editorial Secondary Subtext
          muted: "#757575",     // Meta Labels / Captions
        },
      },
      fontFamily: {
        serif: ["var(--font-crimson)", "Crimson Text", "Georgia", "serif"],
        sans: ["var(--font-dmsans)", "DM Sans", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.02em",
        wider: "0.05em",
        widest: "0.12em",
      },
      lineHeight: {
        display: "1.15",
        heading: "1.25",
        relaxed: "1.6",
      },
      boxShadow: {
        subtle: "0 2px 8px rgba(12, 23, 49, 0.04)",
        card: "0 8px 24px rgba(12, 23, 49, 0.06)",
        hover: "0 16px 36px -8px rgba(12, 23, 49, 0.12)",
        floating: "0 20px 40px -15px rgba(12, 23, 49, 0.16)",
        navy: "0 20px 40px -15px rgba(6, 12, 27, 0.4)",
        "gold-ambient": "0 8px 25px -4px rgba(140, 109, 63, 0.28), 0 2px 8px -1px rgba(140, 109, 63, 0.12)",
        modal: "0 24px 60px -12px rgba(6, 12, 27, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08)",
      },
      borderRadius: {
        luxury: "12px",
        pill: "9999px",
      },
      maxWidth: {
        container: "1280px",
        wide: "1440px",
        narrow: "960px",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
