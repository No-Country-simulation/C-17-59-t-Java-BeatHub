import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blanco: "#ffffff",
        negro: "#000814",
        primario: "#FFFEFA",
        secundario: "#060606",
        terciario: "#FAFAFA",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
