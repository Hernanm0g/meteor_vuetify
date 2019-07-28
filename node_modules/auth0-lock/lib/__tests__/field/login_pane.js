'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _testUtils = require('testUtils');

var _login_pane = require('connection/database/login_pane');

var _login_pane2 = _interopRequireDefault(_login_pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('field/email/email_pane', function () {
  return (0, _testUtils.mockComponent)('email_pane');
});
jest.mock('field/username/username_pane', function () {
  return (0, _testUtils.mockComponent)('username_pane');
});
jest.mock('field/password/password_pane', function () {
  return (0, _testUtils.mockComponent)('password_pane');
});

jest.mock('connection/database/index');
jest.mock('connection/database/actions');

var mockId = 1;
jest.mock('core/index', function () {
  return {
    id: function id() {
      return mockId;
    }
  };
});

describe('LoginPane', function () {
  var defaultProps = {
    emailInputPlaceholder: 'emailInputPlaceholder',
    forgotPasswordAction: 'forgotPasswordAction',
    i18n: {},
    lock: {},
    passwordInputPlaceholder: 'passwordInputPlaceholder',
    showForgotPasswordLink: true,
    showPassword: true,
    usernameInputPlaceholder: 'usernameInputPlaceholder'
  };
  var databaseIndexMock = require('connection/database/index');

  beforeEach(function () {
    databaseIndexMock.hasScreen.mockImplementation(function () {
      return true;
    });
    databaseIndexMock.forgotPasswordLink.mockImplementation(function () {
      return 'forgotPasswordLink';
    });
  });

  it('renders correctly', function () {
    (0, _testUtils.expectComponent)(_react2.default.createElement(_login_pane2.default, defaultProps)).toMatchSnapshot();
  });
  it('shows header when instructions is not empty', function () {
    (0, _testUtils.expectComponent)(_react2.default.createElement(_login_pane2.default, _extends({}, defaultProps, { instructions: 'instructions' }))).toMatchSnapshot();
  });
  it('shows email pane when user usernameStyle === email', function () {
    (0, _testUtils.expectComponent)(_react2.default.createElement(_login_pane2.default, _extends({}, defaultProps, { usernameStyle: 'email' }))).toMatchSnapshot();
  });
  it('shows username pane when user usernameStyle !== email', function () {
    (0, _testUtils.expectComponent)(_react2.default.createElement(_login_pane2.default, _extends({}, defaultProps, { usernameStyle: 'any' }))).toMatchSnapshot();
    (0, _testUtils.expectComponent)(_react2.default.createElement(_login_pane2.default, _extends({}, defaultProps, { usernameStyle: 'username' }))).toMatchSnapshot();
  });
  it('hides password pane when showPassword===false', function () {
    (0, _testUtils.expectComponent)(_react2.default.createElement(_login_pane2.default, _extends({}, defaultProps, { showPassword: false }))).toMatchSnapshot();
  });
  describe('hides password link', function () {
    it('when showForgotPasswordLink === false', function () {
      (0, _testUtils.expectComponent)(_react2.default.createElement(_login_pane2.default, _extends({}, defaultProps, { showForgotPasswordLink: false }))).toMatchSnapshot();
    });
    it('when lock does not have the screen `forgotPassword`', function () {
      databaseIndexMock.hasScreen.mockImplementation(function (l, screenName) {
        return screenName === 'forgotPassword' ? false : true;
      });
      (0, _testUtils.expectComponent)(_react2.default.createElement(_login_pane2.default, defaultProps)).toMatchSnapshot();
    });
  });
  it('clicking password forgot link calls showResetPasswordActivity() when forgotPasswordLink() is undefined', function () {
    databaseIndexMock.forgotPasswordLink.mockImplementation(function () {
      return undefined;
    });
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_login_pane2.default, defaultProps));
    wrapper.find('a.auth0-lock-alternative-link').simulate('click');

    var actions = require('connection/database/actions');
    var calls = actions.showResetPasswordActivity.mock.calls;

    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe(mockId);
  });
});
