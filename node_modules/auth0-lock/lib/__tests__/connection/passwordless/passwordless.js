'use strict';

var _actions = require('connection/passwordless/actions');

var _actions2 = _interopRequireDefault(_actions);

var _testUtils = require('testUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.useFakeTimers();

describe('passwordless actions', function () {
  var mockFns = void 0;
  var actions = void 0;
  beforeEach(function () {
    jest.resetModules();

    jest.mock('connection/passwordless/index', function () {
      return {
        isEmail: jest.fn(),
        isSendLink: jest.fn(),
        resend: 'resend',
        restartPasswordless: jest.fn(),
        send: function send() {
          return 'send';
        },
        setPasswordlessStarted: jest.fn(),
        setResendFailed: jest.fn(),
        setResendSuccess: jest.fn(),
        toggleTermsAcceptance: jest.fn()
      };
    });
    jest.mock('field/phone_number', function () {
      return {
        phoneNumberWithDiallingCode: function phoneNumberWithDiallingCode() {
          return 'phoneNumberWithDiallingCode';
        }
      };
    });
    jest.mock('field/index', function () {
      return {
        getFieldValue: function getFieldValue(m, field) {
          return field;
        }
      };
    });
    jest.mock('core/web_api', function () {
      return {
        startPasswordless: jest.fn(),
        passwordlessVerify: jest.fn()
      };
    });
    jest.mock('core/actions', function () {
      return {
        closeLock: jest.fn(),
        logIn: jest.fn(),
        validateAndSubmit: jest.fn(),
        logInSuccess: jest.fn()
      };
    });
    jest.mock('i18n', function () {
      return { html: function html(_, keys) {
          return keys.join(',');
        } };
    });
    jest.mock('core/index', function () {
      return {
        id: function id() {
          return 'id';
        },
        setSubmitting: jest.fn(function (m) {
          return m;
        }),
        auth: {
          params: function params() {
            return {
              toJS: function toJS() {
                return {
                  auth: 'params'
                };
              }
            };
          }
        }
      };
    });
    jest.mock('store/index', function () {
      return {
        read: jest.fn(function () {
          return 'model';
        }),
        getEntity: 'getEntity',
        swap: jest.fn(),
        updateEntity: 'updateEntity'
      };
    });

    actions = require('connection/passwordless/actions');
  });
  describe('requestPasswordlessEmail()', function () {
    it('calls validateAndSubmit()', function () {
      actions.requestPasswordlessEmail('id');
      (0, _testUtils.expectMockToMatch)(require('core/actions').validateAndSubmit, 1);
    });
    it('calls startPasswordless', function () {
      actions.requestPasswordlessEmail('id');
      require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
      (0, _testUtils.expectMockToMatch)(require('core/web_api').startPasswordless, 1);
    });
    it('calls setPasswordlessStarted() on success', function () {
      actions.requestPasswordlessEmail('id');
      require('core/actions').validateAndSubmit.mock.calls[0][2]('model');

      require('core/web_api').startPasswordless.mock.calls[0][2](null);

      var _require = require('store/index'),
          swap = _require.swap;

      (0, _testUtils.expectMockToMatch)(swap, 1);

      swap.mock.calls[0][3]('model');
      (0, _testUtils.expectMockToMatch)(require('core/index').setSubmitting, 1);
      (0, _testUtils.expectMockToMatch)(require('connection/passwordless/index').setPasswordlessStarted, 1);
    });
    describe('normalizes the error message', function () {
      it('with a generic error', function () {
        actions.requestPasswordlessEmail('id');
        require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
        var error = new Error('foobar');
        error.error = 'some_error_code';
        require('core/web_api').startPasswordless.mock.calls[0][2](error);

        jest.runAllTimers();

        var _require2 = require('store/index'),
            read = _require2.read,
            swap = _require2.swap;

        (0, _testUtils.expectMockToMatch)(read, 1);
        (0, _testUtils.expectMockToMatch)(swap, 1);
      });
      it('with a sms_provider_error error and description includes (Code: 21211)', function () {
        actions.requestPasswordlessEmail('id');
        require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
        var error = new Error('foobar');
        error.error = 'sms_provider_error';
        error.description = 'something (Code: 21211)';
        require('core/web_api').startPasswordless.mock.calls[0][2](error);

        jest.runAllTimers();

        var _require3 = require('store/index'),
            read = _require3.read,
            swap = _require3.swap;

        (0, _testUtils.expectMockToMatch)(swap, 1);
      });
    });
  });
  describe('resendEmail()', function () {
    it('calls setResendSuccess() on success', function () {
      actions.resendEmail('id');

      var _require4 = require('store/index'),
          read = _require4.read,
          swap = _require4.swap;

      (0, _testUtils.expectMockToMatch)(read, 1);
      (0, _testUtils.expectMockToMatch)(swap, 1);

      require('core/web_api').startPasswordless.mock.calls[0][2](null);

      swap.mock.calls[1][3]('model');
      (0, _testUtils.expectMockToMatch)(require('connection/passwordless/index').setResendSuccess, 1);
    });
    it('calls setResendFailed on error', function () {
      actions.resendEmail('id');

      var _require5 = require('store/index'),
          read = _require5.read,
          swap = _require5.swap;

      (0, _testUtils.expectMockToMatch)(read, 1);
      (0, _testUtils.expectMockToMatch)(swap, 1);

      require('core/web_api').startPasswordless.mock.calls[0][2](new Error('foobar'));
      jest.runAllTimers();
      swap.mock.calls[1][3]('model');
      (0, _testUtils.expectMockToMatch)(require('connection/passwordless/index').setResendFailed, 1);
    });
  });
  describe('sendSMS()', function () {
    it('calls validateAndSubmit()', function () {
      actions.sendSMS('id');
      (0, _testUtils.expectMockToMatch)(require('core/actions').validateAndSubmit, 1);
    });
    it('calls startPasswordless', function () {
      actions.sendSMS('id');
      require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
      (0, _testUtils.expectMockToMatch)(require('core/web_api').startPasswordless, 1);
    });
    it('calls setPasswordlessStarted() on success', function () {
      actions.sendSMS('id');
      require('core/actions').validateAndSubmit.mock.calls[0][2]('model');

      require('core/web_api').startPasswordless.mock.calls[0][2](null);

      var _require6 = require('store/index'),
          swap = _require6.swap;

      (0, _testUtils.expectMockToMatch)(swap, 1);

      swap.mock.calls[0][3]('model');
      (0, _testUtils.expectMockToMatch)(require('core/index').setSubmitting, 1);
      (0, _testUtils.expectMockToMatch)(require('connection/passwordless/index').setPasswordlessStarted, 1);
    });
    describe('normalizes the error message', function () {
      it('with a generic error', function () {
        actions.sendSMS('id');
        require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
        var error = new Error('foobar');
        error.error = 'some_error_code';
        require('core/web_api').startPasswordless.mock.calls[0][2](error);

        jest.runAllTimers();

        var _require7 = require('store/index'),
            read = _require7.read,
            swap = _require7.swap;

        (0, _testUtils.expectMockToMatch)(read, 1);
        (0, _testUtils.expectMockToMatch)(swap, 1);
      });
      it('with a sms_provider_error error and description includes (Code: 21211)', function () {
        actions.sendSMS('id');
        require('core/actions').validateAndSubmit.mock.calls[0][2]('model');
        var error = new Error('foobar');
        error.error = 'sms_provider_error';
        error.description = 'something (Code: 21211)';
        require('core/web_api').startPasswordless.mock.calls[0][2](error);

        jest.runAllTimers();

        var _require8 = require('store/index'),
            read = _require8.read,
            swap = _require8.swap;

        (0, _testUtils.expectMockToMatch)(swap, 1);
      });
    });
  });
  describe('login()', function () {
    it('sets setSubmitting to true', function () {
      actions.logIn('id');

      var _require9 = require('store/index'),
          read = _require9.read,
          swap = _require9.swap;

      (0, _testUtils.expectMockToMatch)(read, 1);
      (0, _testUtils.expectMockToMatch)(swap, 1);
    });
    it('calls webApi.passwordlessVerify() with sms options', function () {
      actions.logIn('id');
      (0, _testUtils.expectMockToMatch)(require('core/web_api').passwordlessVerify, 1);
    });
    it('calls webApi.passwordlessVerify() with email options', function () {
      require('connection/passwordless/index').isEmail = function () {
        return true;
      };
      actions.logIn('id');
      (0, _testUtils.expectMockToMatch)(require('core/web_api').passwordlessVerify, 1);
    });
    describe('on webApi.passwordlessVerify() callback', function () {
      it('formats error when there is an error ', function () {
        actions.logIn('id');

        var error = new Error('foobar');
        error.error = 'some_error_code';
        require('core/web_api').passwordlessVerify.mock.calls[0][2](error);

        var _require10 = require('store/index'),
            swap = _require10.swap;

        (0, _testUtils.expectMockToMatch)(swap, 2);
      });
      it('calls logInSuccess on success', function () {
        actions.logIn('id');
        require('core/web_api').passwordlessVerify.mock.calls[0][2](null, { result: true });

        (0, _testUtils.expectMockToMatch)(require('core/actions').logInSuccess, 1);
      });
    });
  });
  describe('toggleTermsAcceptance()', function () {
    it('calls internalToggleTermsAcceptance()', function () {
      actions.toggleTermsAcceptance('id');

      var _require11 = require('store/index'),
          swap = _require11.swap;

      (0, _testUtils.expectMockToMatch)(swap, 1);

      swap.mock.calls[0][3]('model');

      (0, _testUtils.expectMockToMatch)(require('connection/passwordless/index').toggleTermsAcceptance, 1);
    });
  });
  it('restart calls restartPasswordless', function () {
    actions.restart('id');

    var _require12 = require('store/index'),
        swap = _require12.swap;

    (0, _testUtils.expectMockToMatch)(swap, 1);
  });
});
