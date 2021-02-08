/**
 *
 * Meteor publications for TemplatesMedia Collection
 *
 */
import {TemplatesMedia} from '../shared'
import isArray from 'lodash/isArray'
import isNumber from 'lodash/isNumber'
import assert from 'assert'

Meteor.publish("templatesMedia.get.by._ids", function({_ids=[]}){
  try {
    assert(isArray(_ids), "_ids must be an array of _id.")
    return TemplatesMedia.find(
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

Meteor.publish("templatesMedia.get.all", function(skip=0,limit=10){
  try {
    assert(isNumber(skip), `Skip must be a number. Received (${typeof skip}) ${skip}  instead`)
    assert(isNumber(skip), `Limit must be a number. Received (${typeof limit}) ${limit}  instead`)
    return TemplatesMedia.find(
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