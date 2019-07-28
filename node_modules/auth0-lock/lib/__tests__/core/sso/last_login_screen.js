'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _testUtils = require('testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('ui/pane/quick_auth_pane', function () {
  return (0, _testUtils.mockComponent)('quick_auth_pane');
});

//there's a circular dependency with this module, so we need to mock it
jest.mock('engine/classic');

var getComponent = function getComponent() {
  var LastLoginScreen = require('core/sso/last_login_screen').default;
  var screen = new LastLoginScreen();
  return screen.render();
};

describe('LastLoginScreen', function () {
  beforeEach(function () {
    jest.resetModules();

    jest.mock('quick-auth/actions', function () {
      return {
        logIn: jest.fn(),
        checkSession: jest.fn(),
        skipQuickAuth: jest.fn()
      };
    });

    jest.mock('core/index', function () {
      return {
        id: function id() {
          return 'id';
        },
        domain: function domain() {
          return 'me.auth0.com';
        }
      };
    });

    jest.mock('core/sso/index', function () {
      return {
        lastUsedConnection: function lastUsedConnection() {
          return {
            get: function get() {
              return 'lastUsedConnection';
            }
          };
        },
        lastUsedUsername: function lastUsedUsername() {
          return 'lastUsedUsername';
        }
      };
    });

    jest.mock('connection/social/index', function () {
      return {
        STRATEGIES: {
          twitter: 'Twitter'
        },
        authButtonsTheme: function authButtonsTheme() {
          return {
            get: function get() {
              return undefined;
            }
          };
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
      group: function group() {
        for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          keys[_key2] = arguments[_key2];
        }

        return keys.join(',');
      },
      html: function html() {
        for (var _len3 = arguments.length, keys = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          keys[_key3] = arguments[_key3];
        }

        return keys.join(',');
      }
    },
    model: 'model'
  };
  it('renders correctly', function () {
    var Component = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
  });
  it('renders with custom connection theme', function () {
    require('connection/social/index').authButtonsTheme = function () {
      return {
        get: function get() {
          return _immutable2.default.fromJS({
            primaryColor: 'primaryColor',
            foregroundColor: 'foregroundColor',
            icon: 'icon'
          });
        }
      };
    };
    var Component = getComponent();
    (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
  });
  describe('renders correct icon', function () {
    var _require$STRATEGIES;

    var testStrategy = function testStrategy(strategy) {
      it('when strategy is ' + strategy, function () {
        require('core/sso/index').lastUsedConnection = function () {
          return _immutable2.default.fromJS({
            strategy: strategy
          });
        };
        var Component = getComponent();
        (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
      });
    };
    var testStrategyName = 'this-strategy-exists';
    require('connection/social/index').STRATEGIES = (_require$STRATEGIES = {}, _require$STRATEGIES[testStrategyName] = 'Test Strategy', _require$STRATEGIES);
    var strategies = [testStrategyName, 'google-apps', 'adfs', 'office365', 'waad', 'some-other-strategy'].forEach(testStrategy);

    it('when strategy is empty, use name instead', function () {
      require('core/sso/index').lastUsedConnection = function () {
        return _immutable2.default.fromJS({
          name: testStrategyName
        });
      };
      var Component = getComponent();
      (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
    });
  });
  describe('renders correct buttonLabel', function () {
    it('uses SOCIAL_STRATEGY mapping when there is not a lastUsedUsername', function () {
      require('core/sso/index').lastUsedConnection = function () {
        return {
          get: function get() {
            return 'twitter';
          }
        };
      };
      require('core/sso/index').lastUsedUsername = function () {
        return undefined;
      };
      var Component = getComponent();
      (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
    });
    it('uses lastUsedConnectionName when there is not a lastUsedUsername and no SOCIAL_STRATEGY mapping', function () {
      require('core/sso/index').lastUsedUsername = function () {
        return undefined;
      };
      var Component = getComponent();
      (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
    });
  });
  it('calls checkSession in the buttonClickHandler when outside of the universal login page', function () {
    (0, _testUtils.setURL)('https://other-url.auth0.com');
    var Component = getComponent();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Component, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper);
    props.buttonClickHandler();

    var mock = require('quick-auth/actions').checkSession.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0][0]).toBe('id');
    expect(mock.calls[0][1].get()).toBe('lastUsedConnection');
    expect(mock.calls[0][2]).toBe('lastUsedUsername');
  });
  it('calls logIn in the buttonClickHandler when inside of the universal login page', function () {
    (0, _testUtils.setURL)('https://me.auth0.com');
    var Component = getComponent();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Component, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper);
    props.buttonClickHandler();

    var mock = require('quick-auth/actions').logIn.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0][0]).toBe('id');
    expect(mock.calls[0][1].get()).toBe('lastUsedConnection');
    expect(mock.calls[0][2]).toBe('lastUsedUsername');
  });
  it('calls skipQuickAuth in the alternativeClickHandler', function () {
    var Component = getComponent();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Component, defaultProps));
    var props = (0, _testUtils.extractPropsFromWrapper)(wrapper);
    props.alternativeClickHandler();

    var mock = require('quick-auth/actions').skipQuickAuth.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0][0]).toBe('id');
  });
});
