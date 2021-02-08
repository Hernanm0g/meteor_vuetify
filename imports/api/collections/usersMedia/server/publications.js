/**
 *
 * Meteor publications for UsersMedia Collection
 *
 */
import {UsersMedia} from '../shared'
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import assert from 'assert'

Meteor.publish("usersMedia.get.by._ids", function({_ids=[]}){
  try {
    assert(isArray(_ids), "_ids must be an array of _id.")
    return UsersMedia.find(
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

Meteor.publish("usersMedia.get.all", function(skip=0,limit=10){
  try {
    assert(isNumber(skip), `Skip must be a number. Received (${typeof skip}) ${skip}  instead`)
    assert(isNumber(skip), `Limit must be a number. Received (${typeof limit}) ${limit}  instead`)
    return UsersMedia.find(
      {},
      {
        skip,
        limit
      }
    ).cursor
  } catch (exception) {
    throw new Meteor.Error('500', exception);
  }
});
Meteor.publish("usersMedia.get.by.user.and.type", function({user, type}, skip=0, limit=10){
  try {
    const authUserId = Meteor.userId()
    assert(authUserId, `Must be authenticated to subscribe.`)
    user = user || authUserId
    assert(!!type && typeof type ==="string", `Type must be a String. Received (${typeof type}) ${type}  instead`)
    assert(isNumber(skip), `Skip must be a number. Received (${typeof skip}) ${skip}  instead`)
    assert(isNumber(limit), `Limit must be a number. Received (${typeof limit}) ${limit}  instead`)
    return UsersMedia.find(
      {
        "meta.user": user,
        "meta.type": type,
        isImage:true,
      },
      {
        skip,
        limit
      }
    ).cursor
  } catch (exception) {
    throw new Meteor.Error('500', exception);
  }
});