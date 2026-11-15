/** @type {import('tailwindcss').Config} */

// Paleta "Papel": fondo claro, tinta cálida y UN solo acento.
//
// Antes había tres acentos (azul oscuro, azul eléctrico y naranja) usados los
// tres como color de texto, y peleaban entre sí. Ahora hay uno: la terracota.
// Los nombres accent-green / accent-blue / accent-gold se conservan porque los
// usan decenas de sitios del código; lo que cambió es a qué apuntan:
//
//   accent-green -> el acento (acciones, enlaces, cifras)
//   accent-gold  -> el mismo acento (era el naranja de las cifras)
//   accent-blue  -> tinta apagada: todo lo que antes era azul decorativo
//                   (subtítulos, etiquetas) ahora simplemente se calla.
//
// Contraste sobre #F6F3EE: tinta 15.9:1, apagado 5.7:1, acento 5.3:1.
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#F6F3EE',
          secondary: '#FFFDF9',
        },
        accent: {
          green: '#A8551F',
          blue: '#65605A',
          gold: '#A8551F',
        },
        text: {
          DEFAULT: '#1A1916',
          muted: '#65605A',
        },
        // Los filetes. Sustituyen a border-gray-800/700, que sobre fondo claro
        // dibujaban cajas negras.
        rule: {
          DEFAULT: '#DFD9D0',
          strong: '#CFC8BD',
        },
      },
      fontFamily: {
        // Inter para lo que se usa (navegación, botones, etiquetas, datos).
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        // Spectral para lo que se lee (nombre, tesis, títulos, citas).
        // Es el cambio de mayor efecto: mueve el sitio de tablero a publicación.
        serif: ['var(--font-spectral)', 'Georgia', 'Times New Roman', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
