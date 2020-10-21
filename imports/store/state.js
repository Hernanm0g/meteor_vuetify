// Initial states
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
  auth0:undefined
}

export default state
