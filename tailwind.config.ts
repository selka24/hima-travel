import type { Config } from 'tailwindcss';
import defaultTheme from "tailwindcss/defaultTheme";
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'primary': '#ED1B23',
        'secondary': '#16163F',
        'gray': {
          lighter: '#f3f3f3',
          light: '#D8DDE0',
          normal: '#BBBFC2',
          medium: '#929292',
          hard: '#82878B',
        }
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        'xs': '360px',
        ...defaultTheme.screens,
    // 'sm': '640px',

    // 'md': '768px',

    // 'lg': '1024px',

    // 'xl': '1280px',

    // '2xl': '1536px',
      }
    },
  }
}

