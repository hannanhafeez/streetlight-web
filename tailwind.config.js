const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('./constants/colors')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  important: true,

  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    fontFamily:{
      sans: ['Mulish', 'sans-serif','system-ui']
    },
    extend: {
      height:{
        '0.25': '1px'
      },
      width:{
        '0.25': '1px'
      },
      fontSize:{
        '10': '10px',
        '11': '11px',
        '12': '12px',
        '14': '14px',
        '18': '18px',
        '19': '19px',
        '20': '20px',
        '24': '24px'
      },
      colors: colors,
      letterSpacing:{
        tight: '0.1px',
        normal: '0.2px',
        loose: '0.3px'
      },
      outline: {
        blue: ['1px solid #0000ff', '-1px'],
        white: ['1px solid #ffffff', '-1px'],
      }
    },
  },
  variants: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        'mytheme': {                          /* your theme name */
          'primary': '#3751FF',           /* Primary color */
          'primary-focus': '#2C40CA',     /* Primary color - focused */
          'primary-content': '#ffffff',   /* Foreground content color to use on primary color */

          'secondary': '#f6d860',         /* Secondary color */
          'secondary-focus': '#f3cc30',   /* Secondary color - focused */
          'secondary-content': '#ffffff', /* Foreground content color to use on secondary color */

          'accent': '#37cdbe',            /* Accent color */
          'accent-focus': '#2aa79b',      /* Accent color - focused */
          'accent-content': '#ffffff',    /* Foreground content color to use on accent color */

          'neutral': '#3d4451',           /* Neutral color */
          'neutral-focus': '#2a2e37',     /* Neutral color - focused */
          'neutral-content': '#ffffff',   /* Foreground content color to use on neutral color */

          'base-100': '#ffffff',          /* Base color of page, used for blank backgrounds */
          'base-200': '#f9fafb',          /* Base color, a little darker */
          'base-300': '#d1d5db',          /* Base color, even more darker */
          'base-content': '#1f2937',      /* Foreground content color to use on base color */

          'info': '#2094f3',              /* Info */
          'success': '#009485',           /* Success */
          'warning': '#ff9900',           /* Warning */
          'error': '#ff5724',             /* Error */
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}
