/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      azul_magenta: '#6b45a8', //botones principales
      tea_green: '#d7f4c3', //barra de busqueda
      search_icon_color:'#8fce67', //color del icono buscador
      //quick_silver:'#a0a0a0',
      anti_flash_white:'#f2f3f0',//color de fondo de pagina // color sombra campos input
      whiteSmoke:'#f5f5f5', //color fondo campos input

    }
    , extend: {},
  },
  plugins: [],
}

