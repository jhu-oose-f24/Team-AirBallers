import plugin from "tailwindcss/plugin";

import defaultTheme from "tailwindcss/defaultTheme";

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
          main: "hsl(var(--background-main))",
          alt: "hsl(var(--background-alt))",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          darkest: "hsl(var(--primary-darkest))",
          darker: "hsl(var(--primary-darker))",
          dark: "hsl(var(--primary-dark))",
          light: "hsl(var(--primary-light))",
          lighter: "hsl(var(--primary-lighter))",
          lightest: "hsl(var(--primary-lightest))",

          "active-fill": "hsl(var(--primary-active-fill))",

          "input-text": "hsl(var(--primary-input-text))",
          "input-placeholder": "hsl(var(--primary-input-placeholder))",
        },

        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",

        disabled: {
          "color-darkest": "hsl(var(--disabled-primary-darkest))",
          "color-darker": "hsl(var(--disabled-primary-darker))",
          "color-dark": "hsl(var(--disabled-primary-dark))",
          "color-light": "hsl(var(--disabled-primary-light))",
          "color-lighter": "hsl(var(--disabled-primary-lighter))",
          "color-lightest": "hsl(var(--disabled-primary-lightest))",
        },
      },
      transitionTimingFunction: {
        "in-modal": "cubic-bezier(0.1, 1.3, 0.5, 1)",
        "out-modal": "cubic-bezier(0.2, 0, 0, 1.3)",
      },
      screens: {
        "max-sm": {
          max: defaultTheme.screens.sm,
        },
      },
    },
  },

  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({
        "bg-gradient": (angle) => ({
          backgroundImage: `linear-gradient(${angle}, var(--tw-gradient-stops));`,
        }),
      });
    }),
  ],
};
