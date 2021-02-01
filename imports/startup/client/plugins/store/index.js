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

/*= End of Imports =*/
/*=============================================<<<<<*/

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions
})