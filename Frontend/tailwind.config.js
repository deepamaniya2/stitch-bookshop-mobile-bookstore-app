/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#994700",
        "on-primary": "#ffffff",
        "primary-container": "#ff7a00",
        "on-primary-container": "#5c2800",
        "primary-fixed": "#ffdbc8",
        "primary-fixed-dim": "#ffb68b",
        "on-primary-fixed": "#321200",
        "on-primary-fixed-variant": "#753400",
        "inverse-primary": "#ffb68b",

        "secondary": "#5d5f5f",
        "on-secondary": "#ffffff",
        "secondary-container": "#dcdddd",
        "on-secondary-container": "#5f6161",
        "secondary-fixed": "#e2e2e2",
        "secondary-fixed-dim": "#c6c6c7",
        "on-secondary-fixed": "#1a1c1c",
        "on-secondary-fixed-variant": "#454747",

        "tertiary": "#006399",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#00a8ff",
        "on-tertiary-container": "#003a5c",
        "tertiary-fixed": "#cde5ff",
        "tertiary-fixed-dim": "#95ccff",
        "on-tertiary-fixed": "#001d32",
        "on-tertiary-fixed-variant": "#004a75",

        "background": "#fff8f5",
        "on-background": "#251912",
        "surface": "#fff8f5",
        "on-surface": "#251912",
        "on-surface-variant": "#584235",
        "surface-bright": "#fff8f5",
        "surface-dim": "#edd5ca",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#fff1ea",
        "surface-container": "#ffeadf",
        "surface-container-high": "#fbe3d7",
        "surface-container-highest": "#f6ded2",
        "surface-variant": "#f6ded2",
        "surface-tint": "#994700",
        "inverse-surface": "#3b2d26",
        "inverse-on-surface": "#ffede5",

        "outline": "#8c7263",
        "outline-variant": "#e0c0af",

        "text-primary": "#111111",
        "text-secondary": "#666666",
        "accent-soft": "#FFA94D",

        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a"
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "sm": "0.5rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      spacing: {
        "xs": "4px",
        "sm": "8px",
        "base": "8px",
        "md": "16px",
        "lg": "24px",
        "xl": "32px",
        "gutter": "16px",
        "margin-mobile": "20px",
        "margin-desktop": "48px"
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        "headline-xl": ["Manrope", "sans-serif"],
        "headline-lg": ["Manrope", "sans-serif"],
        "headline-lg-mobile": ["Manrope", "sans-serif"],
        "headline-md": ["Manrope", "sans-serif"],
        "body-lg": ["Manrope", "sans-serif"],
        "body-md": ["Manrope", "sans-serif"],
        "label-md": ["Manrope", "sans-serif"],
        "label-sm": ["Manrope", "sans-serif"]
      },
      fontSize: {
        "headline-xl": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "500" }]
      }
    },
  },
  plugins: [],
}
