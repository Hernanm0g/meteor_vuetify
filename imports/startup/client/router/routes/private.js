/**
 *
 * Private Routes exporter
 * meta: {public:false}
 *
 */


const routes = [

]

export default routes.map(
  route => {
    // Set meta Public property to false
    route.meta = route.meta || {}
    route.meta.public=false
    return route
  }
)