'use strict';

exports.__esModule = true;
exports.initPasswordless = initPasswordless;
exports.setResendSuccess = setResendSuccess;
exports.resendSuccess = resendSuccess;
exports.setResendFailed = setResendFailed;
exports.resendFailed = resendFailed;
exports.resendOngoing = resendOngoing;
exports.resend = resend;
exports.resendAvailable = resendAvailable;
exports.restartPasswordless = restartPasswordless;
exports.send = send;
exports.isSendLink = isSendLink;
exports.setPasswordlessStarted = setPasswordlessStarted;
exports.passwordlessStarted = passwordlessStarted;
exports.passwordlessConnection = passwordlessConnection;
exports.isEmail = isEmail;
exports.mustAcceptTerms = mustAcceptTerms;
exports.termsAccepted = termsAccepted;
exports.toggleTermsAcceptance = toggleTermsAcceptance;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _index = require('../../core/index');

var l = _interopRequireWildcard(_index);

var _index2 = require('../../field/index');

var _phone_number = require('../../field/phone_number');

var _data_utils = require('../../utils/data_utils');

var _web_api = require('../../core/web_api');

var _web_api2 = _interopRequireDefault(_web_api);

var _sync = require('../../sync');

var _sync2 = _interopRequireDefault(_sync);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _dataFns = (0, _data_utils.dataFns)(['passwordless']),
    get = _dataFns.get,
    initNS = _dataFns.initNS,
    tget = _dataFns.tget,
    tremove = _dataFns.tremove,
    tset = _dataFns.tset;

function initPasswordless(m, opts) {
  // TODO: validate opts
  var send = opts.passwordlessMethod === 'link' ? 'link' : 'code';
  var mustAcceptTerms = !!opts.mustAcceptTerms;

  m = initNS(m, (0, _immutable.Map)({ send: send, mustAcceptTerms: mustAcceptTerms }));
  if (opts.defaultLocation && typeof opts.defaultLocation === 'string') {
    m = (0, _phone_number.initLocation)(m, opts.defaultLocation.toUpperCase());
  } else {
    m = (0, _sync2.default)(m, 'location', {
      recoverResult: 'US',
      syncFn: function syncFn(m, cb) {
        return _web_api2.default.getUserCountry(l.id(m), cb);
      },
      successFn: function successFn(m, result) {
        return (0, _phone_number.initLocation)(m, result);
      }
    });
  }
  return m;
}

function setResendStatus(m, value) {
  // TODO: check value
  return tset(m, 'resendStatus', value);
}

function setResendSuccess(m) {
  return setResendStatus(m, 'success');
}

function resendSuccess(m) {
  return resendStatus(m) == 'success';
}

function setResendFailed(m) {
  return setResendStatus(m, 'failed');
}

function resendFailed(m) {
  return resendStatus(m) == 'failed';
}

function resendOngoing(m) {
  return resendStatus(m) == 'ongoing';
}

function resend(m) {
  if (resendAvailable(m)) {
    return setResendStatus(m, 'ongoing');
  } else {
    return m;
  }
}

function resendStatus(m) {
  return tget(m, 'resendStatus', 'waiting');
}

function resendAvailable(m) {
  return resendStatus(m) == 'waiting' || resendStatus(m) == 'failed';
}

function restartPasswordless(m) {
  // TODO: maybe we can take advantage of the transient fields
  m = tremove(m, 'passwordlessStarted');
  m = tremove(m, 'resendStatus'); // only for link
  m = (0, _index2.clearFields)(m, ['vcode']); // only for code

  return l.clearGlobalError(m);
}

function send(m) {
  return get(m, 'send', isEmail(m) ? 'link' : 'code');
}

function isSendLink(m) {
  return send(m) === 'link';
}

function setPasswordlessStarted(m, value) {
  return tset(m, 'passwordlessStarted', value);
}

function passwordlessStarted(m) {
  return tget(m, 'passwordlessStarted', false);
}

function passwordlessConnection(m) {
  return l.connections(m, 'passwordless', 'email').get(0) || l.connections(m, 'passwordless', 'sms').get(0) || new _immutable.Map();
}

function isEmail(m) {
  var c = passwordlessConnection(m);
  return c.isEmpty() ? undefined : c.get('strategy') === 'email';
}

function mustAcceptTerms(m) {
  return get(m, 'mustAcceptTerms', false);
}

function termsAccepted(m) {
  return !mustAcceptTerms(m) || tget(m, 'termsAccepted', false);
}

function toggleTermsAcceptance(m) {
  return tset(m, 'termsAccepted', !termsAccepted(m));
}
