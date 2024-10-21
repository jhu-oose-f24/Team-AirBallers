/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        secondary: "var(--secondary)",

        "color-darkest": "var(--color-darkest)",
        "color-darker": "var(--color-darker)",
        "color-dark": "var(--color-dark)",
        "color-light": "var(--color-light)",
        "color-lighter": "var(--color-lighter)",
        "color-lightest": "var(--color-lightest)",

        "disabled-color-darkest": "var(--disabled-color-darkest)",
        "disabled-color-darker": "var(--disabled-color-darker)",
        "disabled-color-dark": "var(--disabled-color-dark)",
        "disabled-color-light": "var(--disabled-color-light)",
        "disabled-color-lighter": "var(--disabled-color-lighter)",
        "disabled-color-lightest": "var(--disabled-color-lightest)",

        "color-active-fill": "var(--color-active-fill)",

        "color-input-text": "var(--color-input-text)",
        "color-input-placeholder": "var(--color-input-placeholder)",
      },
    },
  },
  plugins: [],
};
