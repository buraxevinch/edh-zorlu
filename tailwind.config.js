/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    { pattern: /grid-cols-\d+/, variants: ["xl", "lg", "md", "sm"] },
    { pattern: /col-span-\d+/, variants: ["xl", "lg", "md", "sm"] },
    { pattern: /gap-\d+/ },
    { pattern: /columns-\d+/, variants: ["xl", "lg", "md", "sm"] },
    { pattern: /basis-\d+/, variants: ["focus"] },
    { pattern: /bg-(blue|emerald|fuchsia|green|orange|red|yellow)-(300|400|500|600|700)/, variants: ["hover", "focus"] },
    { pattern: /text-(2|3|4|5|6|7|8|9)xl/ },
    { pattern: /translate-x-(0|16|32|48|64)/ },
    { pattern: /^w-(full|3\/4|1\/2|1\/4|60)$/ },
    "hidden",
  ],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem" } },
    extend: {
      colors: { light: "#e7edf5", dark: "#b9cfdb", tclr: "#668497" },
      spacing: { 13: "3.25rem", 15: "3.75rem", 18: "4.5rem" },
    },
  },
  plugins: [],
};
