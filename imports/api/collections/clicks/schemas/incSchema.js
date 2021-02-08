
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

  /*--------  Custom props  --------*/
  
  times: {
    type: Number,
    min:1
  },
  
}