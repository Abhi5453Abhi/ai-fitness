/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Pre-included NativeWind preset matches this generic content match
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}

