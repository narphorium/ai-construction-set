import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./.storybook/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        highlight: {
          DEFAULT: "hsl(var(--highlight))",
          foreground: "hsl(var(--highlight-foreground))",
          card: "hsl(var(--highlight-card))",
          border: "hsl(var(--highlight-border))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        code: {
          text: "hsl(var(--code-text))",
          function: "hsl(var(--code-function))",
          string: "hsl(var(--code-string))",
          constant: "hsl(var(--code-constant))",
          keyword: "hsl(var(--code-keyword))",
          background: "hsl(var(--code-background))",
          panel: "hsl(var(--code-panel))",
          selection: "hsl(var(--code-selection))",
          cursor: "hsl(var(--code-cursor))",
          highlight: "hsl(var(--code-highlight))",
          tooltip: "hsl(var(--code-tooltip))",
        },
        tree: "var(--tree-color)",
        "selected-tree": "var(--selected-tree-color)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    keyframes: {
      "button-pulse": {
        "50%": { backgroundColor: "var(--button-pulse-bg-color)" },
      },
    },
    animation: {
      "button-pulse": "button-pulse 0.2s ease alternate-reverse",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
