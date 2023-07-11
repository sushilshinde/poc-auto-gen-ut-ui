/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(green|red|zinc|gray)-100/,
    },{
      pattern: /text-(white|black)-700/
    },{
      pattern: /bg-(green|red|zinc|gray|blue)-500/,
    }
  ]
}

