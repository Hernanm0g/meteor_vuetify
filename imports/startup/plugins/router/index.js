/**
 *
 * Router logic
 * using vue-router
 *
 */

import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store/index.js' // Maybe you want to check vuex states
import routes from '../../../ui/routes/index.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

/**
 * Name checkAuth
 * Description:
 * Checks if there's a previous session in localStorage
 * @returns {boolean} Whether there's a previous session
 */

router.beforeEach((to, from, next) => {

  if(from?.path == to?.path){
    return next()
  }
  // Check if any route in the route tree is private
  const isPrivate = to.matched.some(record => !record.meta.public)

  // The route is public. Welcome!

  if(!isPrivate) {
    return next()
  }

  // Do some logic to check if user is authenticated
  const authenticated = Meteor.userId()

  // You're not logged in. You shall not pass. flame of Udun...
  if(!authenticated){
    if(to.name=="home"){
      return next()
    }
    return next({
      name:'home',
      query: { 
        redirect: to.fullPath // Maybe you want to redirect user if he logs in
      } 
    })
  }

  //... Do some custom logic to control whether he can go further

  // You're logged in. Welcome!
  next()
})

export default router