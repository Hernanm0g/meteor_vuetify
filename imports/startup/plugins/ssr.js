/**
 *
 * Plugins Loader
 *
 */


/*=============================================>>>>>
=  Imports  =
===============================================>>>>>*/

import './vueMeteorTracker' // Vue Meteor Tracker. !Awesome
import './vueMeta' // Vue Meta. !Awesome
import vuetify from './vuetify-ssr'
import router from './router'
import store from './store'
import i18n from './i18n'
/*= End of Imports =*/
/*=============================================<<<<<*/

export {
  router,
  store,
  vuetify,
  i18n
}
