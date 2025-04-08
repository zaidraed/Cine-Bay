/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";
export const darkMode = "class";
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      border: "hsl(240 3.7% 15.9%)",
      input: "hsl(240 3.7% 15.9%)",
      ring: "hsl(240 4.9% 83.9%)",
      background: "hsl(240 10% 3.9%)",
      foreground: "hsl(0 0% 98%)",
      primary: {
        DEFAULT: "hsl(221.2 83.2% 53.3%)",
        foreground: "hsl(0 0% 98%)",
      },
      secondary: {
        DEFAULT: "hsl(240 3.7% 15.9%)",
        foreground: "hsl(0 0% 98%)",
      },
      destructive: {
        DEFAULT: "hsl(0 62.8% 30.6%)",
        foreground: "hsl(0 0% 98%)",
      },
      muted: {
        DEFAULT: "hsl(240 3.7% 15.9%)",
        foreground: "hsl(240 5% 64.9%)",
      },
      accent: {
        DEFAULT: "hsl(240 3.7% 15.9%)",
        foreground: "hsl(0 0% 98%)",
      },
      popover: {
        DEFAULT: "hsl(240 10% 3.9%)",
        foreground: "hsl(0 0% 98%)",
      },
      card: {
        DEFAULT: "hsl(240 10% 3.9%)",
        foreground: "hsl(0 0% 98%)",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    animation: {
      "fade-in": "fadeIn 0.5s ease-in-out",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
    },
  },
};
export const plugins = [tailwindcssAnimate];
