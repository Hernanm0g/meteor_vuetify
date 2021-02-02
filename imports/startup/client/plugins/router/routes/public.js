/**
 *
 * Public Routes exporter
 * meta: {public:true}
 *
 */



/*=============================================>>>>>
=  Imports  =
===============================================>>>>>*/

// Important
// Dynamic async imports are great for production env as they are
// loaded as they are required.
// But in dev, the will not load minimongo, so you may
// want to use the classic import style:
// import SomePage from 'PagePath'

// const Home = ()=> import ('../../../../../ui/pages/home/Home.vue') // Dynamic async import
import Home from '../../../../../ui/pages/home/Home.vue' // Use this in order to enable minimongo
const About = ()=> import ('../../../../../ui/pages/about/About.vue') // Dynamic async import
// import E404 from '../../../../../ui/pages/404/404.vue' // Use this in order to enable minimongo
const E404 = ()=> import ('../../../../../ui/pages/404/404.vue') // Dynamic async import
// impoSetAuth0 from '../../../../../ui/pages/auth0/SetAuth0.vue' // Use this in order to enable minimongo
const SetAuth0 = ()=> import ('../../../../../ui/pages/auth0/SetAuth0.vue') // Dynamic async import

/*= End of Imports =*/
/*=============================================<<<<<*/


const routes = [
  {
    path:"/",
    name:"home",
    meta: {
      layout:"SideBarLayout",
      fluid:true
    },
    component:Home
  },
  {
    path:"/about",
    name:"about",
    meta: {
      layout:"SideBarLayout",
    },
    component:About
  },
  {
    path:"/setauth0",
    name:"setauth0",
    meta: { 
      layout:"SideBarLayout"
     },
    component: SetAuth0
  },
  {
    path:"*",
    meta: { 
      layout:"BaseLayout"
    },
    component:E404
  },
]

export default routes.map(
  route => {
    // Set meta Public property to false
    route.meta = route.meta || {}
    route.meta.public=true
    return route
  }
)