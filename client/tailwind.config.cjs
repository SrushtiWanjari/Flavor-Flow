module.exports = {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        pop: ['Poppins','sans-serif'],
        display: ['Playfair Display','serif']
      },
      colors: {
        'ff-rose': '#FF7A88',
        'ff-gold': '#FFD27F',
        'ff-mint': '#7FFFD4',
        'ff-indigo': '#7C6CFA'
      }
    }
  },
  plugins: [],
}
