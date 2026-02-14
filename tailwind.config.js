/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                rose: {
                    50: '#fff1f2',
                    100: '#ffe4e6',
                    200: '#fecdd3',
                    300: '#fda4af',
                    400: '#fb7185',
                    500: '#f43f5e',
                    600: '#e11d48',
                    700: '#be123c',
                    800: '#9f1239',
                    900: '#881337',
                    950: '#4c0519',
                },
                blush: {
                    50: '#fdf2f8',
                    100: '#fce7f3',
                    200: '#fbcfe8',
                    300: '#f9a8d4',
                    400: '#f472b6',
                    500: '#ec4899',
                    600: '#db2777',
                    700: '#be185d',
                    800: '#9d174d',
                    900: '#831843',
                },
                love: {
                    light: '#ffe0ec',
                    DEFAULT: '#ff6b9d',
                    dark: '#c4386a',
                    deeper: '#8b1a4a',
                },
            },
            fontFamily: {
                display: ['"Dancing Script"', 'cursive'],
                body: ['"Quicksand"', 'sans-serif'],
                accent: ['"Satisfy"', 'cursive'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'float-slower': 'float 10s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'heartbeat': 'heartbeat 1.2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'twinkle': 'twinkle 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '33%': { transform: 'translateY(-10px) rotate(1deg)' },
                    '66%': { transform: 'translateY(5px) rotate(-1deg)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(244, 63, 94, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(244, 63, 94, 0.6), 0 0 60px rgba(244, 63, 94, 0.3)' },
                },
                heartbeat: {
                    '0%': { transform: 'scale(1)' },
                    '14%': { transform: 'scale(1.15)' },
                    '28%': { transform: 'scale(1)' },
                    '42%': { transform: 'scale(1.15)' },
                    '70%': { transform: 'scale(1)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                twinkle: {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
                    '50%': { opacity: '1', transform: 'scale(1.2)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'love-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'sunset-love': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'warm-love': 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
            },
        },
    },
    plugins: [],
}
