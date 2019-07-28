'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _auth0Js = require('auth0-js');

var _auth0Js2 = _interopRequireDefault(_auth0Js);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _cordovaAuth0PluginMin = require('auth0-js/dist/cordova-auth0-plugin.min.js');

var _cordovaAuth0PluginMin2 = _interopRequireDefault(_cordovaAuth0PluginMin);

var _helper = require('./helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth0APIClient = function () {
  function Auth0APIClient(lockID, clientID, domain, opts) {
    _classCallCheck(this, Auth0APIClient);

    this.lockID = lockID;
    this.client = null;
    this.authOpt = null;
    this.domain = domain;
    this.isUniversalLogin = window.location.host === domain;
    this._enableIdPInitiatedLogin = !!(opts._enableIdPInitiatedLogin || opts._enableImpersonation);
    var telemetry = this.getTelemetryInfo(opts._telemetryInfo);

    var state = opts.state;
    if (opts.params && opts.params.state) {
      state = opts.params.state;
    }

    var nonce = opts.nonce;
    if (opts.params && opts.params.nonce) {
      nonce = opts.params.nonce;
    }

    var scope = opts.params && opts.params.scope;

    this.client = new _auth0Js2.default.WebAuth({
      clientID: clientID,
      domain: domain,
      audience: opts.audience,
      redirectUri: opts.redirectUrl,
      responseMode: opts.responseMode,
      responseType: opts.responseType,
      leeway: opts.leeway || 1,
      plugins: opts.plugins || [new _cordovaAuth0PluginMin2.default()],
      overrides: (0, _helper.webAuthOverrides)(opts.overrides),
      _sendTelemetry: opts._sendTelemetry === false ? false : true,
      _telemetryInfo: telemetry,
      state: state,
      nonce: nonce,
      scope: scope
    });

    this.authOpt = {
      popup: !opts.redirect,
      popupOptions: opts.popupOptions,
      nonce: nonce,
      state: state,
      scope: scope
    };
    if (this.isUniversalLogin && opts.sso !== undefined) {
      this.authOpt.sso = opts.sso;
    }
  }

  Auth0APIClient.prototype.getTelemetryInfo = function getTelemetryInfo(telemetryOverride) {
    var telemetry = void 0;

    var _qs$parse = _qs2.default.parse(window.location.search.substr(1)),
        auth0Client = _qs$parse.auth0Client;

    var ulpTelemetry = auth0Client && JSON.parse(atob(auth0Client));
    if (this.isUniversalLogin && ulpTelemetry) {
      var _extends2;

      telemetry = _extends({}, ulpTelemetry, {
        env: _extends({}, ulpTelemetry.env, (_extends2 = {}, _extends2['lock.js-ulp'] = (0, _helper.getVersion)(), _extends2['auth0.js-ulp'] = _auth0Js2.default.version.raw, _extends2))
      });
    }
    if (this.isUniversalLogin && !ulpTelemetry) {
      var _env;

      telemetry = {
        name: 'lock.js-ulp',
        version: (0, _helper.getVersion)(),
        env: (_env = {}, _env['auth0.js-ulp'] = _auth0Js2.default.version.raw, _env)
      };
    }
    if (!this.isUniversalLogin && telemetryOverride) {
      var _extends3;

      telemetry = _extends({}, telemetryOverride, {
        env: _extends({}, telemetryOverride.env, (_extends3 = {}, _extends3['lock.js'] = (0, _helper.getVersion)(), _extends3['auth0.js'] = _auth0Js2.default.version.raw, _extends3))
      });
    }
    if (!telemetry) {
      var _env2;

      telemetry = {
        name: 'lock.js',
        version: (0, _helper.getVersion)(),
        env: (_env2 = {}, _env2['auth0.js'] = _auth0Js2.default.version.raw, _env2)
      };
    }
    return telemetry;
  };

  Auth0APIClient.prototype.logIn = function logIn(options, authParams, cb) {
    // TODO: for passwordless only, try to clean in auth0.js
    // client._shouldRedirect = redirect || responseType === "code" || !!redirectUrl;
    var f = (0, _helper.loginCallback)(false, this.domain, cb);
    var loginOptions = (0, _helper.trimAuthParams)((0, _helper.normalizeAuthParams)(_extends({}, options, this.authOpt, authParams)));

    if (options.login_hint) {
      loginOptions.login_hint = options.login_hint;
    }

    if (!options.username && !options.email) {
      if (this.authOpt.popup) {
        this.client.popup.authorize(_extends({}, loginOptions, {
          owp: true
        }), f);
      } else {
        this.client.authorize(loginOptions, f);
      }
    } else if (this.authOpt.popup) {
      this.client.popup.loginWithCredentials(loginOptions, f);
    } else {
      loginOptions.realm = options.connection;
      this.client.login(loginOptions, f);
    }
  };

  Auth0APIClient.prototype.logout = function logout(query) {
    this.client.logout(query);
  };

  Auth0APIClient.prototype.signUp = function signUp(options, cb) {
    delete options.autoLogin;
    this.client.signup((0, _helper.trimAuthParams)(options), function (err, result) {
      return cb(err, result);
    });
  };

  Auth0APIClient.prototype.resetPassword = function resetPassword(options, cb) {
    this.client.changePassword((0, _helper.trimAuthParams)(options), cb);
  };

  Auth0APIClient.prototype.passwordlessStart = function passwordlessStart(options, cb) {
    this.client.passwordlessStart((0, _helper.trimAuthParams)(options), function (err) {
      return cb((0, _helper.normalizeError)(err));
    });
  };

  Auth0APIClient.prototype.passwordlessVerify = function passwordlessVerify(options, cb) {
    var verifyOptions = _extends({}, options, {
      popup: this.authOpt.popup
    });
    this.client.passwordlessLogin(verifyOptions, function (err, result) {
      return cb((0, _helper.normalizeError)(err), result);
    });
  };

  Auth0APIClient.prototype.parseHash = function parseHash() {
    var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var cb = arguments[1];

    return this.client.parseHash({
      __enableIdPInitiatedLogin: this._enableIdPInitiatedLogin,
      hash: hash,
      nonce: this.authOpt.nonce,
      state: this.authOpt.state
    }, cb);
  };

  Auth0APIClient.prototype.getUserInfo = function getUserInfo(token, callback) {
    return this.client.client.userInfo(token, callback);
  };

  Auth0APIClient.prototype.getProfile = function getProfile(token, callback) {
    this.getUserInfo(token, callback);
  };

  Auth0APIClient.prototype.getSSOData = function getSSOData() {
    var _client$client;

    return (_client$client = this.client.client).getSSOData.apply(_client$client, arguments);
  };

  Auth0APIClient.prototype.getUserCountry = function getUserCountry(cb) {
    return this.client.client.getUserCountry(cb);
  };

  Auth0APIClient.prototype.checkSession = function checkSession(options, cb) {
    return this.client.checkSession(options, cb);
  };

  return Auth0APIClient;
}();

exports.default = Auth0APIClient;
