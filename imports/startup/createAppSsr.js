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
} from './plugins/ssr'

/*--------  Main App  --------*/


import App from '../ui/App.vue'


/*= End of Imports =*/
/*=============================================<<<<<*/



/*=============================================>>>>>
=  Load App on Html  =
===============================================>>>>>*/


function createApp () {

  // Disable subscriptions
  // Only For SSR
  Vue.config.meteor.subscribe = function() {
    return []
  }
  

  return {
    app: new Vue({
      router,
      store,
      vuetify,
      computed : {
        authenticated(){
          return this.$store.state.authenticated;
        }
      },
      created(){
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

