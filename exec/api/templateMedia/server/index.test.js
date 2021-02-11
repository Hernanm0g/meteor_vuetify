import {TemplatesMedia} from './index.js'
import assert from 'assert'
if(Meteor.isServer){
  describe('TemplatesMedia Server API', function () {
    it("Correct exported Name", function(){
      assert(!!TemplatesMedia, `Incorrect exported name. Expected TemplatesMedia, received undefined`)
    })
  });
}



