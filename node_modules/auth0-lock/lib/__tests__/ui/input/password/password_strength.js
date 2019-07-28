'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _password_strength = require('../../../../ui/input/password/password_strength');

var _password_strength2 = _interopRequireDefault(_password_strength);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('PasswordStrength', function () {
  beforeEach(function () {
    jest.resetModules();
  });
  describe('validatePassword()', function () {
    it('validates password correctly with invalid password', function () {
      var policy = {
        toJS: function toJS() {
          return {
            length: {
              minLength: 20
            }
          };
        }
      };
      var messages = { foo: 'the-message' };
      var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_password_strength2.default, { policy: policy, password: 'the-password', messages: messages }));
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
