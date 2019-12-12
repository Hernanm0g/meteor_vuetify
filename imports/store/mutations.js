// Loading

import Vue from 'vue';

export const authenticated = (state, auth) => {
  state.authenticated = auth;
}
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
export const snack = (state, {text,color}) => {
  state.snackbar = true
  if (text == "error") {
    state.snacktext = "Ha habido un error, vuelve a intentarlo."
    state.snackbarColor = "error"
    return
  }
  if (text == "confirm") {
    state.snacktext = "Por favor, confirma los campos en rojo."
    state.snackbarColor = "error"
    return
  }
  state.snacktext = text,
  state.snackbarColor = color
}

export const deactivateSnack = (state) => {
  state.snackbar=false;
}

export const confirm = (state, confirm) => {
  state.confirmDialog = true,
  state.confirmText = confirm.text,
  state.confirmTitle = confirm.title
}

export const deactivateConfirm = (state, confirm) => {
  state.confirmDialog=false;
}
