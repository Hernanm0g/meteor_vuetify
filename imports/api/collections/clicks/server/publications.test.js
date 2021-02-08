import { Meteor } from 'meteor/meteor';
import assert from 'assert';
import {Clicks} from './index.js';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
if(Meteor.isServer){
  Meteor.startup(() => {  
    describe('  - Clicks Server Publications API', function(){
      afterEach(function () {
        Clicks.remove({test:true})
      });
  
      it('get.by._ids Publication success', async function () {
        // Set a user id that will be provided to the publish function as `this.userId`,
        // in case you want to test authentication.
        const collector = new PublicationCollector({userId: 'some-id'});
  
        const id1 = Clicks.insert(
          {
            name:"Mock1",
            test:true
          }
        )
        const id2 = Clicks.insert(
          {
            name:"Mock2",
            test:true
          },
        )
  
        const collection = await collector.collect(
          'clicks.get.by._ids', 
          {
            _ids: [id1,id2]
          }, 
        )
        assert(collection.clicks.length == 2, `Expected length to be 2, received ${collection.clicks.length}`);  
        assert(collection.clicks.some(v=>v.name=="Mock1"), `Expected one of documents to have name Mock1`);  
        assert(collection.clicks.some(v=>v.name=="Mock2"), `Expected one of documents to have name Mock2`);  
      });
  
      it('get.by._ids Publication Empty _ids', async function () {
        // Set a user id that will be provided to the publish function as `this.userId`,
        // in case you want to test authentication.
        const collector = new PublicationCollector({userId: 'some-id'});

        Clicks.insert(
          {
            name:"Mock1",
            test:true
          }
        )
        Clicks.insert(
          {
            name:"Mock2",
            test:true
          },
        )

        const collection = await collector.collect(
          'clicks.get.by._ids', 
          {
            _ids: undefined
          }, 
        )
        assert(collection.clicks.length == 0, `Expected length to be 0, received ${collection.clicks.length}`);
      });


      it('get.by._ids Publication Error in DB', async function () {

        try {
          // Set a user id that will be provided to the publish function as `this.userId`,
        // in case you want to test authentication.
          const collector = new PublicationCollector({userId: 'some-id'});

          Clicks.insert(
            {
              name:"Mock1",
              test:true
            }
          )
          Clicks.insert(
            {
              name:"Mock2",
              test:true
            },
          )

          await collector.collect(
            'clicks.get.by._ids', 
            {
              _ids: "Not an array"
            }, 
          )
        } catch (error) {
          assert(error.error=="500", `Error expected: 500, obtained ${error.code}`) 
          assert(error.message=="AssertionError [ERR_ASSERTION]: _ids must be an array of _id. [500]") 
        }
        
      });

      it('get.all Publication success', async function () {
        // Set a user id that will be provided to the publish function as `this.userId`,
        // in case you want to test authentication.
        const collector = new PublicationCollector({userId: 'some-id'});
  
        Clicks.insert(
          {
            name:"Mock1",
            test:true
          }
        )
        Clicks.insert(
          {
            name:"Mock2",
            test:true
          },
        )
  
        const collection = await collector.collect(
          'clicks.get.all'
        )
        assert(collection.clicks.length >= 2, `Expected length to be >= 2, received ${collection.clicks.length}`);  
      });

      it('get.all Publication Error in DB', async function () {

        try {
          // Set a user id that will be provided to the publish function as `this.userId`,
        // in case you want to test authentication.
          const collector = new PublicationCollector({userId: 'some-id'});
  
          Clicks.insert(
            {
              name:"Mock1",
              test:true
            }
          )
          Clicks.insert(
            {
              name:"Mock2",
              test:true
            },
          )
  
          await collector.collect(
            'clicks.get.all',
            "Not a Number"
          )
        } catch (error) {
          assert(error.error=="500", `Error expected: 500, obtained ${error.code}`) 
          assert(error.message=="AssertionError [ERR_ASSERTION]: Skip must be a number. Received (string) Not a Number  instead [500]") 
        }        
      });
    })
  })
}



