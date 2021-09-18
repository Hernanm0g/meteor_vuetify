/**
 *
 * Vuex Initial States
 *
 */


const state = {
  loading : false,
  snack : {
    active:false,
    text:"Hello!!",
    color: "success"
  },
  confirm: {
    dialog: false,
    title:"",
    text:"",
  },
  crumbs : [],
  authenticated:false,
  auth0:undefined,
  language: Meteor.settings.public.defaultLocale
}

export default state