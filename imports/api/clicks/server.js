import {Clicks as Shared} from './shared'
export const Clicks = Shared

Meteor.startup(function () {
  // Clicks.rawCollection().createIndex({ bar : 1 });
});

Meteor.publish("clicks.get.byIds", function({_ids=[]}){
  try {
    return Clicks.find(
      {
        _id: {
          $in: _ids
        }
      }
    )
  } catch (exception) {
    throw new Meteor.Error('500', exception);
  }
});

Meteor.publish("clicks.get.all", function(){
  try {
    return Clicks.find({})
  } catch (exception) {
    throw new Meteor.Error('500', exception);
  }
});