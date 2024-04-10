/** @type {import('tailwindcss').Config} */
import react from "@vitejs/plugin-react-swc";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        sidebar: "3px 0px 25px -3px rgba(82,82,82,1)",
        shadowme: "0px 0px 20px 3px rgba(107,107,107,.2)",
      },
      colors: {
        cText: "#373737",
        third: "#D1D1D1",
        primary: "#004032",
        secondary: "#FFFFFF",
        forth: "#002b22",
      },
    },
  },
  plugins: [
    react({
      tsconfigFile: false,
    }),
  ],
};
