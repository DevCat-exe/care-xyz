/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: false,
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f7ff',
                    100: '#e3f0ff',
                    200: '#bfe0ff',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                background: {
                    light: '#f6f7f8',
                    dark: '#101922',
                },
                surface: {
                    light: '#ffffff',
                    dark: '#1a2632',
                },
                text: {
                    main: '#0d141b',
                    secondary: '#4c739a',
                },
            },
            fontFamily: {
                display: ['Lexend', 'sans-serif'],
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                'md': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                'xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'bounce-slow': 'bounce 2s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
