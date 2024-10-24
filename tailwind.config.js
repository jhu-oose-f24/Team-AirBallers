/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          main: "var(--background-main)",
          alt: "var(--background-alt)",
        },
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          darkest: "var(--primary-darkest)",
          darker: "var(--primary-darker)",
          dark: "var(--primary-dark)",
          light: "var(--primary-light)",
          lighter: "var(--primary-lighter)",
          lightest: "var(--primary-lightest)",

          "active-fill": "var(--primary-active-fill)",

          "input-text": "var(--primary-input-text)",
          "input-placeholder": "var(--primary-input-placeholder)",
        },

        secondary: "var(--secondary)",
        accent: "var(--accent)",

        disabled: {
          "color-darkest": "var(--disabled-primary-darkest)",
          "color-darker": "var(--disabled-primary-darker)",
          "color-dark": "var(--disabled-primary-dark)",
          "color-light": "var(--disabled-primary-light)",
          "color-lighter": "var(--disabled-primary-lighter)",
          "color-lightest": "var(--disabled-primary-lightest)",
        },
      },
    },
  },
  plugins: [],
};
