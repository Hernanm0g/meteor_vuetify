/**
 *
 * Server Collections importer
 * 
 *
 */


/*=============================================>>>>>
=  Imports  =
===============================================>>>>>*/

/*--------  Api Collections  --------*/

import '../../api/server/collections'


/*--------  Login  --------*/

import './login/registerLoginHandler'


/*--------  SSR  --------*/

import { VueSSR } from 'meteor/akryum:vue-ssr'
import CreateApp from '../createAppSsr'


/*--------  utils  --------*/
import fs from 'fs'


// Load styles
let nodeModulesPath = Meteor.absolutePath

if (Meteor.isProduction && !(process.env.npm_lifecycle_script?.includes("--production"))) {
  nodeModulesPath += "/npm"
}

const vuetifyStyles = fs.readFileSync( 
  nodeModulesPath+'/node_modules/vuetify/dist/vuetify.min.css', 
  {
    encoding:"utf-8"
  }
);

const mdiStyles = fs.readFileSync( 
  nodeModulesPath+'/node_modules/@mdi/font/css/materialdesignicons.css', 
  {
    encoding:"utf-8"
  }
);

// /*= End of Imports =*/
// /*=============================================<<<<<*/


// /*=============================================>>>>>
// =  SSR App Loader  =
// ===============================================>>>>>*/

// Only in production ?
// if(Meteor.isProduction){
  VueSSR.createApp = function (context) {
    return new Promise((resolve) => {

      // get app, router, ...
      const { app, router } = CreateApp()

      router.push(context.url).catch(()=>{});

      // Get vue-meta elements
      context.meta = app.$meta()

      context.appendHtml = () => {
        const {
          title, 
          // link, 
          style, 
          // script, 
          // noscript, 
          meta
        } = context.meta.inject()

        return {
          head: `
          ${meta.text()}
          ${title.text()}
          <style data-vue-meta="vuetify" id="vuetify-theme-stylesheet" type="text/css" nonce="undefined"> ${vuetifyStyles}</style>
          ${style.text()}
          `
        }
      }

      resolve(app)
    })
  }
// }

/*= End of SSR App Loader =*/
/*=============================================<<<<<*/