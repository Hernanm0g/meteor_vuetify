import { FilesCollection } from 'meteor/ostrio:files';
const Avatars = new FilesCollection({
  collectionName: 'Avatars',
  storagePath : Meteor.absolutePath+"/private/Avatars", // Change this on production mode
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload(file) {
    // Allow upload files only in png/jpg/jpeg formats
    if (/png|jpg|jpeg/i.test(file.extension)) {
      return true;
    }
    return 'Please upload images only.';
  }
});
export default Avatars; // To be imported in other files

Meteor.methods({
  "avatars.upsert"(item){
    if(!item) return
    item.created = item.created || new Date()
    item.updated = new Date()
    item.lastUpdatedBy = Meteor.userId()
    item.createdBy =  Meteor.userId()
    item.active = item.active !== false ? true : false
    const ups = Avatars.upsert(
      {
        _id: item._id
      },
      item,
      {
        upsert:true
      }
    )
    return ups
  },
  "avatars.delete"(_id){
    if(!_id) return;
    const del = Avatars.remove({_id})
    return del
  },
  "avatars.update"(item){
    if(!item) return
    if (!item._id) return
    const _id = item._id
    delete(item._id)
    item.updated = new Date()
    item.lastUpdatedBy = Meteor.userId()
    const upd = Avatars.update(
      {
        _id
      },
      {
        $set: item
      }
    )
    return upd
  },
  "avatars.set.active"({_id, active}){
    if(!_id) return;
    const upd = Avatars.update(
      {
        _id
      },
      {
        $set: {
          active,
          updated: new Date(),
          lastUpdatedBy: Meteor.userId()
        }
      }
    )
    return upd
  }
})