'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getScreen = function getScreen() {
  var ResetPasswordScreen = require('connection/database/reset_password').default;
  return new ResetPasswordScreen();
};

describe('ResetPasswordScreen', function () {
  beforeEach(function () {
    jest.resetModules();

    jest.mock('connection/database/index', function () {
      return {
        databaseUsernameValue: function databaseUsernameValue(model, options) {
          expect(options.emailFirst).toBe(true);
          return 'foo@test.com';
        }
      };
    });

    jest.mock('connection/enterprise', function () {
      return {
        isEnterpriseDomain: function isEnterpriseDomain() {
          return true;
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
        id: function id() {
          return 'id';
        },
        setGlobalError: 'setGlobalError',
        clearGlobalError: 'clearGlobalError'
      };
    });

    jest.mock('store/index', function () {
      return {
        swap: jest.fn(),
        updateEntity: 'updateEntity'
      };
    });
  });
  it('isSubmitDisabled returns true when `isEnterpriseDomain` is true', function () {
    jest.useFakeTimers();
    require('connection/enterprise').isEnterpriseDomain = function () {
      return true;
    };
    var screen = getScreen();
    expect(screen.isSubmitDisabled()).toBe(true);
    jest.runTimersToTime(50);
    expect(require('store/index').swap.mock.calls[0]).toMatchSnapshot();
  });
  it('isSubmitDisabled returns false when `isEnterpriseDomain` is false', function () {
    require('connection/enterprise').isEnterpriseDomain = function () {
      return false;
    };
    var screen = getScreen();
    expect(screen.isSubmitDisabled()).toBe(false);
    expect(require('store/index').swap.mock.calls[0]).toMatchSnapshot();
  });
});
