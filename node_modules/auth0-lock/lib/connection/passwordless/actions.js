'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.requestPasswordlessEmail = requestPasswordlessEmail;
exports.requestPasswordlessEmailSuccess = requestPasswordlessEmailSuccess;
exports.requestPasswordlessEmailError = requestPasswordlessEmailError;
exports.resendEmail = resendEmail;
exports.sendSMS = sendSMS;
exports.logIn = logIn;
exports.restart = restart;
exports.toggleTermsAcceptance = toggleTermsAcceptance;

var _immutable = require('immutable');

var _index = require('../../store/index');

var _actions = require('../../core/actions');

var _web_api = require('../../core/web_api');

var _web_api2 = _interopRequireDefault(_web_api);

var _index2 = require('../../field/index');

var c = _interopRequireWildcard(_index2);

var _index3 = require('../../core/index');

var l = _interopRequireWildcard(_index3);

var _index4 = require('./index');

var _phone_number = require('../../field/phone_number');

var _i18n = require('../../i18n');

var i18n = _interopRequireWildcard(_i18n);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getErrorMessage(m, error) {
  var key = error.error;

  if (error.error === 'sms_provider_error' && (error.description || '').indexOf('(Code: 21211)') > -1) {
    key = 'bad.phone_number';
  }

  return i18n.html(m, ['error', 'passwordless', key]) || i18n.html(m, ['error', 'passwordless', 'lock.fallback']);
}

function requestPasswordlessEmail(id) {
  (0, _actions.validateAndSubmit)(id, ['email'], function (m) {
    sendEmail(m, requestPasswordlessEmailSuccess, requestPasswordlessEmailError);
  });
}

function requestPasswordlessEmailSuccess(id) {
  (0, _index.swap)(_index.updateEntity, 'lock', id, function (m) {
    m = l.setSubmitting(m, false);
    return (0, _index4.setPasswordlessStarted)(m, true);
  });
}

function requestPasswordlessEmailError(id, error) {
  var m = (0, _index.read)(_index.getEntity, 'lock', id);
  var errorMessage = getErrorMessage(m, error);
  return (0, _index.swap)(_index.updateEntity, 'lock', id, l.setSubmitting, false, errorMessage);
}

function resendEmail(id) {
  (0, _index.swap)(_index.updateEntity, 'lock', id, _index4.resend);
  var m = (0, _index.read)(_index.getEntity, 'lock', id);
  sendEmail(m, resendEmailSuccess, resendEmailError);
}

function resendEmailSuccess(id) {
  (0, _index.swap)(_index.updateEntity, 'lock', id, _index4.setResendSuccess);
}

function resendEmailError(id, error) {
  (0, _index.swap)(_index.updateEntity, 'lock', id, _index4.setResendFailed);
}

function sendEmail(m, successFn, errorFn) {
  var params = {
    connection: 'email',
    email: c.getFieldValue(m, 'email'),
    send: (0, _index4.send)(m)
  };

  if ((0, _index4.isSendLink)(m) && !l.auth.params(m).isEmpty()) {
    params.authParams = l.auth.params(m).toJS();
  }

  _web_api2.default.startPasswordless(l.id(m), params, function (error) {
    if (error) {
      setTimeout(function () {
        return errorFn(l.id(m), error);
      }, 250);
    } else {
      successFn(l.id(m));
    }
  });
}

function sendSMS(id) {
  (0, _actions.validateAndSubmit)(id, ['phoneNumber'], function (m) {
    var params = {
      connection: 'sms',
      phoneNumber: (0, _phone_number.phoneNumberWithDiallingCode)(m),
      send: (0, _index4.send)(m)
    };
    _web_api2.default.startPasswordless(id, params, function (error) {
      if (error) {
        setTimeout(function () {
          return sendSMSError(id, error);
        }, 250);
      } else {
        sendSMSSuccess(id);
      }
    });
  });
}

function sendSMSSuccess(id) {
  (0, _index.swap)(_index.updateEntity, 'lock', id, function (m) {
    m = l.setSubmitting(m, false);
    m = (0, _index4.setPasswordlessStarted)(m, true);
    return m;
  });
}

function sendSMSError(id, error) {
  var m = (0, _index.read)(_index.getEntity, 'lock', id);
  var errorMessage = getErrorMessage(m, error);
  return (0, _index.swap)(_index.updateEntity, 'lock', id, l.setSubmitting, false, errorMessage);
}

function logIn(id) {
  var m = (0, _index.read)(_index.getEntity, 'lock', id);
  var authParams = l.auth.params(m).toJS();
  var params = _extends({
    verificationCode: c.getFieldValue(m, 'vcode')
  }, authParams);
  if ((0, _index4.isEmail)(m)) {
    params.connection = 'email';
    params.email = c.getFieldValue(m, 'email');
  } else {
    params.connection = 'sms';
    params.phoneNumber = (0, _phone_number.phoneNumberWithDiallingCode)(m);
  }
  (0, _index.swap)(_index.updateEntity, 'lock', id, l.setSubmitting, true);
  _web_api2.default.passwordlessVerify(id, params, function (error, result) {
    var errorMessage = void 0;
    if (error) {
      var _m = (0, _index.read)(_index.getEntity, 'lock', id);
      errorMessage = getErrorMessage(_m, error);
      if (error.logToConsole) {
        console.error(error.description);
      }
      return (0, _index.swap)(_index.updateEntity, 'lock', id, l.setSubmitting, false, errorMessage);
    } else {
      return (0, _actions.logInSuccess)(id, result);
    }
  });
}

function restart(id) {
  (0, _index.swap)(_index.updateEntity, 'lock', id, _index4.restartPasswordless);
}

function toggleTermsAcceptance(id) {
  (0, _index.swap)(_index.updateEntity, 'lock', id, _index4.toggleTermsAcceptance);
}
