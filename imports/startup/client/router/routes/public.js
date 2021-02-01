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

// const Home = ()=> import ('../../../../ui/pages/home/Home.vue') // Dynamic async import
import Home from '../../../../ui/pages/home/Home.vue' // Use this in order to enable minimongo
const About = ()=> import ('../../../../ui/pages/about/About.vue') // Dynamic async import
// import About from '../../../../ui/pages/about/About.vue' // Use this in order to enable minimongo

/*= End of Imports =*/
/*=============================================<<<<<*/


const routes = [
  {
    path:"/",
    name:"home",
    meta: {
      layout:"AppBarLayout"
    },
    component:Home
  },
  {
    path:"/about",
    name:"about",
    meta: {
      layout:"AppBarLayout"
    },
    component:About
  }
]

export default routes.map(
  route => {
    // Set meta Public property to false
    route.meta = route.meta || {}
    route.meta.public=true
    return route
  }
)