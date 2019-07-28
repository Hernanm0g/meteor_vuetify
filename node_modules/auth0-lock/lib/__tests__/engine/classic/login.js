'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _testUtils = require('testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('core/pane_separator', function () {
  return (0, _testUtils.mockComponent)('pane_separator');
});
jest.mock('field/social/social_buttons_pane', function () {
  return (0, _testUtils.mockComponent)('social_buttons_pane');
});
jest.mock('connection/database/login_pane', function () {
  return (0, _testUtils.mockComponent)('login_pane');
});
jest.mock('connection/database/login_sign_up_tabs', function () {
  return (0, _testUtils.mockComponent)('login_sign_up_tabs');
});
jest.mock('connection/enterprise/single_sign_on_notice', function () {
  return (0, _testUtils.mockComponent)('single_sign_on_notice');
});

var getComponent = function getComponent() {
  var LoginScreen = require('engine/classic/login').default;
  var screen = new LoginScreen();
  return screen.render();
};

describe('LoginScreen', function () {
  beforeEach(function () {
    jest.resetModules();

    jest.mock('connection/database/index', function () {
      return {
        databaseConnection: function databaseConnection() {
          return false;
        },
        databaseUsernameValue: function databaseUsernameValue() {
          return false;
        },
        databaseUsernameStyle: function databaseUsernameStyle() {
          return false;
        },
        defaultDatabaseConnection: function defaultDatabaseConnection() {
          return false;
        },
        hasInitialScreen: function hasInitialScreen() {
          return false;
        },
        hasScreen: function hasScreen() {
          return false;
        },
        signUpLink: function signUpLink() {
          return false;
        }
      };
    });

    jest.mock('connection/database/actions', function () {
      return { logIn: jest.fn() };
    });

    jest.mock('connection/enterprise', function () {
      return {
        defaultEnterpriseConnection: function defaultEnterpriseConnection() {
          return false;
        },
        findADConnectionWithoutDomain: function findADConnectionWithoutDomain() {
          return false;
        },
        isHRDDomain: function isHRDDomain() {
          return false;
        }
      };
    });

    jest.mock('connection/enterprise/actions', function () {
      return {
        logIn: jest.fn(),
        startHRD: jest.fn()
      };
    });

    jest.mock('core/signed_in_confirmation', function () {
      return {
        renderSignedInConfirmation: jest.fn()
      };
    });

    jest.mock('engine/classic', function () {
      return {
        hasOnlyClassicConnections: function hasOnlyClassicConnections() {
          return false;
        },
        isSSOEnabled: function isSSOEnabled() {
          return false;
        }
      };
    });

    jest.mock('i18n', function () {
      return { str: function str(_, keys) {
          return keys.join(',');
        } };
    });

    jest.mock('core/index', function () {
      return {
        hasSomeConnections: function hasSomeConnections() {
          return false;
        },
        countConnections: function countConnections() {
          return 0;
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
    model: 'model'
  };
  it('renders empty div by default', function () {
    var Component = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
  });
  it('renders SocialButtonsPane when has social connections', function () {
    require('core/index').hasSomeConnections = function (m, connection) {
      return connection === 'social';
    };
    var Component = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
  });
  it('renders SingleSignOnNotice when SSO is enabled', function () {
    require('engine/classic').isSSOEnabled = function () {
      return true;
    };
    var Component = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
  });
  describe('renders LoginSignUpTabs', function () {
    it('when database connection is enabled and has screen signUp', function () {
      require('core/index').hasSomeConnections = function (m, connection) {
        return connection === 'database';
      };
      require('connection/database/index').hasScreen = function (m, screenName) {
        return screenName === 'signUp';
      };
      var Component = getComponent();

      (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
    });
    it('when social connection is enabled and has initial screen signUp and has screen signUp', function () {
      require('core/index').hasSomeConnections = function (m, connection) {
        return connection === 'database';
      };
      require('connection/database/index').hasInitialScreen = function (m, screenName) {
        return screenName === 'signUp';
      };
      var Component = getComponent();

      (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
    });
  });
  describe('renders LoginPane', function () {
    it('when SSO is enabled', function () {
      require('engine/classic').isSSOEnabled = function () {
        return true;
      };
      var Component = getComponent();

      (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
    });
    it('when has database connection', function () {
      require('core/index').hasSomeConnections = function (m, connection) {
        return connection === 'database';
      };
      var Component = getComponent();

      (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
    });
    it('when has enterprise connection', function () {
      require('core/index').hasSomeConnections = function (m, connection) {
        return connection === 'enterprise';
      };
      var Component = getComponent();

      (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
    });
  });
});
