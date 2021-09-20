/**
 *
 * Index Startup Scripts.
 * Loads Vue and plugins
 *
 */


/*=============================================>>>>>
=  Imports  =
===============================================>>>>>*/

/*--------  Vue  --------*/

import Vue from 'vue'


/*--------  Plugins  --------*/

import { 
  router,
  store,
  vuetify,
  i18n
} from './plugins'

/*--------  Main App  --------*/

import App from '../ui/App.vue'

/*= End of Imports =*/
/*=============================================<<<<<*/



/*=============================================>>>>>
=  Load App on Html  =
===============================================>>>>>*/


function createApp () {
  return {
    app: new Vue({
      router,
      store,
      vuetify,
      i18n,
      computed : {
        authenticated(){
          return this.$store.state.authenticated;
        }
      },
      created(){
        // Initialize Auth0
        this.$store.dispatch("initializeAuth0")
      },
      render: h => h(App),
    }).$mount('#app'),
    router,
    store
  }
}

export default createApp


/*= End of Load App on Html =*/
/*=============================================<<<<<*/

