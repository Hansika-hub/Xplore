/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'zone-r': 'var(--color-zone-r)',
        'zone-i': 'var(--color-zone-i)',
        'zone-a': 'var(--color-zone-a)',
        'zone-s': 'var(--color-zone-s)',
        'zone-e': 'var(--color-zone-e)',
        'zone-c': 'var(--color-zone-c)',
        surface: 'var(--color-surface)',
        card: 'var(--color-card)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        gold: 'var(--color-gold)',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
