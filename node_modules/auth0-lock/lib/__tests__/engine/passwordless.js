'use strict';

var _testUtils = require('testUtils');

var getEngine = function getEngine() {
  return require('engine/passwordless').default;
};

jest.mock('core/error_screen', function () {
  return (0, _testUtils.mockComponent)('error_screen');
});
jest.mock('core/loading_screen', function () {
  return (0, _testUtils.mockComponent)('loading_screen');
});
jest.mock('engine/passwordless/social_or_email_login_screen', function () {
  return (0, _testUtils.mockComponent)('social_or_email_login_screen');
});
jest.mock('engine/passwordless/social_or_phone_number_login_screen', function () {
  return (0, _testUtils.mockComponent)('social_or_phone_number_login_screen');
});
jest.mock('connection/passwordless/ask_vcode', function () {
  return (0, _testUtils.mockComponent)('ask_vcode');
});
jest.mock('core/sso/last_login_screen', function () {
  return (0, _testUtils.mockComponent)('last_login_screen');
});

describe('Passwordless Engine', function () {
  describe('didReceiveClientSettings calls setPrefill', function () {
    beforeEach(function () {
      jest.resetModules();
      jest.mock('core/index', function () {
        return {
          hasSomeConnections: function hasSomeConnections() {
            return true;
          },
          prefill: function prefill() {
            return {
              toJS: function toJS() {
                return {
                  email: 'prefill@example.com',
                  phoneNumber: '12354'
                };
              }
            };
          }
        };
      });
      jest.mock('field/email', function () {
        return {
          setEmail: jest.fn(function (m) {
            return m;
          })
        };
      });
      jest.mock('field/phone_number', function () {
        return {
          setPhoneNumber: jest.fn(function (m) {
            return m;
          })
        };
      });
    });
    it('when prefill options has `email` value', function () {
      var engine = getEngine();
      engine.didReceiveClientSettings('model');
      var setEmailMockCalls = require('field/email').setEmail.mock.calls;
      expect(setEmailMockCalls.length).toBe(1);
      expect(setEmailMockCalls[0][0]).toBe('model');
      expect(setEmailMockCalls[0][1]).toBe('prefill@example.com');
    });
    it('when prefill options has `phoneNumber` value', function () {
      var engine = getEngine();
      engine.didReceiveClientSettings('model');
      var setPhoneNumberMockCalls = require('field/phone_number').setPhoneNumber.mock.calls;
      expect(setPhoneNumberMockCalls.length).toBe(1);
      expect(setPhoneNumberMockCalls[0][0]).toBe('model');
      expect(setPhoneNumberMockCalls[0][1]).toBe('12354');
    });
  });
});
