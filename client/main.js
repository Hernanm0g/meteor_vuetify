// Libs
import { Meteor } from 'meteor/meteor';
import Vue from 'vue';

// Vuetify Lib
import vuetify from '/imports/plugins/vuetify' // path to vuetify export

import VueRouter from 'vue-router'
Vue.use(VueRouter)


import VueTracker from 'vue-meteor-tracker';
Vue.use(VueTracker);

import VueMeta from 'vue-meta';
Vue.use(VueMeta)

import Vuex from 'vuex'
Vue.use(Vuex)

// Main app
import App from '/imports/ui/App.vue';

// Routes for view router

import routes from "/imports/routes";

const router = new VueRouter({
  mode: 'history',
  routes, // short for `routes: routes`
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

const checkAuth = function(){
  return !!localStorage.getItem("Meteor.loginToken") && !!localStorage.getItem("Meteor.userId")
}

router.beforeResolve(function(to, from, next) {
  if(to.matched.some( function(record) { return !record.meta.public })){
    if (!router.app.authenticated && !checkAuth()) {
      next({path:"/"});
    } else {
      next()
    }
  } else {
    next();
  }
});

import store from '/imports/store';

import login from '/imports/methods/login'

import globalMixin from '/imports/methods/global'
Vue.mixin(globalMixin);

Meteor.login = login;

Meteor.startup(() => {
  new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
  }).$mount('app');
});
