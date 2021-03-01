import Vue from 'vue'
import '@mdi/font/css/materialdesignicons.min.css' // Ensure you are using css-loader

import minifyTheme from 'minify-css-string'

/*--------  The magic goes here  --------*/

// IMPORTANT: Use this imports in production to reduce bundle size
// import Vuetify from 'vuetify/lib/framework'
// import 'vuetify/lib/util/colors'
// import 'vuetify/lib/directives'

// Use this import while developing
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

// Language
// Translation provided by Vuetify (javascript)
// import es from 'vuetify/es5/locale/es'


const opts = {
  theme: {
    options: { minifyTheme },
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
}
export default new Vuetify(opts)
