/**
 *
 * Vuex Mutations
 *
 */


/*=============================================>>>>>
=  Imports  =
===============================================>>>>>*/


import Vue from 'vue';

/*= End of Imports =*/
/*=============================================<<<<<*/


/*=============================================>>>>>
=  Mutations  =
===============================================>>>>>*/


/*--------  Authenticated  --------*/

export const authenticated = (state, auth) => {
  state.authenticated = auth;
}

/*----------- BreadCrumbs -----------*/

export const updateCrumbs = (state, crumbs) => {
  if (!crumbs) {
    Vue.set(state, "crumbs", [])
    return;
  }
  let c = JSON.parse(JSON.stringify(state.crumbs));
  c.splice(crumbs.position, 10);
  c[crumbs.position] = crumbs;
  Vue.set(state, "crumbs", c);
}

/*----------- Snack Bar for notifications -----------*/

export const snack = (state, {text,color}) => {
  state.snack.active = true
  if (text == "error") {
    state.snack.text = "Ha habido un error, vuelve a intentarlo."
    state.snack.color = "error"
    return
  }
  if (text == "confirm") {
    state.snack.text = "Por favor, confirma los campos en rojo."
    state.snack.color = "error"
    return
  }
  state.snack.text = text,
  state.snack.color = color
}


/*--------  Deactivate Snack  --------*/

export const deactivateSnack = (state) => {
  state.snack.active=false;
}


/*--------  open Confirmation dialog  --------*/

export const confirm = (state, {title, text}) => {
  state.confirm.dialog = true,
  state.confirm.text = text,
  state.confirm.title = title
}

/*--------  Close Confirmation dialog  --------*/

export const deactivateConfirm = (state) => {
  state.confirm.dialog=false;
}


/*--------  Set Auth0  --------*/

export const setAuth0 = (state, auth0) => {
  state.auth0 = auth0
}

/*-------- Set i18n ------------*/
export const setLanguage = (state, lang) => {
  state.language = lang
  i18n.locale = lang
}


/*= End of Mutations =*/
/*=============================================<<<<<*/









