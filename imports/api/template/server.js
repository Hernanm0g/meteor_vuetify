import {Templates as Shared} from './shared'
export const Templates = Shared

Meteor.startup(function () {
  if (Meteor.isServer) {
    Templates.rawCollection().createIndex({ bar : 1 });
  }
});

Meteor.publish("templates.get.byIds", function({_ids=[]}){
  try {
    return Templates.find(
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

Meteor.publish("templates.get.all", function(){
  try {
    return Templates.find({})
  } catch (exception) {
    throw new Meteor.Error('500', exception);
  }
});