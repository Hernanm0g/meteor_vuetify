/**
 *
 * Shared Methods for Optimistic UI.
 * Usually Basic CRUD Actios
 *
 */

export const Clicks = new Mongo.Collection("clicks");
import assert from 'assert'
import SimpleSchema from 'simpl-schema';
import {
  upsertSchema,
  updateSchema,
  incSchema
} from './schemas'
Meteor.methods({
  "clicks.upsert"(item){
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
      
      const ups = Clicks.upsert(
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
  "clicks.delete"(_id){
    try {
      assert(!!_id, "No _id received for delete.")
      const del = Clicks.remove({_id})
      return del
    } catch (error) {
      throw new Meteor.Error('400', error);
    }
    
  },
  "clicks.update"(item){
    try {
      assert(!!item, "No Object received for update.")
      assert(!!item._id, "No Object._id received for update.")
      const _id = item._id
      item.updated = new Date()
      item.lastUpdatedBy = Meteor.userId()
      
      /*--------  Schema Validation  --------*/
      
      new SimpleSchema(updateSchema).validate(item);

      delete(item._id)
      const upd = Clicks.update(
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
  },
  "clicks.inc"(item){
    try {
      assert(!!item, "No Object received for update.")
      assert(!!item._id, "No Object._id received for update.")
      const _id = item._id

      /*--------  Schema Validation  --------*/
      new SimpleSchema(incSchema).validate(item);

      delete(item._id)
      const upd = Clicks.update(
        {
          _id
        },
        {
          $inc: item
        }
      )
      return upd
    } catch (error) {
      throw new Meteor.Error('400', error);
    }
  }
})