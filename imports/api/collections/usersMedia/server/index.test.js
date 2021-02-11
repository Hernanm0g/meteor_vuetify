import {UsersMedia} from './index.js'
import assert from 'assert'
if(Meteor.isServer){
  describe('UsersMedia Server API', function () {
    it("Correct exported Name", function(){
      assert(!!UsersMedia, `Incorrect exported name. Expected UsersMedia, received undefined`)
    })
  });
}



