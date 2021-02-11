import assert from 'assert';
describe('  - Inside', function(){
  it("someting", function(){
    console.log("Adasd");
    assert.strictEqual(Meteor.isClient, false);
  })
})