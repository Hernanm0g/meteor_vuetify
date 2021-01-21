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
  vuetify, 
} from './plugins'

/*--------  Main App  --------*/


import App from '../../ui/App.vue'


/*= End of Imports =*/
/*=============================================<<<<<*/



/*=============================================>>>>>
=  Load App on Html  =
===============================================>>>>>*/

Meteor.startup(() => {
  new Vue({
    router,
    vuetify,
    render: h => h(App),
  }).$mount('#app')
})


/*= End of Load App on Html =*/
/*=============================================<<<<<*/

