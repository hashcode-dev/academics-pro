import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#004bca",
          strong: "#0061ff",
          container: "#eff4ff",
          onContainer: "#001d4f",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#0061ff",
          600: "#004bca",
          700: "#003b9e",
          900: "#001d4f",
        },
        secondary: {
          DEFAULT: "#712ae2",
          container: "#f3e8ff",
          onContainer: "#2b0a68",
        },
        tertiary: {
          DEFAULT: "#007f57",
          container: "#e6f7f2",
          onContainer: "#002b1c",
        },
        sidebar: {
          DEFAULT: "#213145",
          dark: "#121b27",
          hover: "#2c3e56",
          active: "#374d6b",
        },
        surface: {
          DEFAULT: "#f8f9ff",
          low: "#eff4ff",
          high: "#ffffff",
          tint: "#e5eeff",
        },
        semantic: {
          success: "#007f57",
          warning: "#d97706",
          danger: "#ba1a1a",
          info: "#0284c7",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-manrope)", "Manrope", "Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px -2px rgba(11, 28, 48, 0.06), 0 2px 6px -1px rgba(11, 28, 48, 0.03)",
        glass: "0 8px 32px 0 rgba(0, 75, 202, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
