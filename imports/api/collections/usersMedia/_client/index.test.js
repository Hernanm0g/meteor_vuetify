import { Meteor } from 'meteor/meteor';
import {UsersMedia} from './index.js'
import assert from 'assert'
if(Meteor.isClient){
  describe('  - UsersMedia Client API', function () {
    it("Correct exported Name", function(){
      assert(!!UsersMedia, `Incorrect exported name. Expected UsersMedia, received undefined`)
    })
  });
}



