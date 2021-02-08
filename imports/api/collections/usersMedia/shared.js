/**
 *
 * Shared Methods for Optimistic UI.
 * Usually Basic CRUD Actios
 *
 */


/*=============================================>>>>>
=  Imports  =
===============================================>>>>>*/

import { FilesCollection } from 'meteor/ostrio:files';
import assert from 'assert'
import SimpleSchema from 'simpl-schema';
import {
  updateSchema
} from './schemas'

/*= End of Imports =*/
/*=============================================<<<<<*/

export const UsersMedia = new FilesCollection({
  collectionName: 'usersMedia',
  storagePath : Meteor.settings.public.storagePath+"/UsersMedia", // The patch where files are inserted
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload(file) {
    // Allow upload files only in png/jpg/jpeg formats
    // Change this in order to allow more file types
    if (/png|jpg|jpeg/i.test(file.extension)) {
      return true;
    }
    return 'Please upload images only.';
  }
});

Meteor.methods({
  "usersMedia.delete"(_id){
    try {
      assert(!!_id, "No _id received for delete.")
      const del = UsersMedia.remove({_id})
      return !!del
    } catch (error) {
      throw new Meteor.Error('400', error);
    }
    
  },
  "usersMedia.update"(item){
    try {
      assert(!!item, "No Object received for update.")
      assert(!!item._id, "No Object._id received for update.")
      assert(!!item.meta, "No meta received for update.")
      const _id = item._id
      item.meta.updated = new Date()
      item.meta.lastUpdatedBy = Meteor.userId()
      
      /*--------  Schema Validation  --------*/
      new SimpleSchema(updateSchema).validate(item);

      delete(item._id)
      const setObject = {}
      for (const key in item.meta) {
        if (Object.hasOwnProperty.call(item.meta, key)) {
          const element = item.meta[key];
          setObject["meta."+key] = element
        }
      }
      delete(item.meta)
      item = Object.assign(item, setObject)
      const upd = UsersMedia.update(
        {
          _id
        },
        {
          $set: item
        }
      )
      return !!upd
    } catch (error) {
      throw new Meteor.Error('400', error);
    }
    
  }
})