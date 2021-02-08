/**
 *
 * Main Clicks Collection exporter
 *
 */

import {Clicks as Shared} from '../shared'
export const Clicks = Shared

Meteor.startup(async function () {

  /*--------  Create Clicks Indexes  --------*/

  // Clicks.rawCollection().createIndexes([
  //   { bar : 1 }
  // ]);

  /*--------  Load Inital Clicks  --------*/
  // if(Clicks.find().count()===0){
  //   const fixtures = await import("./fixtures")
  //   const docs = fixtures.default
  //   docs.forEach(doc => Clicks.insert(doc));
  // }
  
});

/*--------  publications  --------*/
import './publications'
/*--------  Server Specific Methods--------*/
import './methods'