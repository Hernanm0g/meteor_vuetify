import Avatars from './shared'
export default Avatars

Meteor.startup(function () {
  // Avatars.rawCollection().createIndex({ bar : 1 });
});

Meteor.publish("avatars.get.byIds", function({_ids=[]}){
  try {
    return Avatars.find(
      {
        _id: {
          $in: _ids
        }
      }
    ).cursor
  } catch (exception) {
    throw new Meteor.Error('500', exception);
  }
});

Meteor.publish("avatars.get.all", function(){
  try {
    return Avatars.find({}).cursor
  } catch (exception) {
    throw new Meteor.Error('500', exception);
  }
});