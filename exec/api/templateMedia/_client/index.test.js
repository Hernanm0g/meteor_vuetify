import { Meteor } from 'meteor/meteor';
import {TemplatesMedia} from './index.js'
import assert from 'assert'
if(Meteor.isClient){
  Meteor.startup(()=>{
    describe('  - TemplatesMedia Client API', function () {
      it("Correct exported Name", function(){
        assert(!!TemplatesMedia, `Incorrect exported name. Expected TemplatesMedia, received undefined`)
      })
    });
  });
}



