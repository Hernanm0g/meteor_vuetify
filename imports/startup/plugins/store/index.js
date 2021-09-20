/**
 *
 * State Management
 * using vuex
 *
 */

/*=============================================>>>>>
=  Imports  =
===============================================>>>>>*/


import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as actions from './actions'
import * as mutations from './mutations'
import createPersistedState from "vuex-persistedstate";

/*= End of Imports =*/
/*=============================================<<<<<*/

Vue.use(Vuex)

var plugins = []
if (Meteor.isClient) {
  plugins.push(createPersistedState())
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins,
})