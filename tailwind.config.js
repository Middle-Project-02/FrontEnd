/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#17171B',
        white: '#FFFFFF',
        primary: '#4169E1',
        primaryHover: '#2E4BC7',
        error: '#ED2124',
        errorHover: '#CF1E20',
        success: '#2DB745',
        warning: '#FEB93F',
        bgSecondary: '#F1F3F5',
        bgSecondaryHover: '#E7E7E7',
        bgTertiary: '#F8F9FA',
        textSecondary: '#868E96',
        borderSecondary: '#E5E7EB',
      },

      fontSize: {
        'heading-h1': '4.8rem',
        'heading-h2': '3.2rem',
        'heading-h3': '2.4rem',
        'heading-h4': '2rem',
        'body-lg': '1.8rem',
        'body-md': '1.6rem',
        'body-sm': '1.4rem',
        'body-xs': '1.2rem',
        'body-xxs': '1rem',
      },

      borderRadius: {
        0: '0px',
        2: '2px',
        4: '4px',
        6: '6px',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        circle: '999px',
      },
      borderWidth: {
        1: '1px',
        2: '2px',
        4: '4px',
        6: '6px',
      },

      spacing: {
        0: '0px',
        2: '2px',
        4: '4px',
        6: '6px',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        28: '28px',
        30: '30px',
        32: '32px',
        36: '36px',
        40: '40px',
        44: '44px',
        48: '48px',
        52: '52px',
        60: '60px',
        68: '68px',
        76: '76px',
        84: '84px',
        96: '96px',
        108: '108px',
        120: '120px',
      },

      boxShadow: {
        shadow2: '0px 1px 2px rgba(0, 0, 0, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.12)',
        shadow4: '0px 2px 4px rgba(0, 0, 0, 0.16), 0px 0px 2px rgba(0, 0, 0, 0.12)',
        shadow8: '0px 4px 8px rgba(0, 0, 0, 0.16), 0px 0px 4px rgba(0, 0, 0, 0.12)',
        shadowP: '0px 4px 8px rgba(11, 78, 239, 0.16), 0px 0px 4px rgba(11, 78, 239, 0.12)',
        shadowP2: '0px 8px 8px rgba(11, 78, 239, 0.16), 0px 0px 8px rgba(11, 78, 239, 0.12)',
      },

      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', 'sans-serif'],
      },
      animation: {
        'soft-ping': 'softPing 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        fadeInSlow: 'fadeIn 1.5s ease-out forwards',
        slideUpGuide: 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        softPing: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.15)', opacity: '0.6' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInSlow: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'primary-gradient':
          'linear-gradient(to bottom, rgba(11, 78, 239, 0.75) 0%, rgba(11, 78, 239, 0.8) 20%, rgba(11, 78, 239, 0.85) 40%, rgba(11, 78, 239, 0.9) 60%, rgba(11, 78, 239, 0.95) 80%, rgba(11, 78, 239, 0.99) 100%)',
        'card-gradient':
          'linear-gradient(to bottom,  rgba(148, 163, 184, 0.75) 0%,  rgba(148, 163, 184, 0.8) 20%,  rgba(148, 163, 184, 0.85) 40%,  rgba(148, 163, 184, 0.9) 60%,  rgba(148, 163, 184, 0.95) 80%,  rgba(148, 163, 184, 0.99) 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
