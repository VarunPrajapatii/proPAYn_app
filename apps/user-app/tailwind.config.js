/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        customWhite: '#EEEEEE',  // Add your custom color here
        customBlue: {
          dark: '#201E43',  // Add custom shades if needed
          mid: '#134B70',
          light: '#508C9B',
        },
      },
      scrollbar: {
        hide: 'scrollbar-width: none; -ms-overflow-style: none;',
      },
    },
    
  },
  plugins: [],
}