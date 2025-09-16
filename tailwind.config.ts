import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import lineClamp from '@tailwindcss/line-clamp'
import aspectRatio from '@tailwindcss/aspect-ratio'

export default {
  theme: {
    extend: {
      container: { center: true, padding: '1rem' },

      colors: {
        appbg: '#141414',
      },

      fontFamily: {
        inter: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: { '2xl': '1rem', '3xl': '1.25rem' },
      boxShadow: {
        card: '0 20px 25px -5px rgba(0,0,0,.10), 0 10px 10px -5px rgba(0,0,0,.04)',
      },
    },
  },
  plugins: [forms, typography, lineClamp, aspectRatio],
} satisfies Config
