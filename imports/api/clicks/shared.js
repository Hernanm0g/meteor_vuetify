export const Clicks = new Mongo.Collection("clicks");

Meteor.methods({
  "clicks.upsert"(item){
    if(!item) return
    item.created = item.created || new Date()
    item.updated = new Date()
    item.lastUpdatedBy = Meteor.userId()
    item.createdBy =  Meteor.userId()
    item.active = item.active !== false ? true : false
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
  },
  "clicks.delete"(_id){
    if(!_id) return;
    const del = Clicks.remove({_id})
    return del
  },
  "clicks.update"(item){
    if(!item) return
    if (!item._id) return
    const _id = item._id
    delete(item._id)
    item.updated = new Date()
    item.lastUpdatedBy = Meteor.userId()
    const upd = Clicks.update(
      {
        _id
      },
      {
        $set: item
      }
    )
    return upd
  },
  "clicks.set.active"({_id, active}){
    if(!_id) return;
    const upd = Clicks.update(
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
  },
  "clicks.increment"({_id}){
    if(!_id) return;
    const upd = Clicks.update(
      {
        _id
      },
      {
        $inc: {
          times : 1
        }
      }
    )
    return upd
  }
})