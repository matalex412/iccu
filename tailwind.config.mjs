/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f0f9f3",
          100: "#dcefe1",
          200: "#a4d4b4",
          300: "#8ec7a4",
          400: "#5ea97f",
          500: "#3d8c62",
          600: "#2b704c",
          700: "#23593f",
          800: "#1e4734",
          900: "#193b2b",
          950: "#0d2118",
        },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
