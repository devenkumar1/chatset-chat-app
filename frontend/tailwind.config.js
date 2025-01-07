/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'soft-blue': 'linear-gradient(135deg, #E3F2FD, #F3F8FF)',
        'peachy-glow': 'linear-gradient(135deg, #FFF4E5, #FFEAEF)',
        'minty-fresh': 'linear-gradient(135deg, #E0F7FA, #E3FCEF)',
        'subtle-sunrise': 'linear-gradient(135deg, #FFF8E1, #FDEDEC)',
        'calm-lavender': 'linear-gradient(135deg, #F3E5F5, #EDE7F6)',
      },
    },
  },
  plugins: [
    daisyui

  ],
  
}