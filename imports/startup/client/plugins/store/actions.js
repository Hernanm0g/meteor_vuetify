
/**
 *
 * Vuex Actions
 *
 */

/*=============================================>>>>>
=  Imports  =
===============================================>>>>>*/

import MeteorLogin from '../../../../utils/login'
Meteor.login = MeteorLogin;
import createAuth0Client from '@auth0/auth0-spa-js';
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
  const {AUTH0} = await import ('../../../../auth0-variables')
  const auth0 = await createAuth0Client({
    domain: AUTH0.DOMAIN,
    client_id:AUTH0.CLIENT_ID,
    redirect_uri: AUTH0.CALLBACK,
    audience: AUTH0.AUDIENCE
  })
  commit("setAuth0", auth0)
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
  // console.log("user", user);
  if (user){
    Meteor.login(user);
  } else {
    // commit("snack", {text:'error'})
  }
  
  return user
}

export const logout = async({state, commit}) => {
  if (!state.auth0){
    commit("snack", {text:"error"})
    return
  }
  const {AUTH0} = await import ('../auth0-variables.js')
  Meteor.logout();
  commit("loading", true)
  try {
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