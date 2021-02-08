import assert from 'assert';
import {UsersMedia} from './index.js';
import fs from 'fs'
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { sinon } from 'meteor/practicalmeteor:sinon';
if(Meteor.isServer){
  Meteor.startup(() => {  
    describe('  - UsersMedia Server Publications API', function(){
      beforeEach(() => {
        sinon.stub(Meteor, 'userId');
        Meteor.userId.returns("some-id");
      });
      afterEach(function () {
        UsersMedia.remove({"meta.test":true})
        Meteor.userId.restore();
      });
    
      it('get.by._ids Publication success', async function () {
        // Set a user id that will be provided to the publish function as `this.userId`,
        // in case you want to test authentication.
        const collector = new PublicationCollector({userId: 'some-id'});

        const file = fs.readFileSync(process.env.PWD+__dirname+'/testImage.png')
        const id1 = await new Promise((resolve, reject) => {
          UsersMedia.write(
            file, 
            {
              fileName: 'testImage.png',
              type: 'image/png',
              meta: {
                name:"Mock1",
                test:true,
              }
            },
            (writeError, fileRef) => {
              if (writeError) {
                reject(writeError);
              } else {
                resolve(fileRef._id)
              }
            }
          );
        });
        const id2 = await new Promise((resolve, reject) => {
          UsersMedia.write(
            file, 
            {
              fileName: 'testImage.png',
              type: 'image/png',
              meta: {
                name:"Mock2",
                test:true,
              }
            },
            (writeError, fileRef) => {
              if (writeError) {
                reject(writeError);
              } else {
                resolve(fileRef._id)
              }
            }
          );
        });
  
        const collection = await collector.collect(
          'usersMedia.get.by._ids', 
          {
            _ids: [id1,id2]
          }, 
        )
        assert(collection.usersMedia.length == 2, `Expected length to be 2, received ${collection.usersMedia.length}`);  
        assert(collection.usersMedia.some(v=>v.meta.name=="Mock1"), `Expected one of documents to have meta.name Mock1`);  
        assert(collection.usersMedia.some(v=>v.meta.name=="Mock2"), `Expected one of documents to have meta.name Mock2`);  
      });
  
      it('get.by._ids Publication Empty _ids', async function () {
        // Set a user id that will be provided to the publish function as `this.userId`,
        // in case you want to test authentication.
        const collector = new PublicationCollector({userId: 'some-id'});

        const file = fs.readFileSync(process.env.PWD+__dirname+'/testImage.png')
        await new Promise((resolve, reject) => {
          UsersMedia.write(
            file, 
            {
              fileName: 'testImage.png',
              type: 'image/png',
              meta: {
                name:"Mock1",
                test:true,
              }
            },
            (writeError, fileRef) => {
              if (writeError) {
                reject(writeError);
              } else {
                resolve(fileRef._id)
              }
            }
          );
        });
        await new Promise((resolve, reject) => {
          UsersMedia.write(
            file, 
            {
              fileName: 'testImage.png',
              type: 'image/png',
              meta: {
                name:"Mock2",
                test:true,
              }
            },
            (writeError, fileRef) => {
              if (writeError) {
                reject(writeError);
              } else {
                resolve(fileRef._id)
              }
            }
          );
        });

        const collection = await collector.collect(
          'usersMedia.get.by._ids', 
          {
            _ids: undefined
          }, 
        )
        assert(collection.usersMedia.length == 0, `Expected length to be 0, received ${collection.usersMedia.length}`);
      });


      it('get.by._ids Publication Error in DB', async function () {

        try {
          // Set a user id that will be provided to the publish function as `this.userId`,
        // in case you want to test authentication.
          const collector = new PublicationCollector({userId: 'some-id'});

          const file = fs.readFileSync(process.env.PWD+__dirname+'/testImage.png')
          await new Promise((resolve, reject) => {
            UsersMedia.write(
              file, 
              {
                fileName: 'testImage.png',
                type: 'image/png',
                meta: {
                  name:"Mock1",
                  test:true,
                }
              },
              (writeError, fileRef) => {
                if (writeError) {
                  reject(writeError);
                } else {
                  resolve(fileRef._id)
                }
              }
            );
          });
          await new Promise((resolve, reject) => {
            UsersMedia.write(
              file, 
              {
                fileName: 'testImage.png',
                type: 'image/png',
                meta: {
                  name:"Mock2",
                  test:true,
                }
              },
              (writeError, fileRef) => {
                if (writeError) {
                  reject(writeError);
                } else {
                  resolve(fileRef._id)
                }
              }
            );
          });

          await collector.collect(
            'usersMedia.get.by._ids', 
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
  
        const file = fs.readFileSync(process.env.PWD+__dirname+'/testImage.png')
        await new Promise((resolve, reject) => {
          UsersMedia.write(
            file, 
            {
              fileName: 'testImage.png',
              type: 'image/png',
              meta: {
                name:"Mock1",
                test:true,
              }
            },
            (writeError, fileRef) => {
              if (writeError) {
                reject(writeError);
              } else {
                resolve(fileRef._id)
              }
            }
          );
        });
        await new Promise((resolve, reject) => {
          UsersMedia.write(
            file, 
            {
              fileName: 'testImage.png',
              type: 'image/png',
              meta: {
                name:"Mock2",
                test:true,
              }
            },
            (writeError, fileRef) => {
              if (writeError) {
                reject(writeError);
              } else {
                resolve(fileRef._id)
              }
            }
          );
        });
  
        const collection = await collector.collect(
          'usersMedia.get.all'
        )
        assert(collection.usersMedia.length >= 2, `Expected length to be >= 2, received ${collection.usersMedia.length}`);  
      });

      it('get.all Publication Error in DB', async function () {

        try {
          // Set a user id that will be provided to the publish function as `this.userId`,
        // in case you want to test authentication.
          const collector = new PublicationCollector({userId: 'some-id'});
  
          const file = fs.readFileSync(process.env.PWD+__dirname+'/testImage.png')
        await new Promise((resolve, reject) => {
          UsersMedia.write(
            file, 
            {
              fileName: 'testImage.png',
              type: 'image/png',
              meta: {
                name:"Mock1",
                test:true,
              }
            },
            (writeError, fileRef) => {
              if (writeError) {
                reject(writeError);
              } else {
                resolve(fileRef._id)
              }
            }
          );
        });
        await new Promise((resolve, reject) => {
          UsersMedia.write(
            file, 
            {
              fileName: 'testImage.png',
              type: 'image/png',
              meta: {
                name:"Mock2",
                test:true,
              }
            },
            (writeError, fileRef) => {
              if (writeError) {
                reject(writeError);
              } else {
                resolve(fileRef._id)
              }
            }
          );
        });
  
          await collector.collect(
            'usersMedia.get.all',
            "Not a Number"
          )
        } catch (error) {
          assert(error.error=="500", `Error expected: 500, obtained ${error.code}`) 
          assert(error.message=="AssertionError [ERR_ASSERTION]: Skip must be a number. Received (string) Not a Number  instead [500]") 
        }        
      });

      it('get.by.user.and.type Publication success', async function () {
        // Set a user id that will be provided to the publish function as `this.userId`,
        // in case you want to test authentication.
        const collector = new PublicationCollector({userId: 'some-id'});
  
        const file = fs.readFileSync(process.env.PWD+__dirname+'/testImage.png')
        await new Promise((resolve, reject) => {
          UsersMedia.write(
            file, 
            {
              fileName: 'testImage.png',
              type: 'image/png',
              meta: {
                user: "some-id",
                type:"avatar",
                name:"Mock1",
                test:true,
              }
            },
            (writeError, fileRef) => {
              if (writeError) {
                reject(writeError);
              } else {
                resolve(fileRef._id)
              }
            }
          );
        });

        const collection = await collector.collect(
          'usersMedia.get.by.user.and.type',
          {type:"avatar"}
        )
        assert(collection.usersMedia.length >= 1, `Expected length to be >= 1, received ${collection.usersMedia.length}`);  
        assert(collection.usersMedia.some(v=>v.meta.name=='Mock1'), `One of the documents must have meta.name=="Mock1`);  
      });

      it('get.by.user.and.type Publication error Not authenticated', async function () {

        try {
          // Set a user id that will be provided to the publish function as `this.userId`,
          // in case you want to test authentication.
          const collector = new PublicationCollector({userId: 'some-id'});
          
          // Mock the userId
          Meteor.userId.restore();
          sinon.stub(Meteor, 'userId');
          Meteor.userId.returns(undefined);

          await collector.collect(
            'usersMedia.get.by.user.and.type',
            {type:"avatar"}
          )
        } catch (error) {
          assert(error.error=="500", `Error expected: 500, obtained ${error.code}`) 
          assert(error.message=="AssertionError [ERR_ASSERTION]: Must be authenticated to subscribe. [500]") 
        }
      });

      it('get.by.user.and.type Publication error No type', async function () {

        try {
          // Set a user id that will be provided to the publish function as `this.userId`,
          // in case you want to test authentication.
          const collector = new PublicationCollector({userId: 'some-id'});

          await collector.collect(
            'usersMedia.get.by.user.and.type',
            {type:undefined}
          )
        } catch (error) {
          assert(error.error=="500", `Error expected: 500, obtained ${error.code}`) 
          assert(error.message=="AssertionError [ERR_ASSERTION]: Type must be a String. Received (undefined) undefined  instead [500]") 
        }
      });

      it('get.by.user.and.type Publication error No Skip', async function () {

        try {
          // Set a user id that will be provided to the publish function as `this.userId`,
          // in case you want to test authentication.
          const collector = new PublicationCollector({userId: 'some-id'});

          await collector.collect(
            'usersMedia.get.by.user.and.type',
            {type:"avatar"},
            "skipMocked"
          )
        } catch (error) {
          assert(error.error=="500", `Error expected: 500, obtained ${error.code}`) 
          assert(error.message=="AssertionError [ERR_ASSERTION]: Skip must be a number. Received (string) skipMocked  instead [500]") 
        }
      });

      it('get.by.user.and.type Publication error No Limit', async function () {

        try {
          // Set a user id that will be provided to the publish function as `this.userId`,
          // in case you want to test authentication.
          const collector = new PublicationCollector({userId: 'some-id'});

          await collector.collect(
            'usersMedia.get.by.user.and.type',
            {type:"avatar"},
            0,
            "limitMocked"
          )
        } catch (error) {
          assert(error.error=="500", `Error expected: 500, obtained ${error.code}`) 
          assert(error.message=="AssertionError [ERR_ASSERTION]: Limit must be a number. Received (string) limitMocked  instead [500]") 
        }
      });

    })
  })
}



