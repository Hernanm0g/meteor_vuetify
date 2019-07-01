import { FilesCollection } from 'meteor/ostrio:files';
const Avatars = new FilesCollection({
  collectionName: 'Avatars',
  storagePath : Meteor.absolutePath+"/private/Avatars", // Change on production mode
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

if (Meteor.isServer) {
  // Publish methods when autopublish is off
  // Meteor.publish('avatars.get.mine', function (id) {
  //   try {
  //     return Avatars.find({_id:id}).cursor;
  //   } catch (exception) {
  //     throw new Meteor.Error('500', exception);
  //   }
  // });
}
