import Vue from 'vue'
import '@mdi/font/css/materialdesignicons.min.css' // Ensure you are using css-loader

import minifyTheme from 'minify-css-string'

/*--------  The magic goes here  --------*/

const promise = new Promise((resolve) => {

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

  if(Meteor.isProduction){ 
    import ("vuetify/lib/framework")
      .then(Vuetify=>{

        // TODO: Is this necessary?
        // import "vuetify/lib/util/colors"
        // import "vuetify/lib/directives"
        Vue.use(Vuetify.default)
        resolve(new Vuetify.default(opts))
      })
  } else {
    import ("vuetify/lib")
      .then(Vuetify=>{
        Vue.use(Vuetify.default)
        resolve(new Vuetify.default(opts))
      })
  }
});


export default promise
