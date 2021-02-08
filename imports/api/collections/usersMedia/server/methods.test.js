import assert from 'assert';
import {UsersMedia} from './index.js';
import fs from 'fs'
if(Meteor.isServer){
  Meteor.startup(() => {
    
    describe('  - UsersMedia Server Methods API', function () {

      afterEach(function () {
        UsersMedia.remove({test:true})
      });

     
      it('update success', async function () {
    
        const name = "templateMock"
    
        /*--------  Insert  --------*/
    
        const file = fs.readFileSync(process.env.PWD+__dirname+'/testImage.png')
        const insertedId = await new Promise((resolve, reject) => {
          UsersMedia.write(
            file, 
            {
              fileName: 'testImage.png',
              type: 'image/png',
              meta: {
                name,
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
    
        Meteor.call(
          "usersMedia.update",
          {
            _id: insertedId,
            meta: {
              name: `updated-${name}`,
              test: true
            }
          }
        )
    
        let updated = UsersMedia.find({ _id: insertedId });
        const updatedCount = updated.count()
        assert(updatedCount==1, `Updating usersMedia Error, inserted ${updatedCount} docs instead of 1`);
        updated = updated.fetch()
        assert(updated[0].meta.name==`updated-${name}`, `Updated document must have name updated-${name}. Received ${updated[0].name} instead`);
        assert(updated[0].meta.test==true, `Updated document must have prop test true . Received ${updated[0].test} instead`);
    
      });
  
      it('update Error. No object received', async function () {
    
        /*--------  Update  --------*/
        try {
          Meteor.call(
            "usersMedia.update",
            undefined
          )
        } catch (error) {
          assert(error.error=="400", `Error expected: 400, obtained ${error.code}`) 
          assert(error.message=="AssertionError [ERR_ASSERTION]: No Object received for update. [400]") 
        }
        
      });
      it('update Error. No object_id received', async function () {
    
        /*--------  Update  --------*/
        try {
          Meteor.call(
            "usersMedia.update",
            {
              name:"mocked"
            }
          )
        } catch (error) {
          assert(error.error=="400", `Error expected: 400, obtained ${error.code}`) 
          assert(error.message=="AssertionError [ERR_ASSERTION]: No Object._id received for update. [400]") 
        }
      });
      it('update Error. No meta received', async function () {
    
        /*--------  Update  --------*/
        try {
          Meteor.call(
            "usersMedia.update",
            {
              _id: "mocked",
              name:"mocked"
            }
          )
        } catch (error) {
          assert(error.error=="400", `Error expected: 400, obtained ${error.code}`) 
          assert(error.message=="AssertionError [ERR_ASSERTION]: No meta received for update. [400]") 
        }
      });
    
      it('delete success', async function () {
    
        const name = "templateMock"
    
        /*--------  Insert  --------*/
    
        const file = fs.readFileSync(process.env.PWD+__dirname+'/testImage.png')
        const insertedId = await new Promise((resolve, reject) => {
          UsersMedia.write(
            file, 
            {
              fileName: 'testImage.png',
              type: 'image/png',
              meta: {
                name,
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

        
        /*--------  Remove  --------*/
        
        let removed = await Meteor.call(
          "usersMedia.delete",
          insertedId
        )
        assert(removed===true, `Doc not removed, expecting 1 doc removed, obtained ${removed}`)
    
      });
    
      it('delete Error. No id provided', async function () {
    
        /*--------  Delete  --------*/
  
        try {
          Meteor.call(
            "usersMedia.delete", 
            undefined
          )
        } catch (error) {
          assert(error.error=="400", `Error expected: 400, obtained ${error.code}`) 
          assert(error.message=="AssertionError [ERR_ASSERTION]: No _id received for delete. [400]") 
        }
      });
    });
  })
}