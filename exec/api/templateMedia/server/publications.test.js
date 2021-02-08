import assert from 'assert';
import {TemplatesMedia} from './index.js';
import fs from 'fs'
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
if(Meteor.isServer){
  Meteor.startup(() => {  
    describe('  - TemplatesMedia Server Publications API', function(){
      afterEach(function () {
        TemplatesMedia.remove({"meta.test":true})
      });
  
      it('get.by._ids Publication success', async function () {
        // Set a user id that will be provided to the publish function as `this.userId`,
        // in case you want to test authentication.
        const collector = new PublicationCollector({userId: 'some-id'});

        const file = fs.readFileSync(process.env.PWD+__dirname+'/testImage.png')
        const id1 = await new Promise((resolve, reject) => {
          TemplatesMedia.write(
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
          TemplatesMedia.write(
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
          'templatesMedia.get.by._ids', 
          {
            _ids: [id1,id2]
          }, 
        )
        assert(collection.templatesMedia.length == 2, `Expected length to be 2, received ${collection.templatesMedia.length}`);  
        assert(collection.templatesMedia.some(v=>v.meta.name=="Mock1"), `Expected one of documents to have meta.name Mock1`);  
        assert(collection.templatesMedia.some(v=>v.meta.name=="Mock2"), `Expected one of documents to have meta.name Mock2`);  
      });
  
      it('get.by._ids Publication Empty _ids', async function () {
        // Set a user id that will be provided to the publish function as `this.userId`,
        // in case you want to test authentication.
        const collector = new PublicationCollector({userId: 'some-id'});

        const file = fs.readFileSync(process.env.PWD+__dirname+'/testImage.png')
        await new Promise((resolve, reject) => {
          TemplatesMedia.write(
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
          TemplatesMedia.write(
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
          'templatesMedia.get.by._ids', 
          {
            _ids: undefined
          }, 
        )
        assert(collection.templatesMedia.length == 0, `Expected length to be 0, received ${collection.templatesMedia.length}`);
      });


      it('get.by._ids Publication Error in DB', async function () {

        try {
          // Set a user id that will be provided to the publish function as `this.userId`,
        // in case you want to test authentication.
          const collector = new PublicationCollector({userId: 'some-id'});

          const file = fs.readFileSync(process.env.PWD+__dirname+'/testImage.png')
          await new Promise((resolve, reject) => {
            TemplatesMedia.write(
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
            TemplatesMedia.write(
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
            'templatesMedia.get.by._ids', 
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
          TemplatesMedia.write(
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
          TemplatesMedia.write(
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
          'templatesMedia.get.all'
        )
        assert(collection.templatesMedia.length >= 2, `Expected length to be >= 2, received ${collection.templatesMedia.length}`);  
      });

      it('get.all Publication Error in DB', async function () {

        try {
          // Set a user id that will be provided to the publish function as `this.userId`,
        // in case you want to test authentication.
          const collector = new PublicationCollector({userId: 'some-id'});
  
          const file = fs.readFileSync(process.env.PWD+__dirname+'/testImage.png')
        await new Promise((resolve, reject) => {
          TemplatesMedia.write(
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
          TemplatesMedia.write(
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
            'templatesMedia.get.all',
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



