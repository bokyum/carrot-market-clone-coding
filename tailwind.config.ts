import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      roboto: "var(--roboto-text)",
      rubik: "var(--rubik-text)",
      d2coding: "var(--d2coding-text)",
    },
  },
  plugins: [],
};
export default config;
