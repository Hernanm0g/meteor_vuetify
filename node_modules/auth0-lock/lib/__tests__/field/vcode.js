'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('field/vcode', function () {
  var vcode = void 0;
  beforeEach(function () {
    jest.resetModules();

    jest.mock('field/index', function () {
      return {
        setField: jest.fn()
      };
    });

    vcode = require('field/vcode');
  });
  describe('setVcode()', function () {
    it('removes spaces from code', function () {
      vcode.setVcode(_immutable2.default.fromJS({}), ' 123 456 ');

      var mock = require('field/index').setField.mock;

      expect(mock.calls.length).toBe(1);
      expect(mock.calls[0]).toMatchSnapshot();
    });
  });
});
