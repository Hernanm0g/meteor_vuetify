'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _testUtils = require('testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('connection/database/mfa_pane', function () {
  return (0, _testUtils.mockComponent)('mfa_pane');
});

//there's a circular dependency with this module, so we need to mock it
jest.mock('engine/classic');

var getComponent = function getComponent() {
  var MFALoginScreen = require('engine/classic/mfa_login_screen').default;
  var screen = new MFALoginScreen();
  return screen.render();
};

describe('MFALoginScreen', function () {
  beforeEach(function () {
    jest.resetModules();

    jest.mock('connection/database/index', function () {
      return {
        hasScreen: function hasScreen() {
          return false;
        }
      };
    });

    jest.mock('connection/database/actions', function () {
      return {
        cancelMFALogin: jest.fn(),
        logIn: jest.fn()
      };
    });

    jest.mock('core/signed_in_confirmation', function () {
      return {
        renderSignedInConfirmation: jest.fn()
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
      }
    },
    model: 'model'
  };
  it('renders correctly', function () {
    var Component = getComponent();

    (0, _testUtils.expectComponent)(_react2.default.createElement(Component, defaultProps)).toMatchSnapshot();
  });
});
