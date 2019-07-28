'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _field2 = require('../../field');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createModel = function createModel(field) {
  var _field;

  return _immutable2.default.fromJS({
    field: (_field = {}, _field[field] = 'old_test_' + field, _field)
  });
};

var testField = function testField(field, maxLength) {
  var m = createModel(field);
  expect((0, _field2.setField)(m, field, '').toJS().field[field].valid).toBe(false);
  expect((0, _field2.setField)(m, field, 'test_value').toJS().field[field].valid).toBe(true);
  if (maxLength) {
    expect((0, _field2.setField)(m, field, 'a'.repeat(maxLength + 1)).toJS().field[field].valid).toBe(false);
  }
};
describe('field/index', function () {
  describe('default validation', function () {
    it('validates family_name', function () {
      testField('family_name', 150);
    });
    it('validates family_name', function () {
      testField('given_name', 150);
    });
    it('validates name', function () {
      testField('name', 300);
    });
    it('validates nickname', function () {
      testField('nickname', 300);
    });
    it('validates other fields', function () {
      testField('test');
    });
  });
});
