/**
 *
 * Meteor publications for Clicks Collection
 *
 */
import {Clicks} from '../shared'
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import assert from 'assert'

Meteor.publish("clicks.get.by._ids", function({_ids=[]}){
  try {
    assert(isArray(_ids), "_ids must be an array of _id.")
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

Meteor.publish("clicks.get.all", function(skip=0,limit=10){
  try {
    assert(isNumber(skip), `Skip must be a number. Received (${typeof skip}) ${skip}  instead`)
    assert(isNumber(skip), `Limit must be a number. Received (${typeof limit}) ${limit}  instead`)
    return Clicks.find(
      {},
      {
        skip,
        limit
      }
    )
  } catch (exception) {
    throw new Meteor.Error('500', exception);
  }
});