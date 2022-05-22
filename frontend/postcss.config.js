import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindConfig from 'src/tailwind-dashboard-template/src/css/tailwind.config.js'


export default {
  plugins: [tailwind(tailwindConfig), autoprefixer],
}