/** @type {import('tailwindcss').Config} */
import typographyPlugin from "@tailwindcss/typography";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [typographyPlugin],
};

export default config;
