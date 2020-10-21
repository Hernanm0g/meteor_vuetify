import Vue from 'vue'
import Vuex from 'vuex'
import state from '/imports/store/state'
// import * as getters from '/imports/store/getters'
import * as actions from '/imports/store/actions'
import * as mutations from '/imports/store/mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions
})
