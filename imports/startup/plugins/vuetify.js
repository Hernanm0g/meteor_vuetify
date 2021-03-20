import Vue from 'vue'
import '@mdi/font/css/materialdesignicons.min.css' // Ensure you are using css-loader

import minifyTheme from 'minify-css-string'

/*--------  The magic goes here  --------*/
let Vuetify
// if(Meteor.isDevelopment){
//   // Use this import while developing
//   Vuetify = require("vuetify/lib").default
// } else {
  // IMPORTANT: Use this imports in production to reduce bundle size
  Vuetify = require("vuetify/lib/framework").default
  // require("vuetify/lib/util/colors")
  require("vuetify/lib/directives")
// }

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
