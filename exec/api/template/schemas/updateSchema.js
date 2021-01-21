
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
  updated: {
    type: Date
  },
  lastUpdatedBy: {
    type:String,
    optional:true
  },
  active: {
    type: Boolean,
    optional:true
  },
  test: {
    type: Boolean,
    optional:true
  },

  /*--------  Custom props  --------*/
  
  name: {
    type: String,
    optional:true
  },
  
}