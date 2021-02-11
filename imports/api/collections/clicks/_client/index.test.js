import { Meteor } from 'meteor/meteor';
import {Clicks} from './index.js'
import assert from 'assert'
if(Meteor.isClient){
  describe('  - Clicks Client API', function () {
    it("Correct exported Name", function(){
      assert(!!Clicks, `Incorrect exported name. Expected Clicks, received undefined`)
    })
  });
}



