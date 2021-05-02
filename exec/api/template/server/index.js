/**
 *
 * Main Templates Collection exporter
 *
 */

import {Templates as Shared} from '../shared'
export const Templates = Shared

Meteor.startup(async function () {

  /*--------  Create Templates Indexes  --------*/

  // Templates.rawCollection().createIndex(
  //   { 
  //     bar : 1 
  //   }
  // );

  /*--------  Load Inital Templates  --------*/
  // if(Templates.find().count()===0){
  //   const fixtures = await import("./fixtures")
  //   const docs = fixtures.default
  //   docs.forEach(doc => Templates.insert(doc));
  // }
  
});

/*--------  publications  --------*/
import './publications'
/*--------  Server Specific Methods--------*/
import './methods'