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
  vuetify as vuetifyPromise, 
} from './plugins'

/*--------  Main App  --------*/

import App from '../ui/App.vue'


/*= End of Imports =*/
/*=============================================<<<<<*/



/*=============================================>>>>>
=  Load App on Html  =
===============================================>>>>>*/


async function createApp () {

  
  const vuetify = await vuetifyPromise
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

