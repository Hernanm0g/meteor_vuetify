import {Clicks} from './index.js'
import assert from 'assert'
if(Meteor.isServer){
  describe('Clicks Server API', function () {
    it("Correct exported Name", function(){
      assert(!!Clicks, `Incorrect exported name. Expected Clicks, received undefined`)
    })
  });
}



