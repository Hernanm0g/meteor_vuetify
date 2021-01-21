
/**
 *
 * Upsert Template Schema
 *
 */

export default {
  
  /*--------  Default Props  --------*/
  
  _id: {
    type: String,
    optional:true
  },
  created: {
    type: Date
  },
  updated: {
    type: Date
  },
  createdBy: {
    type:String,
    optional:true
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