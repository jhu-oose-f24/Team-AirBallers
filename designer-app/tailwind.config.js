/** @typedef {import("tailwindcss").Config} TailwindConfig */

/** @type {TailwindConfig["content"]} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];

/** @type {TailwindConfig["theme"]} */
export const theme = {
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
    },
  },
};

/** @type {TailwindConfig["plugins"]} */
export const plugins = [];
