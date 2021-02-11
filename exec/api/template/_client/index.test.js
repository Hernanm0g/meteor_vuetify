import { Meteor } from 'meteor/meteor';
import {Templates} from './index.js'
import assert from 'assert'
if(Meteor.isClient){
  describe('  - Templates Client API', function () {
    it("Correct exported Name", function(){
      assert(!!Templates, `Incorrect exported name. Expected Templates, received undefined`)
    })
  });
}



