export const Templates = new Mongo.Collection("templates");

Meteor.methods({
  "templates.upsert"(item){
    if(!item) return
    item.created = item.created || new Date()
    item.updated = new Date()
    item.lastUpdatedBy = Meteor.userId()
    item.createdBy =  Meteor.userId()
    item.active = item.active !== false ? true : false
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
  },
  "templates.delete"(_id){
    if(!_id) return;
    const del = Templates.remove({_id})
    return del
  },
  "templates.update"(item){
    if(!item) return
    if (!item._id) return
    const _id = item._id
    delete(item._id)
    item.updated = new Date()
    item.lastUpdatedBy = Meteor.userId()
    const upd = Templates.update(
      {
        _id
      },
      {
        $set: item
      }
    )
    return upd
  },
  "templates.set.active"({_id, active}){
    if(!_id) return;
    const upd = Templates.update(
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