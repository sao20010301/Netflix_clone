/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "4c": "repeat(4, minmax(500px, 1fr))"
      },
      backgroundImage: {
        "netflixBg": "url('https://static.standard.co.uk/2022/11/16/10/netflix-s.jpg?width=1200')"
      }
    },
  },
  variants: {
    extend: {
      position: ["group-hover","hover"],
      textColor: ["group-hover","hover"]
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
