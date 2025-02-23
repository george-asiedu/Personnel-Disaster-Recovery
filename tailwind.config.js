/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        gray50: '#F9FAFB',
        heading: '#1D2939',
        paragraph: '#667085',
        primary: '#039855',
        secondary: '#D1FADF',
        tertiary: '#027A48',
        dashSide: '#334054',
        border: '#D0D5DD',
        pending: '#175CD3',
        pendingBg: '#EFF8FF',
        suspend: '#B42318',
        suspendBg: '#FEF3F2',
        homeBg: '#ECFDF3',
        banner: "#101828",
        spanImg: '#EAECF0'
      },
      screens: {
        'lg': '998px',
        '3xl': '1800px'
      },
    },
  },
  plugins: [],
}