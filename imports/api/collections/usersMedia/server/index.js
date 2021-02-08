/**
 *
 * Main Templates Collection exporter
 *
 */

import {UsersMedia as Shared} from '../shared'
export const UsersMedia = Shared

Meteor.startup(async function () {

  /*--------  Create Templates Indexes  --------*/

  // UsersMedia.rawCollection().createIndexes([
  //   { bar : 1 }
  // ]);

  /*--------  Load Inital Templates  --------*/
  // if(UsersMedia.find().count()===0){
  //   const fixtures = await import("./fixtures")
  //   const docs = fixtures.default
  //   docs.forEach(doc => UsersMedia.insert(doc));
  // }
  
});

/*--------  publications  --------*/
import './publications'
/*--------  Server Specific Methods--------*/
import './methods'