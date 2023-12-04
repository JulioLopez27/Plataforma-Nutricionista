/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors:{
        
        magenta: '#6b45a8', //botones principales
        verdeClaro: '#d7f4c3', //barra de busqueda
        verde:'#8fce67', //color del icono buscador
        //quick_silver:'#a0a0a0',
        gris:'#f2f3f0',//color de fondo de pagina // color sombra campos input
        grisOscuro:'#f5f5f5', //color fondo campos input
      }
    },
  },
  plugins: [],
}

