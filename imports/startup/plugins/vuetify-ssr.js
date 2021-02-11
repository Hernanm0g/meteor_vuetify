import Vue from 'vue'

import Vuetify from 'vuetify'

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
