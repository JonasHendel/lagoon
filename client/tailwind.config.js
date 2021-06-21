module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        beige: '#ffecd1',
      },
      boxShadow: {
        even: '0 0 20px 4px rgb(0, 0, 0, 0.1)',
        neuphorism: '14px 14px 20px #cbced1, -14px -14px 20px white',
      },
      screens: {
        'ca': '1280px',
        '1000': '1000px'
      },
      height: {
        '450':'450px',
        '500':'500px',
        '850':'850px',
        '40rem': '40rem'
      },
      width: {
        '270':'270px',
        '500':'500px',
        '800':'800px',
        '50rem':'50rem',
        '22rem':'22rem',
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '500': '500px',
        '3/4': '75%',
        'full': '100%',
       },
      minWidth: {
        '100': '100px',
        '200': '200px',
        '300': '300px',
        '400': '400px',
        '500': '500px',
        '3/4': '75%',
        'full': '100%',
       },
       maxHeight: {
         'screen': '100vh'
       },
       borderWidth: {
       '3': '3px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
