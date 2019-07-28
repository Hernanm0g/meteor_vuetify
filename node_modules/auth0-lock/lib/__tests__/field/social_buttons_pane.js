'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _testUtils = require('testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('ui/button/auth_button', function () {
  return (0, _testUtils.mockComponent)('auth_button');
});

var getComponent = function getComponent() {
  return require('field/social/social_buttons_pane').default;
};

describe('SocialButtonsPane', function () {
  var defaultProps = {
    lock: {},
    labelFn: function labelFn() {
      for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
      }

      return keys.join(',');
    },
    showLoading: false,
    signUp: false,
    disabled: false
  };

  beforeEach(function () {
    jest.resetModules();

    jest.mock('quick-auth/actions', function () {
      return {
        logIn: jest.fn()
      };
    });

    jest.mock('connection/social/index', function () {
      return {
        displayName: function displayName() {
          return 'displayName';
        },
        socialConnections: function socialConnections() {
          return [{ item: 1, get: function get(key) {
              return 'socialConnections1-' + key;
            } }, { item: 2, get: function get(key) {
              return 'socialConnections2-' + key;
            } }];
        },
        authButtonsTheme: function authButtonsTheme() {
          return {
            get: function get() {
              return {
                get: function get(key) {
                  return 'authButtonsTheme-' + key;
                }
              };
            }
          };
        }
      };
    });

    jest.mock('core/index', function () {
      return {
        id: function id() {
          return 1;
        },
        emitEvent: jest.fn()
      };
    });
  });

  it('renders correctly', function () {
    var SocialButtonsPane = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(SocialButtonsPane, defaultProps)).toMatchSnapshot();
  });
  it('disables social buttons when disabled === true', function () {
    var SocialButtonsPane = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(SocialButtonsPane, _extends({}, defaultProps, { disabled: true }))).toMatchSnapshot();
  });
  it('shows loading when showLoading === true', function () {
    var SocialButtonsPane = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(SocialButtonsPane, _extends({}, defaultProps, { showLoading: true }))).toMatchSnapshot();
  });
  it('shows header when instructions are available', function () {
    var SocialButtonsPane = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(SocialButtonsPane, _extends({}, defaultProps, { instructions: 'instructions' }))).toMatchSnapshot();
  });
  it('calls `logIn` with social connection 1 when first button is clicked', function () {
    var SocialButtonsPane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(SocialButtonsPane, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper, 2);

    props.onClick();

    var mock = require('quick-auth/actions').logIn.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
  it('calls `logIn` with social connection 2 when second button is clicked', function () {
    var SocialButtonsPane = getComponent();

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(SocialButtonsPane, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper, 3);

    props.onClick();

    var mock = require('quick-auth/actions').logIn.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
});
