import Vue from 'vue'

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

// Language
// Translation provided by Vuetify (javascript)
// import es from 'vuetify/es5/locale/es'

const opts = {
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
}
export default new Vuetify(opts)
