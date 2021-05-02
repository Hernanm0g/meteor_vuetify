/**
 *
 * Main Templates Collection exporter
 *
 */

import {TemplatesMedia as Shared} from '../shared'
export const TemplatesMedia = Shared

Meteor.startup(async function () {

  /*--------  Create Templates Indexes  --------*/

  // TemplatesMedia.rawCollection().createIndexes(
  //   { 
  //     bar : 1 
  //   }
  // );

  /*--------  Load Inital Templates  --------*/
  // if(TemplatesMedia.find().count()===0){
  //   const fixtures = await import("./fixtures")
  //   const docs = fixtures.default
  //   docs.forEach(doc => TemplatesMedia.insert(doc));
  // }
  
});

/*--------  publications  --------*/
import './publications'
/*--------  Server Specific Methods--------*/
import './methods'