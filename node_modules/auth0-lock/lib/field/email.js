'use strict';

exports.__esModule = true;
exports.validateEmail = validateEmail;
exports.isEmail = isEmail;
exports.setEmail = setEmail;
exports.emailDomain = emailDomain;
exports.emailLocalPart = emailLocalPart;

var _trim = require('trim');

var _trim2 = _interopRequireDefault(_trim);

var _index = require('./index');

var _string_utils = require('../utils/string_utils');

var _enterprise = require('../connection/enterprise');

var _i18n = require('../i18n');

var i18n = _interopRequireWildcard(_i18n);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(str) {
  return isEmail(str);
}

function isEmail(str) {
  var result = regExp.exec((0, _trim2.default)(str.toLowerCase()));
  return !!result && result[0] !== null;
}

function setEmail(m, str) {
  return (0, _index.setField)(m, 'email', str, function (str) {
    var validHRDEMail = (0, _enterprise.isHRDEmailValid)(m, str);

    return {
      valid: validateEmail(str) && validHRDEMail,
      hint: !validHRDEMail ? i18n.html(m, ['error', 'login', 'hrd.not_matching_email']) : undefined
    };
  });
}

function emailDomain(str) {
  var result = regExp.exec((0, _trim2.default)(str.toLowerCase()));
  return result ? result.slice(-2)[0] : '';
}

function emailLocalPart(str) {
  var domain = emailDomain(str);
  return domain ? str.slice(0, -1 - domain.length) : str;
}
