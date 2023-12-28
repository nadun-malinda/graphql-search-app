import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        md: "700px",
      },
      colors: {
        "react-dark": "#282c34",
        "react-deep-slate": "#404756",
      },
    },
  },
  plugins: [],
};
export default config;
