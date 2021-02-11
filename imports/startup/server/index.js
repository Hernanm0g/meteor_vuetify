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


// /*= End of Imports =*/
// /*=============================================<<<<<*/


// /*=============================================>>>>>
// =  SSR App Loader  =
// ===============================================>>>>>*/

// Only in production
// if(Meteor.isProduction){
  VueSSR.createApp = function (context) {
    return new Promise((resolve) => {
      const { app, router } = CreateApp()

      router.push(context.url)
      // context.meta = app.$meta()

      // ...
      const vuetifyStyles = fs.readFileSync( 
        Meteor.absolutePath+'/node_modules/vuetify/dist/vuetify.min.css', 
        {
          encoding:"utf-8"
        }
      );
      const mdiStyles = fs.readFileSync( 
        Meteor.absolutePath+'/node_modules/@mdi/font/css/materialdesignicons.css', 
        {
          encoding:"utf-8"
        }
      );

      context.appendHtml = () => {
        // const {
        //   title, link, style, script, noscript, meta
        // } = context.meta.inject()

        return {
          head: `
          <style type="text/css"> ${vuetifyStyles}</style>
          <style type="text/css"> ${mdiStyles}</style>
          `
        }
      }

      resolve(app)
    })
  }
// }

// /*= End of SSR App Loader =*/
// /*=============================================<<<<<*/