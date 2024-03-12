import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        grid: "url('/img/bg-grid.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        violeta: "#A261E7",
        violetaClaro: "#fcba03",
        verde: "#57C99B",
      },
      fontSize: {
        xxs: [
          ".7rem",
          {
            lineHeight: ".4rem",
            letterSpacing: "-0.15em",
            fontWeight: "700",
          },
        ],
      },
      fontFamily: {
        luloBold: ["Lulo Clean Bold", "sans-serif"],
        lulo: ["Lulo Clean", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
