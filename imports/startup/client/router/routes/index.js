/**
 *
 * Routes Module
 * Exports routes to the router script
 * 
 */

import publicRoutes from './public'
import privateRoutes from './private'

export default [
  ...publicRoutes,
  ...privateRoutes
]