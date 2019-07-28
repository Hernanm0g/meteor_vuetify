'use strict';

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('field/password', function () {
  var passwordField = void 0;
  beforeEach(function () {
    jest.resetModules();
    jest.mock('password-sheriff/lib/policy');
    passwordField = require('field/password');
  });
  describe('validatePassword()', function () {
    it('returns false when there is no password', function () {
      var value = passwordField.validatePassword('');
      expect(value).toBe(false);
    });
    it('returns true when there is no policy', function () {
      var value = passwordField.validatePassword('the-password');
      expect(value).toBe(true);
    });
    it('validates password correctly when there is a policy', function () {
      var model = {
        toJS: jest.fn()
      };
      passwordField.validatePassword('the-password', model);

      var mock = require('password-sheriff/lib/policy').prototype.check.mock;

      expect(mock.calls.length).toBe(1);
      expect(mock.calls[0][0]).toBe('the-password');
      expect(model.toJS).toHaveBeenCalledTimes(1);
    });
  });
});
