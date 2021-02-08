
/**
 *
 * Vuex Actions
 *
 */

/*=============================================>>>>>
=  Imports  =
===============================================>>>>>*/

import MeteorLogin from '../../utils/login'
Meteor.login = MeteorLogin;
import createAuth0Client from '@auth0/auth0-spa-js';
import router from '../router'

/*= End of Imports =*/
/*=============================================<<<<<*/


/*--------  Initialize Auth0  --------*/

/**
 * Name: InitializeAuth0
 * Description: Sets the auth0 object. So its methods are available
 * anywhere inside the app
 * @param  {object} {commit}
 */
export const initializeAuth0= async ({commit})=> {
  const {AUTH0} = Meteor.settings.public
  if(!AUTH0){
    return
  }
  const auth0 = await createAuth0Client({
    domain: AUTH0.DOMAIN,
    client_id:AUTH0.CLIENT_ID,
    redirect_uri: AUTH0.CALLBACK,
    audience: AUTH0.AUDIENCE
  })
  commit("setAuth0", auth0)
  
  const userId = Meteor.userId();
  if(userId){
    commit("authenticated", true)
  }
}

export const login = async({state, commit}, signup=false) => {
  if (!state.auth0){
    commit("snack", {text:"error"})
    return
  }
  
  try {
    // commit("loading", true)
    const screen_hint = signup ? "signup" : "signin"
    await state.auth0.loginWithPopup(
      { 
        screen_hint
      }
    );
    
  } catch (e) {
    console.error("Error displaying popup", e);
  } finally {
    // commit("loading", false)
  }
  const user = await state.auth0.getUser();
  if (user){
    Meteor.login(
      user,
      error =>{
        if(error){
          console.error("Error login with auth0", error);
          commit("snack", {text:"error"})
          commit("authenticated", false)
          return
        }
        commit("authenticated", true)
        // If there's a redirect in the route's query
        if(router?.currentRoute?.query?.redirect){
          console.log("HEY");
          router.push(router.currentRoute.query.redirect)
        }

      }
    );
  } else {
    commit("snack", {text:'error'})
  }
  
  return user
}

export const logout = async({state, commit}) => {
  if (!state.auth0){
    commit("snack", {text:"error"})
    return
  }
  const {AUTH0} = Meteor.settings.public
  Meteor.logout();
  commit("loading", true)
  try {
    if(!AUTH0){
      return
    }
    await state.auth0.logout({
      returnTo: AUTH0.CALLBACK,
      client_id: AUTH0.CLIENT_ID
    });
  } catch (e) {
    console.error("Error logging Out", e);
  } finally {
    commit("loading", false)
  }
  return
}