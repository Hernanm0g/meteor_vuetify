'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _testUtils = require('testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('ui/input/username_input', function () {
  return (0, _testUtils.mockComponent)('username_input');
});

var getComponent = function getComponent() {
  return require('field/username/username_pane').default;
};

describe('UsernamePane', function () {
  var defaultProps = {
    i18n: {
      str: function str() {
        for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
          keys[_key] = arguments[_key];
        }

        return keys.join(',');
      }
    },
    lock: {},
    placeholder: 'placeholder',
    validateFormat: false,
    usernameStyle: 'any',
    showForgotPasswordLink: true,
    showPassword: true,
    usernameInputPlaceholder: 'usernameInputPlaceholder'
  };

  beforeEach(function () {
    jest.resetModules();

    var mockUsername = 'username';
    jest.mock('field/index', function () {
      return {
        username: function username() {
          return mockUsername;
        },
        getFieldValue: function getFieldValue() {
          return mockUsername;
        },
        isFieldVisiblyInvalid: function isFieldVisiblyInvalid() {
          return true;
        }
      };
    });

    jest.mock('field/username', function () {
      return {
        getUsernameValidation: function getUsernameValidation() {
          return undefined;
        },
        usernameLooksLikeEmail: function usernameLooksLikeEmail() {
          return true;
        },
        setUsername: 'setUsername'
      };
    });

    jest.mock('core/index', function () {
      return {
        id: function id() {
          return 1;
        },
        ui: {
          avatar: function avatar() {
            return false;
          },
          allowAutocomplete: function allowAutocomplete() {
            return false;
          }
        }
      };
    });

    jest.mock('avatar', function () {
      return {
        requestAvatar: jest.fn(),
        debouncedRequestAvatar: jest.fn()
      };
    });

    jest.mock('store/index', function () {
      return {
        swap: jest.fn(),
        updateEntity: 'updateEntity'
      };
    });
  });

  it('renders correctly', function () {
    var UsernamePane = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(UsernamePane, defaultProps)).toMatchSnapshot();
  });
  it('sets `blankErrorHint` when username is empty', function () {
    var fieldIndexMock = require('field/index');
    fieldIndexMock.username = function () {
      return undefined;
    };
    fieldIndexMock.getFieldValue = function () {
      return undefined;
    };
    var UsernamePane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(UsernamePane, defaultProps)).toMatchSnapshot();
  });
  it('sets `usernameFormatErrorHint` when usernameLooksLikeEmail() returns false and `validateFormat` is true', function () {
    var fieldUsernameMock = require('field/username');
    fieldUsernameMock.getUsernameValidation = function () {
      return { min: 'min', max: 'max' };
    };
    fieldUsernameMock.usernameLooksLikeEmail = function () {
      return false;
    };
    var UsernamePane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(UsernamePane, _extends({}, defaultProps, { validateFormat: true }))).toMatchSnapshot();
  });
  it('sets isValid as true when `isFieldVisiblyInvalid` is false', function () {
    require('field/index').isFieldVisiblyInvalid = function () {
      return false;
    };
    var UsernamePane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(UsernamePane, defaultProps)).toMatchSnapshot();
  });
  it('sets autoComplete to true when `allowAutocomplete` is true', function () {
    require('core/index').ui.allowAutocomplete = function () {
      return true;
    };
    var UsernamePane = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(UsernamePane, defaultProps)).toMatchSnapshot();
  });
  it('fetches the avatar on componentDidMount if ui.avatar is true and there is a username', function () {
    require('core/index').ui.avatar = function () {
      return true;
    };
    var UsernamePane = getComponent();

    (0, _enzyme.mount)(_react2.default.createElement(UsernamePane, defaultProps));

    var mock = require('avatar').requestAvatar.mock;

    expect(mock.calls.length).toBe(1);
  });
  it('fetches the avatar onChange if ui.avatar is true', function () {
    require('core/index').ui.avatar = function () {
      return true;
    };
    var UsernamePane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(UsernamePane, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper);
    props.onChange({ target: { value: 'newUser' } });

    var mock = require('avatar').debouncedRequestAvatar.mock;

    expect(mock.calls.length).toBe(1);
  });
  it('calls `swap` onChange', function () {
    var UsernamePane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(UsernamePane, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper);
    props.onChange({ target: { value: 'newUser' } });

    var mock = require('store/index').swap.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
});
