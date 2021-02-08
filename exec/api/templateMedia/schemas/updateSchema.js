
/**
 *
 * Upsert Template Schema
 *
 */

export default {
  
  /*--------  Default Props  --------*/
  
  _id: {
    type: String
  },
  meta: {
    type: Object
  },
  "meta.updated": {
    type: Date
  },
  "meta.lastUpdatedBy": {
    type:String,
    optional:true
  },
  "meta.active": {
    type: Boolean,
    optional:true
  },
  "meta.test": {
    type: Boolean,
    optional:true
  },
  

  /*--------  Custom props  --------*/
  "meta.name": {
    type: String,
    optional:true
  }
}