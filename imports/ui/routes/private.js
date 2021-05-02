/**
 *
 * Private Routes exporter
 * meta: {public:false}
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

const Profile= ()=> import ('../pages/profile/Profile.vue') // Dynamic async import
// import Profile from '../pages/profile/Profile.vue' // Use this in order to enable mongol


/*= End of Imports =*/
/*=============================================<<<<<*/


const routes = [
  {
    path:"/profile",
    name:"profile",
    meta: {
      layout:"AppBarLayout"
    },
    component:Profile
  },
]

export default routes.map(
  route => {
    // Set meta Public property to false
    route.meta = route.meta || {}
    route.meta.public=false
    return route
  }
)