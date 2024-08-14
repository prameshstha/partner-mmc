/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#EAB308",
        "primary-light": "#FDE047",
        "primary-dark": "#d99c07",
        "gray-primary": "#1F2937",
        "gray-dark": "#374151",
        "gray-100": "#F3F4F6",
        "gray-light": "#6B7280",
        secondary: "#9CA3AF",

        borderColor: "#E9E9E9",
        shadeColor: "#E9E9E9",
        red: "#F05228",
        gray: "#e1e4fa",
        green: "#6AC259",
        disabled: "#EBEBE4",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        gradient: {
          to: { "background-position": "200% center" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: "gradient 8s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
