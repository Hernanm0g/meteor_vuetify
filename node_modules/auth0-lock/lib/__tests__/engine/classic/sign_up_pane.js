'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _testUtils = require('testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('field/email/email_pane', function () {
  return (0, _testUtils.mockComponent)('email_pane');
});
jest.mock('field/password/password_pane', function () {
  return (0, _testUtils.mockComponent)('password_pane');
});
jest.mock('field/username/username_pane', function () {
  return (0, _testUtils.mockComponent)('username_pane');
});
jest.mock('field/custom_input', function () {
  return (0, _testUtils.mockComponent)('custom_input');
});

var getComponent = function getComponent() {
  return require('engine/classic/sign_up_pane').default;
};

describe('SignUpPane', function () {
  beforeEach(function () {
    jest.resetModules();

    jest.mock('connection/database/index', function () {
      return {
        additionalSignUpFields: function additionalSignUpFields() {
          return [];
        },
        databaseConnectionRequiresUsername: function databaseConnectionRequiresUsername() {
          return false;
        },
        passwordStrengthPolicy: function passwordStrengthPolicy() {
          return 'passwordStrengthPolicy';
        }
      };
    });
  });
  var defaultProps = {
    i18n: {
      str: function str() {
        for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
          keys[_key] = arguments[_key];
        }

        return keys.join(',');
      },
      html: function html() {
        for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          keys[_key2] = arguments[_key2];
        }

        return keys.join(',');
      }
    },
    model: 'model',
    emailInputPlaceholder: 'emailInputPlaceholder',
    onlyEmail: true,
    passwordInputPlaceholder: 'passwordInputPlaceholder',
    passwordStrengthMessages: 'passwordStrengthMessages',
    usernameInputPlaceholder: 'usernameInputPlaceholder'
  };
  it('renders only email by default', function () {
    var Component = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
  });
  it('shows header when instructions are available', function () {
    var Component = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(Component, _extends({}, defaultProps, { instructions: 'instructions' }))).toMatchSnapshot();
  });
  describe('onlyEmail is false', function () {
    it('shows PasswordPane', function () {
      var Component = getComponent();

      (0, _testUtils.expectComponent)(_react2.default.createElement(Component, _extends({}, defaultProps, { onlyEmail: false }))).toMatchSnapshot();
    });
    it('shows custom fields when additionalSignUpFields returns additional fields', function () {
      require('connection/database/index').additionalSignUpFields = function () {
        return [{ get: function get(key) {
            return key + '1';
          } }, { get: function get(key) {
            return key + '2';
          } }];
      };
      var Component = getComponent();

      (0, _testUtils.expectComponent)(_react2.default.createElement(Component, _extends({}, defaultProps, { onlyEmail: false }))).toMatchSnapshot();
    });
    it('shows UsernamePane when databaseConnectionRequiresUsername is true', function () {
      require('connection/database/index').databaseConnectionRequiresUsername = function () {
        return true;
      };
      var Component = getComponent();

      (0, _testUtils.expectComponent)(_react2.default.createElement(Component, _extends({}, defaultProps, { onlyEmail: false }))).toMatchSnapshot();
    });
  });
});
