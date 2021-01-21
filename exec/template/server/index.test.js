import {Templates} from './index.js'
import assert from 'assert'
if(Meteor.isServer){
  Meteor.startup(()=>{
    describe('Templates Server API', function () {
      it("Correct exported Name", function(){
        assert(!!Templates, `Incorrect exported name. Expected Templates, received undefined`)
      })
    });
  });
}



