'use strict';

var _testUtils = require('testUtils');

jest.mock('auth0-js');

var getClient = function getClient() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var lockId = 'lockId';
  var clientId = 'cid';
  var domain = 'me.auth0.com';
  var Auth0APIClient = require('core/web_api/p2_api').default;
  var client = new Auth0APIClient(lockId, clientId, domain, options);
  client.client.popup = {
    authorize: jest.fn(),
    loginWithCredentials: jest.fn()
  };
  client.client.client = {
    login: jest.fn(),
    signup: jest.fn(),
    changePassword: jest.fn(),
    passwordlessStart: jest.fn(),
    passwordlessLogin: jest.fn(),
    getUserCountry: jest.fn(),
    getSSOData: jest.fn()
  };
  return client;
};

var getAuth0ClientMock = function getAuth0ClientMock() {
  return require('auth0-js');
};
var assertCallWithCallback = function assertCallWithCallback(mock, callbackFunction) {
  expect(mock.calls.length).toBe(1);
  expect(mock.calls[0][0]).toMatchSnapshot();
  mock.calls[0][1]();
  expect(callbackFunction.mock.calls.length).toBe(1);
};
describe('Auth0APIClient', function () {
  beforeEach(function () {
    jest.resetModules();
    require('auth0-js').version.raw = 'a0js.version';
    require('core/web_api/helper').getVersion = function () {
      return 'lock.version';
    };
  });
  describe('init', function () {
    describe('with overrides', function () {
      it('always uses telemetry set in the `auth0Client` query param and inside the ULP', function () {
        var telemetryIn = { name: 'test-sdk', version: '1.0.0', env: { envOverride: true } };
        (0, _testUtils.setURL)('https://me.auth0.com/authorize?auth0Client=' + btoa(JSON.stringify(telemetryIn)));
        var options = {
          audience: 'foo',
          redirectUrl: '//localhost:8080/login/callback',
          responseMode: 'query',
          responseType: 'code',
          leeway: 60,
          _telemetryInfo: { ignored: true }
        };
        getClient(options);
        var mock = getAuth0ClientMock();
        expect(mock.WebAuth.mock.calls[0][0]._telemetryInfo).toMatchSnapshot();
      });
      it('overrides telemetry when outside the ULP', function () {
        (0, _testUtils.setURL)('https://auth.myapp.com/authorize');
        var options = {
          audience: 'foo',
          redirectUrl: '//localhost:8080/login/callback',
          responseMode: 'query',
          responseType: 'code',
          leeway: 60,
          _telemetryInfo: { name: 'test-sdk', version: '1.0.0', env: { envOverride: true } }
        };
        getClient(options);
        var mock = getAuth0ClientMock();
        expect(mock.WebAuth.mock.calls[0][0]._telemetryInfo).toMatchSnapshot();
      });
      it('uses default telemetry key when outside the ULP', function () {
        (0, _testUtils.setURL)('https://auth.myapp.com/authorize');
        getClient();
        var mock = getAuth0ClientMock();
        expect(mock.WebAuth.mock.calls[0][0]._telemetryInfo.name).toEqual('lock.js');
        expect(Object.keys(mock.WebAuth.mock.calls[0][0]._telemetryInfo.env)).toContain('auth0.js');
      });
      it('overrides auth0.js telemetry key', function () {
        (0, _testUtils.setURL)('https://auth.myapp.com/authorize');
        var options = {
          audience: 'foo',
          redirectUrl: '//localhost:8080/login/callback',
          responseMode: 'query',
          responseType: 'code',
          leeway: 60,
          _telemetryInfo: {
            name: 'test-sdk',
            version: '1.0.0',
            env: { 'auth0.js': 'this-will-be-overriden' }
          }
        };
        getClient(options);
        var mock = getAuth0ClientMock();
        expect(mock.WebAuth.mock.calls[0][0]._telemetryInfo.env['auth0.js']).toBe('a0js.version');
      });
      it('uses different telemetry key when inside the ULP', function () {
        (0, _testUtils.setURL)('https://me.auth0.com/');
        getClient();
        var mock = getAuth0ClientMock();
        expect(mock.WebAuth.mock.calls[0][0]._telemetryInfo.name).toEqual('lock.js-ulp');
        expect(Object.keys(mock.WebAuth.mock.calls[0][0]._telemetryInfo.env)).toContain('auth0.js-ulp');
      });
      it('forwards options to WebAuth', function () {
        (0, _testUtils.setURL)('https://auth.myapp.com/authorize');
        var options = {
          audience: 'foo',
          redirectUrl: '//localhost:8080/login/callback',
          responseMode: 'query',
          responseType: 'code',
          leeway: 60,
          overrides: {
            __tenant: 'tenant1',
            __token_issuer: 'issuer1',
            __jwks_uri: 'https://jwks.com'
          },
          plugins: [{
            name: 'ExamplePlugin'
          }],
          params: {
            nonce: 'nonce',
            state: 'state',
            scope: 'custom_scope'
          }
        };
        var client = getClient(options);
        var mock = getAuth0ClientMock();
        expect(mock.WebAuth.mock.calls[0][0]).toMatchSnapshot();
      });
    });

    describe('should set authOpt according options', function () {
      it('should set sso:true when inside the universal login page', function () {
        (0, _testUtils.setURL)('https://me.auth0.com/');
        var options = {
          sso: true
        };
        var client = getClient(options);
        expect(client.authOpt.sso).toBe(true);
      });
      it('should set sso:false when inside the universal login page', function () {
        (0, _testUtils.setURL)('https://me.auth0.com/');
        var options = {
          sso: false
        };
        var client = getClient(options);
        expect(client.authOpt.sso).toBe(false);
      });
      it('should set sso:undefined when outside the universal login page', function () {
        (0, _testUtils.setURL)('https://other-url.auth0.com/');
        var options = {};
        var client = getClient(options);
        expect(client.authOpt.sso).toBe(undefined);
      });
      it('should set state from options.state', function () {
        var client = getClient({
          state: 'foo'
        });
        expect(client.authOpt.state).toBe('foo');
      });
      it('should set state from options.params.state', function () {
        var client = getClient({
          params: {
            state: 'foo'
          }
        });
        expect(client.authOpt.state).toBe('foo');
      });
      it('options.params.state should prevail over options.state', function () {
        var client = getClient({
          state: 'bar',
          params: {
            state: 'foo'
          }
        });
        expect(client.authOpt.state).toBe('foo');
      });
      it('should set nonce from options.nonce', function () {
        var client = getClient({
          nonce: 'foo'
        });
        expect(client.authOpt.nonce).toBe('foo');
      });
      it('should set nonce from options.params.nonce', function () {
        var client = getClient({
          params: {
            nonce: 'foo'
          }
        });
        expect(client.authOpt.nonce).toBe('foo');
      });
      it('options.params.nonce should prevail over options.nonce', function () {
        var client = getClient({
          nonce: 'bar',
          params: {
            nonce: 'foo'
          }
        });
        expect(client.authOpt.nonce).toBe('foo');
      });
      it('should set scope from options.params.scope', function () {
        var client = getClient({
          params: {
            scope: 'foo'
          }
        });
        expect(client.authOpt.scope).toBe('foo');
      });
    });
  });
  describe('logIn', function () {
    describe('with social/enterprise (without username and email)', function () {
      it('should call authorize when redirect===true', function () {
        var client = getClient({
          redirect: true
        });
        var callback = jest.fn();
        client.logIn({}, {}, callback);
        var mock = getAuth0ClientMock();
        var authorizeMock = mock.WebAuth.mock.instances[0].authorize.mock;
        assertCallWithCallback(authorizeMock, callback);
      });
      it('should call popup.authorize when redirect===false', function () {
        var client = getClient({
          redirect: false
        });
        var callback = jest.fn();
        client.logIn({}, {}, callback);
        var mock = getAuth0ClientMock();
        var authorizeMock = mock.WebAuth.mock.instances[0].popup.authorize.mock;
        assertCallWithCallback(authorizeMock, callback);
      });
    });
    describe('with credentials', function () {
      it('should call client.login', function () {
        var client = getClient({
          redirect: true
        });
        var callback = jest.fn();
        client.logIn({
          username: 'foo'
        }, {}, callback);
        var mock = getAuth0ClientMock();
        var loginMock = mock.WebAuth.mock.instances[0].login.mock;
        assertCallWithCallback(loginMock, callback);
      });
      it('should use the provided login_hint', function () {
        var client = getClient({
          redirect: true
        });
        var callback = jest.fn();
        client.logIn({
          email: 'foo',
          login_hint: 'valid_hint@test.com'
        }, {
          login_hint: 'invalid_hint@test.com'
        }, callback);
        var mock = getAuth0ClientMock();
        var loginMock = mock.WebAuth.mock.instances[0].login.mock;
        expect(loginMock.calls[0][0].login_hint).toBe('valid_hint@test.com');
      });
      it('should call popup.loginWithCredentials when redirect is false and sso is false', function () {
        var client = getClient({
          redirect: false,
          sso: false
        });
        var callback = jest.fn();
        client.logIn({
          username: 'foo'
        }, {}, callback);
        var mock = getAuth0ClientMock();
        var loginWithCredentialsMock = mock.WebAuth.mock.instances[0].popup.loginWithCredentials.mock;
        assertCallWithCallback(loginWithCredentialsMock, callback);
      });
      it('should call popup.loginWithCredentials when redirect is false and sso is true', function () {
        var client = getClient({
          redirect: false,
          sso: true
        });
        var callback = jest.fn();
        client.logIn({
          username: 'foo'
        }, {}, callback);
        var mock = getAuth0ClientMock();
        var loginWithCredentialsMock = mock.WebAuth.mock.instances[0].popup.loginWithCredentials.mock;
        assertCallWithCallback(loginWithCredentialsMock, callback);
      });
    });
    describe('should trim spaces in', function () {
      var client = void 0;
      var callback = void 0;
      var getMock = function getMock() {
        return getAuth0ClientMock().WebAuth.mock.instances[0].login.mock;
      };
      beforeEach(function () {
        client = getClient({
          redirect: true
        });
        callback = jest.fn();
      });
      it('the username', function () {
        client.logIn({
          username: ' foo '
        }, {}, callback);
        assertCallWithCallback(getMock(), callback);
      });
      it('the username with a space', function () {
        client.logIn({
          username: ' foo bar '
        }, {}, callback);
        assertCallWithCallback(getMock(), callback);
      });
      it('the email', function () {
        client.logIn({
          email: ' foo@example.com '
        }, {}, callback);
        assertCallWithCallback(getMock(), callback);
      });
      it('the mfa_code', function () {
        client.logIn({
          username: 'foo',
          mfa_code: ' 123456 '
        }, {}, callback);
        assertCallWithCallback(getMock(), callback);
      });
    });
  });
  describe('signUp', function () {
    describe('should trim spaces in', function () {
      var client = void 0;
      var callback = void 0;
      var getMock = function getMock() {
        return getAuth0ClientMock().WebAuth.mock.instances[0].signup.mock;
      };
      beforeEach(function () {
        client = getClient({
          redirect: true
        });
        callback = jest.fn();
      });
      it('the username', function () {
        client.signUp({
          username: ' foo '
        }, callback);
        assertCallWithCallback(getMock(), callback);
      });
      it('the username with a space', function () {
        client.signUp({
          username: ' foo bar '
        }, callback);
        assertCallWithCallback(getMock(), callback);
      });
      it('the email', function () {
        client.signUp({
          email: ' foo@example.com '
        }, callback);
        assertCallWithCallback(getMock(), callback);
      });
    });
  });
  describe('resetPassword', function () {
    describe('should trim spaces in', function () {
      var client = void 0;
      var callback = void 0;
      var getMock = function getMock() {
        return getAuth0ClientMock().WebAuth.mock.instances[0].changePassword.mock;
      };
      beforeEach(function () {
        client = getClient({
          redirect: true
        });
        callback = jest.fn();
      });
      it('the username', function () {
        client.resetPassword({
          username: ' foo '
        }, callback);
        assertCallWithCallback(getMock(), callback);
      });
      it('the username with a space', function () {
        client.resetPassword({
          username: ' foo bar '
        }, callback);
        assertCallWithCallback(getMock(), callback);
      });
      it('the email', function () {
        client.resetPassword({
          email: ' foo@example.com '
        }, callback);
        assertCallWithCallback(getMock(), callback);
      });
    });
  });
  describe('passwordlessStart', function () {
    it('should call client.passwordlessStart', function () {
      var client = getClient({});
      client.passwordlessStart({
        foo: 'bar'
      }, function () {});
      var mock = client.client.passwordlessStart.mock;

      expect(mock.calls.length).toBe(1);
      expect(mock.calls[0]).toMatchSnapshot();
    });
    describe('should trim spaces in', function () {
      var client = void 0;
      var callback = void 0;
      var getMock = function getMock() {
        return getAuth0ClientMock().WebAuth.mock.instances[0].passwordlessStart.mock;
      };
      beforeEach(function () {
        client = getClient({
          redirect: true
        });
        callback = jest.fn();
      });
      it('the email', function () {
        client.passwordlessStart({
          email: ' foo@example.com '
        }, callback);
        assertCallWithCallback(getMock(), callback);
      });
      it('the phoneNumber', function () {
        client.passwordlessStart({
          phoneNumber: ' +554899999 '
        }, callback);
        assertCallWithCallback(getMock(), callback);
      });
    });
  });
  describe('passwordlessVerify', function () {
    it('should call client.passwordlessLogin', function () {
      var client = getClient({});
      client.passwordlessVerify({
        foo: 'bar'
      }, function () {});
      var mock = client.client.passwordlessLogin.mock;

      expect(mock.calls.length).toBe(1);
      expect(mock.calls[0]).toMatchSnapshot();
    });
    describe('should trim spaces in', function () {
      var client = void 0;
      var callback = void 0;
      var getMock = function getMock() {
        return getAuth0ClientMock().WebAuth.mock.instances[0].passwordlessLogin.mock;
      };
      beforeEach(function () {
        client = getClient({
          redirect: true
        });
        callback = jest.fn();
      });
      it('the email', function () {
        client.passwordlessVerify({
          email: ' foo@example.com '
        }, callback);
        assertCallWithCallback(getMock(), callback);
      });
      it('the phoneNumber', function () {
        client.passwordlessVerify({
          phoneNumber: ' +554899999 '
        }, callback);
        assertCallWithCallback(getMock(), callback);
      });
    });
  });

  it('getUserCountry should call getUserCountry', function () {
    var client = getClient({});
    client.getUserCountry('cb');
    var mock = client.client.client.getUserCountry.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
  it('getSSOData should call client.client.getSSOData', function () {
    var client = getClient({});
    client.getSSOData(true, function () {});
    var mock = client.client.client.getSSOData.mock;

    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0]).toMatchSnapshot();
  });
  describe('parseHash', function () {
    it('should pass __enableIdPInitiatedLogin:false when options._enableImpersonation and options._enableIdPInitiatedLogin are not present', function () {
      var client = getClient({});
      client.parseHash('hash', 'cb');
      var mock = getAuth0ClientMock();
      var parseHashMock = mock.WebAuth.mock.instances[0].parseHash.mock;
      expect(parseHashMock.calls.length).toBe(1);
      expect(parseHashMock.calls[0]).toMatchSnapshot();
    });
    it('should pass __enableIdPInitiatedLogin when options._enableImpersonation===true', function () {
      var client = getClient({
        _enableImpersonation: true
      });
      client.parseHash('hash', 'cb');
      var mock = getAuth0ClientMock();
      var parseHashMock = mock.WebAuth.mock.instances[0].parseHash.mock;
      expect(parseHashMock.calls.length).toBe(1);
      expect(parseHashMock.calls[0]).toMatchSnapshot();
    });
    it('should pass __enableIdPInitiatedLogin when options._enableIdPInitiatedLogin===true', function () {
      var client = getClient({
        _enableIdPInitiatedLogin: true
      });
      client.parseHash('hash', 'cb');
      var mock = getAuth0ClientMock();
      var parseHashMock = mock.WebAuth.mock.instances[0].parseHash.mock;
      expect(parseHashMock.calls.length).toBe(1);
      expect(parseHashMock.calls[0]).toMatchSnapshot();
    });
  });
});
