/**
 *
 * Shared Methods for Optimistic UI.
 * Usually Basic CRUD Actios
 *
 */

export const Templates = new Mongo.Collection("templates");
import assert from 'assert'
import SimpleSchema from 'simpl-schema';
import {
  upsertSchema,
  updateSchema
} from './schemas'
Meteor.methods({
  "templates.upsert"(item){
    try {
      assert(!!item, "No Object received for upsert.")
      item.created = item.created || new Date()
      item.updated = new Date()
      item.lastUpdatedBy = Meteor.userId()
      item.createdBy =  Meteor.userId()
      item.active = item.active !== false ? true : false
      
      /*--------  Schema Validation  --------*/
      new SimpleSchema(upsertSchema).validate(item);

      
      /*--------  Query  --------*/
      
      const ups = Templates.upsert(
        {
          _id: item._id
        },
        item,
        {
          upsert:true
        }
      )
      return ups
    } catch (error) {
      throw new Meteor.Error('400', error);
    }
    
  },
  "templates.delete"(_id){
    try {
      assert(!!_id, "No _id received for delete.")
      const del = Templates.remove({_id})
      return del
    } catch (error) {
      throw new Meteor.Error('400', error);
    }
    
  },
  "templates.update"(item){
    try {
      assert(!!item, "No Object received for update.")
      assert(!!item._id, "No Object._id received for update.")
      const _id = item._id
      item.updated = new Date()
      item.lastUpdatedBy = Meteor.userId()
      
      /*--------  Schema Validation  --------*/
      
      new SimpleSchema(updateSchema).validate(item);

      delete(item._id)
      const upd = Templates.update(
        {
          _id
        },
        {
          $set: item
        }
      )
      return upd
    } catch (error) {
      throw new Meteor.Error('400', error);
    }
    
  }
})