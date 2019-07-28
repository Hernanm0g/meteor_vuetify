'use strict';

exports.__esModule = true;

var _p2_api = require('./web_api/p2_api');

var _p2_api2 = _interopRequireDefault(_p2_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth0WebAPI = function () {
  function Auth0WebAPI() {
    _classCallCheck(this, Auth0WebAPI);

    this.clients = {};
  }

  Auth0WebAPI.prototype.setupClient = function setupClient(lockID, clientID, domain, opts) {
    var hostedLoginPage = window.location.host === domain;
    // when it is used on on the hosted login page, it shouldn't use popup mode
    opts.redirect = hostedLoginPage ? true : opts.redirect;

    // for cordova and electron we should force popup without SSO so it uses
    // /ro or /oauth/token for DB connections
    if (window && (!!window.cordova || !!window.electron)) {
      opts.redirect = false;
      opts.sso = false;
    }

    this.clients[lockID] = new _p2_api2.default(lockID, clientID, domain, opts);
  };

  Auth0WebAPI.prototype.logIn = function logIn(lockID, options, authParams, cb) {
    this.clients[lockID].logIn(options, authParams, cb);
  };

  Auth0WebAPI.prototype.logout = function logout(lockID, query) {
    this.clients[lockID].logout(query);
  };

  Auth0WebAPI.prototype.signUp = function signUp(lockID, options, cb) {
    this.clients[lockID].signUp(options, cb);
  };

  Auth0WebAPI.prototype.resetPassword = function resetPassword(lockID, options, cb) {
    this.clients[lockID].resetPassword(options, cb);
  };

  Auth0WebAPI.prototype.startPasswordless = function startPasswordless(lockID, options, cb) {
    this.clients[lockID].passwordlessStart(options, cb);
  };

  Auth0WebAPI.prototype.passwordlessVerify = function passwordlessVerify(lockID, options, cb) {
    this.clients[lockID].passwordlessVerify(options, cb);
  };

  Auth0WebAPI.prototype.parseHash = function parseHash(lockID) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var cb = arguments[2];

    return this.clients[lockID].parseHash(hash, cb);
  };

  Auth0WebAPI.prototype.getUserInfo = function getUserInfo(lockID, token, callback) {
    return this.clients[lockID].getUserInfo(token, callback);
  };

  Auth0WebAPI.prototype.getProfile = function getProfile(lockID, token, callback) {
    return this.clients[lockID].getProfile(token, callback);
  };

  Auth0WebAPI.prototype.getSSOData = function getSSOData(lockID) {
    var _clients$lockID;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return (_clients$lockID = this.clients[lockID]).getSSOData.apply(_clients$lockID, args);
  };

  Auth0WebAPI.prototype.getUserCountry = function getUserCountry(lockID, cb) {
    return this.clients[lockID].getUserCountry(function (err, data) {
      return cb(err, data && data.countryCode);
    });
  };

  Auth0WebAPI.prototype.checkSession = function checkSession(lockID, options, cb) {
    return this.clients[lockID].checkSession(options, cb);
  };

  return Auth0WebAPI;
}();

exports.default = new Auth0WebAPI();
